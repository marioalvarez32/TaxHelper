import ReceiptType from './ReceiptType';

export default class ReceiptXmlType {
  UUID: string;
  ReceiptSummary: {
    Certificate: string;
    Date: string;
    Folio: string;
    PaymentMethod: number;
    Currency: string;
    CertificateNumber: string;
    StampId: string;
    Series: string;
    SubTotal: string;
    ExchangeType: string;
    Total: string;
    ReceiptType: string;
    ReceiptVersion: string;
  };
  Taxes: {
    Amount: string;
  };
  Receiver: {
    Name: string;
    TaxRegime: string;
    Rfc: string;
  };
  Issuer: {
    Name: string;
    TaxRegime: string;
    Rfc: string;
  };

  constructor(xmlData: any) {
    const data = xmlData['cfdi:Comprobante'];
    const summaryData = data['$'];
    this.ReceiptSummary = {
      Certificate: summaryData['Certificado'],
      Date: summaryData['Fecha'],
      Folio: summaryData['Folio'],
      PaymentMethod: summaryData['FormaPago'],
      Currency: summaryData['MetodoPago'],
      CertificateNumber: summaryData['NoCertificado'],
      StampId: summaryData['Sello'],
      Series: summaryData['Serie'],
      SubTotal: summaryData['SubTotal'],
      ExchangeType: summaryData['TipoDeCambio'],
      Total: summaryData['Total'],
      ReceiptType: summaryData['TipoDeComprobante'],
      ReceiptVersion: summaryData['Version'],
    };
    const totalTax = data['cfdi:Impuestos']['0']['$'];
    this.Taxes = {
      Amount: totalTax['TotalImpuestosTrasladados'],
    };
    const receiver = data['cfdi:Receptor']['0']['$'];
    this.Receiver = {
      Name: receiver['Nombre'],
      TaxRegime: receiver['RegimenFiscal'],
      Rfc: receiver['Rfc'],
    };
    const issuer = data['cfdi:Emisor']['0']['$'];
    this.Issuer = {
      Name: issuer['Nombre'],
      TaxRegime: issuer['RegimenFiscal'],
      Rfc: issuer['Rfc'],
    };
    const complementaryData = data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$'];
    this.UUID = complementaryData.UUID;
  }

  convertToReceiptType(): ReceiptType {
    const { SubTotal, Total } = this.ReceiptSummary;
    const { Amount: TaxAmount, TaxPercentage } = this.Taxes;
    const { Name: ReceiverName, Rfc: ReceiverRfc } = this.Receiver;
    const { Name: IssuerName, Rfc: IssuerRfc } = this.Issuer;

    return new ReceiptType({
      IssuerName,
      IssuerRfc,
      ReceiverRfc,
      ReceiverName,
      SubTotal,
      Total,
      TaxAmount,
      TaxPercentage,
      UUID: this.UUID,
    });
  }
}
