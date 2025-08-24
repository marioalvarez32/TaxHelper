import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
	files: {
		showSelectDirectoryDialog: () => ipcRenderer.invoke('showSelectDirectoryDialog'),
		showSaveFileDialog: () => ipcRenderer.invoke('showSaveFileDialog'),
		readXmlDirectory: (directory: string, extension?: string) => ipcRenderer.invoke('readXmlDirectory', directory, extension),
		parseAndvalidateCfdi,
	},
	path: {
		join: (...pathSegments: string[]) => ipcRenderer.invoke('joinPath', ...pathSegments),
	},
	// Add other methods as needed
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}

function parseAndvalidateCfdi(xmlFilePath: string, detectedCfdiVersion?: string): Promise<{ isValid: boolean; errors: string[]; parsedXML?: any }> {
	return ipcRenderer.invoke('parseAndvalidateCfdi', xmlFilePath, detectedCfdiVersion);
}
