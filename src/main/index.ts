import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import Store from 'electron-store';
import { installExtension, VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import FileService from './services/FileService';

interface WindowState {
	maximized: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
}
const store = new Store();
let mainWindow: BrowserWindow;

function createWindow(): void {
	// Retrieve window position and size from electron-store
	const defaultWindowState: WindowState = { x: 0, y: 0, width: 800, height: 600, maximized: true };
	const { x, y, width, height } = store.get('windowState', defaultWindowState) as WindowState;

	// Create the browser window.
	mainWindow = new BrowserWindow({
		x,
		y,
		width,
		height,
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false,
		},
	});

	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
	}

	// Make all links open with the browser, not with the application
	// mainWindow.webContents.setWindowOpenHandler(({ url }) => {
	// 	if (url.startsWith('https:')) shell.openExternal(url);
	// 	return { action: 'deny' };
	// });

	mainWindow.setMenu(null);
	// Save window position and size when the window is moved or resized
	mainWindow.on('move', saveWindowState);
	mainWindow.on('resize', saveWindowState);
	mainWindow.on('maximize', saveWindowState);
}

function saveWindowState() {
	// Save window position, size, and minimized state to electron-store
	store.set('windowState', { ...mainWindow.getBounds(), maximized: mainWindow.isMaximized() });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron');

	// Install Vue.js DevTools in development
	if (is.dev) {
		try {
			await installExtension(VUEJS_DEVTOOLS);
			console.log('Vue.js DevTools installed successfully');
		} catch (error) {
			console.error('Failed to install Vue.js DevTools:', error);
		}
	}

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	// IPC test
	ipcMain.on('ping', () => console.log('pong'));

	const windowState = store.get('windowState') as WindowState;
	createWindow();

	if (windowState) {
		if (windowState.maximized) mainWindow.maximize();
	}

	// Open DevTools in development after window is ready
	if (is.dev) {
		mainWindow.webContents.once('dom-ready', () => {
			mainWindow.webContents.openDevTools();
		});
	}

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('second-instance', () => {
	if (mainWindow) {
		// Focus on the main window if the user tried to open another
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
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

// // New window example arg: new windows url
// ipcMain.handle('open-win', (_, arg) => {
// 	const childWindow = new BrowserWindow({
// 		webPreferences: {
// 			preload,
// 			nodeIntegration: true,
// 			contextIsolation: false,
// 		},
// 	});

// 	if (process.env.VITE_DEV_SERVER_URL) {
// 		childWindow.loadURL(`${url}#${arg}`);
// 	} else {
// 		childWindow.loadFile(indexHtml, { hash: arg });
// 	}
// });

ipcMain.handle('showSelectDirectoryDialog', (e, message) => {
	if (mainWindow) {
		return dialog.showOpenDialog(mainWindow, {
			properties: ['openDirectory'],
			message: 'Please select a directory',
		});
	}
});

ipcMain.handle('showSaveFileDialog', (e, message) => {
	if (mainWindow) {
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

ipcMain.handle('readXmlDirectory', (e, directory, extension = 'xml') => {
	const fileService = new FileService();
	return fileService.readXmlDirectory(directory, extension);
});

ipcMain.handle('parseAndvalidateCfdi', (e, xmlFilePath, detectedCfdiVersion = '4.0') => {
	const fileService = new FileService();
	return fileService.parseAndvalidateCfdi(xmlFilePath);
});

ipcMain.handle('joinPath', (e, ...pathSegments: string[]) => {
	return join(...pathSegments);
});
