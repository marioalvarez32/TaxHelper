import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/cfdiregistrofiscal/cfdiregistrofiscal.xsd

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

/** Complemento para incluir los datos de identificación de los CFDIs generados en Registro Fiscal.**/
export interface CFDIRegistroFiscal extends XastElement {
	type: 'element';
	name: 'CFDIRegistroFiscal';
	attributes: {
		/** Atributo requerido para expresar la relación del CFDI con el Registro Fiscal.	**/
		Folio: string;
		/** Atributo requerido que indica la versión del complemento CFDI Registro Fiscal.	**/
		Version: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para expresar la relación del CFDI con el Registro Fiscal.
 * @pattern [0-9]{16}
 **/
export interface Folio extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{16}
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar la relación del CFDI con el Registro Fiscal.
 * @pattern [0-9]{16}
 **/
export type CFDIRegistroFiscalFolio = string;

/** Atributo requerido que indica la versión del complemento CFDI Registro Fiscal.**/
export interface Version extends XastElement {
	name: 'Version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
