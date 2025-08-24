import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/spei/spei.xsd

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

/** Atributo requerido para expresar el nombre del Banco o Institución Financiera emisora del SPEI
 * @minLength 1
 * @maxLength 40
 **/
export interface BancoEmisor extends XastElement {
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
/** Atributo requerido para expresar el nombre del Banco o Institución Financiera emisora del SPEI
 * @minLength 1
 * @maxLength 40
 **/
export type ComplementoSPEISPEITerceroOrdenanteBancoEmisor = string;

/** Atributo requerido para expresar el nombre del Banco o Institución Financiera Receptora del SPEI
 * @minLength 1
 * @maxLength 40
 **/
export interface BancoReceptor extends XastElement {
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
/** Atributo requerido para expresar el nombre del Banco o Institución Financiera Receptora del SPEI
 * @minLength 1
 * @maxLength 40
 **/
export type ComplementoSPEISPEITerceroBeneficiarioBancoReceptor = string;

/** Elemento para describir los datos del beneficiario del SPEI**/
export interface ComplementoSPEISPEITerceroBeneficiario extends XastElement {
	type: 'element';
	name: 'Beneficiario';
	attributes: {
		/** Atributo requerido para expresar el nombre del Banco o Institución Financiera Receptora del SPEI	**/
		BancoReceptor: string;
		/** Descripción del motivo por el que el ordenante hace el pago al beneficiario.	**/
		Concepto: string;
		/** Esta cuenta deberá estar ligada al campo Tipo de Cuenta del Beneficiario, donde son abonados los fondos.	**/
		Cuenta: string;
		/** Importes de IVA correspondientes al pago. El monto debe ser mayor a cero y menor o igual a 9,999,999,999,999,999.99	**/
		IVA: string;
		/** Atributo obligatorio para la expresión del monto de la operación. Se trata de un entero positivo	**/
		MontoPago: string;
		/** Nombre de la persona física o moral receptora del pago.	**/
		Nombre: string;
		/** Atributo requerido para la expresión del registro federal de contribuyentes del beneficiario. Se pondrá ND en caso de no estar disponible	**/
		RFC: string;
		/** Categoría de la cuenta a la que se efectuará el abono por la transferencia electrónica de fondos. Consultar Catálogo de Tipos de Cuenta.	**/
		TipoCuenta: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo que contiene la información del CDA fidedigna que la institución ha enviado a Banco de México.
 * @maxLength 841
 **/
export interface CadenaCDA extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxLength 841
			 **/
			value: string;
		},
	];
}
/** Atributo que contiene la información del CDA fidedigna que la institución ha enviado a Banco de México.
 * @maxLength 841
 **/
export type ComplementoSPEISPEITerceroCadenaCDA = string;

/** Clave SPEI del Participante Emisor.
 * @maxLength 5
 * @minLength 5
 **/
export interface ClaveSPEI extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxLength 5
			 * @minLength 5
			 **/
			value: string;
		},
	];
}
/** Clave SPEI del Participante Emisor.
 * @maxLength 5
 * @minLength 5
 **/
export type ComplementoSPEISPEITerceroClaveSPEI = string;

/** Complemento para el uso de SPEI Tercero a Tercero**/
export interface ComplementoSPEI extends XastElement {
	type: 'element';
	name: 'Complemento_SPEI';
	children: ComplementoSPEISPEITercero[];
}

/** Descripción del motivo por el que el ordenante hace el pago al beneficiario.
 * @maxLength 40
 **/
export interface Concepto extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxLength 40
			 **/
			value: string;
		},
	];
}
/** Descripción del motivo por el que el ordenante hace el pago al beneficiario.
 * @maxLength 40
 **/
export type ComplementoSPEISPEITerceroBeneficiarioConcepto = string;

/** Esta cuenta deberá estar ligada al campo Tipo de Cuenta del Beneficiario, donde son abonados los fondos.
 * @maxLength 20
 * @minLength 20
 **/
export interface Cuenta extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxLength 20
			 * @minLength 20
			 **/
			value: string;
		},
	];
}
/** Esta cuenta deberá estar ligada al campo Tipo de Cuenta del Beneficiario, donde son abonados los fondos.
 * @maxLength 20
 * @minLength 20
 **/
export type ComplementoSPEISPEITerceroBeneficiarioCuenta = string;

/** Cuenta que deberá estar ligada al Tipo de Cuenta del Ordenante, donde serán cargados los fondos.
 * @maxLength 20
 * @minLength 20
 **/
export type ComplementoSPEISPEITerceroOrdenanteCuenta = string;

/** Fecha de operación con formato. Debe ser la misma que la fecha de operación del sistema.
 * @pattern ((000[1-9])|(00[1-9][0-9])|(0[1-9][0-9]{2})|([1-9][0-9]{3}))-((0[1-9])|(1[012]))-((0[1-9])|([12][0-9])|(3[01]))
 * @maxInclusive 9999-12-31
 **/
export interface FechaOperacion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern ((000[1-9])|(00[1-9][0-9])|(0[1-9][0-9]{2})|([1-9][0-9]{3}))-((0[1-9])|(1[012]))-((0[1-9])|([12][0-9])|(3[01]))
			 * @maxInclusive 9999-12-31
			 **/
			value: string;
		},
	];
}
/** Fecha de operación con formato. Debe ser la misma que la fecha de operación del sistema.
 * @pattern ((000[1-9])|(00[1-9][0-9])|(0[1-9][0-9]{2})|([1-9][0-9]{3}))-((0[1-9])|(1[012]))-((0[1-9])|([12][0-9])|(3[01]))
 * @maxInclusive 9999-12-31
 **/
export type ComplementoSPEISPEITerceroFechaOperacion = string;

/** hora del acreditamiento
 * @pattern (([01][0-9])|(2[0-3]))(:[0-5][0-9]){2}(\.[0-9]+)?
 **/
export interface Hora extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern (([01][0-9])|(2[0-3]))(:[0-5][0-9]){2}(\.[0-9]+)?
			 **/
			value: string;
		},
	];
}
/** hora del acreditamiento
 * @pattern (([01][0-9])|(2[0-3]))(:[0-5][0-9]){2}(\.[0-9]+)?
 **/
export type ComplementoSPEISPEITerceroHora = string;

/** Importes de IVA correspondientes al pago. El monto debe ser mayor a cero y menor o igual a 9,999,999,999,999,999.99
 * @maxLength 19
 * @minLength 19
 **/
export interface IVA extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxLength 19
			 * @minLength 19
			 **/
			value: string;
		},
	];
}
/** Importes de IVA correspondientes al pago. El monto debe ser mayor a cero y menor o igual a 9,999,999,999,999,999.99
 * @maxLength 19
 * @minLength 19
 **/
export type ComplementoSPEISPEITerceroBeneficiarioIVA = string;

/** Atributo obligatorio para la expresión del monto de la operación. Se trata de un entero positivo
 * @maxInclusive 1
 * @maxLength 19
 * @minLength 19
 **/
export interface MontoPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 1
			 * @maxLength 19
			 * @minLength 19
			 **/
			value: string;
		},
	];
}
/** Atributo obligatorio para la expresión del monto de la operación. Se trata de un entero positivo
 * @maxInclusive 1
 * @maxLength 19
 * @minLength 19
 **/
export type ComplementoSPEISPEITerceroBeneficiarioMontoPago = string;

/** Nombre de la persona física o moral receptora del pago.
 * @maxLength 40
 **/
export interface Nombre extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxLength 40
			 **/
			value: string;
		},
	];
}
/** Nombre de la persona física o moral receptora del pago.
 * @maxLength 40
 **/
export type ComplementoSPEISPEITerceroBeneficiarioNombre = string;

/** Nombre de la persona física o moral que ordena el envío del pago.
 * @maxLength 40
 **/
export type ComplementoSPEISPEITerceroOrdenanteNombre = string;

/** Atributo requerido para la identificación del certificado de seguridad utilizado para el sello digital.
 * @maxLength 20
 **/
export interface NumeroCertificado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxLength 20
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para la identificación del certificado de seguridad utilizado para el sello digital.
 * @maxLength 20
 **/
export type ComplementoSPEISPEITerceroNumeroCertificado = string;

/** Elemento para describir los datos del ordenante del SPEI**/
export interface ComplementoSPEISPEITerceroOrdenante extends XastElement {
	type: 'element';
	name: 'Ordenante';
	attributes: {
		/** Atributo requerido para expresar el nombre del Banco o Institución Financiera emisora del SPEI	**/
		BancoEmisor: string;
		/** Cuenta que deberá estar ligada al Tipo de Cuenta del Ordenante, donde serán cargados los fondos.	**/
		Cuenta: string;
		/** Nombre de la persona física o moral que ordena el envío del pago.	**/
		Nombre: string;
		/** Corresponde al registro federal de contribuyentes o clave única de registro de población del ordenante. Se pondrá ND en caso de no tenerlo disponible	**/
		RFC: string;
		/** Categoría de la Cuenta a la que se efectuará el cargo por la transferencia electrónica de fondos.	**/
		TipoCuenta: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Tipo definido para la expresión de RFC's de contribuyentes. Cabe hacer la mención que debido a las reglas definidas por el estándar XML en el caso de que un RFC dado incluya un carácter ampersand, dicho carácter deberá ser expresado mediante la secuencia de escape especificado como parte del estándar. En la definición del tipo se expresa una longitud mínima y máxima, sin embargo la longitud puede ser redefinida como una extensión según se determina el uso particular
 * @minLength 2
 * @maxLength 18
 **/
export interface RFC extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 2
			 * @maxLength 18
			 **/
			value: string;
		},
	];
}
/** Tipo definido para la expresión de RFC's de contribuyentes. Cabe hacer la mención que debido a las reglas definidas por el estándar XML en el caso de que un RFC dado incluya un carácter ampersand, dicho carácter deberá ser expresado mediante la secuencia de escape especificado como parte del estándar. En la definición del tipo se expresa una longitud mínima y máxima, sin embargo la longitud puede ser redefinida como una extensión según se determina el uso particular
 * @minLength 2
 * @maxLength 18
 **/
export type TRFC = string;

/** Atributo requerido para contener el sello digital del comprobante de pago. El sello deberá ser expresado cómo una cadena de texto en formato Base 64.**/
export interface Sello extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para contener el sello digital del comprobante de pago. El sello deberá ser expresado cómo una cadena de texto en formato Base 64.**/
export type ComplementoSPEISPEITerceroSello = string;

/** Estándar aplicable a operaciones de SPEI a terceros**/
export interface ComplementoSPEISPEITercero extends XastElement {
	type: 'element';
	name: 'SPEI_Tercero';
	attributes: {
		/** Atributo que contiene la información del CDA fidedigna que la institución ha enviado a Banco de México.	**/
		cadenaCDA: string;
		/** Clave SPEI del Participante Emisor.	**/
		ClaveSPEI: string;
		/** Fecha de operación con formato. Debe ser la misma que la fecha de operación del sistema.	**/
		/** A date, unknown format **/
		FechaOperacion: string;
		/** hora del acreditamiento	**/
		Hora: string;
		/** Atributo requerido para la identificación del certificado de seguridad utilizado para el sello digital.	**/
		numeroCertificado: string;
		/** Atributo requerido para contener el sello digital del comprobante de pago. El sello deberá ser expresado cómo una cadena de texto en formato Base 64.	**/
		sello: string;
	};
	children: (ComplementoSPEISPEITerceroBeneficiario | ComplementoSPEISPEITerceroOrdenante)[];
}

/** Categoría de la cuenta a la que se efectuará el abono por la transferencia electrónica de fondos. Consultar Catálogo de Tipos de Cuenta.
 * @maxLength 2
 * @minLength 2
 **/
export interface TipoCuenta extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxLength 2
			 * @minLength 2
			 **/
			value: string;
		},
	];
}
/** Categoría de la cuenta a la que se efectuará el abono por la transferencia electrónica de fondos. Consultar Catálogo de Tipos de Cuenta.
 * @maxLength 2
 * @minLength 2
 **/
export type ComplementoSPEISPEITerceroBeneficiarioTipoCuenta = string;

/** Categoría de la Cuenta a la que se efectuará el cargo por la transferencia electrónica de fondos.
 * @maxLength 2
 * @minLength 2
 **/
export type ComplementoSPEISPEITerceroOrdenanteTipoCuenta = string;
