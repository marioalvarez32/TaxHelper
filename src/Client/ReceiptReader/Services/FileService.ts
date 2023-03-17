import fs from 'fs';
import path from 'path';
import ReceiptType from '../Models/ReceiptType';
import ReceiptXmlType from '../Models/ReceiptXmlType';

export async function readDirectory(directory: string): Promise<string[]> {
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

export async function readXmlDirectory(directory: string, extension: string): Promise<string[]> {
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

export async function readXmlFiles(directory: string, files: string[]): Promise<ReadXMLFilesPromise> {
  return new Promise((resolve, reject) => {
    const xml2js = require('xml2js');
    const receiptFiles: ReceiptType[] = [];
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
      FilesOmmited: ommitedFiles,
    });
  });
}

type ReadXMLFilesPromise = {
  ReceiptsRead: ReceiptType[];
  FilesOmmited: string[];
};
