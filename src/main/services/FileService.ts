import fs from 'fs';
import path from 'path';
import ReceiptType from 'Resources/models/ReceiptType';
import ReceiptXmlType from 'Resources/models/ReceiptXmlType';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

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
					console.log('🚀 ~ FileService ~ readXmlDirectory ~ filteredFiles:', filteredFiles);
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

	async parseAndvalidateCfdi(xmlFilePath: string): Promise<{ isValid: boolean; errors: string[]; parsedXML?: any }> {
		try {
			const xmlContent = fs.readFileSync(xmlFilePath, 'utf8');

			// Basic XML validation first
			const validationResult = XMLValidator.validate(xmlContent);

			if (validationResult !== true) {
				console.error('XML is not well-formed:', validationResult);
				return { isValid: false, errors: [validationResult.err.msg] };
			}

			// Parse XML to validate CFDI structure
			const parser = new XMLParser({
				ignoreAttributes: false,
				attributeNamePrefix: '',
				parseAttributeValue: true,
				removeNSPrefix: true,
			});

			const xmlDoc = parser.parse(xmlContent);

			// Basic CFDI validation checks
			const errors: string[] = [];

			// Check if root element is Comprobante
			if (!xmlDoc['Comprobante']) {
				errors.push('Missing root element Comprobante');
			}

			const comprobante = xmlDoc['Comprobante'];
			if (comprobante) {
				// Check required attributes
				const requiredAttrs = ['Version', 'Fecha', 'Sello', 'FormaPago', 'NoCertificado'];
				requiredAttrs.forEach((attr) => {
					if (!comprobante[`${attr}`]) {
						errors.push(`Missing required attribute: ${attr}`);
					}
				});

				// Check required elements
				if (!comprobante['Emisor']) {
					errors.push('Missing required element: Emisor');
				}
				if (!comprobante['Receptor']) {
					errors.push('Missing required element: Receptor');
				}
				if (!comprobante['Conceptos']) {
					errors.push('Missing required element: Conceptos');
				}
			}

			if (errors.length === 0) {
				return { isValid: true, errors: [], parsedXML: xmlDoc };
			} else {
				return { isValid: false, errors };
			}
		} catch (error) {
			return { isValid: false, errors: [error as string] };
		}
	}
}

type ReadXMLFilesPromise = {
	ReceiptsRead: ReceiptType[];
	FilesOmmited: string[];
};
