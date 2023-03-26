import ExcelJS from 'exceljs';
import fs from 'fs';
const path = require('path');

import ReceiptType from '../Models/ReceiptType';

export function exportReceiptDataToExcel(data: ReceiptType[], filePath: string): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // Add headers to the worksheet
  worksheet.columns = [
    { header: 'Receipt ID', key: 'UUID', width: 20 },
    { header: 'Issuer RFC', key: 'IssuerRfc', width: 20 },
    { header: 'Issuer Name', key: 'IssuerName', width: 20 },
    { header: 'Receiver RFC', key: 'ReceiverRfc', width: 20 },
    { header: 'Receiver Name', key: 'ReceiverName', width: 20 },
    { header: 'Sub Total', key: 'SubTotal', width: 10 },
    { header: 'Total', key: 'Total', width: 10 },
    { header: 'Tax Amount', key: 'TaxAmount', width: 10 },
  ];

  data.forEach((row) => {
    worksheet.addRow(row);
  });

  const stream = fs.createWriteStream(filePath);

  // Write the workbook to a file
  return workbook.xlsx.write(stream);

  // Write the workbook to a buffer
  //return workbook.xlsx.writeBuffer();
}
