import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/pagoenespecie/pagoenespecie.xsd

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

/** Clave de inscripción al Padrón de Instituciones Culturales adheridas al Programa de Pago en Especie
 * @pattern [A-ZÑ&]{3}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z0-9]?[A-Z0-9]?[0-9A-Z]-(18|19|20)\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])-[0-9]{3}
 **/
export interface CvePIC extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-ZÑ&]{3}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z0-9]?[A-Z0-9]?[0-9A-Z]-(18|19|20)\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])-[0-9]{3}
			 **/
			value: string;
		},
	];
}
/** Clave de inscripción al Padrón de Instituciones Culturales adheridas al Programa de Pago en Especie
 * @pattern [A-ZÑ&]{3}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z0-9]?[A-Z0-9]?[0-9A-Z]-(18|19|20)\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])-[0-9]{3}
 **/
export type PagoEnEspecieCvePIC = string;

/** Número de folio de la solicitud de donación
 * @pattern PE-[0-9]{2}-[0-9]{5}
 **/
export interface FolioSolDon extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern PE-[0-9]{2}-[0-9]{5}
			 **/
			value: string;
		},
	];
}
/** Número de folio de la solicitud de donación
 * @pattern PE-[0-9]{2}-[0-9]{5}
 **/
export type PagoEnEspecieFolioSolDon = string;

/** Complemento para la expedición de comprobantes fiscales por la donación en la facilidad fiscal de Pago en Especie**/
export interface PagoEnEspecie extends XastElement {
	type: 'element';
	name: 'PagoEnEspecie';
	attributes: {
		/** Clave de inscripción al Padrón de Instituciones Culturales adheridas al Programa de Pago en Especie	**/
		CvePIC: string;
		/** Número de folio de la solicitud de donación	**/
		FolioSolDon: string;
		/** Año de producción de la pieza de arte	**/
		PzaArtAProd: string;
		/** Dimensiones de la pieza de arte	**/
		PzaArtDim: string;
		/** Nombre de la pieza de arte	**/
		PzaArtNombre: string;
		/** Técnica de producción de la pieza de arte	**/
		PzaArtTecn: string;
		/** Atributo requerido para la expresión de la versión del complemento	**/
		Version: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Año de producción de la pieza de arte
 * @pattern [0-9]{4}
 **/
export interface PzaArtAProd extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{4}
			 **/
			value: string;
		},
	];
}
/** Año de producción de la pieza de arte
 * @pattern [0-9]{4}
 **/
export type PagoEnEspeciePzaArtAProd = string;

/** Dimensiones de la pieza de arte
 * @minLength 1
 **/
export interface PzaArtDim extends XastElement {
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
/** Dimensiones de la pieza de arte
 * @minLength 1
 **/
export type PagoEnEspeciePzaArtDim = string;

/** Nombre de la pieza de arte
 * @minLength 1
 **/
export interface PzaArtNombre extends XastElement {
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
/** Nombre de la pieza de arte
 * @minLength 1
 **/
export type PagoEnEspeciePzaArtNombre = string;

/** Técnica de producción de la pieza de arte
 * @minLength 1
 **/
export interface PzaArtTecn extends XastElement {
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
/** Técnica de producción de la pieza de arte
 * @minLength 1
 **/
export type PagoEnEspeciePzaArtTecn = string;

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
