import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/nomina/nomina11.xsd

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

/** Número de semanas que el empleado ha mantenido relación laboral con el empleador**/
export interface Antiguedad extends XastElement {
	name: 'Antiguedad';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo opcional para la expresión del Banco conforme al catálogo, donde se realiza un depósito de nómina
 * @pattern [0-9]{3}
 * @maxInclusive 1
 **/
export interface Banco extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{3}
			 * @maxInclusive 1
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para la expresión del Banco conforme al catálogo, donde se realiza un depósito de nómina
 * @pattern [0-9]{3}
 * @maxInclusive 1
 **/
export type NominaBanco = string;

/** Tipo definido para expresar la CLABE interbancaria
 * @pattern [0-9]{18}
 **/
export interface CLABE extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{18}
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar la CLABE interbancaria
 * @pattern [0-9]{18}
 **/
export type TClabe = string;

/** Atributo requerido para la clave de deducción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres
 * @minLength 3
 * @maxLength 15
 **/
export interface Clave extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 3
			 * @maxLength 15
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para la clave de deducción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres
 * @minLength 3
 * @maxLength 15
 **/
export type NominaDeduccionesDeduccionClave = string;

/** Atributo requerido, representa la clave de percepción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres
 * @minLength 3
 * @maxLength 15
 **/
export type NominaPercepcionesPercepcionClave = string;

/** Atributo requerido para la descripción del concepto de deducción
 * @minLength 1
 * @maxLength 100
 **/
export interface Concepto extends XastElement {
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
/** Atributo requerido para la descripción del concepto de deducción
 * @minLength 1
 * @maxLength 100
 **/
export type NominaDeduccionesDeduccionConcepto = string;

/** Atributo requerido para la descripción del concepto de percepción
 * @minLength 1
 * @maxLength 100
 **/
export type NominaPercepcionesPercepcionConcepto = string;

/** Tipo definido para la expresión de una CURP
 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
 **/
export interface CURP extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
			 **/
			value: string;
		},
	];
}
/** Tipo definido para la expresión de una CURP
 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
 **/
export type TCURP = string;

/** Nodo para expresar la información detallada de una deducción**/
export interface NominaDeduccionesDeduccion extends XastElement {
	type: 'element';
	name: 'Deduccion';
	attributes: {
		/** Atributo requerido para la clave de deducción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres	**/
		Clave: string;
		/** Atributo requerido para la descripción del concepto de deducción	**/
		Concepto: string;
		/** Atributo requerido, representa el importe exento de un concepto de deducción	**/
		ImporteExento: string;
		/** Atributo requerido, representa el importe gravado de un concepto de deducción	**/
		ImporteGravado: string;
		/** Clave agrupadora. Clasifica la deducción conforme al catálogo publicado en el portal del SAT en internet	**/
		TipoDeduccion: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para expresar las deducciones aplicables**/
export interface NominaDeducciones extends XastElement {
	type: 'element';
	name: 'Deducciones';
	attributes: {
		/** Atributo requerido para expresar el total de deducciones exentas que se relacionan en el comprobante	**/
		TotalExento: string;
		/** Atributo requerido para expresar el total de deducciones gravadas que se relacionan en el comprobante	**/
		TotalGravado: string;
	};
	children: NominaDeduccionesDeduccion[];
}

/** Atributo opcional para la expresión del departamento o área a la que pertenece el trabajador
 * @minLength 1
 * @maxLength 100
 **/
export interface Departamento extends XastElement {
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
/** Atributo opcional para la expresión del departamento o área a la que pertenece el trabajador
 * @minLength 1
 * @maxLength 100
 **/
export type NominaDepartamento = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface Descuento extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export type TImporte = string;

/** Número de días en que el trabajador realizó horas extra en el periodo**/
export interface Dias extends XastElement {
	name: 'Dias';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Número de días que el trabajador se incapacitó en el periodo
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
/** Número de días que el trabajador se incapacitó en el periodo
 * @maxInclusive 1
 **/
export type NominaIncapacidadesIncapacidadDiasIncapacidad = string;

/** Atributo requerido para la expresión de la fecha final del pago. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.**/
export interface FechaFinalPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para la expresión de la fecha final del pago. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.**/
export type Date = string;

/** Atributo requerido para la expresión de la fecha inicial del pago. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.**/
export interface FechaInicialPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo opcional para expresar la fecha de inicio de la relación laboral entre el empleador y el empleado**/
export interface FechaInicioRelLaboral extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo requerido para la expresión de la fecha efectiva de erogación del gasto. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.**/
export interface FechaPago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo opcional para expresar información de las horas extras**/
export interface NominaHorasExtrasHorasExtra extends XastElement {
	type: 'element';
	name: 'HorasExtra';
	attributes: {
		/** Número de días en que el trabajador realizó horas extra en el periodo	**/
		Dias: string;
		/** Número de horas extra trabajadas en el periodo	**/
		HorasExtra: string;
		/** Importe pagado por las horas extra	**/
		ImportePagado: string;
		/** Tipo de pago de las horas extra: dobles o triples	**/
		TipoHoras: NominaHorasExtrasHorasExtraTipoHoras;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Número de horas extra trabajadas en el periodo**/
export interface HorasExtra extends XastElement {
	name: 'HorasExtra';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo opcional para expresar las horas extras aplicables**/
export interface NominaHorasExtras extends XastElement {
	type: 'element';
	name: 'HorasExtras';
	children: NominaHorasExtrasHorasExtra[];
}

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface ImporteExento extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface ImporteGravado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface ImportePagado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo opcional para expresar información de las incapacidades**/
export interface NominaIncapacidadesIncapacidad extends XastElement {
	type: 'element';
	name: 'Incapacidad';
	attributes: {
		/** Monto del descuento por la incapacidad	**/
		Descuento: string;
		/** Número de días que el trabajador se incapacitó en el periodo	**/
		DiasIncapacidad: string;
		/** Razón de la incapacidad: Catálogo publicado en el portal del SAT en internet	**/
		TipoIncapacidad: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para expresar las incapacidades aplicables**/
export interface NominaIncapacidades extends XastElement {
	type: 'element';
	name: 'Incapacidades';
	children: NominaIncapacidadesIncapacidad[];
}

/** Complemento al Comprobante Fiscal Digital a través de Internet (CFDI) para el manejo de datos de Nómina.**/
export interface Nomina extends XastElement {
	type: 'element';
	name: 'Nomina';
	attributes: {
		/** Número de semanas que el empleado ha mantenido relación laboral con el empleador	**/
		Antiguedad?: string;
		/** Atributo opcional para la expresión del Banco conforme al catálogo, donde se realiza un depósito de nómina	**/
		Banco: string;
		/** Atributo opcional para la expresión de la CLABE	**/
		CLABE: string;
		/** Atributo requerido para la expresión de la CURP del trabajador	**/
		CURP: string;
		/** Atributo opcional para la expresión del departamento o área a la que pertenece el trabajador	**/
		Departamento: string;
		/** Atributo requerido para la expresión de la fecha final del pago. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.	**/
		/** A date, unknown format **/
		FechaFinalPago: string;
		/** Atributo requerido para la expresión de la fecha inicial del pago. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.	**/
		/** A date, unknown format **/
		FechaInicialPago: string;
		/** Atributo opcional para expresar la fecha de inicio de la relación laboral entre el empleador y el empleado	**/
		/** A date, unknown format **/
		FechaInicioRelLaboral?: string;
		/** Atributo requerido para la expresión de la fecha efectiva de erogación del gasto. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.	**/
		/** A date, unknown format **/
		FechaPago: string;
		/** Atributo requerido para la expresión del número de días pagados	**/
		NumDiasPagados: string;
		/** Atributo requerido para expresar el número de empleado de 1 a 15 posiciones	**/
		NumEmpleado: string;
		/** Atributo opcional para la expresión del número de seguridad social aplicable al trabajador	**/
		NumSeguridadSocial?: string;
		/** Forma en que se establece el pago del salario: diario, semanal, quincenal, catorcenal mensual, bimestral, unidad de obra, comisión, precio alzado, etc.	**/
		PeriodicidadPago: string;
		/** Puesto asignado al empleado o actividad que realiza	**/
		Puesto?: string;
		/** Atributo opcional para expresar el registro patronal a 20 posiciones máximo	**/
		RegistroPatronal?: string;
		/** Clave conforme a la Clase en que deben inscribirse los patrones, de acuerdo a las actividades que desempeñan sus trabajadores, según lo previsto en el artículo 196 del Reglamento en Materia de Afiliación Clasificación de Empresas, Recaudación y Fiscalización. Catálogo publicado en el portal del SAT en internet	**/
		RiesgoPuesto?: string;
		/** Retribución otorgada al trabajador, que se integra por los pagos hechos en efectivo por cuota diaria, gratificaciones, percepciones, alimentación, habitación, primas, comisiones, prestaciones en especie y cualquiera otra cantidad o prestación que se entregue al trabajador por su trabajo, sin considerar los conceptos que se excluyen de conformidad con el Artículo 27 de la Ley del Seguro Social. (Se emplea para pagar las cuotas y aportaciones de Seguridad Social).	**/
		SalarioBaseCotApor?: string;
		/** El salario se integra con los pagos hechos en efectivo por cuota diaria, gratificaciones, percepciones, habitación, primas, comisiones, prestaciones en especie y cualquiera otra cantidad o prestación que se entregue al trabajador por su trabajo, de conformidad con el Art. 84 de la Ley Federal del Trabajo. (Se utiliza para el cálculo de las indemnizaciones).	**/
		SalarioDiarioIntegrado?: string;
		/** Tipo de contrato que tiene el trabajador: Base, Eventual, Confianza, Sindicalizado, a prueba, etc.	**/
		TipoContrato?: string;
		/** Tipo de jornada que cubre el trabajador: Diurna, nocturna, mixta, por hora, reducida, continuada, partida, por turnos, etc.	**/
		TipoJornada?: string;
		/** Atributo requerido para la expresión de la clave del régimen por el cual se tiene contratado al trabajador, conforme al catálogo publicado en el portal del SAT en internet	**/
		TipoRegimen: string;
		/** Atributo requerido para la expresión de la versión del complemento	**/
		Version: string;
	};
	children: (NominaDeducciones | NominaHorasExtras | NominaIncapacidades | NominaPercepciones)[];
}

/** Atributo requerido para la expresión del número de días pagados**/
export interface NumDiasPagados extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para la expresión del número de días pagados**/
export type NominaNumDiasPagados = string;

/** Atributo requerido para expresar el número de empleado de 1 a 15 posiciones
 * @minLength 1
 * @maxLength 15
 **/
export interface NumEmpleado extends XastElement {
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
/** Atributo requerido para expresar el número de empleado de 1 a 15 posiciones
 * @minLength 1
 * @maxLength 15
 **/
export type NominaNumEmpleado = string;

/** Atributo opcional para la expresión del número de seguridad social aplicable al trabajador
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
/** Atributo opcional para la expresión del número de seguridad social aplicable al trabajador
 * @minLength 1
 * @maxLength 15
 **/
export type NominaNumSeguridadSocial = string;

/** Nodo para expresar la información detallada de una percepción**/
export interface NominaPercepcionesPercepcion extends XastElement {
	type: 'element';
	name: 'Percepcion';
	attributes: {
		/** Atributo requerido, representa la clave de percepción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres	**/
		Clave: string;
		/** Atributo requerido para la descripción del concepto de percepción	**/
		Concepto: string;
		/** Atributo requerido, representa el importe exento de un concepto de percepción	**/
		ImporteExento: string;
		/** Atributo requerido, representa el importe gravado de un concepto de percepción	**/
		ImporteGravado: string;
		/** Clave agrupadora. Clasifica la percepción conforme al catálogo publicado en el portal del SAT en internet	**/
		TipoPercepcion: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para expresar las percepciones aplicables**/
export interface NominaPercepciones extends XastElement {
	type: 'element';
	name: 'Percepciones';
	attributes: {
		/** Atributo requerido para expresar el total de percepciones exentas que se relacionan en el comprobante	**/
		TotalExento: string;
		/** Atributo requerido para expresar el total de percepciones gravadas que se relacionan en el comprobante	**/
		TotalGravado: string;
	};
	children: NominaPercepcionesPercepcion[];
}

/** Forma en que se establece el pago del salario: diario, semanal, quincenal, catorcenal mensual, bimestral, unidad de obra, comisión, precio alzado, etc.
 * @minLength 1
 * @maxLength 100
 **/
export interface PeriodicidadPago extends XastElement {
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
/** Forma en que se establece el pago del salario: diario, semanal, quincenal, catorcenal mensual, bimestral, unidad de obra, comisión, precio alzado, etc.
 * @minLength 1
 * @maxLength 100
 **/
export type NominaPeriodicidadPago = string;

/** Puesto asignado al empleado o actividad que realiza**/
export interface Puesto extends XastElement {
	name: 'Puesto';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo opcional para expresar el registro patronal a 20 posiciones máximo
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
/** Atributo opcional para expresar el registro patronal a 20 posiciones máximo
 * @minLength 1
 * @maxLength 20
 **/
export type NominaRegistroPatronal = string;

/** Clave conforme a la Clase en que deben inscribirse los patrones, de acuerdo a las actividades que desempeñan sus trabajadores, según lo previsto en el artículo 196 del Reglamento en Materia de Afiliación Clasificación de Empresas, Recaudación y Fiscalización. Catálogo publicado en el portal del SAT en internet
 * @maxInclusive 1
 **/
export interface RiesgoPuesto extends XastElement {
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
/** Clave conforme a la Clase en que deben inscribirse los patrones, de acuerdo a las actividades que desempeñan sus trabajadores, según lo previsto en el artículo 196 del Reglamento en Materia de Afiliación Clasificación de Empresas, Recaudación y Fiscalización. Catálogo publicado en el portal del SAT en internet
 * @maxInclusive 1
 **/
export type NominaRiesgoPuesto = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface SalarioBaseCotApor extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface SalarioDiarioIntegrado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Tipo de contrato que tiene el trabajador: Base, Eventual, Confianza, Sindicalizado, a prueba, etc.**/
export interface TipoContrato extends XastElement {
	name: 'TipoContrato';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Clave agrupadora. Clasifica la deducción conforme al catálogo publicado en el portal del SAT en internet
 * @pattern [0-9]{3}
 * @maxInclusive 1
 **/
export interface TipoDeduccion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{3}
			 * @maxInclusive 1
			 **/
			value: string;
		},
	];
}
/** Clave agrupadora. Clasifica la deducción conforme al catálogo publicado en el portal del SAT en internet
 * @pattern [0-9]{3}
 * @maxInclusive 1
 **/
export type NominaDeduccionesDeduccionTipoDeduccion = string;

/** Tipo de pago de las horas extra: dobles o triples**/
export type NominaHorasExtrasHorasExtraTipoHoras = 'Dobles' | 'Triples';

/** Razón de la incapacidad: Catálogo publicado en el portal del SAT en internet**/
export interface TipoIncapacidad extends XastElement {
	name: 'TipoIncapacidad';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Tipo de jornada que cubre el trabajador: Diurna, nocturna, mixta, por hora, reducida, continuada, partida, por turnos, etc.**/
export interface TipoJornada extends XastElement {
	name: 'TipoJornada';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Clave agrupadora. Clasifica la percepción conforme al catálogo publicado en el portal del SAT en internet
 * @pattern [0-9]{3}
 * @maxInclusive 1
 **/
export interface TipoPercepcion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{3}
			 * @maxInclusive 1
			 **/
			value: string;
		},
	];
}
/** Clave agrupadora. Clasifica la percepción conforme al catálogo publicado en el portal del SAT en internet
 * @pattern [0-9]{3}
 * @maxInclusive 1
 **/
export type NominaPercepcionesPercepcionTipoPercepcion = string;

/** Atributo requerido para la expresión de la clave del régimen por el cual se tiene contratado al trabajador, conforme al catálogo publicado en el portal del SAT en internet
 * @maxInclusive 1
 **/
export interface TipoRegimen extends XastElement {
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
/** Atributo requerido para la expresión de la clave del régimen por el cual se tiene contratado al trabajador, conforme al catálogo publicado en el portal del SAT en internet
 * @maxInclusive 1
 **/
export type NominaTipoRegimen = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface TotalExento extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface TotalGravado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo requerido para la expresión de la versión del complemento**/
export interface Version extends XastElement {
	name: 'Version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
