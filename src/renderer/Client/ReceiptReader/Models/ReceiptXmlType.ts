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
    Descuento: number;
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
    const summaryData = data['$'] ?? {};
    this.ReceiptSummary = {
      Certificate: summaryData['Certificado'] ?? 'Sin certificado',
      Date: summaryData['Fecha'] ?? 'Sin Fecha',
      Folio: summaryData['Folio'] ?? 'Sin Folio',
      PaymentMethod: summaryData['FormaPago'] ?? 0,
      Currency: summaryData['MetodoPago'] ?? 'Sin moneda',
      CertificateNumber: summaryData['NoCertificado'] ?? 'Sin # de certificado',
      StampId: summaryData['Sello'] ?? 'Sin sello',
      Series: summaryData['Serie'] ?? 'Sin serie',
      SubTotal: summaryData['SubTotal'] ?? 0,
      ExchangeType: summaryData['TipoDeCambio'] ?? 'Sin tipo de cambio',
      Total: summaryData['Total'] ?? 0,
      ReceiptType: summaryData['TipoDeComprobante'] ?? 'Sin tipo de comprobante',
      ReceiptVersion: summaryData['Version'] ?? 'Sin versión',
      Descuento: summaryData['Descuento'] ?? 0,
    };
    const totalTax = data['cfdi:Impuestos']['0']['$'] ?? {};
    this.Taxes = {
      Amount: totalTax['TotalImpuestosTrasladados'] ?? 0,
    };

    const receiver = data['cfdi:Receptor']['0']['$'] ?? {};

    this.Receiver = {
      Name: receiver['Nombre'] ?? 'Sin nombre de receptor',
      TaxRegime: receiver['RegimenFiscal'] ?? 'Sin régimen fiscal',
      Rfc: receiver['Rfc'] ?? 'Sin RFC de receptor',
    };

    const issuer = data['cfdi:Emisor']['0']['$'] ?? {};
    this.Issuer = {
      Name: issuer['Nombre'] ?? 'Sin nombre de emisor',
      TaxRegime: issuer['RegimenFiscal'] ?? 'Sin régimen fiscal',
      Rfc: issuer['Rfc'] ?? 'Sin RFC de emisor',
    };

    const complementaryData = data['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$'];
    this.UUID = complementaryData.UUID;
  }

  convertToReceiptType(): ReceiptType {
    const { SubTotal, Total, Descuento } = this.ReceiptSummary;
    const { Amount: TaxAmount } = this.Taxes;
    const { Name: ReceiverName, Rfc: ReceiverRfc } = this.Receiver;
    const { Name: IssuerName, Rfc: IssuerRfc } = this.Issuer;

    return new ReceiptType({
      IssuerName,
      IssuerRfc,
      ReceiverRfc,
      ReceiverName,
      SubTotal: parseFloat(`${SubTotal}`),
      Total: parseFloat(`${Total}`),
      TaxAmount: parseFloat(`${TaxAmount}`),
      UUID: this.UUID,
      Descuento: parseFloat(`${Descuento}`),
    });
  }
}
