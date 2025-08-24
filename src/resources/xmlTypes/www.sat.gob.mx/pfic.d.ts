import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/pfic/pfic.xsd

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
export type PFintegranteCoordinadoClaveVehicular = string;

/** Este complemento permite incorporar a un Comprobante Fiscal Digital (CFD) o a un Comprobante Fiscal Digital a través de Internet (CFDI) los datos de identificación del vehículo que corresponda a personas físicas integrantes de coordinados, que opten por pagar el impuesto individualmente de conformidad con lo establecido por el artículo 83, séptimo párrafo de la Ley del Impuesto sobre la Renta.**/
export interface PFintegranteCoordinado extends XastElement {
	type: 'element';
	name: 'PFintegranteCoordinado';
	attributes: {
		/** Atributo requerido para precisar Clave vehicular que corresponda a la versión del vehículo enajenado.	**/
		ClaveVehicular: string;
		/** Atributo requerido para señalar la placa o número de folio del
		 * permiso del vehículo que
		 * corresponda.
		 **/
		Placa: string;
		/** Atributo opcional para precisar el RFC de la persona física
		 * integrante de coordinados, que opte por pagar el impuesto individualmente.
		 **/
		RFCPF?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para señalar la placa o número de folio del
  * permiso del vehículo que
  * corresponda.
   * @minLength 1

**/
export interface Placa extends XastElement {
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
/** Atributo requerido para señalar la placa o número de folio del
  * permiso del vehículo que
  * corresponda.
   * @minLength 1

**/
export type PFintegranteCoordinadoPlaca = string;

/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?
 * @minLength 12
 * @maxLength 13
 **/
export interface RFCPF extends XastElement {
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
