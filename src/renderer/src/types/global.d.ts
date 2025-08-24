import type { ValidateCfdiResult } from '@/Client/ReceiptReader/Models/FileServicesModels';
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
		readXmlDirectory: (directory: string, extension?: string) => Promise<string[]>;
		parseAndvalidateCfdi: (xmlFilePath: string, detectedCfdiVersion?: string) => Promise<ValidateCfdiResult>;
	};

	path: {
		join: (...pathSegments: string[]) => string;
	};
}

declare global {
	interface Window {
		electron: ElectronAPI;
		api: CustomAPI;
	}
}
