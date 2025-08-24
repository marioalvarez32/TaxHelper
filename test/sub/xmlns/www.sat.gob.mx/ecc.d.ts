import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/ecc/ecc.xsd

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
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleCantidad = string;

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
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleClaveEstacion = string;

/** Nodo requerido para la expresión de una transacción a ser reportada en el estado de cuenta del proveedor de monedero electrónico para operaciones de compra de combustibles.**/
export interface EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustible extends XastElement {
	type: 'element';
	name: 'ConceptoEstadoDeCuentaCombustible';
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
	children: EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTraslados[];
}

/** Nodo requerido para enlistar los conceptos cubiertos por Estado de Cuenta de Combustible.**/
export interface EstadoDeCuentaCombustibleConceptos extends XastElement {
	type: 'element';
	name: 'Conceptos';
	children: EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustible[];
}

/** Complemento al Comprobante Fiscal Digital (CFD) y Comprobante Fiscal Digital por Internet (CFDI) para integrar la información aplicable al estado de cuenta emitido por un prestador de servicios de monedero electrónico.**/
export interface EstadoDeCuentaCombustible extends XastElement {
	type: 'element';
	name: 'EstadoDeCuentaCombustible';
	attributes: {
		/** Nodo requerido para expresar el número de cuenta del adquirente del monedero electrónico	**/
		numeroDeCuenta: string;
		/** Atributo opcional para representar la suma de todos los importes tipo ConceptoEstadoDeCuentaCombustible.	**/
		subTotal?: string;
		/** Atributo requerido para expresar el tipo de operación de acuerdo con el medio de pago.	**/
		tipoOperacion: string;
		/** Atributo requerido para expresar el monto total de consumo de combustible.	**/
		total: string;
	};
	children: EstadoDeCuentaCombustibleConceptos[];
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
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleFecha = string;

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
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleFolioOperacion = string;

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
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleIdentificador = string;

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
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleImporte = string;

/** Atributo requerido para definir el importe o monto del impuesto trasladado**/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTrasladoImporte = string;

/** Atributo requerido para definir el tipo de impuesto trasladado**/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTrasladoImpuesto = 'IVA' | 'IEPS';

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
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleNombreCombustible = string;

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
export type EstadoDeCuentaCombustibleNumeroDeCuenta = string;

/** Atributo requerido del RFC del enajenante del combustible
 * @minLength 12
 * @maxLength 13
 **/
export interface Rfc extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 12
			 * @maxLength 13
			 **/
			value: string;
		},
	];
}
/** Atributo requerido del RFC del enajenante del combustible
 * @minLength 12
 * @maxLength 13
 **/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleRfc = string;

/** Atributo opcional para representar la suma de todos los importes tipo ConceptoEstadoDeCuentaCombustible.**/
export interface SubTotal extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo opcional para representar la suma de todos los importes tipo ConceptoEstadoDeCuentaCombustible.**/
export type EstadoDeCuentaCombustibleSubTotal = string;

/** Atributo requerido para señalar la tasa del impuesto que se traslada por cada concepto amparado en el comprobante**/
export interface Tasa extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para señalar la tasa del impuesto que se traslada por cada concepto amparado en el comprobante**/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTrasladoTasa = string;

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
export type EstadoDeCuentaCombustibleTipoOperacion = string;

/** Atributo requerido para expresar el monto total de consumo de combustible.**/
export interface Total extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar el monto total de consumo de combustible.**/
export type EstadoDeCuentaCombustibleTotal = string;

/** Nodo para la definición de información detallada de un traslado de impuesto específico**/
export interface EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTraslado extends XastElement {
	type: 'element';
	name: 'Traslado';
	attributes: {
		/** Atributo requerido para definir el importe o monto del impuesto trasladado	**/
		importe: string;
		/** Atributo requerido para definir el tipo de impuesto trasladado	**/
		impuesto: EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTrasladoImpuesto;
		/** Atributo requerido para señalar la tasa del impuesto que se traslada por cada concepto amparado en el comprobante	**/
		tasa: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo requerido para enlistar los impuestos trasladados aplicables de combustibles.**/
export interface EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTraslados extends XastElement {
	type: 'element';
	name: 'Traslados';
	children: EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTraslado[];
}

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
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleValorUnitario = string;
