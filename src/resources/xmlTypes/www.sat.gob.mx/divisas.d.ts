import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/divisas/divisas.xsd

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

/** Complemento al Comprobante Fiscal Digital (CFD) y Comprobante Fiscal Digital por Internet (CFDI) para identificar las operaciones de compra y  venta de divisas que realizan los centros cambiarios y las casa de cambio; haciendo mención expresa de que los comprobantes se expiden por la “compra”, o bien, por la “venta” de divisas.**/
export interface Divisas extends XastElement {
	type: 'element';
	name: 'Divisas';
	attributes: {
		/** Elemento para definir el tipo de operación realizada. venta o compra de divisas	**/
		tipoOperacion: DivisasTipoOperacion;
		/** Atributo requerido para expresar la versión del complemento de divisas	**/
		version: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Elemento para definir el tipo de operación realizada. venta o compra de divisas**/
export type DivisasTipoOperacion = 'compra' | 'venta';

/** Atributo requerido para expresar la versión del complemento de divisas**/
export interface Version extends XastElement {
	name: 'version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
