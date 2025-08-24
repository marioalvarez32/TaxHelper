import * as Primitive from '../xml-primitives';
import * as catCFDI from './sitio_internet/cfd/catalogos';
import * as catNomina from './sitio_internet/cfd/catalogos/Nomina';
import * as tdCFDI from './sitio_internet/cfd/tipoDatos/tdCFDI';

// Source files:
// http://localhost:56607/sitio_internet/cfd/nomina/nomina12.xsd

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

/** Nodo condicional para expresar ingresos por acciones o títulos valor que representan bienes. Se vuelve requerido cuando existan ingresos por sueldos derivados de adquisición de acciones o títulos (Art. 94, fracción VII LISR).**/
export interface NominaPercepcionesPercepcionAccionesOTitulos extends XastElement {
	type: 'element';
	name: 'AccionesOTitulos';
	attributes: {
		/** Atributo requerido para expresar el precio establecido al otorgarse la opción de ingresos en acciones o títulos valor.	**/
		PrecioAlOtorgarse: string;
		/** Atributo requerido para expresar el valor de mercado de las Acciones o Títulos valor al ejercer la opción.	**/
		ValorMercado: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo condicional para expresar el número de semanas o el periodo de años, meses y días que el empleado ha mantenido relación laboral con el empleador. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.
 * @pattern P(([1-9][0-9]{0,3})|0)W|P([1-9][0-9]?Y)?(([1-9]|1[012])M)?(0|[1-9]|[12][0-9]|3[01])D
 **/
export interface Antigedad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern P(([1-9][0-9]{0,3})|0)W|P([1-9][0-9]?Y)?(([1-9]|1[012])M)?(0|[1-9]|[12][0-9]|3[01])D
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el número de semanas o el periodo de años, meses y días que el empleado ha mantenido relación laboral con el empleador. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.
 * @pattern P(([1-9][0-9]{0,3})|0)W|P([1-9][0-9]?Y)?(([1-9]|1[012])M)?(0|[1-9]|[12][0-9]|3[01])D
 **/
export type NominaReceptorAntigedad = string;

/** Atributo requerido para expresar el año en que se determinó el saldo a favor del trabajador por el patrón que se incluye en el campo “RemanenteSalFav”.
 * @maxInclusive 2016
 **/
export interface Ao extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 2016
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el año en que se determinó el saldo a favor del trabajador por el patrón que se incluye en el campo “RemanenteSalFav”.
 * @maxInclusive 2016
 **/
export type NominaOtrosPagosOtroPagoCompensacionSaldosAFavorAo = string;

/** Atributo condicional para la expresión de la clave del Banco conforme al catálogo, donde se realiza el depósito de nómina.**/
export type CBanco =
	| '002'
	| '006'
	| '009'
	| '012'
	| '014'
	| '019'
	| '021'
	| '030'
	| '032'
	| '036'
	| '037'
	| '042'
	| '044'
	| '058'
	| '059'
	| '060'
	| '062'
	| '072'
	| '102'
	| '103'
	| '106'
	| '108'
	| '110'
	| '112'
	| '113'
	| '116'
	| '124'
	| '126'
	| '127'
	| '128'
	| '129'
	| '130'
	| '131'
	| '132'
	| '133'
	| '134'
	| '135'
	| '136'
	| '137'
	| '138'
	| '139'
	| '140'
	| '141'
	| '143'
	| '145'
	| '147'
	| '148'
	| '149'
	| '150'
	| '151'
	| '152'
	| '153'
	| '154'
	| '155'
	| '156'
	| '157'
	| '158'
	| '159'
	| '160'
	| '166'
	| '168'
	| '600'
	| '601'
	| '602'
	| '605'
	| '606'
	| '607'
	| '608'
	| '610'
	| '614'
	| '615'
	| '616'
	| '617'
	| '618'
	| '619'
	| '620'
	| '621'
	| '622'
	| '623'
	| '626'
	| '627'
	| '628'
	| '629'
	| '630'
	| '631'
	| '632'
	| '633'
	| '634'
	| '636'
	| '637'
	| '638'
	| '640'
	| '642'
	| '646'
	| '647'
	| '648'
	| '649'
	| '651'
	| '652'
	| '653'
	| '655'
	| '656'
	| '659'
	| '670'
	| '901'
	| '902';

/** Atributo requerido para la clave de deducción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres.
 * @pattern [^|]{3,15}
 * @minLength 3
 * @maxLength 15
 **/
export interface Clave extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{3,15}
			 * @minLength 3
			 * @maxLength 15
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para la clave de deducción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres.
 * @pattern [^|]{3,15}
 * @minLength 3
 * @maxLength 15
 **/
export type NominaDeduccionesDeduccionClave = string;

/** Atributo requerido, representa la clave de otro pago de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres.
 * @pattern [^|]{3,15}
 * @minLength 3
 * @maxLength 15
 **/
export type NominaOtrosPagosOtroPagoClave = string;

/** Atributo requerido para expresar la clave de percepción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres.
 * @pattern [^|]{3,15}
 * @minLength 3
 * @maxLength 15
 **/
export type NominaPercepcionesPercepcionClave = string;

/** Atributo requerido para expresar la clave de la entidad federativa en donde el receptor del recibo prestó el servicio.**/
export type CEstado =
	| 'AGU'
	| 'BCN'
	| 'BCS'
	| 'CAM'
	| 'CHP'
	| 'CHH'
	| 'COA'
	| 'COL'
	| 'DIF'
	| 'CMX'
	| 'DUR'
	| 'GUA'
	| 'GRO'
	| 'HID'
	| 'JAL'
	| 'MEX'
	| 'MIC'
	| 'MOR'
	| 'NAY'
	| 'NLE'
	| 'OAX'
	| 'PUE'
	| 'QUE'
	| 'ROO'
	| 'SLP'
	| 'SIN'
	| 'SON'
	| 'TAB'
	| 'TAM'
	| 'TLA'
	| 'VER'
	| 'YUC'
	| 'ZAC'
	| 'AL'
	| 'AK'
	| 'AZ'
	| 'AR'
	| 'CA'
	| 'NC'
	| 'SC'
	| 'CO'
	| 'CT'
	| 'ND'
	| 'SD'
	| 'DE'
	| 'FL'
	| 'GA'
	| 'HI'
	| 'ID'
	| 'IL'
	| 'IN'
	| 'IA'
	| 'KS'
	| 'KY'
	| 'LA'
	| 'ME'
	| 'MD'
	| 'MA'
	| 'MI'
	| 'MN'
	| 'MS'
	| 'MO'
	| 'MT'
	| 'NE'
	| 'NV'
	| 'NJ'
	| 'NY'
	| 'NH'
	| 'NM'
	| 'OH'
	| 'OK'
	| 'OR'
	| 'PA'
	| 'RI'
	| 'TN'
	| 'TX'
	| 'UT'
	| 'VT'
	| 'VA'
	| 'WV'
	| 'WA'
	| 'WI'
	| 'WY'
	| 'ON'
	| 'QC'
	| 'NS'
	| 'NB'
	| 'MB'
	| 'BC'
	| 'PE'
	| 'SK'
	| 'AB'
	| 'NL'
	| 'NT'
	| 'YT'
	| 'UN';

/** Nodo condicional para expresar la información referente a la compensación de saldos a favor de un trabajador.**/
export interface NominaOtrosPagosOtroPagoCompensacionSaldosAFavor extends XastElement {
	type: 'element';
	name: 'CompensacionSaldosAFavor';
	attributes: {
		/** Atributo requerido para expresar el año en que se determinó el saldo a favor del trabajador por el patrón que se incluye en el campo “RemanenteSalFav”.	**/
		Ao: string;
		/** Atributo requerido para expresar el remanente del saldo a favor del trabajador.	**/
		RemanenteSalFav: string;
		/** Atributo requerido para expresar el saldo a favor determinado por el patrón al trabajador en periodos o ejercicios anteriores.	**/
		SaldoAFavor: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para la descripción del concepto de deducción.
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export interface Concepto extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,100}
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para la descripción del concepto de deducción.
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export type NominaDeduccionesDeduccionConcepto = string;

/** Atributo requerido para la descripción del concepto de otro pago.
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export type NominaOtrosPagosOtroPagoConcepto = string;

/** Atributo requerido para la descripción del concepto de percepción
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export type NominaPercepcionesPercepcionConcepto = string;

/** Tipo definido para expresar la cuenta bancarizada.
 * @pattern [0-9]{10,18}
 **/
export interface CuentaBancaria extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{10,18}
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar la cuenta bancarizada.
 * @pattern [0-9]{10,18}
 **/
export type TCuentaBancaria = string;

/** Tipo definido para expresar la Clave Única de Registro de Población (CURP)
 * @pattern [A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MHX]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]
 **/
export interface Curp extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MHX]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar la Clave Única de Registro de Población (CURP)
 * @pattern [A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MHX]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]
 **/
export type TCURP = string;

/** Nodo requerido para expresar la información detallada de una deducción.**/
export interface NominaDeduccionesDeduccion extends XastElement {
	type: 'element';
	name: 'Deduccion';
	attributes: {
		/** Atributo requerido para la clave de deducción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres.	**/
		Clave: string;
		/** Atributo requerido para la descripción del concepto de deducción.	**/
		Concepto: string;
		/** Atributo requerido para registrar el importe del concepto de deducción.	**/
		Importe: string;
		/** Atributo requerido para registrar la clave agrupadora que clasifica la deducción.	**/
		TipoDeduccion: catNomina.CTipoDeduccion;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para expresar las deducciones aplicables.**/
export interface NominaDeducciones extends XastElement {
	type: 'element';
	name: 'Deducciones';
	attributes: {
		/** Atributo condicional para expresar el total de los impuestos federales retenidos, es decir, donde la clave de tipo de deducción sea 002 correspondiente a ISR.	**/
		TotalImpuestosRetenidos?: string;
		/** Atributo condicional para expresar el total de deducciones que se relacionan en el comprobante, donde la clave de tipo de deducción sea distinta a la 002 correspondiente a ISR.	**/
		TotalOtrasDeducciones?: string;
	};
	children: NominaDeduccionesDeduccion[];
}

/** Atributo opcional para la expresión del departamento o área a la que pertenece el trabajador.
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export interface Departamento extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,100}
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para la expresión del departamento o área a la que pertenece el trabajador.
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export type NominaReceptorDepartamento = string;

/** Atributo requerido para expresar el número de días en que el trabajador realizó horas extra en el periodo.
 * @maxInclusive 1
 **/
export interface Dias extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de días en que el trabajador realizó horas extra en el periodo.
 * @maxInclusive 1
 **/
export type NominaPercepcionesPercepcionHorasExtraDias = string;

/** Atributo requerido para expresar el número de días enteros que el trabajador se incapacitó en el periodo.
 * @maxInclusive 1
 **/
export interface DiasIncapacidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de días enteros que el trabajador se incapacitó en el periodo.
 * @maxInclusive 1
 **/
export type NominaIncapacidadesIncapacidadDiasIncapacidad = string;

/** Nodo condicional para expresar la información del contribuyente emisor del comprobante de nómina.**/
export interface NominaEmisor extends XastElement {
	type: 'element';
	name: 'Emisor';
	attributes: {
		/** Atributo condicional para expresar la CURP del emisor del comprobante de nómina cuando es una persona física.	**/
		Curp?: string;
		/** Atributo condicional para expresar el registro patronal, clave de ramo - pagaduría o la que le asigne la institución de seguridad social al patrón, a 20 posiciones máximo. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.	**/
		RegistroPatronal?: string;
		/** Atributo opcional para expresar el RFC de la persona que fungió como patrón cuando el pago al trabajador se realice a través de un tercero como vehículo o herramienta de pago.	**/
		RfcPatronOrigen?: string;
	};
	children: NominaEmisorEntidadSNCF[];
}

/** Nodo condicional para que las entidades adheridas al Sistema Nacional de Coordinación Fiscal realicen la identificación del origen de los recursos utilizados en el pago de nómina del personal que presta o desempeña un servicio personal subordinado en las dependencias de la entidad federativa, del municipio o demarcación territorial de la Ciudad de México, así como en sus respectivos organismos autónomos y entidades paraestatales y paramunicipales**/
export interface NominaEmisorEntidadSNCF extends XastElement {
	type: 'element';
	name: 'EntidadSNCF';
	attributes: {
		/** Atributo condicional para expresar el monto del recurso pagado con cargo a sus participaciones u otros ingresos locales (importe bruto de los ingresos propios, es decir total de gravados y exentos), cuando el origen es mixto.	**/
		MontoRecursoPropio?: string;
		/** Atributo requerido para identificar el origen del recurso utilizado para el pago de nómina del personal que presta o desempeña un servicio personal subordinado o asimilado a salarios en las dependencias.	**/
		OrigenRecurso: catNomina.COrigenRecurso;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Tipo definido para la expresión de la fecha. Se expresa en la forma AAAA-MM-DD.
 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
 **/
export interface FechaFinalPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
			 **/
			value: string;
		},
	];
}
/** Tipo definido para la expresión de la fecha. Se expresa en la forma AAAA-MM-DD.
 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
 **/
export type TFecha = string;

/** Tipo definido para la expresión de la fecha. Se expresa en la forma AAAA-MM-DD.
 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
 **/
export interface FechaInicialPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
			 **/
			value: string;
		},
	];
}

/** Tipo definido para la expresión de la fecha. Se expresa en la forma AAAA-MM-DD.
 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
 **/
export interface FechaInicioRelLaboral extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
			 **/
			value: string;
		},
	];
}

/** Tipo definido para la expresión de la fecha. Se expresa en la forma AAAA-MM-DD.
 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
 **/
export interface FechaPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern ((19|20)[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
			 **/
			value: string;
		},
	];
}

/** Nodo condicional para expresar las horas extra aplicables.**/
export interface NominaPercepcionesPercepcionHorasExtra extends XastElement {
	type: 'element';
	name: 'HorasExtra';
	attributes: {
		/** Atributo requerido para expresar el número de días en que el trabajador realizó horas extra en el periodo.	**/
		Dias: string;
		/** Atributo requerido para expresar el número de horas extra trabajadas en el periodo.	**/
		HorasExtra: string;
		/** Atributo requerido para expresar el importe pagado por las horas extra.	**/
		ImportePagado: string;
		/** Atributo requerido para expresar el tipo de pago de las horas extra.	**/
		TipoHoras: catNomina.CTipoHoras;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para expresar el número de horas extra trabajadas en el periodo.
 * @maxInclusive 1
 **/
export interface HorasExtra extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de horas extra trabajadas en el periodo.
 * @maxInclusive 1
 **/
export type NominaPercepcionesPercepcionHorasExtraHorasExtra = string;

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface Importe extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export type TImporteMXN = string;

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface ImporteExento extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface ImporteGravado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface ImporteMonetario extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface ImportePagado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Nodo requerido para expresar información de las incapacidades.**/
export interface NominaIncapacidadesIncapacidad extends XastElement {
	type: 'element';
	name: 'Incapacidad';
	attributes: {
		/** Atributo requerido para expresar el número de días enteros que el trabajador se incapacitó en el periodo.	**/
		DiasIncapacidad: string;
		/** Atributo condicional para expresar el monto del importe monetario de la incapacidad.	**/
		ImporteMonetario?: string;
		/** Atributo requerido para expresar la razón de la incapacidad.	**/
		TipoIncapacidad: catNomina.CTipoIncapacidad;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo condicional para expresar información de las incapacidades.**/
export interface NominaIncapacidades extends XastElement {
	type: 'element';
	name: 'Incapacidades';
	children: NominaIncapacidadesIncapacidad[];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface IngresoAcumulable extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface IngresoNoAcumulable extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Nodo condicional para expresar la información detallada de pagos por jubilación, pensiones o haberes de retiro.**/
export interface NominaPercepcionesJubilacionPensionRetiro extends XastElement {
	type: 'element';
	name: 'JubilacionPensionRetiro';
	attributes: {
		/** Atributo requerido para expresar los ingresos acumulables.	**/
		IngresoAcumulable: string;
		/** Atributo requerido para expresar los ingresos no acumulables.	**/
		IngresoNoAcumulable: string;
		/** Atributo condicional para expresar el monto diario percibido por jubilación, pensiones o haberes de retiro cuando se realiza en parcialidades.	**/
		MontoDiario?: string;
		/** Atributo condicional para expresar los ingresos totales por pago cuando se hace en parcialidades.	**/
		TotalParcialidad?: string;
		/** Atributo condicional que indica el monto total del pago cuando se realiza en una sola exhibición.	**/
		TotalUnaExhibicion?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface MontoDiario extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface MontoRecursoPropio extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Complemento para incorporar al Comprobante Fiscal Digital por Internet (CFDI) la información que ampara conceptos de ingresos por salarios, la prestación de un servicio personal subordinado o conceptos asimilados a salarios (Nómina).**/
export interface Nomina extends XastElement {
	type: 'element';
	name: 'Nomina';
	attributes: {
		/** Atributo requerido para la expresión de la fecha final del período de pago. Se expresa en la forma AAAA-MM-DD, de acuerdo con la especificación ISO 8601.	**/
		/** A date, unknown format **/
		FechaFinalPago: string;
		/** Atributo requerido para la expresión de la fecha inicial del período de pago. Se expresa en la forma AAAA-MM-DD, de acuerdo con la especificación ISO 8601.	**/
		/** A date, unknown format **/
		FechaInicialPago: string;
		/** Atributo requerido para la expresión de la fecha efectiva de erogación del gasto. Se expresa en la forma AAAA-MM-DD, de acuerdo con la especificación ISO 8601.	**/
		/** A date, unknown format **/
		FechaPago: string;
		/** Atributo requerido para la expresión del número o la fracción de días pagados.	**/
		NumDiasPagados: string;
		/** Atributo requerido para indicar el tipo de nómina, puede ser O= Nómina ordinaria o E= Nómina extraordinaria.	**/
		TipoNomina: catNomina.CTipoNomina;
		/** Atributo condicional para representar la suma de las deducciones aplicables.	**/
		TotalDeducciones?: string;
		/** Atributo condicional para representar la suma de otros pagos.	**/
		TotalOtrosPagos?: string;
		/** Atributo condicional para representar la suma de las percepciones.	**/
		TotalPercepciones?: string;
		/** Atributo requerido para la expresión de la versión del complemento.	**/
		Version: string;
	};
	children: (NominaDeducciones | NominaEmisor | NominaIncapacidades | NominaOtrosPagos | NominaPercepciones | NominaReceptor)[];
}

/** Atributo requerido para expresar el número de años de servicio del trabajador. Se redondea al entero superior si la cifra contiene años y meses y hay más de 6 meses.
 * @maxInclusive 0
 **/
export interface NumAosServicio extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de años de servicio del trabajador. Se redondea al entero superior si la cifra contiene años y meses y hay más de 6 meses.
 * @maxInclusive 0
 **/
export type NominaPercepcionesSeparacionIndemnizacionNumAosServicio = string;

/** Atributo requerido para la expresión del número o la fracción de días pagados.
 * @pattern (([1-9][0-9]{0,4})|[0])(.[0-9]{3})?
 * @maxInclusive 0.001
 **/
export interface NumDiasPagados extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern (([1-9][0-9]{0,4})|[0])(.[0-9]{3})?
			 * @maxInclusive 0.001
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para la expresión del número o la fracción de días pagados.
 * @pattern (([1-9][0-9]{0,4})|[0])(.[0-9]{3})?
 * @maxInclusive 0.001
 **/
export type NominaNumDiasPagados = string;

/** Atributo requerido para expresar el número de empleado de 1 a 15 posiciones.
 * @pattern [^|]{1,15}
 * @minLength 1
 * @maxLength 15
 **/
export interface NumEmpleado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,15}
			 * @minLength 1
			 * @maxLength 15
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de empleado de 1 a 15 posiciones.
 * @pattern [^|]{1,15}
 * @minLength 1
 * @maxLength 15
 **/
export type NominaReceptorNumEmpleado = string;

/** Atributo condicional para expresar el número de seguridad social del trabajador. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.
 * @pattern [0-9]{1,15}
 * @minLength 1
 * @maxLength 15
 **/
export interface NumSeguridadSocial extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,15}
			 * @minLength 1
			 * @maxLength 15
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el número de seguridad social del trabajador. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.
 * @pattern [0-9]{1,15}
 * @minLength 1
 * @maxLength 15
 **/
export type NominaReceptorNumSeguridadSocial = string;

/** Atributo requerido para identificar el origen del recurso utilizado para el pago de nómina del personal que presta o desempeña un servicio personal subordinado o asimilado a salarios en las dependencias.**/
export type COrigenRecurso = 'IP' | 'IF' | 'IM';

/** Nodo requerido para expresar la información detallada del otro pago.**/
export interface NominaOtrosPagosOtroPago extends XastElement {
	type: 'element';
	name: 'OtroPago';
	attributes: {
		/** Atributo requerido, representa la clave de otro pago de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres.	**/
		Clave: string;
		/** Atributo requerido para la descripción del concepto de otro pago.	**/
		Concepto: string;
		/** Atributo requerido para expresar el importe del concepto de otro pago.	**/
		Importe: string;
		/** Atributo requerido para expresar la clave agrupadora bajo la cual se clasifica el otro pago.	**/
		TipoOtroPago: catNomina.CTipoOtroPago;
	};
	children: (NominaOtrosPagosOtroPagoCompensacionSaldosAFavor | NominaOtrosPagosOtroPagoSubsidioAlEmpleo)[];
}

/** Nodo condicional para expresar otros pagos aplicables.**/
export interface NominaOtrosPagos extends XastElement {
	type: 'element';
	name: 'OtrosPagos';
	children: NominaOtrosPagosOtroPago[];
}

/** Nodo requerido para expresar la información detallada de una percepción**/
export interface NominaPercepcionesPercepcion extends XastElement {
	type: 'element';
	name: 'Percepcion';
	attributes: {
		/** Atributo requerido para expresar la clave de percepción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres.	**/
		Clave: string;
		/** Atributo requerido para la descripción del concepto de percepción	**/
		Concepto: string;
		/** Atributo requerido, representa el importe exento de un concepto de percepción.	**/
		ImporteExento: string;
		/** Atributo requerido, representa el importe gravado de un concepto de percepción.	**/
		ImporteGravado: string;
		/** Atributo requerido para expresar la Clave agrupadora bajo la cual se clasifica la percepción.	**/
		TipoPercepcion: catNomina.CTipoPercepcion;
	};
	children: (NominaPercepcionesPercepcionAccionesOTitulos | NominaPercepcionesPercepcionHorasExtra)[];
}

/** Nodo condicional para expresar las percepciones aplicables.**/
export interface NominaPercepciones extends XastElement {
	type: 'element';
	name: 'Percepciones';
	attributes: {
		/** Atributo requerido para expresar el total de percepciones exentas que se relacionan en el comprobante.	**/
		TotalExento: string;
		/** Atributo requerido para expresar el total de percepciones gravadas que se relacionan en el comprobante.	**/
		TotalGravado: string;
		/** Atributo condicional para expresar el importe exento y gravado de las claves tipo percepción 039 Jubilaciones, pensiones o haberes de retiro en una exhibición y 044 Jubilaciones, pensiones o haberes de retiro en parcialidades.	**/
		TotalJubilacionPensionRetiro?: string;
		/** Atributo condicional para expresar el importe exento y gravado de las claves tipo percepción 022 Prima por Antigüedad, 023 Pagos por separación y 025 Indemnizaciones.	**/
		TotalSeparacionIndemnizacion?: string;
		/** Atributo condicional para expresar el total de percepciones brutas (gravadas y exentas) por sueldos y salarios y conceptos asimilados a salarios.	**/
		TotalSueldos?: string;
	};
	children: (NominaPercepcionesJubilacionPensionRetiro | NominaPercepcionesPercepcion | NominaPercepcionesSeparacionIndemnizacion)[];
}

/** Atributo requerido para la forma en que se establece el pago del salario.**/
export type CPeriodicidadPago = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '99';

/** Atributo requerido para expresar el porcentaje del tiempo que prestó sus servicios con el RFC que lo subcontrata.
 * @pattern [0-9]{1,3}(.([0-9]{1,3}))?
 * @maxInclusive 0.001
 **/
export interface PorcentajeTiempo extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,3}(.([0-9]{1,3}))?
			 * @maxInclusive 0.001
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el porcentaje del tiempo que prestó sus servicios con el RFC que lo subcontrata.
 * @pattern [0-9]{1,3}(.([0-9]{1,3}))?
 * @maxInclusive 0.001
 **/
export type NominaReceptorSubContratacionPorcentajeTiempo = string;

/** Atributo requerido para expresar el precio establecido al otorgarse la opción de ingresos en acciones o títulos valor.
 * @maxInclusive 0.000001
 **/
export interface PrecioAlOtorgarse extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.000001
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el precio establecido al otorgarse la opción de ingresos en acciones o títulos valor.
 * @maxInclusive 0.000001
 **/
export type NominaPercepcionesPercepcionAccionesOTitulosPrecioAlOtorgarse = string;

/** Atributo opcional para la expresión del puesto asignado al empleado o actividad que realiza.
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export interface Puesto extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,100}
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para la expresión del puesto asignado al empleado o actividad que realiza.
 * @pattern [^|]{1,100}
 * @minLength 1
 * @maxLength 100
 **/
export type NominaReceptorPuesto = string;

/** Nodo requerido para precisar la información del contribuyente receptor del comprobante de nómina.**/
export interface NominaReceptor extends XastElement {
	type: 'element';
	name: 'Receptor';
	attributes: {
		/** Atributo condicional para expresar el número de semanas o el periodo de años, meses y días que el empleado ha mantenido relación laboral con el empleador. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.	**/
		Antigedad?: string;
		/** Atributo condicional para la expresión de la clave del Banco conforme al catálogo, donde se realiza el depósito de nómina.	**/
		Banco?: catNomina.CBanco;
		/** Atributo requerido para expresar la clave de la entidad federativa en donde el receptor del recibo prestó el servicio.	**/
		ClaveEntFed: catCFDI.CEstado;
		/** Atributo condicional para la expresión de la cuenta bancaria a 11 posiciones o número de teléfono celular a 10 posiciones o número de tarjeta de crédito, débito o servicios a 15 ó 16 posiciones o la CLABE a 18 posiciones o número de monedero electrónico, donde se realiza el depósito de nómina.	**/
		CuentaBancaria?: string;
		/** Atributo requerido para expresar la CURP del receptor del comprobante de nómina.	**/
		Curp: string;
		/** Atributo opcional para la expresión del departamento o área a la que pertenece el trabajador.	**/
		Departamento?: string;
		/** Atributo condicional para expresar la fecha de inicio de la relación laboral entre el empleador y el empleado. Se expresa en la forma AAAA-MM-DD, de acuerdo con la especificación ISO 8601. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.	**/
		/** A date, unknown format **/
		FechaInicioRelLaboral?: string;
		/** Atributo requerido para expresar el número de empleado de 1 a 15 posiciones.	**/
		NumEmpleado: string;
		/** Atributo condicional para expresar el número de seguridad social del trabajador. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.	**/
		NumSeguridadSocial?: string;
		/** Atributo requerido para la forma en que se establece el pago del salario.	**/
		PeriodicidadPago: catNomina.CPeriodicidadPago;
		/** Atributo opcional para la expresión del puesto asignado al empleado o actividad que realiza.	**/
		Puesto?: string;
		/** Atributo opcional para expresar la clave conforme a la Clase en que deben inscribirse los patrones, de acuerdo con las actividades que desempeñan sus trabajadores, según lo previsto en el artículo 196 del Reglamento en Materia de Afiliación Clasificación de Empresas, Recaudación y Fiscalización, o conforme con la normatividad del Instituto de Seguridad Social del trabajador.  Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.	**/
		RiesgoPuesto?: catNomina.CRiesgoPuesto;
		/** Atributo opcional para expresar la retribución otorgada al trabajador, que se integra por los pagos hechos en efectivo por cuota diaria, gratificaciones, percepciones, alimentación, habitación, primas, comisiones, prestaciones en especie y cualquiera otra cantidad o prestación que se entregue al trabajador por su trabajo, sin considerar los conceptos que se excluyen de conformidad con el Artículo 27 de la Ley del Seguro Social, o la integración de los pagos conforme la normatividad del Instituto de Seguridad Social del trabajador. (Se emplea para pagar las cuotas y aportaciones de Seguridad Social). Se debe ingresar cuando se esté obligado conforme a otras disposiciones distintas a las fiscales.	**/
		SalarioBaseCotApor?: string;
		/** Atributo opcional para expresar el salario que se integra con los pagos hechos en efectivo por cuota diaria, gratificaciones, percepciones, habitación, primas, comisiones, prestaciones en especie y cualquier otra cantidad o prestación que se entregue al trabajador por su trabajo, de conformidad con el Art. 84 de la Ley Federal del Trabajo. (Se utiliza para el cálculo de las indemnizaciones). Se debe ingresar cuando se esté obligado conforme a otras disposiciones distintas a las fiscales.	**/
		SalarioDiarioIntegrado?: string;
		/** Atributo opcional para indicar si el trabajador está asociado a un sindicato. Si se omite se asume que no está asociado a algún sindicato.	**/
		Sindicalizado?: NominaReceptorSindicalizado;
		/** Atributo requerido para expresar el tipo de contrato que tiene el trabajador.	**/
		TipoContrato: catNomina.CTipoContrato;
		/** Atributo condicional para expresar el tipo de jornada que cubre el trabajador. Se debe ingresar cuando se esté obligado conforme a otras disposiciones distintas a las fiscales.	**/
		TipoJornada?: catNomina.CTipoJornada;
		/** Atributo requerido para la expresión de la clave del régimen por el cual se tiene contratado al trabajador.	**/
		TipoRegimen: catNomina.CTipoRegimen;
	};
	children: NominaReceptorSubContratacion[];
}

/** Atributo condicional para expresar el registro patronal, clave de ramo - pagaduría o la que le asigne la institución de seguridad social al patrón, a 20 posiciones máximo. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.
 * @pattern [^|]{1,20}
 * @minLength 1
 * @maxLength 20
 **/
export interface RegistroPatronal extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,20}
			 * @minLength 1
			 * @maxLength 20
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el registro patronal, clave de ramo - pagaduría o la que le asigne la institución de seguridad social al patrón, a 20 posiciones máximo. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.
 * @pattern [^|]{1,20}
 * @minLength 1
 * @maxLength 20
 **/
export type NominaEmisorRegistroPatronal = string;

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface RemanenteSalFav extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
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
export interface RfcLabora extends XastElement {
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

/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export interface RfcPatronOrigen extends XastElement {
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

/** Atributo opcional para expresar la clave conforme a la Clase en que deben inscribirse los patrones, de acuerdo con las actividades que desempeñan sus trabajadores, según lo previsto en el artículo 196 del Reglamento en Materia de Afiliación Clasificación de Empresas, Recaudación y Fiscalización, o conforme con la normatividad del Instituto de Seguridad Social del trabajador.  Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.**/
export type CRiesgoPuesto = '1' | '2' | '3' | '4' | '5' | '99';

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface SalarioBaseCotApor extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface SalarioDiarioIntegrado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface SaldoAFavor extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Nodo condicional para expresar la información detallada de otros pagos por separación.**/
export interface NominaPercepcionesSeparacionIndemnizacion extends XastElement {
	type: 'element';
	name: 'SeparacionIndemnizacion';
	attributes: {
		/** Atributo requerido para expresar los ingresos acumulables.	**/
		IngresoAcumulable: string;
		/** Atributo requerido que indica los ingresos no acumulables.	**/
		IngresoNoAcumulable: string;
		/** Atributo requerido para expresar el número de años de servicio del trabajador. Se redondea al entero superior si la cifra contiene años y meses y hay más de 6 meses.	**/
		NumAosServicio: string;
		/** Atributo requerido que indica el monto total del pago.	**/
		TotalPagado: string;
		/** Atributo requerido que indica el último sueldo mensual ordinario.	**/
		UltimoSueldoMensOrd: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo opcional para indicar si el trabajador está asociado a un sindicato. Si se omite se asume que no está asociado a algún sindicato.**/
export type NominaReceptorSindicalizado = 'Sí' | 'No';

/** Nodo condicional para expresar la lista de las personas que los subcontrataron.**/
export interface NominaReceptorSubContratacion extends XastElement {
	type: 'element';
	name: 'SubContratacion';
	attributes: {
		/** Atributo requerido para expresar el porcentaje del tiempo que prestó sus servicios con el RFC que lo subcontrata.	**/
		PorcentajeTiempo: string;
		/** Atributo requerido para expresar el RFC de la persona que subcontrata.	**/
		RfcLabora: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo condicional para expresar la información referente al subsidio al empleo del trabajador.**/
export interface NominaOtrosPagosOtroPagoSubsidioAlEmpleo extends XastElement {
	type: 'element';
	name: 'SubsidioAlEmpleo';
	attributes: {
		/** Atributo requerido para expresar el subsidio causado conforme a la tabla del subsidio para el empleo publicada en el Anexo 8 de la RMF vigente.	**/
		SubsidioCausado: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface SubsidioCausado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Atributo requerido para expresar el tipo de contrato que tiene el trabajador.**/
export type CTipoContrato = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '99';

/** Atributo requerido para registrar la clave agrupadora que clasifica la deducción.**/
export type CTipoDeduccion =
	| '001'
	| '002'
	| '003'
	| '004'
	| '005'
	| '006'
	| '007'
	| '008'
	| '009'
	| '010'
	| '011'
	| '012'
	| '013'
	| '014'
	| '015'
	| '016'
	| '017'
	| '018'
	| '019'
	| '020'
	| '021'
	| '022'
	| '023'
	| '024'
	| '025'
	| '026'
	| '027'
	| '028'
	| '029'
	| '030'
	| '031'
	| '032'
	| '033'
	| '034'
	| '035'
	| '036'
	| '037'
	| '038'
	| '039'
	| '040'
	| '041'
	| '042'
	| '043'
	| '044'
	| '045'
	| '046'
	| '047'
	| '048'
	| '049'
	| '050'
	| '051'
	| '052'
	| '053'
	| '054'
	| '055'
	| '056'
	| '057'
	| '058'
	| '059'
	| '060'
	| '061'
	| '062'
	| '063'
	| '064'
	| '065'
	| '066'
	| '067'
	| '068'
	| '069'
	| '070'
	| '071'
	| '072'
	| '073'
	| '074'
	| '075'
	| '076'
	| '077'
	| '078'
	| '079'
	| '080'
	| '081'
	| '082'
	| '083'
	| '084'
	| '085'
	| '086'
	| '087'
	| '088'
	| '089'
	| '090'
	| '091'
	| '092'
	| '093'
	| '094'
	| '095'
	| '096'
	| '097'
	| '098'
	| '099'
	| '100'
	| '101'
	| '102'
	| '103'
	| '104'
	| '105'
	| '106'
	| '107';

/** Atributo requerido para expresar el tipo de pago de las horas extra.**/
export type CTipoHoras = '01' | '02' | '03';

/** Atributo requerido para expresar la razón de la incapacidad.**/
export type CTipoIncapacidad = '01' | '02' | '03' | '04';

/** Atributo condicional para expresar el tipo de jornada que cubre el trabajador. Se debe ingresar cuando se esté obligado conforme a otras disposiciones distintas a las fiscales.**/
export type CTipoJornada = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '99';

/** Atributo requerido para indicar el tipo de nómina, puede ser O= Nómina ordinaria o E= Nómina extraordinaria.**/
export type CTipoNomina = 'O' | 'E';

/** Atributo requerido para expresar la clave agrupadora bajo la cual se clasifica el otro pago.**/
export type CTipoOtroPago = '001' | '002' | '003' | '004' | '005' | '006' | '007' | '008' | '009' | '999';

/** Atributo requerido para expresar la Clave agrupadora bajo la cual se clasifica la percepción.**/
export type CTipoPercepcion = '001' | '002' | '003' | '004' | '005' | '006' | '009' | '010' | '011' | '012' | '013' | '014' | '015' | '019' | '020' | '021' | '022' | '023' | '024' | '025' | '026' | '027' | '028' | '029' | '030' | '031' | '032' | '033' | '034' | '035' | '036' | '037' | '038' | '039' | '044' | '045' | '046' | '047' | '048' | '049' | '050' | '051' | '052' | '053';

/** Atributo requerido para la expresión de la clave del régimen por el cual se tiene contratado al trabajador.**/
export type CTipoRegimen = '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '99';

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalDeducciones extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalExento extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalGravado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalImpuestosRetenidos extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalJubilacionPensionRetiro extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalOtrasDeducciones extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalOtrosPagos extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalPagado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalParcialidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalPercepciones extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalSeparacionIndemnizacion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalSueldos extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface TotalUnaExhibicion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Tipo definido para expresar importes monetarios en moneda nacional MXN con fracción hasta dos decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
 * @maxInclusive 0.00
 **/
export interface UltimoSueldoMensOrd extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,2})?
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}

/** Atributo requerido para expresar el valor de mercado de las Acciones o Títulos valor al ejercer la opción.
 * @maxInclusive 0.000001
 **/
export interface ValorMercado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.000001
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el valor de mercado de las Acciones o Títulos valor al ejercer la opción.
 * @maxInclusive 0.000001
 **/
export type NominaPercepcionesPercepcionAccionesOTitulosValorMercado = string;

/** Atributo requerido para la expresión de la versión del complemento.**/
export interface Version extends XastElement {
	name: 'Version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
