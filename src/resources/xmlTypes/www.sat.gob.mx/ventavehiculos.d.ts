import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/ventavehiculos/ventavehiculos.xsd

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

/** Atributo opcional para precisar la aduana por la que se efectuó la importación del bien.
 * @minLength 1
 **/
export interface Aduana extends XastElement {
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
/** Atributo opcional para precisar la aduana por la que se efectuó la importación del bien.
 * @minLength 1
 **/
export type TInformacionAduaneraAduana = string;

/** Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por la presente parte.**/
export interface Cantidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por la presente parte.**/
export type VentaVehiculosParteCantidad = string;

/** Atributo requerido para precisar Clave vehicular que corresponda a la versión del vehículo enajenado.
 * @minLength 1
 **/
export interface ClaveVehicular extends XastElement {
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
/** Atributo requerido para precisar Clave vehicular que corresponda a la versión del vehículo enajenado.
 * @minLength 1
 **/
export type VentaVehiculosClaveVehicular = string;

/** Atributo requerido para precisar la descripción del bien o servicio cubierto por la presente parte.
 * @minLength 1
 **/
export interface Descripcion extends XastElement {
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
/** Atributo requerido para precisar la descripción del bien o servicio cubierto por la presente parte.
 * @minLength 1
 **/
export type VentaVehiculosParteDescripcion = string;

/** Atributo requerido para expresar la fecha de expedición del documento aduanero que ampara la importación del bien.**/
export interface Fecha extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar la fecha de expedición del documento aduanero que ampara la importación del bien.**/
export type TInformacionAduaneraFecha = string;

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

/** Tipo definido para expresar información aduanera**/
export interface TInformacionAduanera extends XastElement {
	type: 'element';
	name: 't_InformacionAduanera';
	attributes: {
		/** Atributo opcional para precisar la aduana por la que se efectuó la importación del bien.	**/
		aduana: string;
		/** Atributo requerido para expresar la fecha de expedición del documento aduanero que ampara la importación del bien.	**/
		/** A date, unknown format **/
		fecha: string;
		/** Atributo requerido para expresar el número del documento aduanero que ampara la importación del bien.	**/
		numero: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo opcional para expresar el número de serie del bien o identificador del servicio amparado por la presente parte.
 * @minLength 1
 **/
export interface NoIdentificacion extends XastElement {
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
/** Atributo opcional para expresar el número de serie del bien o identificador del servicio amparado por la presente parte.
 * @minLength 1
 **/
export type VentaVehiculosParteNoIdentificacion = string;

/** Atributo requerido para expresar el número del documento aduanero que ampara la importación del bien.
 * @minLength 1
 **/
export interface Numero extends XastElement {
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
/** Atributo requerido para expresar el número del documento aduanero que ampara la importación del bien.
 * @minLength 1
 **/
export type TInformacionAduaneraNumero = string;

/** Nodo opcional para expresar las partes o componentes que integran la totalidad del concepto expresado en el CFD o CFDI.**/
export interface VentaVehiculosParte extends XastElement {
	type: 'element';
	name: 'Parte';
	attributes: {
		/** Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por la presente parte.	**/
		cantidad: string;
		/** Atributo requerido para precisar la descripción del bien o servicio cubierto por la presente parte.	**/
		descripcion: string;
		/** Atributo opcional para precisar el importe total de los bienes o servicios de la presente parte. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario expresado en la parte.	**/
		importe?: string;
		/** Atributo opcional para expresar el número de serie del bien o identificador del servicio amparado por la presente parte.	**/
		noIdentificacion?: string;
		/** Atributo opcional para precisar la unidad de medida aplicable para la cantidad expresada en la parte.	**/
		unidad?: string;
		/** Atributo opcional para precisar el valor o precio unitario del bien o servicio cubierto por la presente parte.	**/
		valorUnitario?: string;
	};
	children: TInformacionAduanera[];
}

/** Atributo opcional para precisar la unidad de medida aplicable para la cantidad expresada en la parte.
 * @minLength 1
 **/
export interface Unidad extends XastElement {
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
/** Atributo opcional para precisar la unidad de medida aplicable para la cantidad expresada en la parte.
 * @minLength 1
 **/
export type VentaVehiculosParteUnidad = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface ValorUnitario extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Complemento concepto que permite incorporar a los fabricantes, ensambladores o distribuidores autorizados de automóviles nuevos, así como aquéllos que importen automóviles para permanecer en forma definitiva en la franja fronteriza norte del país y en los Estados de Baja California, Baja California Sur y la región parcial del Estado de Sonora, a un Comprobante Fiscal Digital (CFD) o a un Comprobante Fiscal Digital a través de Internet (CFDI) la clave vehicular que corresponda a la versión enajenada.**/
export interface VentaVehiculos extends XastElement {
	type: 'element';
	name: 'VentaVehiculos';
	attributes: {
		/** Atributo requerido para precisar Clave vehicular que corresponda a la versión del vehículo enajenado.	**/
		ClaveVehicular: string;
	};
	children: (TInformacionAduanera | VentaVehiculosParte)[];
}
