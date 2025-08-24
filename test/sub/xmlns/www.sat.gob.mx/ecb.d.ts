import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/ecb/ecb.xsd

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

/** Atributo requerido para precisar la descripción del bien o servicio cubierto por el cargo a la cuenta bancaria.
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
/** Atributo requerido para precisar la descripción del bien o servicio cubierto por el cargo a la cuenta bancaria.
 * @minLength 1
 **/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBDescripcion = string;

/** Atributo requerido para precisar la descripción del bien o servicio cubierto por el cargo a la cuenta bancaria.
 * @minLength 1
 **/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBFiscalDescripcion = string;

/** Complemento al Comprobante Fiscal Digital (CFD) y Comprobante Fiscal Digital a través de Internet (CFDI) para integrar información aplicable al estado de cuenta bancario.**/
export interface EstadoDeCuentaBancario extends XastElement {
	type: 'element';
	name: 'EstadoDeCuentaBancario';
	attributes: {
		/** Atributo requerido para indicar el nombre del cuentahabiente de la institución bancaria.	**/
		nombreCliente: string;
		/** Atributo requerido para indicar el número de cuenta del producto bancario.	**/
		numeroCuenta: string;
		/** Atributo requerido para indicar periodo de los cargos o abonos al instrumento bancario.	**/
		periodo: string;
		/** Atributo opcional para indicar la sucursal a la cual pertenece el cuentahabiente.	**/
		sucursal?: string;
		/** Atributo requerido con valor prefijado a 1.0 que indica la versión del estándar bajo el que se encuentra expresado el complemento al comprobante.	**/
		version: string;
	};
	children: EstadoDeCuentaBancarioMovimientos[];
}

/** Atributo requerido únicamente para la expresión de la fecha (mes/día) de la operación realizada por el cuentahabiente.**/
export interface Fecha extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido únicamente para la expresión de la fecha (mes/día) de la operación realizada por el cuentahabiente.**/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBFecha = string;

/** Atributo requerido únicamente para la expresión de la fecha (mes/día) de la operación realizada por el cuentahabiente.**/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBFiscalFecha = string;

/** Atributo requerido para indicar el importe de la operación realizada por el cuentahabiente por medio del instrumento bancario.**/
export interface Importe extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para indicar el importe de la operación realizada por el cuentahabiente por medio del instrumento bancario.**/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBImporte = string;

/** Atributo requerido para indicar el importe de la operación realizada por el cuentahabiente por medio del instrumento bancario.**/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBFiscalImporte = string;

/** Atributo opcional para indicar en que moneda se realizó la operación. Si no se especifica dato alguno, se entenderá que el importe está expresado en moneda nacional.
 * @minLength 1
 **/
export interface Moneda extends XastElement {
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
/** Atributo opcional para indicar en que moneda se realizó la operación. Si no se especifica dato alguno, se entenderá que el importe está expresado en moneda nacional.
 * @minLength 1
 **/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBMoneda = string;

/** Atributo opcional para indicar en que moneda se realizó la operación. Si no se especifica dato alguno, se entenderá que el importe está expresado en moneda nacional.
 * @minLength 1
 **/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBFiscalMoneda = string;

/** Nodo requerido para expresar las operaciones a ser detalladas en el estado de cuenta bancario que no cuentan con un RFC**/
export interface EstadoDeCuentaBancarioMovimientosMovimientoECB extends XastElement {
	type: 'element';
	name: 'MovimientoECB';
	attributes: {
		/** Atributo requerido para precisar la descripción del bien o servicio cubierto por el cargo a la cuenta bancaria.	**/
		descripcion: string;
		/** Atributo requerido únicamente para la expresión de la fecha (mes/día) de la operación realizada por el cuentahabiente.	**/
		/** A date, unknown format **/
		fecha: string;
		/** Atributo requerido para indicar el importe de la operación realizada por el cuentahabiente por medio del instrumento bancario.	**/
		importe: string;
		/** Atributo opcional para indicar en que moneda se realizó la operación. Si no se especifica dato alguno, se entenderá que el importe está expresado en moneda nacional.	**/
		moneda?: string;
		/** Atributo opcional para indicar el número de referencia o autorización con el que se identifica la operación realizada por el cuentahabiente.	**/
		referencia?: string;
		/** Atributo opcional para indicar el saldo al corte del instrumento bancario del cuentahabiente.	**/
		saldoAlCorte?: string;
		/** Atributo opcional para indicar el saldo inicial del instrumento bancario del cuentahabiente.	**/
		saldoInicial?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo requerido para expresar las operaciones a ser detalladas en el estado de cuenta bancario con RFC  con efecto fiscal.**/
export interface EstadoDeCuentaBancarioMovimientosMovimientoECBFiscal extends XastElement {
	type: 'element';
	name: 'MovimientoECBFiscal';
	attributes: {
		/** Atributo requerido para precisar la descripción del bien o servicio cubierto por el cargo a la cuenta bancaria.	**/
		descripcion: string;
		/** Atributo requerido únicamente para la expresión de la fecha (mes/día) de la operación realizada por el cuentahabiente.	**/
		/** A date, unknown format **/
		fecha: string;
		/** Atributo requerido para indicar el importe de la operación realizada por el cuentahabiente por medio del instrumento bancario.	**/
		Importe: string;
		/** Atributo opcional para indicar en que moneda se realizó la operación. Si no se especifica dato alguno, se entenderá que el importe está expresado en moneda nacional.	**/
		moneda?: string;
		/** Atributo opcional para indicar el número de referencia o autorización con el que se identifica la operación realizada por el cuentahabiente.	**/
		referencia?: string;
		/** Atributo requerido para indicar el RFC del enajenante, sin el cual no se puede acreditar la compra de bienes o servicios por medio del estado de cuenta bancario.	**/
		RFCenajenante: string;
		/** Atributo opcional para indicar el saldo al corte del instrumento bancario del cuentahabiente.	**/
		saldoAlCorte?: string;
		/** Atributo opcional para indicar el saldo inicial del instrumento bancario del cuentahabiente.	**/
		saldoInicial?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo requerido para enlistar los conceptos cubiertos por Estado de Cuenta Bancario.**/
export interface EstadoDeCuentaBancarioMovimientos extends XastElement {
	type: 'element';
	name: 'Movimientos';
	children: (EstadoDeCuentaBancarioMovimientosMovimientoECB | EstadoDeCuentaBancarioMovimientosMovimientoECBFiscal)[];
}

/** Atributo requerido para indicar el nombre del cuentahabiente de la institución bancaria.
 * @minLength 1
 **/
export interface NombreCliente extends XastElement {
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
/** Atributo requerido para indicar el nombre del cuentahabiente de la institución bancaria.
 * @minLength 1
 **/
export type EstadoDeCuentaBancarioNombreCliente = string;

/** Atributo requerido para indicar el número de cuenta del producto bancario.**/
export interface NumeroCuenta extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para indicar el número de cuenta del producto bancario.**/
export type EstadoDeCuentaBancarioNumeroCuenta = string;

/** Atributo requerido para indicar periodo de los cargos o abonos al instrumento bancario.
 * @minLength 1
 **/
export interface Periodo extends XastElement {
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
/** Atributo requerido para indicar periodo de los cargos o abonos al instrumento bancario.
 * @minLength 1
 **/
export type EstadoDeCuentaBancarioPeriodo = string;

/** Atributo opcional para indicar el número de referencia o autorización con el que se identifica la operación realizada por el cuentahabiente.
 * @minLength 1
 **/
export interface Referencia extends XastElement {
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
/** Atributo opcional para indicar el número de referencia o autorización con el que se identifica la operación realizada por el cuentahabiente.
 * @minLength 1
 **/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBReferencia = string;

/** Atributo opcional para indicar el número de referencia o autorización con el que se identifica la operación realizada por el cuentahabiente.
 * @minLength 1
 **/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBFiscalReferencia = string;

/** Atributo requerido para indicar el RFC del enajenante, sin el cual no se puede acreditar la compra de bienes o servicios por medio del estado de cuenta bancario.
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]{2}[0-9,A]
 * @minLength 12
 * @maxLength 13
 **/
export interface RFCenajenante extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]{2}[0-9,A]
			 * @minLength 12
			 * @maxLength 13
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para indicar el RFC del enajenante, sin el cual no se puede acreditar la compra de bienes o servicios por medio del estado de cuenta bancario.
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]{2}[0-9,A]
 * @minLength 12
 * @maxLength 13
 **/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBFiscalRFCenajenante = string;

/** Atributo opcional para indicar el saldo al corte del instrumento bancario del cuentahabiente.**/
export interface SaldoAlCorte extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo opcional para indicar el saldo al corte del instrumento bancario del cuentahabiente.**/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBSaldoAlCorte = string;

/** Atributo opcional para indicar el saldo al corte del instrumento bancario del cuentahabiente.**/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBFiscalSaldoAlCorte = string;

/** Atributo opcional para indicar el saldo inicial del instrumento bancario del cuentahabiente.**/
export interface SaldoInicial extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo opcional para indicar el saldo inicial del instrumento bancario del cuentahabiente.**/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBSaldoInicial = string;

/** Atributo opcional para indicar el saldo inicial del instrumento bancario del cuentahabiente.**/
export type EstadoDeCuentaBancarioMovimientosMovimientoECBFiscalSaldoInicial = string;

/** Atributo opcional para indicar la sucursal a la cual pertenece el cuentahabiente.
 * @minLength 1
 **/
export interface Sucursal extends XastElement {
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
/** Atributo opcional para indicar la sucursal a la cual pertenece el cuentahabiente.
 * @minLength 1
 **/
export type EstadoDeCuentaBancarioSucursal = string;

/** Atributo requerido con valor prefijado a 1.0 que indica la versión del estándar bajo el que se encuentra expresado el complemento al comprobante.**/
export interface Version extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido con valor prefijado a 1.0 que indica la versión del estándar bajo el que se encuentra expresado el complemento al comprobante.**/
export type EstadoDeCuentaBancarioVersion = string;
