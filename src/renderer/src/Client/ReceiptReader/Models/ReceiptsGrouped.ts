import ReceiptType from '../../../../../resources/models/ReceiptType';

export default class ReceiptsGrouped {
	Key: string;
	IssuerRfc: string;
	IssuerName: string;
	SubTotal: number;
	Total: number;
	TaxAmount: number;
	Receipts: ReceiptType[];

	constructor(receipt: any, key: string) {
		this.Key = key;
		this.IssuerName = receipt.IssuerName;
		this.IssuerRfc = receipt.IssuerRfc;
		this.SubTotal = 0;
		this.Total = 0;
		this.TaxAmount = 0;
		this.Receipts = [];
	}
}
