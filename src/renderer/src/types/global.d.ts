import { ElectronAPI } from '@electron-toolkit/preload';

export interface CustomAPI {
	files: {
		showSelectDirectoryDialog: () => Promise<{
			canceled: boolean;
			filePaths: string[];
		}>;
		showSaveFileDialog: () => Promise<{
			canceled: boolean;
			filePath?: string;
		}>;
	};
}

declare global {
	interface Window {
		electron: ElectronAPI;
		api: CustomAPI;
	}
}
