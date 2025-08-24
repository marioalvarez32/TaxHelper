import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/leyendasFiscales/leyendasFisc.xsd

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

/** Atributo opcional para especificar la Ley, Resolución o Disposición fiscal que regula la leyenda, deberá expresarse en siglas de mayúsculas y sin puntuación (p. ej: ISR)
 * @minLength 1
 **/
export interface DisposicionFiscal extends XastElement {
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
/** Atributo opcional para especificar la Ley, Resolución o Disposición fiscal que regula la leyenda, deberá expresarse en siglas de mayúsculas y sin puntuación (p. ej: ISR)
 * @minLength 1
 **/
export type LeyendasFiscalesLeyendaDisposicionFiscal = string;

/** Nodo para expresar la(s) leyenda(s) fiscal(es) que apliquen al comprobante**/
export interface LeyendasFiscalesLeyenda extends XastElement {
	type: 'element';
	name: 'Leyenda';
	attributes: {
		/** Atributo opcional para especificar la Ley, Resolución o Disposición fiscal que regula la leyenda, deberá expresarse en siglas de mayúsculas y sin puntuación (p. ej: ISR)	**/
		disposicionFiscal: string;
		/** Atributo opcional para especificar el número de Artículo o en su caso Regla que regula la obligación de la leyenda	**/
		norma: string;
		/** Atributo requerido para especificar la leyenda fiscal	**/
		textoLeyenda: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para incluir leyendas previstas en disposiciones fiscales, distintas a las contenidas en el estándar de Comprobante Fiscal Digital (CFD) o Comprobante Fiscal Digital a través de Internet (CFDI).**/
export interface LeyendasFiscales extends XastElement {
	type: 'element';
	name: 'LeyendasFiscales';
	attributes: {
		/** Atributo requerido para expresar la versión del complemento de Leyendas Fiscales	**/
		version: string;
	};
	children: LeyendasFiscalesLeyenda[];
}

/** Atributo opcional para especificar el número de Artículo o en su caso Regla que regula la obligación de la leyenda
 * @minLength 1
 **/
export interface Norma extends XastElement {
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
/** Atributo opcional para especificar el número de Artículo o en su caso Regla que regula la obligación de la leyenda
 * @minLength 1
 **/
export type LeyendasFiscalesLeyendaNorma = string;

/** Atributo requerido para especificar la leyenda fiscal
 * @minLength 1
 **/
export interface TextoLeyenda extends XastElement {
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
/** Atributo requerido para especificar la leyenda fiscal
 * @minLength 1
 **/
export type LeyendasFiscalesLeyendaTextoLeyenda = string;

/** Atributo requerido para expresar la versión del complemento de Leyendas Fiscales**/
export interface Version extends XastElement {
	name: 'version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
