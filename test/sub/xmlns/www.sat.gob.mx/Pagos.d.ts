import * as Primitive from '../xml-primitives';
import * as catCFDI from './sitio_internet/cfd/catalogos';
import * as catPagos from './sitio_internet/cfd/catalogos/Pagos';
import * as tdCFDI from './sitio_internet/cfd/tipoDatos/tdCFDI';

// Source files:
// http://localhost:56607/sitio_internet/cfd/Pagos/Pagos10.xsd

export interface XastAttributes {
	[name: string]: string | null | undefined;
}

interface XastText {
	type: 'text';
	value: string;
}

interface XastComment {
	type: 'comment';
	value: string;
}

interface XastCData {
	type: 'cdata';
	value: string;
}

interface XastInstruction {
	type: 'instruction';
	name: string;
	value: string;
}

interface FakerXastElement {
	type: 'element';
	name: string;
	attributes?: XastAttributes | undefined;
	children: ({ type: string; name?: string; attributes?: Record<string, any>; children: any[] } | XastText | XastComment | XastInstruction | XastCData)[];
}

interface FakeXastElement {
	type: 'element';
	name: string;
	attributes?: XastAttributes | undefined;
	children: (FakerXastElement | XastText | XastComment | XastInstruction | XastCData)[];
}

export interface XastElement {
	type: 'element';
	name: string;
	attributes?: XastAttributes | undefined;
	children: (FakeXastElement | XastText | XastComment | XastInstruction | XastCData)[];
}

interface XastTextElement extends XastElement {
	children: [XastText];
}

/** Atributo condicional para expresar la cadena original del comprobante de pago generado por la entidad emisora de la cuenta beneficiaria. Es requerido en caso de que el atributo TipoCadPago contenga información.
 * @minLength 1
 * @maxLength 8192
 **/
export interface CadPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 8192
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar la cadena original del comprobante de pago generado por la entidad emisora de la cuenta beneficiaria. Es requerido en caso de que el atributo TipoCadPago contenga información.
 * @minLength 1
 * @maxLength 8192
 **/
export type PagosPagoCadPago = string;

/** Atributo condicional que sirve para incorporar el certificado que ampara al pago, como una cadena de texto en formato base 64. Es requerido en caso de que el atributo TipoCadPago contenga información.**/
export interface CertPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo condicional que sirve para incorporar el certificado que ampara al pago, como una cadena de texto en formato base 64. Es requerido en caso de que el atributo TipoCadPago contenga información.**/
export type PagosPagoCertPago = string;

/** Atributo condicional para incorporar el número de cuenta en donde se recibió el pago. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.
 * @pattern [A-Z0-9_]{10,50}
 * @minLength 10
 * @maxLength 50
 **/
export interface CtaBeneficiario extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z0-9_]{10,50}
			 * @minLength 10
			 * @maxLength 50
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para incorporar el número de cuenta en donde se recibió el pago. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.
 * @pattern [A-Z0-9_]{10,50}
 * @minLength 10
 * @maxLength 50
 **/
export type PagosPagoCtaBeneficiario = string;

/** Atributo condicional para incorporar el número de la cuenta con la que se realizó el pago. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago
 * @pattern [A-Z0-9_]{10,50}
 * @minLength 10
 * @maxLength 50
 **/
export interface CtaOrdenante extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z0-9_]{10,50}
			 * @minLength 10
			 * @maxLength 50
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para incorporar el número de la cuenta con la que se realizó el pago. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago
 * @pattern [A-Z0-9_]{10,50}
 * @minLength 10
 * @maxLength 50
 **/
export type PagosPagoCtaOrdenante = string;

/** Nodo condicional para expresar la lista de documentos relacionados con los pagos diferentes de anticipos. Por cada documento que se relacione se debe generar un nodo DoctoRelacionado.**/
export interface PagosPagoDoctoRelacionado extends XastElement {
	type: 'element';
	name: 'DoctoRelacionado';
	attributes: {
		/** Atributo opcional para precisar el folio del comprobante para control interno del contribuyente, acepta una cadena de caracteres.	**/
		Folio?: string;
		/** Atributo requerido para expresar el identificador del documento relacionado con el pago. Este dato puede ser un Folio Fiscal de la Factura Electrónica o bien el número de operación de un documento digital.	**/
		IdDocumento: string;
		/** Atributo condicional para expresar el importe pagado para el documento relacionado. Es obligatorio cuando exista más de un documento relacionado o cuando existe un documento relacionado y el TipoCambioDR tiene un valor.	**/
		ImpPagado?: string;
		/** Atributo condicional para expresar el monto del saldo insoluto de la parcialidad anterior. Es requerido cuando MetodoDePagoDR contiene: “PPD” Pago en parcialidades o diferido.En el caso de que sea la primer parcialidad este campo debe contener el importe total del documento relacionado.	**/
		ImpSaldoAnt?: string;
		/** Atributo condicional para expresar la diferencia entre el importe del saldo anterior y el monto del pago. Es requerido cuando MetodoDePagoDR contiene: “PPD” Pago en parcialidades o diferido.	**/
		ImpSaldoInsoluto?: string;
		/** Atributo requerido para expresar la clave del método de pago que se registró en el documento relacionado.	**/
		MetodoDePagoDR: catCFDI.CMetodoPago;
		/** Atributo requerido para identificar la clave de la moneda utilizada en los importes del documento relacionado, cuando se usa moneda nacional o el documento relacionado no especifica la moneda se registra MXN. Los importes registrados en los atributos “ImpSaldoAnt”, “ImpPagado” e “ImpSaldoInsoluto” de éste nodo, deben corresponder a esta moneda. Conforme con la especificación ISO 4217.	**/
		MonedaDR: catCFDI.CMoneda;
		/** Atributo condicional para expresar el número de parcialidad que corresponde al pago. Es requerido cuando MetodoDePagoDR contiene: “PPD” Pago en parcialidades o diferido.	**/
		NumParcialidad?: string;
		/** Atributo opcional para precisar la serie del comprobante para control interno del contribuyente, acepta una cadena de caracteres.	**/
		Serie?: string;
		/** Atributo condicional para expresar el tipo de cambio conforme con la moneda registrada en el documento relacionado. Es requerido cuando la moneda del documento relacionado es distinta de la moneda de pago. Se debe registrar el número de unidades de la moneda señalada en el documento relacionado que equivalen a una unidad de la moneda del pago. Por ejemplo: El documento relacionado se registra en USD El pago se realiza por 100 EUR. Este atributo se registra como 1.114700 USD/EUR. El importe pagado equivale a 100 EUR * 1.114700 USD/EUR = 111.47 USD.	**/
		TipoCambioDR?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Tipo definido para la expresión de la fecha y hora. Se expresa en la forma AAAA-MM-DDThh:mm:ss
 * @pattern (20[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
 **/
export interface FechaPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern (20[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
			 **/
			value: string;
		},
	];
}
/** Tipo definido para la expresión de la fecha y hora. Se expresa en la forma AAAA-MM-DDThh:mm:ss
 * @pattern (20[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
 **/
export type TFechaH = string;

/** Atributo opcional para precisar el folio del comprobante para control interno del contribuyente, acepta una cadena de caracteres.
 * @pattern [^|]{1,40}
 * @minLength 1
 * @maxLength 40
 **/
export interface Folio extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,40}
			 * @minLength 1
			 * @maxLength 40
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para precisar el folio del comprobante para control interno del contribuyente, acepta una cadena de caracteres.
 * @pattern [^|]{1,40}
 * @minLength 1
 * @maxLength 40
 **/
export type PagosPagoDoctoRelacionadoFolio = string;

/** Atributo requerido para expresar la clave de la forma en que se realiza el pago.**/
export type CFormaPago = '01' | '02' | '03' | '04' | '05' | '06' | '08' | '12' | '13' | '14' | '15' | '17' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '99';

/** Atributo requerido para expresar el identificador del documento relacionado con el pago. Este dato puede ser un Folio Fiscal de la Factura Electrónica o bien el número de operación de un documento digital.
 * @pattern ([a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12})|([0-9]{3}-[0-9]{2}-[0-9]{9})
 * @minLength 16
 * @maxLength 36
 **/
export interface IdDocumento extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern ([a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12})|([0-9]{3}-[0-9]{2}-[0-9]{9})
			 * @minLength 16
			 * @maxLength 36
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el identificador del documento relacionado con el pago. Este dato puede ser un Folio Fiscal de la Factura Electrónica o bien el número de operación de un documento digital.
 * @pattern ([a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12})|([0-9]{3}-[0-9]{2}-[0-9]{9})
 * @minLength 16
 * @maxLength 36
 **/
export type PagosPagoDoctoRelacionadoIdDocumento = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface Importe extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
			 * @maxInclusive 0.000000
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export type TImporte = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface ImpPagado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
			 * @maxInclusive 0.000000
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface ImpSaldoAnt extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
			 * @maxInclusive 0.000000
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface ImpSaldoInsoluto extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
			 * @maxInclusive 0.000000
			 **/
			value: string;
		},
	];
}

/** Atributo requerido para señalar la clave del tipo de impuesto retenido.**/
export type CImpuesto = '001' | '002' | '003';

/** Nodo condicional para expresar el resumen de los impuestos aplicables cuando este documento sea un anticipo.**/
export interface PagosPagoImpuestos extends XastElement {
	type: 'element';
	name: 'Impuestos';
	attributes: {
		/** Atributo condicional para expresar el total de los impuestos retenidos que se desprenden del pago. No se permiten valores negativos.	**/
		TotalImpuestosRetenidos?: string;
		/** Atributo condicional para expresar el total de los impuestos trasladados que se desprenden del pago. No se permiten valores negativos.	**/
		TotalImpuestosTrasladados?: string;
	};
	children: (PagosPagoImpuestosRetenciones | PagosPagoImpuestosTraslados)[];
}

/** Atributo requerido para expresar la clave del método de pago que se registró en el documento relacionado.**/
export type CMetodoPago = 'PUE' | 'PPD';

/** Atributo requerido para identificar la clave de la moneda utilizada en los importes del documento relacionado, cuando se usa moneda nacional o el documento relacionado no especifica la moneda se registra MXN. Los importes registrados en los atributos “ImpSaldoAnt”, “ImpPagado” e “ImpSaldoInsoluto” de éste nodo, deben corresponder a esta moneda. Conforme con la especificación ISO 4217.**/
export type CMoneda =
	| 'AED'
	| 'AFN'
	| 'ALL'
	| 'AMD'
	| 'ANG'
	| 'AOA'
	| 'ARS'
	| 'AUD'
	| 'AWG'
	| 'AZN'
	| 'BAM'
	| 'BBD'
	| 'BDT'
	| 'BGN'
	| 'BHD'
	| 'BIF'
	| 'BMD'
	| 'BND'
	| 'BOB'
	| 'BOV'
	| 'BRL'
	| 'BSD'
	| 'BTN'
	| 'BWP'
	| 'BYR'
	| 'BZD'
	| 'CAD'
	| 'CDF'
	| 'CHE'
	| 'CHF'
	| 'CHW'
	| 'CLF'
	| 'CLP'
	| 'CNH'
	| 'CNY'
	| 'COP'
	| 'COU'
	| 'CRC'
	| 'CUC'
	| 'CUP'
	| 'CVE'
	| 'CZK'
	| 'DJF'
	| 'DKK'
	| 'DOP'
	| 'DZD'
	| 'EGP'
	| 'ERN'
	| 'ESD'
	| 'ETB'
	| 'EUR'
	| 'FJD'
	| 'FKP'
	| 'GBP'
	| 'GEL'
	| 'GHS'
	| 'GIP'
	| 'GMD'
	| 'GNF'
	| 'GTQ'
	| 'GYD'
	| 'HKD'
	| 'HNL'
	| 'HRK'
	| 'HTG'
	| 'HUF'
	| 'IDR'
	| 'ILS'
	| 'INR'
	| 'IQD'
	| 'IRR'
	| 'ISK'
	| 'JMD'
	| 'JOD'
	| 'JPY'
	| 'KES'
	| 'KGS'
	| 'KHR'
	| 'KMF'
	| 'KPW'
	| 'KRW'
	| 'KWD'
	| 'KYD'
	| 'KZT'
	| 'LAK'
	| 'LBP'
	| 'LKR'
	| 'LRD'
	| 'LSL'
	| 'LYD'
	| 'MAD'
	| 'MDL'
	| 'MGA'
	| 'MKD'
	| 'MMK'
	| 'MNT'
	| 'MOP'
	| 'MRO'
	| 'MUR'
	| 'MVR'
	| 'MWK'
	| 'MXN'
	| 'MXV'
	| 'MYR'
	| 'MZN'
	| 'NAD'
	| 'NGN'
	| 'NIC'
	| 'NIO'
	| 'NOK'
	| 'NPR'
	| 'NZD'
	| 'OMR'
	| 'PAB'
	| 'PEN'
	| 'PGK'
	| 'PHP'
	| 'PKR'
	| 'PLN'
	| 'PYG'
	| 'QAR'
	| 'RON'
	| 'RSD'
	| 'RUB'
	| 'RWF'
	| 'SAR'
	| 'SBD'
	| 'SCR'
	| 'SDG'
	| 'SEK'
	| 'SGD'
	| 'SHP'
	| 'SLL'
	| 'SOS'
	| 'SRD'
	| 'SSP'
	| 'STD'
	| 'SVC'
	| 'SYP'
	| 'SZL'
	| 'THB'
	| 'TJS'
	| 'TMT'
	| 'TND'
	| 'TOP'
	| 'TRY'
	| 'TTD'
	| 'TWD'
	| 'TZS'
	| 'UAH'
	| 'UGX'
	| 'USD'
	| 'USN'
	| 'UYI'
	| 'UYP'
	| 'UYU'
	| 'UZS'
	| 'VEF'
	| 'VES'
	| 'VND'
	| 'VUV'
	| 'WST'
	| 'XAF'
	| 'XAG'
	| 'XAU'
	| 'XBA'
	| 'XBB'
	| 'XBC'
	| 'XBD'
	| 'XCD'
	| 'XDR'
	| 'XOF'
	| 'XPD'
	| 'XPF'
	| 'XPT'
	| 'XSU'
	| 'XTS'
	| 'XUA'
	| 'XXX'
	| 'YER'
	| 'ZAR'
	| 'ZMW'
	| 'ZWL';

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface Monto extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
			 * @maxInclusive 0.000000
			 **/
			value: string;
		},
	];
}

/** Atributo condicional para expresar el nombre del banco ordenante, es requerido en caso de ser extranjero. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.
 * @pattern [^|]{1,300}
 * @minLength 1
 * @maxLength 300
 **/
export interface NomBancoOrdExt extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,300}
			 * @minLength 1
			 * @maxLength 300
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el nombre del banco ordenante, es requerido en caso de ser extranjero. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.
 * @pattern [^|]{1,300}
 * @minLength 1
 * @maxLength 300
 **/
export type PagosPagoNomBancoOrdExt = string;

/** Atributo condicional para expresar el número de cheque, número de autorización, número de referencia, clave de rastreo en caso de ser SPEI, línea de captura o algún número de referencia análogo que identifique la operación que ampara el pago efectuado
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export interface NumOperacion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,100}
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el número de cheque, número de autorización, número de referencia, clave de rastreo en caso de ser SPEI, línea de captura o algún número de referencia análogo que identifique la operación que ampara el pago efectuado
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export type PagosPagoNumOperacion = string;

/** Atributo condicional para expresar el número de parcialidad que corresponde al pago. Es requerido cuando MetodoDePagoDR contiene: “PPD” Pago en parcialidades o diferido.
 * @pattern [1-9][0-9]{0,2}
 **/
export interface NumParcialidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [1-9][0-9]{0,2}
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el número de parcialidad que corresponde al pago. Es requerido cuando MetodoDePagoDR contiene: “PPD” Pago en parcialidades o diferido.
 * @pattern [1-9][0-9]{0,2}
 **/
export type PagosPagoDoctoRelacionadoNumParcialidad = string;

/** Elemento requerido para incorporar la información de la recepción de pagos.**/
export interface PagosPago extends XastElement {
	type: 'element';
	name: 'Pago';
	attributes: {
		/** Atributo condicional para expresar la cadena original del comprobante de pago generado por la entidad emisora de la cuenta beneficiaria. Es requerido en caso de que el atributo TipoCadPago contenga información.	**/
		CadPago?: string;
		/** Atributo condicional que sirve para incorporar el certificado que ampara al pago, como una cadena de texto en formato base 64. Es requerido en caso de que el atributo TipoCadPago contenga información.	**/
		CertPago?: string;
		/** Atributo condicional para incorporar el número de cuenta en donde se recibió el pago. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.	**/
		CtaBeneficiario?: string;
		/** Atributo condicional para incorporar el número de la cuenta con la que se realizó el pago. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago	**/
		CtaOrdenante?: string;
		/** Atributo requerido para expresar la fecha y hora en la que el beneficiario recibe el pago. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.En caso de no contar con la hora se debe registrar 12:00:00.	**/
		/** A date, unknown format **/
		FechaPago: string;
		/** Atributo requerido para expresar la clave de la forma en que se realiza el pago.	**/
		FormaDePagoP: catCFDI.CFormaPago;
		/** Atributo requerido para identificar la clave de la moneda utilizada para realizar el pago, cuando se usa moneda nacional se registra MXN. El atributo Pagos:Pago:Monto y los atributos TotalImpuestosRetenidos, TotalImpuestosTrasladados, Traslados:Traslado:Importe y Retenciones:Retencion:Importe del nodo Pago:Impuestos deben ser expresados en esta moneda. Conforme con la especificación ISO 4217.	**/
		MonedaP: catCFDI.CMoneda;
		/** Atributo requerido para expresar el importe del pago.	**/
		Monto: string;
		/** Atributo condicional para expresar el nombre del banco ordenante, es requerido en caso de ser extranjero. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.	**/
		NomBancoOrdExt?: string;
		/** Atributo condicional para expresar el número de cheque, número de autorización, número de referencia, clave de rastreo en caso de ser SPEI, línea de captura o algún número de referencia análogo que identifique la operación que ampara el pago efectuado	**/
		NumOperacion?: string;
		/** Atributo condicional para expresar la clave RFC de la entidad operadora de la cuenta destino, es decir, la operadora, el banco, la institución financiera, emisor de monedero electrónico, etc. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.	**/
		RfcEmisorCtaBen?: string;
		/** Atributo condicional para expresar la clave RFC de la entidad emisora de la cuenta origen, es decir, la operadora, el banco, la institución financiera, emisor de monedero electrónico, etc., en caso de ser extranjero colocar XEXX010101000, considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.	**/
		RfcEmisorCtaOrd?: string;
		/** Atributo condicional para integrar el sello digital que se asocie al pago. La entidad que emite el comprobante de pago, ingresa una cadena original y el sello digital en una sección de dicho comprobante, este sello digital es el que se debe registrar en este campo. Debe ser expresado como una cadena de texto en formato base 64. Es requerido en caso de que el atributo TipoCadPago contenga información.	**/
		SelloPago?: string;
		/** Atributo condicional para identificar la clave del tipo de cadena de pago que genera la entidad receptora del pago. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.	**/
		TipoCadPago?: catPagos.CTipoCadenaPago;
		/** Atributo condicional para expresar el tipo de cambio de la moneda a la fecha en que se realizó el pago. El valor debe reflejar el número de pesos mexicanos que equivalen a una unidad de la divisa señalada en el atributo MonedaP. Es requerido cuando el atributo MonedaP es diferente a MXN.	**/
		TipoCambioP?: string;
	};
	children: (PagosPagoDoctoRelacionado | PagosPagoImpuestos)[];
}

/** Complemento para el Comprobante Fiscal Digital por Internet (CFDI) para registrar información sobre la recepción de pagos. El emisor de este complemento para recepción de pagos debe ser quien las leyes le obligue a expedir comprobantes por los actos o actividades que realicen, por los ingresos que se perciban o por las retenciones de contribuciones que efectúen.**/
export interface Pagos extends XastElement {
	type: 'element';
	name: 'Pagos';
	attributes: {
		/** Atributo requerido que indica la versión del complemento para recepción de pagos.	**/
		Version: string;
	};
	children: PagosPago[];
}

/** Nodo requerido para registrar la información detallada de una retención de impuesto específico.**/
export interface PagosPagoImpuestosRetencionesRetencion extends XastElement {
	type: 'element';
	name: 'Retencion';
	attributes: {
		/** Atributo requerido para señalar el importe o monto del impuesto retenido. No se permiten valores negativos.	**/
		Importe: string;
		/** Atributo requerido para señalar la clave del tipo de impuesto retenido.	**/
		Impuesto: catCFDI.CImpuesto;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo condicional para capturar los impuestos retenidos aplicables.**/
export interface PagosPagoImpuestosRetenciones extends XastElement {
	type: 'element';
	name: 'Retenciones';
	children: PagosPagoImpuestosRetencionesRetencion[];
}

/** Tipo definido para la expresión de un Registro Federal de Contribuyentes de persona moral.
 * @pattern [A-Z&Ñ]{3}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 **/
export interface RfcEmisorCtaBen extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z&Ñ]{3}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
			 * @minLength 12
			 **/
			value: string;
		},
	];
}
/** Tipo definido para la expresión de un Registro Federal de Contribuyentes de persona moral.
 * @pattern [A-Z&Ñ]{3}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 **/
export type TRFCPM = string;

/** Atributo condicional para expresar la clave RFC de la entidad emisora de la cuenta origen, es decir, la operadora, el banco, la institución financiera, emisor de monedero electrónico, etc., en caso de ser extranjero colocar XEXX010101000, considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.
 * @pattern XEXX010101000|[A-Z&Ñ]{3}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export interface RfcEmisorCtaOrd extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern XEXX010101000|[A-Z&Ñ]{3}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
			 * @minLength 12
			 * @maxLength 13
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar la clave RFC de la entidad emisora de la cuenta origen, es decir, la operadora, el banco, la institución financiera, emisor de monedero electrónico, etc., en caso de ser extranjero colocar XEXX010101000, considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.
 * @pattern XEXX010101000|[A-Z&Ñ]{3}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export type PagosPagoRfcEmisorCtaOrd = string;

/** Atributo condicional para integrar el sello digital que se asocie al pago. La entidad que emite el comprobante de pago, ingresa una cadena original y el sello digital en una sección de dicho comprobante, este sello digital es el que se debe registrar en este campo. Debe ser expresado como una cadena de texto en formato base 64. Es requerido en caso de que el atributo TipoCadPago contenga información.**/
export interface SelloPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo condicional para integrar el sello digital que se asocie al pago. La entidad que emite el comprobante de pago, ingresa una cadena original y el sello digital en una sección de dicho comprobante, este sello digital es el que se debe registrar en este campo. Debe ser expresado como una cadena de texto en formato base 64. Es requerido en caso de que el atributo TipoCadPago contenga información.**/
export type PagosPagoSelloPago = string;

/** Atributo opcional para precisar la serie del comprobante para control interno del contribuyente, acepta una cadena de caracteres.
 * @pattern [^|]{1,25}
 * @minLength 1
 * @maxLength 25
 **/
export interface Serie extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,25}
			 * @minLength 1
			 * @maxLength 25
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para precisar la serie del comprobante para control interno del contribuyente, acepta una cadena de caracteres.
 * @pattern [^|]{1,25}
 * @minLength 1
 * @maxLength 25
 **/
export type PagosPagoDoctoRelacionadoSerie = string;

/** Atributo requerido para señalar el valor de la tasa o cuota del impuesto que se traslada.
 * @maxInclusive 0.000000
 **/
export interface TasaOCuota extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.000000
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para señalar el valor de la tasa o cuota del impuesto que se traslada.
 * @maxInclusive 0.000000
 **/
export type PagosPagoImpuestosTrasladosTrasladoTasaOCuota = string;

/** Atributo condicional para identificar la clave del tipo de cadena de pago que genera la entidad receptora del pago. Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago.**/
export type CTipoCadenaPago = '01';

/** Atributo condicional para expresar el tipo de cambio conforme con la moneda registrada en el documento relacionado. Es requerido cuando la moneda del documento relacionado es distinta de la moneda de pago. Se debe registrar el número de unidades de la moneda señalada en el documento relacionado que equivalen a una unidad de la moneda del pago. Por ejemplo: El documento relacionado se registra en USD El pago se realiza por 100 EUR. Este atributo se registra como 1.114700 USD/EUR. El importe pagado equivale a 100 EUR * 1.114700 USD/EUR = 111.47 USD.
 * @maxInclusive 0.000001
 **/
export interface TipoCambioDR extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.000001
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el tipo de cambio conforme con la moneda registrada en el documento relacionado. Es requerido cuando la moneda del documento relacionado es distinta de la moneda de pago. Se debe registrar el número de unidades de la moneda señalada en el documento relacionado que equivalen a una unidad de la moneda del pago. Por ejemplo: El documento relacionado se registra en USD El pago se realiza por 100 EUR. Este atributo se registra como 1.114700 USD/EUR. El importe pagado equivale a 100 EUR * 1.114700 USD/EUR = 111.47 USD.
 * @maxInclusive 0.000001
 **/
export type PagosPagoDoctoRelacionadoTipoCambioDR = string;

/** Atributo condicional para expresar el tipo de cambio de la moneda a la fecha en que se realizó el pago. El valor debe reflejar el número de pesos mexicanos que equivalen a una unidad de la divisa señalada en el atributo MonedaP. Es requerido cuando el atributo MonedaP es diferente a MXN.
 * @maxInclusive 0.000001
 **/
export interface TipoCambioP extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.000001
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el tipo de cambio de la moneda a la fecha en que se realizó el pago. El valor debe reflejar el número de pesos mexicanos que equivalen a una unidad de la divisa señalada en el atributo MonedaP. Es requerido cuando el atributo MonedaP es diferente a MXN.
 * @maxInclusive 0.000001
 **/
export type PagosPagoTipoCambioP = string;

/** Atributo requerido para señalar la clave del tipo de factor que se aplica a la base del impuesto.**/
export type CTipoFactor = 'Tasa' | 'Cuota' | 'Exento';

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface TotalImpuestosRetenidos extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
			 * @maxInclusive 0.000000
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface TotalImpuestosTrasladados extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
			 * @maxInclusive 0.000000
			 **/
			value: string;
		},
	];
}

/** Nodo requerido para la información detallada de un traslado de impuesto específico.**/
export interface PagosPagoImpuestosTrasladosTraslado extends XastElement {
	type: 'element';
	name: 'Traslado';
	attributes: {
		/** Atributo requerido para señalar el importe del impuesto trasladado. No se permiten valores negativos.	**/
		Importe: string;
		/** Atributo requerido para señalar la clave del tipo de impuesto trasladado.	**/
		Impuesto: catCFDI.CImpuesto;
		/** Atributo requerido para señalar el valor de la tasa o cuota del impuesto que se traslada.	**/
		TasaOCuota: string;
		/** Atributo requerido para señalar la clave del tipo de factor que se aplica a la base del impuesto.	**/
		TipoFactor: catCFDI.CTipoFactor;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo condicional para capturar los impuestos trasladados aplicables.**/
export interface PagosPagoImpuestosTraslados extends XastElement {
	type: 'element';
	name: 'Traslados';
	children: PagosPagoImpuestosTrasladosTraslado[];
}

/** Atributo requerido que indica la versión del complemento para recepción de pagos.**/
export interface Version extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido que indica la versión del complemento para recepción de pagos.**/
export type PagosVersion = string;
