import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/arteantiguedades/obrasarteantiguedades.xsd

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

export type CTipoBien = '01' | '02' | '03' | '04';
interface _CTipoBien extends Primitive._String {
	content: CTipoBien;
}

export type CTituloadquirido = '01' | '02' | '03' | '04' | '05';
interface _CTituloadquirido extends Primitive._String {
	content: CTituloadquirido;
}

export type CCaractersticasDeObraoPieza = '01' | '02' | '03' | '04' | '05' | '06' | '07';
interface _CCaractersticasDeObraoPieza extends Primitive._String {
	content: CCaractersticasDeObraoPieza;
}

/** Atributo requerido para expresar las características de la obra o pieza de arte plástica o antigüedades de conformidad con el Catálogo publicado en el portal del SAT en Internet.**/
export interface CaractersticasDeObraoPieza extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar las características de la obra o pieza de arte plástica o antigüedades de conformidad con el Catálogo publicado en el portal del SAT en Internet.**/
export type ObrasarteantiguedadesCaractersticasDeObraoPieza = string;

/** Atributo requerido que indica la fecha en que se adquirió originalmente la obra de arte plástica o antigüedades.**/
export interface FechaAdquisicion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido que indica la fecha en que se adquirió originalmente la obra de arte plástica o antigüedades.**/
export type ObrasarteantiguedadesFechaAdquisicion = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales
 **/
export interface IVA extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales
 **/
export type TImporte = string;

/** Complemento al Comprobante Fiscal Digital por Internet (CFDI) para el manejo de la enajenación de obras de artes plásticas y antigüedades.**/
export interface Obrasarteantiguedades extends XastElement {
	type: 'element';
	name: 'obrasarteantiguedades';
	attributes: {
		/** Atributo requerido para expresar las características de la obra o pieza de arte plástica o antigüedades de conformidad con el Catálogo publicado en el portal del SAT en Internet.	**/
		CaractersticasDeObraoPieza: string;
		/** Atributo requerido que indica la fecha en que se adquirió originalmente la obra de arte plástica o antigüedades.	**/
		/** A date, unknown format **/
		FechaAdquisicion: string;
		/** Atributo opcional para expresar el IVA  del monto o valor original de adquisición, en su caso.	**/
		IVA?: string;
		/** Atributo opcional que sólo debe incluirse en caso de haber elegido “Otros” en el atributo TipoBien.	**/
		OtrosTipoBien?: string;
		/** Atributo opcional que sólo debe incluirse en caso de haber elegido “Otros” en el atributo TituloAdquirido.	**/
		OtrosTituloAdquirido?: string;
		/** Atributo opcional para expresar el monto o valor original de adquisición, en su caso.	**/
		Subtotal?: string;
		/** Atributo requerido para expresar el tipo de bien enajenado de conformidad con el Catálogo publicado en el portal del SAT en Internet.	**/
		TipoBien: string;
		/** Atributo requerido para expresar el titulo o forma por el que se adquirió la obra de arte plástica o antigüedades de conformidad con el Catálogo publicado en el portal del SAT en Internet.	**/
		TituloAdquirido: string;
		/** Atributo requerido para la expresión de la versión del complemento.	**/
		Version: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo opcional que sólo debe incluirse en caso de haber elegido “Otros” en el atributo TipoBien.
 * @minLength 1
 * @maxLength 255
 **/
export interface OtrosTipoBien extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 255
			 **/
			value: string;
		},
	];
}
/** Atributo opcional que sólo debe incluirse en caso de haber elegido “Otros” en el atributo TipoBien.
 * @minLength 1
 * @maxLength 255
 **/
export type ObrasarteantiguedadesOtrosTipoBien = string;

/** Atributo opcional que sólo debe incluirse en caso de haber elegido “Otros” en el atributo TituloAdquirido.
 * @minLength 1
 * @maxLength 255
 **/
export interface OtrosTituloAdquirido extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 255
			 **/
			value: string;
		},
	];
}
/** Atributo opcional que sólo debe incluirse en caso de haber elegido “Otros” en el atributo TituloAdquirido.
 * @minLength 1
 * @maxLength 255
 **/
export type ObrasarteantiguedadesOtrosTituloAdquirido = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales
 **/
export interface Subtotal extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo requerido para expresar el tipo de bien enajenado de conformidad con el Catálogo publicado en el portal del SAT en Internet.**/
export interface TipoBien extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar el tipo de bien enajenado de conformidad con el Catálogo publicado en el portal del SAT en Internet.**/
export type ObrasarteantiguedadesTipoBien = string;

/** Atributo requerido para expresar el titulo o forma por el que se adquirió la obra de arte plástica o antigüedades de conformidad con el Catálogo publicado en el portal del SAT en Internet.**/
export interface TituloAdquirido extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar el titulo o forma por el que se adquirió la obra de arte plástica o antigüedades de conformidad con el Catálogo publicado en el portal del SAT en Internet.**/
export type ObrasarteantiguedadesTituloAdquirido = string;

/** Atributo requerido para la expresión de la versión del complemento.**/
export interface Version extends XastElement {
	name: 'Version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
