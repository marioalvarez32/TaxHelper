import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigital.xsd

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

/** Atributo requerido para expresar la fecha y hora de la generación del timbre**/
export interface FechaTimbrado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar la fecha y hora de la generación del timbre**/
export type TimbreFiscalDigitalFechaTimbrado = string;

/** Atributo requerido para expresar el número de serie del certificado del SAT usado para el Timbre**/
export interface NoCertificadoSAT extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de serie del certificado del SAT usado para el Timbre**/
export type TimbreFiscalDigitalNoCertificadoSAT = string;

/** Atributo requerido para contener el sello digital del comprobante fiscal, que será timbrado. El sello deberá ser expresado cómo una cadena de texto en formato Base 64.**/
export interface SelloCFD extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para contener el sello digital del comprobante fiscal, que será timbrado. El sello deberá ser expresado cómo una cadena de texto en formato Base 64.**/
export type TimbreFiscalDigitalSelloCFD = string;

/** Atributo requerido para contener el sello digital del Timbre Fiscal Digital, al que hacen referencia las reglas de resolución miscelánea aplicable. El sello deberá ser expresado cómo una cadena de texto en formato Base 64.**/
export interface SelloSAT extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para contener el sello digital del Timbre Fiscal Digital, al que hacen referencia las reglas de resolución miscelánea aplicable. El sello deberá ser expresado cómo una cadena de texto en formato Base 64.**/
export type TimbreFiscalDigitalSelloSAT = string;

/** Complemento requerido para el Timbrado Fiscal Digital que da valides a un Comprobante Fiscal Digital.**/
export interface TimbreFiscalDigital extends XastElement {
	type: 'element';
	name: 'TimbreFiscalDigital';
	attributes: {
		/** Atributo requerido para expresar la fecha y hora de la generación del timbre	**/
		/** A date, unknown format **/
		FechaTimbrado: string;
		/** Atributo requerido para expresar el número de serie del certificado del SAT usado para el Timbre	**/
		noCertificadoSAT: string;
		/** Atributo requerido para contener el sello digital del comprobante fiscal, que será timbrado. El sello deberá ser expresado cómo una cadena de texto en formato Base 64.	**/
		selloCFD: string;
		/** Atributo requerido para contener el sello digital del Timbre Fiscal Digital, al que hacen referencia las reglas de resolución miscelánea aplicable. El sello deberá ser expresado cómo una cadena de texto en formato Base 64.	**/
		selloSAT: string;
		/** Atributo requerido para expresar los 36 caracteres del UUID de la transacción de timbrado	**/
		UUID: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para expresar los 36 caracteres del UUID de la transacción de timbrado
 * @pattern [a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}
 **/
export interface UUID extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar los 36 caracteres del UUID de la transacción de timbrado
 * @pattern [a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}
 **/
export type TimbreFiscalDigitalUUID = string;
