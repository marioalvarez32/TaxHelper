import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/implocal/implocal.xsd

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

/** Nombre del impuesto local retenido**/
export interface ImpLocRetenido extends XastElement {
	name: 'ImpLocRetenido';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nombre del impuesto local trasladado**/
export interface ImpLocTrasladado extends XastElement {
	name: 'ImpLocTrasladado';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Monto del impuesto local retenido**/
export interface Importe extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Monto del impuesto local retenido**/
export type ImpuestosLocalesRetencionesLocalesImporte = string;

/** Monto del impuesto local trasladado**/
export type ImpuestosLocalesTrasladosLocalesImporte = string;

/** Complemento al Comprobante Fiscal Digital para Impuestos Locales**/
export interface ImpuestosLocales extends XastElement {
	type: 'element';
	name: 'ImpuestosLocales';
	attributes: {
		/** Atributo requerido para expresar la suma total de Retenciones aplicables	**/
		TotaldeRetenciones: string;
		/** Atributo requerido para expresar la suma total de traslados aplicables	**/
		TotaldeTraslados: string;
	};
	children: (ImpuestosLocalesRetencionesLocales | ImpuestosLocalesTrasladosLocales)[];
}

/** Nodo opcional para la expresión de los impuestos locales retenidos**/
export interface ImpuestosLocalesRetencionesLocales extends XastElement {
	type: 'element';
	name: 'RetencionesLocales';
	attributes: {
		/** Nombre del impuesto local retenido	**/
		ImpLocRetenido: string;
		/** Monto del impuesto local retenido	**/
		Importe: string;
		/** Porcentaje de retención del impuesto local	**/
		TasadeRetencion: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Porcentaje de retención del impuesto local**/
export interface TasadeRetencion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Porcentaje de retención del impuesto local**/
export type ImpuestosLocalesRetencionesLocalesTasadeRetencion = string;

/** Porcentaje de traslado del impuesto local**/
export interface TasadeTraslado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Porcentaje de traslado del impuesto local**/
export type ImpuestosLocalesTrasladosLocalesTasadeTraslado = string;

/** Atributo requerido para expresar la suma total de Retenciones aplicables**/
export interface TotaldeRetenciones extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar la suma total de Retenciones aplicables**/
export type ImpuestosLocalesTotaldeRetenciones = string;

/** Atributo requerido para expresar la suma total de traslados aplicables**/
export interface TotaldeTraslados extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar la suma total de traslados aplicables**/
export type ImpuestosLocalesTotaldeTraslados = string;

/** Nodo opcional para la expresión de los impuestos locales trasladados**/
export interface ImpuestosLocalesTrasladosLocales extends XastElement {
	type: 'element';
	name: 'TrasladosLocales';
	attributes: {
		/** Nombre del impuesto local trasladado	**/
		ImpLocTrasladado: string;
		/** Monto del impuesto local trasladado	**/
		Importe: string;
		/** Porcentaje de traslado del impuesto local	**/
		TasadeTraslado: string;
	};
	/** XastElement is self-closing */
	children: [];
}
