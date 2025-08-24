import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/certificadodestruccion/certificadodedestruccion.xsd

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

/** Atributo requerido para precisar la aduana a través de la cual se regularizó la legal estancia en el país del vehículo destruido.
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
/** Atributo requerido para precisar la aduana a través de la cual se regularizó la legal estancia en el país del vehículo destruido.
 * @minLength 1
 **/
export type CertificadodedestruccionInformacionAduaneraAduana = string;

/** Atributo requerido para la expresión del año del vehículo.
 * @maxInclusive 1900
 **/
export interface Ao extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 1900
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para la expresión del año del vehículo.
 * @maxInclusive 1900
 **/
export type CertificadodedestruccionVehiculoDestruidoAo = string;

/** Complemento para incorporar la información que integra el certificado de destrucción de vehículos destruidos por los centros de destrucción autorizados por el SAT.**/
export interface Certificadodedestruccion extends XastElement {
	type: 'element';
	name: 'certificadodedestruccion';
	attributes: {
		/** Atributo requerido que expresa el número de folio para la destrucción del vehículo emitido por el Servicio de Administración Tributaria.
		 **/
		NumFolDesVeh: string;
		/** Atributo requerido para expresar  la serie de acuerdo al catálogo.	**/
		Serie: CTipoSerie;
		/** Atributo requerido que indica la versión del complemento.	**/
		Version: string;
	};
	children: (CertificadodedestruccionInformacionAduanera | CertificadodedestruccionVehiculoDestruido)[];
}

/** Atributo requerido para expresar la fecha de expedición del documento aduanero que ampara la importación del vehículo a destruir.**/
export interface Fecha extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar la fecha de expedición del documento aduanero que ampara la importación del vehículo a destruir.**/
export type Date = string;

/** Nodo opcional para expresar la información aduanera aplicable cuando se trate de un vehículo importado que se destruyó.**/
export interface CertificadodedestruccionInformacionAduanera extends XastElement {
	type: 'element';
	name: 'InformacionAduanera';
	attributes: {
		/** Atributo requerido para precisar la aduana a través de la cual se regularizó la legal estancia en el país del vehículo destruido.	**/
		Aduana: string;
		/** Atributo requerido para expresar la fecha de expedición del documento aduanero que ampara la importación del vehículo a destruir.	**/
		/** A date, unknown format **/
		Fecha: string;
		/** Atributo requerido para expresar el número de documento aduanero que ampara la importación del vehículo a destruir.	**/
		NumPedImp: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para expresar la marca del vehículo que se destruyó.
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
/** Atributo requerido para expresar la marca del vehículo que se destruyó.
 * @minLength 1
 * @maxLength 50
 **/
export type CertificadodedestruccionVehiculoDestruidoMarca = string;

/** Atributo opcional para expresar el modelo del vehículo que se destruyó.**/
export interface Modelo extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo opcional para expresar el modelo del vehículo que se destruyó.**/
export type CertificadodedestruccionVehiculoDestruidoModelo = string;

/** Atributo opcional para expresar el  número de identificación vehicular del vehículo (Cuando exista el NIV deberá incluirse este invariablemente).
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
/** Atributo opcional para expresar el  número de identificación vehicular del vehículo (Cuando exista el NIV deberá incluirse este invariablemente).
 * @minLength 1
 * @maxLength 17
 **/
export type CertificadodedestruccionVehiculoDestruidoNIV = string;

/** Atributo requerido que expresa el número de folio para la destrucción del vehículo emitido por el Servicio de Administración Tributaria.
   * @minLength 1
  * @maxLength 20

**/
export interface NumFolDesVeh extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 20
			 **/
			value: string;
		},
	];
}
/** Atributo requerido que expresa el número de folio para la destrucción del vehículo emitido por el Servicio de Administración Tributaria.
   * @minLength 1
  * @maxLength 20

**/
export type CertificadodedestruccionNumFolDesVeh = string;

/** Atributo requerido para expresar el número de folio de la tarjeta de circulación.
 * @minLength 1
 * @maxLength 40
 **/
export interface NumFolTarjCir extends XastElement {
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
/** Atributo requerido para expresar el número de folio de la tarjeta de circulación.
 * @minLength 1
 * @maxLength 40
 **/
export type CertificadodedestruccionVehiculoDestruidoNumFolTarjCir = string;

/** Atributo opcional para expresar el número de motor del vehículo (en caso de contar con dicho número se deberá ingresar).
 * @minLength 1
 * @maxLength 17
 **/
export interface NumMotor extends XastElement {
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
/** Atributo opcional para expresar el número de motor del vehículo (en caso de contar con dicho número se deberá ingresar).
 * @minLength 1
 * @maxLength 17
 **/
export type CertificadodedestruccionVehiculoDestruidoNumMotor = string;

/** Atributo requerido para expresar el número de documento aduanero que ampara la importación del vehículo a destruir.
 * @minLength 1
 * @maxLength 40
 **/
export interface NumPedImp extends XastElement {
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
/** Atributo requerido para expresar el número de documento aduanero que ampara la importación del vehículo a destruir.
 * @minLength 1
 * @maxLength 40
 **/
export type CertificadodedestruccionInformacionAduaneraNumPedImp = string;

/** Atributo requerido para expresar el número de placas metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajero urbano o suburbano.
 * @minLength 1
 * @maxLength 10
 **/
export interface NumPlacas extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 10
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de placas metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajero urbano o suburbano.
 * @minLength 1
 * @maxLength 10
 **/
export type CertificadodedestruccionVehiculoDestruidoNumPlacas = string;

/** Atributo opcional para expresar el número de serie de la carrocería del vehículo (en caso de contar con dicho número se deberá ingresar)
 * @minLength 1
 * @maxLength 17
 **/
export interface NumSerie extends XastElement {
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
/** Atributo opcional para expresar el número de serie de la carrocería del vehículo (en caso de contar con dicho número se deberá ingresar)
 * @minLength 1
 * @maxLength 17
 **/
export type CertificadodedestruccionVehiculoDestruidoNumSerie = string;

/** Atributo requerido para expresar  la serie de acuerdo al catálogo.**/
export type CTipoSerie = 'SERIE A' | 'SERIE B' | 'SERIE C' | 'SERIE D' | 'SERIE E';

/** Atributo requerido para expresar el tipo o clase del vehículo que se destruyó.
 * @minLength 1
 * @maxLength 50
 **/
export interface TipooClase extends XastElement {
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
/** Atributo requerido para expresar el tipo o clase del vehículo que se destruyó.
 * @minLength 1
 * @maxLength 50
 **/
export type CertificadodedestruccionVehiculoDestruidoTipooClase = string;

/** Nodo requerido para expresar la información del vehículo que se destruyó.**/
export interface CertificadodedestruccionVehiculoDestruido extends XastElement {
	type: 'element';
	name: 'VehiculoDestruido';
	attributes: {
		/** Atributo requerido para la expresión del año del vehículo.	**/
		Ao: string;
		/** Atributo requerido para expresar la marca del vehículo que se destruyó.	**/
		Marca: string;
		/** Atributo opcional para expresar el modelo del vehículo que se destruyó.	**/
		Modelo?: string;
		/** Atributo opcional para expresar el  número de identificación vehicular del vehículo (Cuando exista el NIV deberá incluirse este invariablemente).	**/
		NIV?: string;
		/** Atributo requerido para expresar el número de folio de la tarjeta de circulación.	**/
		NumFolTarjCir: string;
		/** Atributo opcional para expresar el número de motor del vehículo (en caso de contar con dicho número se deberá ingresar).	**/
		NumMotor?: string;
		/** Atributo requerido para expresar el número de placas metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajero urbano o suburbano.	**/
		NumPlacas: string;
		/** Atributo opcional para expresar el número de serie de la carrocería del vehículo (en caso de contar con dicho número se deberá ingresar)	**/
		NumSerie?: string;
		/** Atributo requerido para expresar el tipo o clase del vehículo que se destruyó.	**/
		TipooClase: string;
	};
	/** XastElement is self-closing */
	children: [];
}

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
export type CertificadodedestruccionVersion = string;
