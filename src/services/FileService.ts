import fs from 'fs';
import path from 'path';
import ReceiptType from '../components/models/ReceiptType';
import ReceiptXmlType from '../components/models/ReceiptXmlType';

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

export async function readXmlFiles(directory: string, files: string[]): Promise<ReceiptType[]> {
  return new Promise((resolve, reject) => {
    const xml2js = require('xml2js');
    const receiptFiles: ReceiptType[] = [];
    for (const file of files) {
      const filePath = path.join(directory, file);
      const xml = fs.readFileSync(filePath, 'utf8');

      xml2js.parseString(xml, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const xmlReceipt = new ReceiptXmlType(result);
          receiptFiles.push(xmlReceipt.convertToReceiptType());
        }
      });
    }
    resolve(receiptFiles);
  });
}
