import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/donat/donat.xsd

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

/** Nodo opcional para incluir la información requerida por el Servicio de Administración Tributaria a las organizaciones civiles o fideicomisos autorizados para recibir donativos, que permite hacer deducibles los Comprobantes Fiscales Digitales a los donantes.**/
export interface Donatarias extends XastElement {
	type: 'element';
	name: 'Donatarias';
	attributes: {
		/** Atributo requerido para expresar la fecha del oficio en que se haya informado a la organización civil o fideicomiso, la procedencia de la autorización para recibir donativos deducibles, o su renovación correspondiente otorgada por el Servicio de Administración Tributaria.	**/
		/** A date, unknown format **/
		fechaAutorizacion: string;
		/** Atributo requerido para señalar de manera expresa que el comprobante que se expide se deriva de un donativo.	**/
		leyenda: string;
		/** Atributo requerido para expresar el número del oficio en que se haya informado a la organización civil o fideicomiso, la procedencia de la autorización para recibir donativos deducibles, o su renovación correspondiente otorgada por el Servicio de Administración Tributaria.	**/
		noAutorizacion: string;
		/** Atributo requerido para expresar la versión del complemento de donatarias	**/
		version: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para expresar la fecha del oficio en que se haya informado a la organización civil o fideicomiso, la procedencia de la autorización para recibir donativos deducibles, o su renovación correspondiente otorgada por el Servicio de Administración Tributaria.**/
export interface FechaAutorizacion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar la fecha del oficio en que se haya informado a la organización civil o fideicomiso, la procedencia de la autorización para recibir donativos deducibles, o su renovación correspondiente otorgada por el Servicio de Administración Tributaria.**/
export type Date = string;

/** Atributo requerido para señalar de manera expresa que el comprobante que se expide se deriva de un donativo.**/
export interface Leyenda extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para señalar de manera expresa que el comprobante que se expide se deriva de un donativo.**/
export type DonatariasLeyenda = string;

/** Atributo requerido para expresar el número del oficio en que se haya informado a la organización civil o fideicomiso, la procedencia de la autorización para recibir donativos deducibles, o su renovación correspondiente otorgada por el Servicio de Administración Tributaria.**/
export interface NoAutorizacion extends XastElement {
	name: 'noAutorizacion';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo requerido para expresar la versión del complemento de donatarias**/
export interface Version extends XastElement {
	name: 'version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
