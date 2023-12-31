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
    this.SubTotal = receipt.SubTotal - receipt.Descuento;
    this.Total = receipt.Total;
    this.TaxAmount = receipt.TaxAmount;
    this.UUID = receipt.UUID;
  }
}
