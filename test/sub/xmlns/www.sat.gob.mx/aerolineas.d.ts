import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/aerolineas/aerolineas.xsd

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

/** Complemento al Comprobante Fiscal Digital a través de Internet (CFDI) para el manejo de datos de Aerolíneas para pasajeros.**/
export interface Aerolineas extends XastElement {
	type: 'element';
	name: 'Aerolineas';
	attributes: {
		/** Atributo requerido para indicar el importe del TUA aplicable al boleto.	**/
		TUA: string;
		/** Atributo requerido para la expresión de la versión del complemento	**/
		Version: string;
	};
	children: AerolineasOtrosCargos[];
}

/** Nodo para expresar la información detallada de un cargo.**/
export interface AerolineasOtrosCargosCargo extends XastElement {
	type: 'element';
	name: 'Cargo';
	attributes: {
		/** Atributo requerido para indicar el código del cargo según el catálogo de la IATA.	**/
		CodigoCargo: string;
		/** Atributo requerido para representar el importe del cargo.	**/
		Importe: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para indicar el código del cargo según el catálogo de la IATA.
 * @minLength 1
 * @maxLength 8
 **/
export interface CodigoCargo extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 8
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para indicar el código del cargo según el catálogo de la IATA.
 * @minLength 1
 * @maxLength 8
 **/
export type AerolineasOtrosCargosCargoCodigoCargo = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface Importe extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export type TImporte = string;

/** Nodo opcional para expresar otros cargos aplicables**/
export interface AerolineasOtrosCargos extends XastElement {
	type: 'element';
	name: 'OtrosCargos';
	attributes: {
		/** Atributo requerido para expresar el total de los cargos adicionales que se están aplicando.	**/
		TotalCargos: string;
	};
	children: AerolineasOtrosCargosCargo[];
}

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface TotalCargos extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface TUA extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo requerido para la expresión de la versión del complemento**/
export interface Version extends XastElement {
	name: 'Version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
