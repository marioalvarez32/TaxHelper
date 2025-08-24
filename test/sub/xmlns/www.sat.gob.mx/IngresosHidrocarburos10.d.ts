import * as Primitive from '../xml-primitives';
import * as catCEH from './sitio_internet/cfd/catalogos/hidrocarburos';
import * as tdCFDI from './sitio_internet/cfd/tipoDatos/tdCFDI';

// Source files:
// http://localhost:56607/sitio_internet/cfd/IngresosHidrocarburos10/IngresosHidrocarburos.xsd

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

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface ContraprestacionPagadaOperador extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
			 * @maxInclusive 0.000000
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export type TImporte = string;

/** Nodo requerido para expresar la información del documento relacionado al ingreso.**/
export interface IngresosHidrocarburosDocumentoRelacionado extends XastElement {
	type: 'element';
	name: 'DocumentoRelacionado';
	attributes: {
		/** Atributo requerido para expresar la fecha del CFDI  expedido por el operador del consorcio al FMP. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.	**/
		/** A date, unknown format **/
		FechaFolioFiscalVinculado: string;
		/** Atributo requerido para expresar el folio fiscal del CFDI expedido por el operador del consorcio al FMP.	**/
		FolioFiscalVinculado: string;
		/** Atributo requerido para expresar el mes que corresponda al CFDI expedido por el operador del consorcio al FMP.	**/
		Mes: catCEH.Meses;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para expresar la fecha del CFDI  expedido por el operador del consorcio al FMP. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.
 * @pattern ([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
 **/
export interface FechaFolioFiscalVinculado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern ([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar la fecha del CFDI  expedido por el operador del consorcio al FMP. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.
 * @pattern ([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
 **/
export type IngresosHidrocarburosDocumentoRelacionadoFechaFolioFiscalVinculado = string;

/** Atributo requerido para expresar el folio fiscal del CFDI expedido por el operador del consorcio al FMP.
 * @pattern [a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}
 **/
export interface FolioFiscalVinculado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el folio fiscal del CFDI expedido por el operador del consorcio al FMP.
 * @pattern [a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}
 **/
export type IngresosHidrocarburosDocumentoRelacionadoFolioFiscalVinculado = string;

/** Complemento para incorporar la información sobre Ingresos atribuibles a los Integrantes de un consorcio derivados de la contraprestación de un contrato de exploración o extracción de hidrocarburos.**/
export interface IngresosHidrocarburos extends XastElement {
	type: 'element';
	name: 'IngresosHidrocarburos';
	attributes: {
		/** Atributo requerido para precisar el importe total de las contraprestaciones pagadas al operador del consorcio.	**/
		ContraprestacionPagadaOperador: string;
		/** Atributo requerido para expresar el número de contrato asignado por la Comisión Nacional de Hidrocarburos con el cual se encuentra vinculado el ingreso.	**/
		NumeroContrato: string;
		/** Atributo requerido para expresar el porcentaje que ampara el CFDI que emite cada integrante del consorcio al operador, respecto del total de las contraprestaciones entregadas al operador del consorcio por el FMP.	**/
		Porcentaje: string;
		/** Atributo requerido que indica la versión del complemento.	**/
		Version: string;
	};
	children: IngresosHidrocarburosDocumentoRelacionado[];
}

/** Atributo requerido para expresar el mes que corresponda al CFDI expedido por el operador del consorcio al FMP.**/
export type Meses = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';

/** Atributo requerido para expresar el número de contrato asignado por la Comisión Nacional de Hidrocarburos con el cual se encuentra vinculado el ingreso.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export interface NumeroContrato extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,50}
			 * @minLength 1
			 * @maxLength 50
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de contrato asignado por la Comisión Nacional de Hidrocarburos con el cual se encuentra vinculado el ingreso.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export type IngresosHidrocarburosNumeroContrato = string;

/** Atributo requerido para expresar el porcentaje que ampara el CFDI que emite cada integrante del consorcio al operador, respecto del total de las contraprestaciones entregadas al operador del consorcio por el FMP.
 * @maxInclusive 0.001
 **/
export interface Porcentaje extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.001
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el porcentaje que ampara el CFDI que emite cada integrante del consorcio al operador, respecto del total de las contraprestaciones entregadas al operador del consorcio por el FMP.
 * @maxInclusive 0.001
 **/
export type IngresosHidrocarburosPorcentaje = string;

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
export type IngresosHidrocarburosVersion = string;
