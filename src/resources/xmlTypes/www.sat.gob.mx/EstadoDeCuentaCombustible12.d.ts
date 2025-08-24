import * as Primitive from '../xml-primitives';
import * as catCombustible from './sitio_internet/cfd/catalogos/Combustible';
import * as tdCFDI from './sitio_internet/cfd/tipoDatos/tdCFDI';

// Source files:
// http://localhost:56607/sitio_internet/cfd/EstadoDeCuentaCombustible/ecc12.xsd

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

/** Atributo requerido para definir el volumen de combustible adquirido.
 * @pattern [0-9]{1,14}(.([0-9]{1,3}))
 * @maxInclusive 0.001
 **/
export interface Cantidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,14}(.([0-9]{1,3}))
			 * @maxInclusive 0.001
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para definir el volumen de combustible adquirido.
 * @pattern [0-9]{1,14}(.([0-9]{1,3}))
 * @maxInclusive 0.001
 **/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleCantidad = string;

/** Atributo requerido para expresar la clave de cliente de la estación de servicio, a 10 caracteres.
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
/** Atributo requerido para expresar la clave de cliente de la estación de servicio, a 10 caracteres.
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
		Cantidad: string;
		/** Atributo requerido para expresar la clave de cliente de la estación de servicio, a 10 caracteres.	**/
		ClaveEstacion: string;
		/** Atributo requerido para la expresión de la Fecha y hora de expedición de la operación reportada. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.
		 **/
		/** A date, unknown format **/
		Fecha: string;
		/** Atributo requerido para referir el número de folio de cada operación realizada por cada monedero electrónico.	**/
		FolioOperacion: string;
		/** Atributo requerido para la expresión del identificador o número del monedero electrónico.	**/
		Identificador: string;
		/** Atributo requerido para definir el monto total de consumo de combustible. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario, redondeado a centésimas.	**/
		Importe: string;
		/** Atributo requerido para expresar el nombre del combustible adquirido.	**/
		NombreCombustible: string;
		/** Atributo requerido del RFC del enajenante del combustible.	**/
		Rfc: string;
		/** Atributo requerido para indicar la clave del tipo de combustible.	**/
		TipoCombustible: catCombustible.CClaveTipoCombustible;
		/** Atributo condicional para precisar la unidad de medida.	**/
		Unidad?: string;
		/** Atributo requerido para definir el precio unitario del combustible adquirido.	**/
		ValorUnitario: string;
	};
	children: EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTraslados[];
}

/** Nodo requerido para enlistar los conceptos cubiertos por Estado de Cuenta de Combustible.**/
export interface EstadoDeCuentaCombustibleConceptos extends XastElement {
	type: 'element';
	name: 'Conceptos';
	children: EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustible[];
}

/** Complemento para el Comprobante Fiscal Digital por Internet (CFDI) para integrar la información aplicable al estado de cuenta emitido por un prestador de servicios de monedero electrónico**/
export interface EstadoDeCuentaCombustible extends XastElement {
	type: 'element';
	name: 'EstadoDeCuentaCombustible';
	attributes: {
		/** Atributo requerido para expresar el número de cuenta del adquirente del monedero electrónico	**/
		NumeroDeCuenta: string;
		/** Atributo requerido para representar la suma de todos los importes tipo ConceptoEstadoDeCuentaCombustible.	**/
		SubTotal: string;
		/** Atributo requerido para expresar el tipo de operación de acuerdo con el medio de pago.	**/
		TipoOperacion: string;
		/** Atributo requerido para expresar el monto total de consumo de combustible.	**/
		Total: string;
		/** Atributo requerido que indica la versión del complemento.	**/
		Version: string;
	};
	children: EstadoDeCuentaCombustibleConceptos[];
}

/** Tipo definido para la expresión de la fecha y hora. Se expresa en la forma AAAA-MM-DDThh:mm:ss
 * @pattern (20[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
 **/
export interface Fecha extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern (20[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
			 **/
			value: string;
		},
	];
}
/** Tipo definido para la expresión de la fecha y hora. Se expresa en la forma AAAA-MM-DDThh:mm:ss
 * @pattern (20[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
 **/
export type TFechaH = string;

/** Atributo requerido para referir el número de folio de cada operación realizada por cada monedero electrónico.
 * @minLength 1
 * @maxLength 50
 **/
export interface FolioOperacion extends XastElement {
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
/** Atributo requerido para referir el número de folio de cada operación realizada por cada monedero electrónico.
 * @minLength 1
 * @maxLength 50
 **/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleFolioOperacion = string;

/** Atributo requerido para la expresión del identificador o número del monedero electrónico.
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
/** Atributo requerido para la expresión del identificador o número del monedero electrónico.
 * @minLength 1
 **/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleIdentificador = string;

/** Atributo requerido para definir el monto total de consumo de combustible. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario, redondeado a centésimas.
 * @pattern [0-9]{1,14}(.([0-9]{1,2}))
 **/
export interface Importe extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,14}(.([0-9]{1,2}))
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para definir el monto total de consumo de combustible. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario, redondeado a centésimas.
 * @pattern [0-9]{1,14}(.([0-9]{1,2}))
 **/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleImporte = string;

/** Atributo requerido para definir el importe o monto del impuesto trasladado.
 * @pattern [0-9]{1,14}(.([0-9]{1,2}))
 * @maxInclusive 0.01
 **/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTrasladoImporte = string;

/** Atributo requerido para definir el tipo de impuesto trasladado.**/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTrasladoImpuesto = 'IVA' | 'IEPS';

/** Atributo requerido para expresar el nombre del combustible adquirido.
 * @minLength 1
 * @maxLength 300
 **/
export interface NombreCombustible extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 300
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el nombre del combustible adquirido.
 * @minLength 1
 * @maxLength 300
 **/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleNombreCombustible = string;

/** Atributo requerido para expresar el número de cuenta del adquirente del monedero electrónico
 * @minLength 1
 * @maxLength 50
 **/
export interface NumeroDeCuenta extends XastElement {
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
/** Atributo requerido para expresar el número de cuenta del adquirente del monedero electrónico
 * @minLength 1
 * @maxLength 50
 **/
export type EstadoDeCuentaCombustibleNumeroDeCuenta = string;

/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export interface Rfc extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
			 * @minLength 12
			 * @maxLength 13
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export type TRFC = string;

/** Atributo requerido para representar la suma de todos los importes tipo ConceptoEstadoDeCuentaCombustible.
 * @pattern [0-9]{1,14}(.([0-9]{1,2}))
 **/
export interface SubTotal extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,14}(.([0-9]{1,2}))
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para representar la suma de todos los importes tipo ConceptoEstadoDeCuentaCombustible.
 * @pattern [0-9]{1,14}(.([0-9]{1,2}))
 **/
export type EstadoDeCuentaCombustibleSubTotal = string;

/** Atributo requerido para señalar la tasa o la cuota del impuesto que se traslada por cada concepto amparado en el comprobante. Cuando se registre un porcentaje, por ejemplo 16%, debe expresarse como 0.16 y no como 16.00**/
export interface TasaOCuota extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para señalar la tasa o la cuota del impuesto que se traslada por cada concepto amparado en el comprobante. Cuando se registre un porcentaje, por ejemplo 16%, debe expresarse como 0.16 y no como 16.00**/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTrasladoTasaOCuota = string;

/** Atributo requerido para indicar la clave del tipo de combustible.**/
export type CClaveTipoCombustible = '1' | '2' | '3' | '4' | '5';

/** Atributo requerido para expresar el tipo de operación de acuerdo con el medio de pago.**/
export interface TipoOperacion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar el tipo de operación de acuerdo con el medio de pago.**/
export type EstadoDeCuentaCombustibleTipoOperacion = string;

/** Atributo requerido para expresar el monto total de consumo de combustible.
 * @pattern [0-9]{1,14}(.([0-9]{1,2}))
 **/
export interface Total extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,14}(.([0-9]{1,2}))
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el monto total de consumo de combustible.
 * @pattern [0-9]{1,14}(.([0-9]{1,2}))
 **/
export type EstadoDeCuentaCombustibleTotal = string;

/** Nodo para la definición de información detallada de un traslado de impuesto específico.**/
export interface EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTraslado extends XastElement {
	type: 'element';
	name: 'Traslado';
	attributes: {
		/** Atributo requerido para definir el importe o monto del impuesto trasladado.	**/
		Importe: string;
		/** Atributo requerido para definir el tipo de impuesto trasladado.	**/
		Impuesto: EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleTrasladosTrasladoImpuesto;
		/** Atributo requerido para señalar la tasa o la cuota del impuesto que se traslada por cada concepto amparado en el comprobante. Cuando se registre un porcentaje, por ejemplo 16%, debe expresarse como 0.16 y no como 16.00	**/
		TasaOCuota: string;
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

/** Atributo condicional para precisar la unidad de medida.
 * @minLength 1
 * @maxLength 25
 **/
export interface Unidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 25
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para precisar la unidad de medida.
 * @minLength 1
 * @maxLength 25
 **/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleUnidad = string;

/** Atributo requerido para definir el precio unitario del combustible adquirido.
 * @pattern [0-9]{1,14}(.([0-9]{1,3}))
 * @maxInclusive 0.001
 **/
export interface ValorUnitario extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,14}(.([0-9]{1,3}))
			 * @maxInclusive 0.001
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para definir el precio unitario del combustible adquirido.
 * @pattern [0-9]{1,14}(.([0-9]{1,3}))
 * @maxInclusive 0.001
 **/
export type EstadoDeCuentaCombustibleConceptosConceptoEstadoDeCuentaCombustibleValorUnitario = string;

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
export type EstadoDeCuentaCombustibleVersion = string;
