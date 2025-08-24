import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/valesdedespensa/valesdedespensa.xsd

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

/** Nodo requerido para la expresión de una transacción a ser reportada por el proveedor del monedero electrónico de vales de despensa.
 **/
export interface ValesDeDespensaConceptosConcepto extends XastElement {
	type: 'element';
	name: 'Concepto';
	attributes: {
		/** Atributo requerido para la expresión de la CURP del trabajador al que se le otorgó el monedero electrónico.	**/
		curp: string;
		/** Atributo requerido para la expresión de la Fecha y hora de expedición de la operación reportada.  Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.
		 **/
		/** A date, unknown format **/
		fecha: string;
		/** Atributo requerido para expresar el identificador o numero del  monedero electrónico.
		 **/
		identificador: string;
		/** Atributo requerido para expresar el  importe del depósito efectuado al trabajador en el monedero electrónico.
		 **/
		importe: string;
		/** Atributo requerido para la expresión del Nombre del trabajador al que se le otorgó el monedero electrónico sin guiones o espacios
		 **/
		nombre: string;
		/** Atributo opcional para la expresión del numero de seguridad social aplicable al trabajador.
		 **/
		numSeguridadSocial?: string;
		/** Atributo requerido para la expresión del Registro Federal de Contribuyentes del trabajador al que se le otorgó el monedero electrónico sin guiones o espacios
		 **/
		rfc: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo requerido para enlistar los conceptos cubiertos por los monederos electrónicos de vales de despensa.
 **/
export interface ValesDeDespensaConceptos extends XastElement {
	type: 'element';
	name: 'Conceptos';
	children: ValesDeDespensaConceptosConcepto[];
}

/** Tipo definido para la expresión de una CURP
 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H,X][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
 **/
export interface Curp extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H,X][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
			 **/
			value: string;
		},
	];
}
/** Tipo definido para la expresión de una CURP
 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H,X][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
 **/
export type TCURP = string;

/** Atributo requerido para la expresión de la Fecha y hora de expedición de la operación reportada.  Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.
 **/
export interface Fecha extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para la expresión de la Fecha y hora de expedición de la operación reportada.  Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.
 **/
export type ValesDeDespensaConceptosConceptoFecha = string;

/** Atributo requerido para expresar el identificador o numero del  monedero electrónico.
   * @minLength 1
  * @maxLength 20

**/
export interface Identificador extends XastElement {
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
/** Atributo requerido para expresar el identificador o numero del  monedero electrónico.
   * @minLength 1
  * @maxLength 20

**/
export type ValesDeDespensaConceptosConceptoIdentificador = string;

/** Atributo requerido para expresar el  importe del depósito efectuado al trabajador en el monedero electrónico.
 **/
export interface Importe extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar el  importe del depósito efectuado al trabajador en el monedero electrónico.
 **/
export type ValesDeDespensaConceptosConceptoImporte = string;

/** Atributo requerido para la expresión del Nombre del trabajador al que se le otorgó el monedero electrónico sin guiones o espacios
   * @minLength 1
  * @maxLength 100

**/
export interface Nombre extends XastElement {
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
/** Atributo requerido para la expresión del Nombre del trabajador al que se le otorgó el monedero electrónico sin guiones o espacios
   * @minLength 1
  * @maxLength 100

**/
export type ValesDeDespensaConceptosConceptoNombre = string;

/** Atributo requerido para expresar el numero de cuenta del adquiriente del monedero electrónico.
   * @minLength 1
  * @maxLength 20

**/
export interface NumeroDeCuenta extends XastElement {
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
/** Atributo requerido para expresar el numero de cuenta del adquiriente del monedero electrónico.
   * @minLength 1
  * @maxLength 20

**/
export type ValesDeDespensaNumeroDeCuenta = string;

/** Atributo opcional para la expresión del numero de seguridad social aplicable al trabajador.
   * @minLength 1
  * @maxLength 15

**/
export interface NumSeguridadSocial extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 15
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para la expresión del numero de seguridad social aplicable al trabajador.
   * @minLength 1
  * @maxLength 15

**/
export type ValesDeDespensaConceptosConceptoNumSeguridadSocial = string;

/** Atributo opcional para expresar el registro patronal del adquirente del monedero electrónico.
 * @minLength 1
 * @maxLength 20
 **/
export interface RegistroPatronal extends XastElement {
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
/** Atributo opcional para expresar el registro patronal del adquirente del monedero electrónico.
 * @minLength 1
 * @maxLength 20
 **/
export type ValesDeDespensaRegistroPatronal = string;

/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?
 * @minLength 12
 * @maxLength 13
 **/
export interface Rfc extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?
			 * @minLength 12
			 * @maxLength 13
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?
 * @minLength 12
 * @maxLength 13
 **/
export type TRFC = string;

/** Atributo requerido para expresar el tipo de operación de acuerdo con el medio de pago.
   * @minLength 1

**/
export interface TipoOperacion extends XastElement {
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
/** Atributo requerido para expresar el tipo de operación de acuerdo con el medio de pago.
   * @minLength 1

**/
export type ValesDeDespensaTipoOperacion = string;

/** Atributo requerido para expresar el monto total de vales de despensa otorgados.
 **/
export interface Total extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar el monto total de vales de despensa otorgados.
 **/
export type ValesDeDespensaTotal = string;

/** Complemento al Comprobante Fiscal Digital por Internet (CFDI) para integrar la información emitida por un prestador de servicios de monedero electrónico de vales de despensa.**/
export interface ValesDeDespensa extends XastElement {
	type: 'element';
	name: 'ValesDeDespensa';
	attributes: {
		/** Atributo requerido para expresar el numero de cuenta del adquiriente del monedero electrónico.
		 **/
		numeroDeCuenta: string;
		/** Atributo opcional para expresar el registro patronal del adquirente del monedero electrónico.	**/
		registroPatronal?: string;
		/** Atributo requerido para expresar el tipo de operación de acuerdo con el medio de pago.
		 **/
		tipoOperacion: string;
		/** Atributo requerido para expresar el monto total de vales de despensa otorgados.
		 **/
		total: string;
		/** Atributo requerido con valor prefijado a 1.0 que indica la versión del estándar bajo el que se encuentra expresado el comprobante.
		 **/
		version: string;
	};
	children: ValesDeDespensaConceptos[];
}

/** Atributo requerido con valor prefijado a 1.0 que indica la versión del estándar bajo el que se encuentra expresado el comprobante.
 **/
export interface Version extends XastElement {
	name: 'version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
