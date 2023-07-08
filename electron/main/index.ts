import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
const path = require('path');
import { release } from 'node:os';
import { join } from 'node:path';
import Store from 'electron-store';
const isDev = require('electron-is-dev');

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;

const store = new Store();

// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js');
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

async function gateCreateWindowWithLicense(createWindow) {
  const gateWindow = new BrowserWindow({
    resizable: false,

    frame: false,

    width: 420,

    height: 200,

    webPreferences: {
      preload: path.join(__dirname, '../gate/gate.js'),
      devTools: isDev,
    },
  });

  gateWindow.loadFile('gate.html');

  if (isDev) {
    gateWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // TODO(ezekg) Create main window for valid licenses
  ipcMain.on('GATE_SUBMIT', async (_event, { key }) => {
    // Close the license gate window
    console.log('gate submitted', key);

    // Launch our main window

    await createWindow();
    gateWindow.close();
  });
}

async function createWindow() {
  // Retrieve window position and size from electron-store
  const defaultWindowState: WindowState = { x: 0, y: 0, width: 800, height: 600, maximized: true };
  const { x, y, width, height } = store.get('windowState', defaultWindowState) as WindowState;

  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    x,
    y,
    width,
    height,
    show: false,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

  win.setMenu(null);

  // Save window position and size when the window is moved or resized
  win.on('move', saveWindowState);
  win.on('resize', saveWindowState);
  win.on('maximize', saveWindowState);
  // Emitted when the window is closed.
  win.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

function saveWindowState() {
  // Save window position, size, and minimized state to electron-store
  store.set('windowState', { ...win.getBounds(), maximized: win.isMaximized() });
}

app.whenReady().then(() => gateCreateWindowWithLicense(initializeMainWindow));

async function initializeMainWindow() {
  if (isDev) {
    try {
      const installExtension = require('electron-devtools-installer').default;
      const { VUEJS3_DEVTOOLS } = require('electron-devtools-installer');
      await installExtension(VUEJS3_DEVTOOLS);
      console.log('Vue.js devtools extension installed');
    } catch (e) {
      console.log('Failed to install Vue.js devtools extension:', e);
    }
  }

  const { maximized } = store.get('windowState') as WindowState;

  createWindow();
  // Set minimized state if the window was minimized when it was last closed
  if (maximized) {
    win.maximize();
  }
  win.show();
}

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});

ipcMain.handle('showSelectDirectoryDialog', (e, message) => {
  if (win) {
    return dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
      message: 'Please select a directory',
    });
  }
});

ipcMain.handle('showSaveFileDialog', (e, message) => {
  if (win) {
    return dialog.showSaveDialog({
      title: 'Save Excel File',
      defaultPath: 'data.xlsx',
      buttonLabel: 'Save',
      filters: [
        { name: 'Excel Files', extensions: ['xlsx'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });
  }
});

interface WindowState {
  maximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}
