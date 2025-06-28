import fs from 'fs';
import path from 'path';
import ReceiptType from '../Models/ReceiptType';
import ReceiptXmlType from '../Models/ReceiptXmlType';
import { validateXML } from 'xmllint-wasm';
// Example for CFDI 4.0 main schema
import cfdv40XsdContent from '../../../schemas/cfdi40/schema.xsd?raw';
import catCfdiXsdContent from '../../../schemas/cfdi40/catcfdi.xsd?raw';
// import pagos20XsdContent from '../../../schemas/cfdi40/Pagos20.xsd?raw';

// // Example for CFDI 3.3 main schema
// import cfdv33XsdContent from '../../../schemas/cfdi33/cfdv33.xsd?raw';
// import pagos10XsdContent from '../../../schemas/cfdi33/Pagos10.xsd?raw';

const allSchemas: Record<string, string> = {
	cfdi40_cfdv40: cfdv40XsdContent,
	cfdi40_catCFDI: catCfdiXsdContent,
	// cfdi40_Pagos20: pagos20XsdContent,
	// cfdi33_cfdv33: cfdv33XsdContent,
	// cfdi33_Pagos10: pagos10XsdContent,
	// ... add all other necessary schemas
};

export default class FileService {
	// No need for schemasBaseDir or fs.readFile anymore for XSDs
	constructor() {}

	async readDirectory(directory: string): Promise<string[]> {
		return new Promise((resolve, reject) => {
			fs.readdir(directory, (error, files) => {
				if (error) {
					reject(error);
				} else {
					resolve(files);
				}
			});
		});
	}

	async readXmlDirectory(directory: string, extension: string): Promise<string[]> {
		return new Promise((resolve, reject) => {
			fs.readdir(directory, (error, files) => {
				if (error) {
					reject(error);
				} else {
					const filteredFiles = files.filter((file) => path.extname(file) === `.${extension}`);
					resolve(filteredFiles);
				}
			});
		});
	}

	async readXmlFiles(directory: string, files: string[]): Promise<ReadXMLFilesPromise> {
		return new Promise((resolve, reject) => {
			const xml2js = require('xml2js');
			const receiptFiles: ReceiptType[] = [];
			// @ts-ignore
			const ommitedFiles = [];
			for (const file of files) {
				const filePath = path.join(directory, file);
				const xml = fs.readFileSync(filePath, 'utf8');
				// @ts-ignore
				xml2js.parseString(xml, (error, result) => {
					if (error) {
						reject(error);
					} else {
						try {
							const xmlReceipt = new ReceiptXmlType(result);
							receiptFiles.push(xmlReceipt.convertToReceiptType());
						} catch (error) {
							ommitedFiles.push(file);
						}
					}
				});
			}
			resolve({
				ReceiptsRead: receiptFiles,
				// @ts-ignore
				FilesOmmited: ommitedFiles,
			});
		});
	}

	async loadXsdContent(version: string, schemaName: string): Promise<{ fileName: string; contents: string }> {
		const key = `cfdi${version.replace('.', '')}_${schemaName.replace('.xsd', '')}`;
		const content = allSchemas[key];

		if (!content) {
			console.error(`[FileService] XSD schema content not found for key: ${key}`);
			throw new Error(`XSD schema not found in bundle: ${schemaName} for CFDI ${version}`);
		}
		return { fileName: schemaName, contents: content };
	}

	async validateCfdi(xmlFilePath: string, detectedCfdiVersion: string = '4.0') {
		console.log('🚀 ~ FileService ~ validateCfdi ~ xmlFilePath:', xmlFilePath);
		// ... (your existing validation logic)

		const schemaFilesToLoad = [
			`cfdv${detectedCfdiVersion.replace('.', '')}.xsd`,
			'catCFDI.xsd',
			//(detectedCfdiVersion === '4.0' ? 'Pagos20.xsd' : 'Pagos10.xsd')
		];

		try {
			const schemaContents = await Promise.all(
				schemaFilesToLoad.map((fileName) => this.loadXsdContent(detectedCfdiVersion, fileName)),
			);
			console.log('🚀 ~ FileService ~ validateCfdi ~ schemaContents:', schemaContents);
			const xmlContent = await fs.readFileSync(xmlFilePath, 'utf8');

			const validationResult = await validateXML({
				xml: [{ fileName: 'cfdi.xml', contents: xmlContent }], // Provide a fileName for better error messages
				schema: cfdv40XsdContent, // Pass all loaded schema files
				// Optional: You can set maxMemoryPages if you expect very large XML files
				// maxMemoryPages: 2 * 65536 // 2GB if 6.4KiB per page, adjust as needed
			})
				.then((test) => {
					console.log('VALIDATION RESULT: ', test);
				})
				.catch((error) => {
					console.log('VALIDATION ERROR: ', error);
				});
			console.log('VALIDATION RESULT: ', validationResult);
		} catch (error) {
			// ...
			throw error;
		}
	}

	async validateCfdiWithXmllintWasm(xmlFilePath: string) {
		try {
			const xmlContent = await fs.readFileSync(xmlFilePath, 'utf8');

			// Load all necessary XSD files for the specific CFDI version.
			// xmllint-wasm requires you to preload all schema dependencies.
			const schemaPath = 'schema.xsd';
			const catCFDIPath = 'catcfdi.xsd';
			const schemaFilesToLoad = [schemaPath, catCFDIPath];

			const schemaContents = await Promise.all(
				schemaFilesToLoad.map(async (fileName) => {
					const filePath = path.join(xsdDirPath, fileName);
					const contents = await fs.readFileSync(filePath, 'utf8');
					return { fileName: fileName, contents: contents };
				}),
			);

			const validationResult = await validateXML({
				xml: [{ fileName: 'cfdi.xml', contents: xmlContent }], // Provide a fileName for better error messages
				schema: schemaContents, // Pass all loaded schema files
				// Optional: You can set maxMemoryPages if you expect very large XML files
				// maxMemoryPages: 2 * 65536 // 2GB if 6.4KiB per page, adjust as needed
			});

			console.log('VALIDATION RESULT: ', validationResult);

			if (validationResult.valid) {
				console.log('XML is valid against the CFDI schema.');
				return { isValid: true, errors: [] };
			} else {
				console.error('XML validation errors:', validationResult.errors);
				// errors will be an array of objects with 'rawMessage'
				return { isValid: false, errors: validationResult.errors.map((err) => err.rawMessage) };
			}
		} catch (error) {
			console.error('Error during XML validation:', error);
			throw error;
		}
	}
}

type ReadXMLFilesPromise = {
	ReceiptsRead: ReceiptType[];
	FilesOmmited: string[];
};
