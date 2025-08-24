import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/servicioparcialconstruccion/servicioparcialconstruccion.xsd

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

export type TEntidadFederativa = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32';
interface _TEntidadFederativa extends Primitive._String {
	content: TEntidadFederativa;
}

/** Este atributo requerido sirve para precisar la avenida, calle, camino o carretera del inmueble
 * @minLength 1
 * @maxLength 150
 **/
export interface Calle extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 150
			 **/
			value: string;
		},
	];
}
/** Este atributo requerido sirve para precisar la avenida, calle, camino o carretera del inmueble
 * @minLength 1
 * @maxLength 150
 **/
export type ParcialesconstruccionInmuebleCalle = string;

/** Atributo requerido que sirve para asentar el código postal en donde se da la ubicación del inmueble.
 * @pattern [0-9]{5}
 **/
export interface CodigoPostal extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{5}
			 **/
			value: string;
		},
	];
}
/** Atributo requerido que sirve para asentar el código postal en donde se da la ubicación del inmueble.
 * @pattern [0-9]{5}
 **/
export type ParcialesconstruccionInmuebleCodigoPostal = string;

/** Este atributo opcional sirve para precisar la colonia en donde se da la ubicación del inmueble cuando se desea ser más específico en casos de ubicaciones urbanas.
 * @minLength 1
 * @maxLength 100
 **/
export interface Colonia extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Este atributo opcional sirve para precisar la colonia en donde se da la ubicación del inmueble cuando se desea ser más específico en casos de ubicaciones urbanas.
 * @minLength 1
 * @maxLength 100
 **/
export type ParcialesconstruccionInmuebleColonia = string;

/** Entidad Federativa donde se ubica el inmueble conforme al catálogo publicado en el portal del SAT en Internet.**/
export interface Estado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Entidad Federativa donde se ubica el inmueble conforme al catálogo publicado en el portal del SAT en Internet.**/
export type ParcialesconstruccionInmuebleEstado = string;

/** Nodo requerido para expresar la información del inmueble en el que se proporcionan los servicios parciales de construcción.
 **/
export interface ParcialesconstruccionInmueble extends XastElement {
	type: 'element';
	name: 'Inmueble';
	attributes: {
		/** Este atributo requerido sirve para precisar la avenida, calle, camino o carretera del inmueble	**/
		Calle: string;
		/** Atributo requerido que sirve para asentar el código postal en donde se da la ubicación del inmueble.	**/
		CodigoPostal: string;
		/** Este atributo opcional sirve para precisar la colonia en donde se da la ubicación del inmueble cuando se desea ser más específico en casos de ubicaciones urbanas.	**/
		Colonia?: string;
		/** Entidad Federativa donde se ubica el inmueble conforme al catálogo publicado en el portal del SAT en Internet.	**/
		Estado: string;
		/** Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación del inmueble.	**/
		Localidad?: string;
		/** Atributo requerido que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación del inmueble.	**/
		Municipio: string;
		/** Este atributo opcional sirve para expresar el número particular en donde se da la ubicación del inmueble en una calle dada.	**/
		NoExterior?: string;
		/** Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación precisa del inmueble.	**/
		NoInterior?: string;
		/** Atributo opcional para expresar una referencia adicional de ubicación del inmueble.	**/
		Referencia?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación del inmueble.
 * @minLength 1
 * @maxLength 100
 **/
export interface Localidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación del inmueble.
 * @minLength 1
 * @maxLength 100
 **/
export type ParcialesconstruccionInmuebleLocalidad = string;

/** Atributo requerido que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación del inmueble.
 * @minLength 1
 * @maxLength 100
 **/
export interface Municipio extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo requerido que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación del inmueble.
 * @minLength 1
 * @maxLength 100
 **/
export type ParcialesconstruccionInmuebleMunicipio = string;

/** Este atributo opcional sirve para expresar el número particular en donde se da la ubicación del inmueble en una calle dada.
 * @minLength 1
 * @maxLength 55
 **/
export interface NoExterior extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 55
			 **/
			value: string;
		},
	];
}
/** Este atributo opcional sirve para expresar el número particular en donde se da la ubicación del inmueble en una calle dada.
 * @minLength 1
 * @maxLength 55
 **/
export type ParcialesconstruccionInmuebleNoExterior = string;

/** Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación precisa del inmueble.
 * @minLength 1
 * @maxLength 30
 **/
export interface NoInterior extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 30
			 **/
			value: string;
		},
	];
}
/** Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación precisa del inmueble.
 * @minLength 1
 * @maxLength 30
 **/
export type ParcialesconstruccionInmuebleNoInterior = string;

/** Atributo requerido para expresar el número de permiso, licencia o autorización de construcción proporcionado por el prestatario de los servicios parciales de construcción.
 * @minLength 1
 * @maxLength 40
 **/
export interface NumPerLicoAut extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 40
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de permiso, licencia o autorización de construcción proporcionado por el prestatario de los servicios parciales de construcción.
 * @minLength 1
 * @maxLength 40
 **/
export type ParcialesconstruccionNumPerLicoAut = string;

/** Complemento para incorporar información de servicios parciales de construcción de inmuebles destinados a casa habitación.**/
export interface Parcialesconstruccion extends XastElement {
	type: 'element';
	name: 'parcialesconstruccion';
	attributes: {
		/** Atributo requerido para expresar el número de permiso, licencia o autorización de construcción proporcionado por el prestatario de los servicios parciales de construcción.	**/
		NumPerLicoAut: string;
		/** Atributo requerido que indica la versión del complemento.	**/
		Version: string;
	};
	children: ParcialesconstruccionInmueble[];
}

/** Atributo opcional para expresar una referencia adicional de ubicación del inmueble.
 * @minLength 1
 * @maxLength 100
 **/
export interface Referencia extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar una referencia adicional de ubicación del inmueble.
 * @minLength 1
 * @maxLength 100
 **/
export type ParcialesconstruccionInmuebleReferencia = string;

/** Atributo requerido que indica la versión del complemento.**/
export interface Version extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido que indica la versión del complemento.**/
export type ParcialesconstruccionVersion = string;
