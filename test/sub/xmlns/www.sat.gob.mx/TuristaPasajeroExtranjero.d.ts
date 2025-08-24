import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/TuristaPasajeroExtranjero/TuristaPasajeroExtranjero.xsd

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

/** Elemento requerido para expresar la información de la operación realizada**/
export interface TuristaPasajeroExtranjeroDatosTransito extends XastElement {
	type: 'element';
	name: 'datosTransito';
	attributes: {
		/** Atributo requerido para señalar la empresa de transporte que lo ingresa a territorio nacional o lo traslada de salida.	**/
		EmpresaTransporte: string;
		/** Atributo opcional para expresar el identificador del medio de transporte usado, ejemplo: número de vuelo.	**/
		IdTransporte?: string;
		/** Atributo requerido para expresar la nacionalidad del turista.	**/
		Nacionalidad: string;
		/** Atributo requerido para expresar el número de identificación (pasaporte, visa, etc.)	**/
		NumeroId: string;
		/** Atributo requerido para la expresión del número de pasaporte.	**/
		TipoId: string;
		/** Atributo requerido para expresar si es vía “Aérea”, “Marítima” o "Terrestre"	**/
		Via: TuristaPasajeroExtranjeroDatosTransitoVia;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para señalar la empresa de transporte que lo ingresa a territorio nacional o lo traslada de salida.**/
export interface EmpresaTransporte extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para señalar la empresa de transporte que lo ingresa a territorio nacional o lo traslada de salida.**/
export type TuristaPasajeroExtranjeroDatosTransitoEmpresaTransporte = string;

/** Atributo requerido para expresar la fecha y hora del Arribo o Salida del medio de transporte utilizado. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.**/
export interface FechadeTransito extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar la fecha y hora del Arribo o Salida del medio de transporte utilizado. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.**/
export type TuristaPasajeroExtranjeroFechadeTransito = string;

/** Atributo opcional para expresar el identificador del medio de transporte usado, ejemplo: número de vuelo.**/
export interface IdTransporte extends XastElement {
	name: 'IdTransporte';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo requerido para expresar la nacionalidad del turista.
 * @minLength 1
 **/
export interface Nacionalidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar la nacionalidad del turista.
 * @minLength 1
 **/
export type TuristaPasajeroExtranjeroDatosTransitoNacionalidad = string;

/** Atributo requerido para expresar el número de identificación (pasaporte, visa, etc.)
 * @minLength 1
 **/
export interface NumeroId extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de identificación (pasaporte, visa, etc.)
 * @minLength 1
 **/
export type TuristaPasajeroExtranjeroDatosTransitoNumeroId = string;

/** Atributo requerido para la expresión del número de pasaporte.
 * @minLength 1
 **/
export interface TipoId extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para la expresión del número de pasaporte.
 * @minLength 1
 **/
export type TuristaPasajeroExtranjeroDatosTransitoTipoId = string;

/** Atributo requerido para incorporar la operación realizada: Arribo ó Salida.**/
export type TuristaPasajeroExtranjeroTipoTransito = 'Arribo' | 'Salida';

/** Complemento opcional al Comprobante Fiscal Digital (CFD) y Comprobante Fiscal Digital a través de Internet (CFDI) para el manejo de datos de TuristaPasajeroExtranjero.**/
export interface TuristaPasajeroExtranjero extends XastElement {
	type: 'element';
	name: 'TuristaPasajeroExtranjero';
	attributes: {
		/** Atributo requerido para expresar la fecha y hora del Arribo o Salida del medio de transporte utilizado. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.	**/
		/** A date, unknown format **/
		fechadeTransito: string;
		/** Atributo requerido para incorporar la operación realizada: Arribo ó Salida.	**/
		tipoTransito: TuristaPasajeroExtranjeroTipoTransito;
		/** Versión del complemento para TuristaPasajeroExtranjero.	**/
		version: string;
	};
	children: TuristaPasajeroExtranjeroDatosTransito[];
}

/** Versión del complemento para TuristaPasajeroExtranjero.**/
export interface Version extends XastElement {
	name: 'version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo requerido para expresar si es vía “Aérea”, “Marítima” o "Terrestre"**/
export type TuristaPasajeroExtranjeroDatosTransitoVia = 'Aérea' | 'Marítima' | 'Terrestre';
