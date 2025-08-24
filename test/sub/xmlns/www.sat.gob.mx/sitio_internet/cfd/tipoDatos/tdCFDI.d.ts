import * as Primitive from '../../../../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/tipoDatos/tdCFDI/tdCFDI.xsd

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

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface TImporte extends XastElement {
	name: 'number';
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

/** Tipo definido para la expresión de la fecha y hora. Se expresa en la forma AAAA-MM-DDThh:mm:ss
 * @pattern (20[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
 **/
export type TFechaH = Date;

/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export interface TRFC extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
			 * @minLength 12
			 * @maxLength 13
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar la Clave Única de Registro de Población (CURP)
 * @pattern [A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MHX]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]
 **/
export interface TCURP extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MHX]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]
			 **/
			value: string;
		},
	];
}

/** Tipo definido para la expresión de la fecha. Se expresa en la forma AAAA-MM-DD.
 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
 **/
export type TFecha = Date;

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TImporteMXN extends XastElement {
	name: 'number';
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar la cuenta bancarizada.
 * @pattern [0-9]{10,18}
 **/
export interface TCuentaBancaria extends XastElement {
	name: 'number';
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{10,18}
			 **/
			value: string;
		},
	];
}

/** Tipo definido para la expresión de un Registro Federal de Contribuyentes de persona moral.
 * @pattern [A-Z&Ñ]{3}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 **/
export interface TRFCPM extends XastElement {
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

/** Tipo definido para la expresión de un Registro Federal de Contribuyentes de persona física.
 * @pattern [A-Z&Ñ]{4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 13
 **/
export interface TRFCPF extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z&Ñ]{4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
			 * @minLength 13
			 **/
			value: string;
		},
	];
}

/** Tipo definido para la expresión de la fecha y hora. Se expresa en la forma AAAA-MM-DDThh:mm:ss
 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
 **/
export type TFechaHora = Date;

/** Tipo definido para expresar la calle en que está ubicado el domicilio del emisor del comprobante o del destinatario de la mercancía.
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export interface TDescrip100 extends XastElement {
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

/** Tipo definido para expresar el número interior o el número exterior en donde se ubica el domicilio del emisor del comprobante o del destinatario de la mercancía.
 * @pattern [^|]{1,55}
 * @minLength 1
 * @maxLength 55
 **/
export interface TNumeroDomicilio extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,55}
			 * @minLength 1
			 * @maxLength 55
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar la referencia geográfica adicional que permita una  fácil o precisa ubicación del domicilio del emisor del comprobante o del destinatario de la mercancía, por ejemplo las coordenadas GPS.
 * @pattern [^|]{1,250}
 * @minLength 1
 * @maxLength 250
 **/
export interface TReferencia extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,250}
			 * @minLength 1
			 * @maxLength 250
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar la colonia, localidad o municipio en que está ubicado el domicilio del emisor del comprobante o del destinatario de la mercancía.
 * @pattern [^|]{1,120}
 * @minLength 1
 * @maxLength 120
 **/
export interface TDescrip120 extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,120}
			 * @minLength 1
			 * @maxLength 120
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar el tipo de cambio. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.00
 **/
export interface TTipoCambio extends XastElement {
	name: 'number';
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}
