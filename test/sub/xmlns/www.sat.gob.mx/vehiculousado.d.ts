import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/vehiculousado/vehiculousado.xsd

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

/** Atributo requerido para expresar la clave vehicular del vehículo usado
 * @minLength 1
 * @maxLength 7
 **/
export interface ClaveVehicular extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 7
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar la clave vehicular del vehículo usado
 * @minLength 1
 * @maxLength 7
 **/
export type VehiculoUsadoClaveVehicular = string;

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

/** Atributo requerido para expresar la marca  del vehículo usado
 * @minLength 1
 * @maxLength 50
 **/
export interface Marca extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 50
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar la marca  del vehículo usado
 * @minLength 1
 * @maxLength 50
 **/
export type VehiculoUsadoMarca = string;

/** Atributo requerido para expresar el año modelo del vehículo usado
 * @pattern [0-9]{4}
 **/
export interface Modelo extends XastElement {
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
/** Atributo requerido para expresar el año modelo del vehículo usado
 * @pattern [0-9]{4}
 **/
export type VehiculoUsadoModelo = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface MontoAdquisicion extends XastElement {
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

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface MontoEnajenacion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo opcional para expresar el número de identificación vehicular del vehículo usado (Cuando exista el NIV deberá incluirse este invariablemente)
 * @minLength 1
 * @maxLength 17
 **/
export interface NIV extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 17
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar el número de identificación vehicular del vehículo usado (Cuando exista el NIV deberá incluirse este invariablemente)
 * @minLength 1
 * @maxLength 17
 **/
export type VehiculoUsadoNIV = string;

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

/** Atributo opcional para expresar el número de motor del vehículo usado (en caso de contar con dicho número se deberá ingresar)
 * @minLength 1
 * @maxLength 17
 **/
export interface NumeroMotor extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 17
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar el número de motor del vehículo usado (en caso de contar con dicho número se deberá ingresar)
 * @minLength 1
 * @maxLength 17
 **/
export type VehiculoUsadoNumeroMotor = string;

/** Atributo opcional para expresar el número de serie de la carrocería del vehículo usado (en caso de contar con dicho número se deberá ingresar)
 * @minLength 1
 * @maxLength 17
 **/
export interface NumeroSerie extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 17
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar el número de serie de la carrocería del vehículo usado (en caso de contar con dicho número se deberá ingresar)
 * @minLength 1
 * @maxLength 17
 **/
export type VehiculoUsadoNumeroSerie = string;

/** Atributo requerido para expresar el tipo del vehículo usado
 * @minLength 1
 * @maxLength 50
 **/
export interface Tipo extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 50
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el tipo del vehículo usado
 * @minLength 1
 * @maxLength 50
 **/
export type VehiculoUsadoTipo = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface Valor extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Complemento opcional que permite incorporar información a los contribuyentes que enajenen vehículos nuevos a personas físicas que no tributen en los términos de las Secciones I y II del Capítulo II del Título IV de la ley del ISR, y que reciban en contraprestación como resultados de esa enajenación un vehículo usado y dinero**/
export interface VehiculoUsado extends XastElement {
	type: 'element';
	name: 'VehiculoUsado';
	attributes: {
		/** Atributo requerido para expresar la clave vehicular del vehículo usado	**/
		claveVehicular: string;
		/** Atributo requerido para expresar la marca  del vehículo usado	**/
		marca: string;
		/** Atributo requerido para expresar el año modelo del vehículo usado	**/
		modelo: string;
		/** Atributo requerido para expresar el monto de adquisición del vehículo usado según factura original, primera venta	**/
		montoAdquisicion: string;
		/** Atributo requerido para expresar el monto de enajenación del vehículo usado	**/
		montoEnajenacion: string;
		/** Atributo opcional para expresar el número de identificación vehicular del vehículo usado (Cuando exista el NIV deberá incluirse este invariablemente)	**/
		NIV?: string;
		/** Atributo opcional para expresar el número de motor del vehículo usado (en caso de contar con dicho número se deberá ingresar)	**/
		numeroMotor?: string;
		/** Atributo opcional para expresar el número de serie de la carrocería del vehículo usado (en caso de contar con dicho número se deberá ingresar)	**/
		numeroSerie?: string;
		/** Atributo requerido para expresar el tipo del vehículo usado	**/
		tipo: string;
		/** Atributo requerido para expresar el valor del vehículo, establecido en la Guía EBC o Libro Azul (Guía de Información a Comerciantes de Automóviles y Camiones y Aseguradores de la República Mexicana) vigente, emitida por la Asociación Nacional de Comerciantes en Automóviles y Camiones  nuevos y usados A.C.	**/
		valor: string;
		/** Atributo requerido para expresar la versión del complemento	**/
		Version: string;
	};
	children: TInformacionAduanera[];
}

/** Atributo requerido para expresar la versión del complemento**/
export interface Version extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar la versión del complemento**/
export type VehiculoUsadoVersion = string;
