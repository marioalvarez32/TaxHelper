import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/consumodecombustibles/consumodecombustibles.xsd

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

/** Atributo requerido para definir el volumen de combustible adquirido.**/
export interface Cantidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para definir el volumen de combustible adquirido.**/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesCantidad = string;

/** Atributo requerido  para expresar la clave de cliente de la estación de servicio, a 10 caracteres, cuando sea requerido.
 * @minLength 1
 * @maxLength 10
 **/
export interface ClaveEstacion extends XastElement {
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
/** Atributo requerido  para expresar la clave de cliente de la estación de servicio, a 10 caracteres, cuando sea requerido.
 * @minLength 1
 * @maxLength 10
 **/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesClaveEstacion = string;

/** Nodo requerido para la expresión de una transacción para operaciones de compra de combustibles.**/
export interface ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustibles extends XastElement {
	type: 'element';
	name: 'ConceptoConsumoDeCombustibles';
	attributes: {
		/** Atributo requerido para definir el volumen de combustible adquirido.	**/
		cantidad: string;
		/** Atributo requerido  para expresar la clave de cliente de la estación de servicio, a 10 caracteres, cuando sea requerido.	**/
		claveEstacion: string;
		/** Atributo requerido para la expresión de la Fecha y hora de expedición  de la operación reportada. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.	**/
		/** A date, unknown format **/
		fecha: string;
		/** Atributo requerido para referir el número de folio de cada operación realizada por cada monedero electrónico.	**/
		folioOperacion: string;
		/** Atributo requerido para la expresión del identificador o número del monedero electrónico	**/
		identificador: string;
		/** Atributo requerido para definir el monto  total de consumo de combustible. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario.	**/
		importe: string;
		/** Atributo requerido para expresar el nombre del combustible adquirido.	**/
		nombreCombustible: string;
		/** Atributo requerido del RFC del enajenante del combustible	**/
		rfc: string;
		/** Atributo requerido para definir el precio unitario del combustible adquirido.	**/
		valorUnitario: string;
	};
	children: ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesDeterminados[];
}

/** Nodo requerido para enlistar los conceptos cubiertos por Consumo de Combustibles.**/
export interface ConsumoDeCombustiblesConceptos extends XastElement {
	type: 'element';
	name: 'Conceptos';
	children: ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustibles[];
}

/** Complemento al Comprobante Fiscal Digital por Internet (CFDI) para integrar la información de consumo de combustibles por monedero electrónico.**/
export interface ConsumoDeCombustibles extends XastElement {
	type: 'element';
	name: 'ConsumoDeCombustibles';
	attributes: {
		/** Nodo requerido para expresar el número de cuenta del adquirente del monedero electrónico	**/
		numeroDeCuenta: string;
		/** Atributo opcional para representar la suma de todos los importes tipo ConceptoConsumoDeCombustibles.	**/
		subTotal?: string;
		/** Atributo requerido para expresar el tipo de operación de acuerdo con el medio de pago.	**/
		tipoOperacion: string;
		/** Atributo requerido para expresar el monto total de consumo de combustibles.	**/
		total: string;
		/** Atributo requerido para la expresión de la versión del complemento	**/
		version: string;
	};
	children: ConsumoDeCombustiblesConceptos[];
}

/** Nodo para la definición de información detallada de un impuesto específico**/
export interface ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesDeterminadosDeterminado extends XastElement {
	type: 'element';
	name: 'Determinado';
	attributes: {
		/** Atributo requerido para definir el importe o monto del impuesto	**/
		importe: string;
		/** Atributo requerido para definir el tipo de impuesto	**/
		impuesto: ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesDeterminadosDeterminadoImpuesto;
		/** Atributo requerido para señalar la tasa del impuesto por cada concepto amparado en el comprobante	**/
		tasa: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo requerido para enlistar los impuestos determinados aplicables de combustibles.**/
export interface ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesDeterminados extends XastElement {
	type: 'element';
	name: 'Determinados';
	children: ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesDeterminadosDeterminado[];
}

/** Atributo requerido para la expresión de la Fecha y hora de expedición  de la operación reportada. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.**/
export interface Fecha extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para la expresión de la Fecha y hora de expedición  de la operación reportada. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.**/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesFecha = string;

/** Atributo requerido para referir el número de folio de cada operación realizada por cada monedero electrónico.
 * @minLength 1
 **/
export interface FolioOperacion extends XastElement {
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
/** Atributo requerido para referir el número de folio de cada operación realizada por cada monedero electrónico.
 * @minLength 1
 **/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesFolioOperacion = string;

/** Atributo requerido para la expresión del identificador o número del monedero electrónico
 * @minLength 1
 **/
export interface Identificador extends XastElement {
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
/** Atributo requerido para la expresión del identificador o número del monedero electrónico
 * @minLength 1
 **/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesIdentificador = string;

/** Atributo requerido para definir el monto  total de consumo de combustible. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario.**/
export interface Importe extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para definir el monto  total de consumo de combustible. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario.**/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesImporte = string;

/** Atributo requerido para definir el importe o monto del impuesto**/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesDeterminadosDeterminadoImporte = string;

/** Atributo requerido para definir el tipo de impuesto**/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesDeterminadosDeterminadoImpuesto = 'IVA' | 'IEPS';

/** Atributo requerido para expresar el nombre del combustible adquirido.
 * @minLength 1
 **/
export interface NombreCombustible extends XastElement {
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
/** Atributo requerido para expresar el nombre del combustible adquirido.
 * @minLength 1
 **/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesNombreCombustible = string;

/** Nodo requerido para expresar el número de cuenta del adquirente del monedero electrónico
 * @minLength 1
 **/
export interface NumeroDeCuenta extends XastElement {
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
/** Nodo requerido para expresar el número de cuenta del adquirente del monedero electrónico
 * @minLength 1
 **/
export type ConsumoDeCombustiblesNumeroDeCuenta = string;

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

/** Atributo opcional para representar la suma de todos los importes tipo ConceptoConsumoDeCombustibles.**/
export interface SubTotal extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo opcional para representar la suma de todos los importes tipo ConceptoConsumoDeCombustibles.**/
export type ConsumoDeCombustiblesSubTotal = string;

/** Atributo requerido para señalar la tasa del impuesto por cada concepto amparado en el comprobante**/
export interface Tasa extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para señalar la tasa del impuesto por cada concepto amparado en el comprobante**/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesDeterminadosDeterminadoTasa = string;

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
export type ConsumoDeCombustiblesTipoOperacion = string;

/** Atributo requerido para expresar el monto total de consumo de combustibles.**/
export interface Total extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar el monto total de consumo de combustibles.**/
export type ConsumoDeCombustiblesTotal = string;

/** Atributo requerido para definir el precio unitario del combustible adquirido.**/
export interface ValorUnitario extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para definir el precio unitario del combustible adquirido.**/
export type ConsumoDeCombustiblesConceptosConceptoConsumoDeCombustiblesValorUnitario = string;

/** Atributo requerido para la expresión de la versión del complemento**/
export interface Version extends XastElement {
	name: 'version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
