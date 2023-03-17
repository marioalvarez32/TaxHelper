export default class ReceiptType {
  UUID: string;
  IssuerRfc: string;
  IssuerName: string;
  ReceiverRfc: string;
  ReceiverName: string;
  SubTotal: number;
  Total: number;
  TaxAmount: number;

  constructor(receipt: any) {
    this.IssuerName = receipt.IssuerName;
    this.IssuerRfc = receipt.IssuerRfc;
    this.ReceiverRfc = receipt.ReceiverRfc;
    this.ReceiverName = receipt.ReceiverName;
    this.SubTotal = parseFloat(receipt.SubTotal);
    this.Total = parseFloat(receipt.Total);
    this.TaxAmount = parseFloat(receipt.TaxAmount);
    this.UUID = receipt.UUID;
  }
}
