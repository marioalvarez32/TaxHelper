import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/iedu/iedu.xsd

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

/** Atributo requerido para especificar la clave del centro de trabajo o el reconocimiento de validez oficial de estudios en los términos de la Ley General de Educación que tenga la institución educativa privada donde se realiza el pago.
 * @minLength 1
 **/
export interface AutRVOE extends XastElement {
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
/** Atributo requerido para especificar la clave del centro de trabajo o el reconocimiento de validez oficial de estudios en los términos de la Ley General de Educación que tenga la institución educativa privada donde se realiza el pago.
 * @minLength 1
 **/
export type InstEducativasAutRVOE = string;

/** Tipo definido para la expresión de una CURP.
 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H,X][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
 **/
export interface CURP extends XastElement {
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
/** Tipo definido para la expresión de una CURP.
 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H,X][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
 **/
export type TCURP = string;

/** Complemento concepto para la expedición de comprobantes fiscales por parte de Instituciones Educativas Privadas, para los efectos del artículo primero y cuarto del decreto por el que se otorga un estímulo fiscal a las personas físicas en relación con los pagos por servicios educativos**/
export interface InstEducativas extends XastElement {
	type: 'element';
	name: 'instEducativas';
	attributes: {
		/** Atributo requerido para especificar la clave del centro de trabajo o el reconocimiento de validez oficial de estudios en los términos de la Ley General de Educación que tenga la institución educativa privada donde se realiza el pago.	**/
		autRVOE: string;
		/** Atributo requerido para indicar la CURP del alumno de la institución educativa	**/
		CURP: string;
		/** Atributo requerido para indicar el nivel educativo que cursa el alumno	**/
		nivelEducativo: InstEducativasNivelEducativo;
		/** Atributo requerido para indicar el nombre del Alumno	**/
		nombreAlumno: string;
		/** Atributo opcional para indicar el RFC de quien realiza el pago cuando sea diferente a quien recibe el servicio	**/
		rfcPago?: string;
		/** Atributo requerido con valor prefijado a 1.0 que indica la versión del estándar bajo el que se encuentra expresado el complemento concepto al comprobante.	**/
		version: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para indicar el nivel educativo que cursa el alumno**/
export type InstEducativasNivelEducativo = 'Preescolar' | 'Primaria' | 'Secundaria' | 'Profesional técnico' | 'Bachillerato o su equivalente';

/** Atributo requerido para indicar el nombre del Alumno**/
export interface NombreAlumno extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para indicar el nombre del Alumno**/
export type InstEducativasNombreAlumno = string;

/** Tipo definido para la expresión de RFC's de contribuyentes. Cabe hacer la mención que debido a las reglas definidas por el estándar XML en el caso de que un RFC dado incluya un caracter ampersand, dicho caracter deberá ser expresado mediante la secuencia de escape especificado como parte del estándar. En la definición del tipo se expresa una longitud mínima y máxima, sin embargo la longitud puede ser redefinida como una extensión según se determina el uso particular
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?
 * @minLength 12
 * @maxLength 13
 **/
export interface RfcPago extends XastElement {
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
/** Tipo definido para la expresión de RFC's de contribuyentes. Cabe hacer la mención que debido a las reglas definidas por el estándar XML en el caso de que un RFC dado incluya un caracter ampersand, dicho caracter deberá ser expresado mediante la secuencia de escape especificado como parte del estándar. En la definición del tipo se expresa una longitud mínima y máxima, sin embargo la longitud puede ser redefinida como una extensión según se determina el uso particular
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?
 * @minLength 12
 * @maxLength 13
 **/
export type TRFC = string;

/** Atributo requerido con valor prefijado a 1.0 que indica la versión del estándar bajo el que se encuentra expresado el complemento concepto al comprobante.**/
export interface Version extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido con valor prefijado a 1.0 que indica la versión del estándar bajo el que se encuentra expresado el complemento concepto al comprobante.**/
export type InstEducativasVersion = string;
