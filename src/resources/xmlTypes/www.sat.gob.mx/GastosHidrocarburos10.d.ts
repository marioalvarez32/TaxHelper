import * as Primitive from '../xml-primitives';
import * as catCEH from './sitio_internet/cfd/catalogos/hidrocarburos';
import * as tdCFDI from './sitio_internet/cfd/tipoDatos/tdCFDI';

// Source files:
// http://localhost:56607/sitio_internet/cfd/GastosHidrocarburos10/GastosHidrocarburos10.xsd

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

/** Nodo opcional para registrar las actividades petroleras.**/
export interface GastosHidrocarburosErogacionActividades extends XastElement {
	type: 'element';
	name: 'Actividades';
	attributes: {
		/** Atributo opcional para expresar la actividad con la cual se encuentra relacionado el costo, gasto o inversión de que se trata, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.	**/
		ActividadRelacionada?: catCEH.Actividades;
	};
	children: GastosHidrocarburosErogacionActividadesSubActividades[];
}

/** Atributo opcional para expresar la actividad con la cual se encuentra relacionado el costo, gasto o inversión de que se trata, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.**/
export type Actividades = '01' | '02' | '03' | '04' | '05';

/** Atributo opcional para especificar el centro de costos del área contractual al cual se encuentra relacionado el costo, gasto o inversión, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export interface AreaContractual extends XastElement {
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
/** Atributo opcional para especificar el centro de costos del área contractual al cual se encuentra relacionado el costo, gasto o inversión, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export type GastosHidrocarburosAreaContractual = string;

/** Atributo opcional para especificar el centro de costos del campo al cual se encuentra relacionado el costo, gasto o inversión, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export interface Campo extends XastElement {
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
/** Atributo opcional para especificar el centro de costos del campo al cual se encuentra relacionado el costo, gasto o inversión, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export type GastosHidrocarburosErogacionCentroCostosCampo = string;

/** Nodo opcional para capturar los datos complementarios del centro de costos al cual se encuentra relacionado el costo, gasto o inversión, especificando el pozo, yacimiento, campo y área contractual correspondiente.**/
export interface GastosHidrocarburosErogacionCentroCostos extends XastElement {
	type: 'element';
	name: 'CentroCostos';
	attributes: {
		/** Atributo opcional para especificar el centro de costos del campo al cual se encuentra relacionado el costo, gasto o inversión, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.	**/
		Campo?: string;
	};
	children: GastosHidrocarburosErogacionCentroCostosYacimientos[];
}

/** Atributo condicional para expresar la clave de pago del pedimento tramitado por el operador del consorcio con motivo de los costos, gastos o inversiones, realizadas en el extranjero.**/
export type ClavePagoPedimento = '00' | '02' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '18' | '19' | '20' | '21' | '22';

/** Atributo condicional para expresar la clave del pedimento de importación tramitado por el operador del consorcio con motivo de los costos, gastos o inversiones, realizadas en el extranjero.**/
export type ClavePedimento =
	| 'A1'
	| 'A3'
	| 'C1'
	| 'D1'
	| 'GC'
	| 'K1'
	| 'L1'
	| 'P1'
	| 'S2'
	| 'T1'
	| 'VF'
	| 'VU'
	| 'V1'
	| 'V2'
	| 'V5'
	| 'V6'
	| 'V7'
	| 'V9'
	| 'VD'
	| 'AD'
	| 'AJ'
	| 'BA'
	| 'BB'
	| 'BC'
	| 'BD'
	| 'BE'
	| 'BF'
	| 'BH'
	| 'BI'
	| 'BM'
	| 'BO'
	| 'BP'
	| 'BR'
	| 'H1'
	| 'H8'
	| 'I1'
	| 'F4'
	| 'F5'
	| 'IN'
	| 'AF'
	| 'RT'
	| 'A4'
	| 'E1'
	| 'E2'
	| 'G1'
	| 'C3'
	| 'K2'
	| 'A5'
	| 'E3'
	| 'E4'
	| 'G2'
	| 'K3'
	| 'F2'
	| 'F3'
	| 'V3'
	| 'V4'
	| 'F8'
	| 'F9'
	| 'G6'
	| 'G7'
	| 'V8'
	| 'M1'
	| 'M2'
	| 'J3'
	| 'G8'
	| 'M3'
	| 'M4'
	| 'M5'
	| 'J4'
	| 'T3'
	| 'T6'
	| 'T7'
	| 'T9'
	| 'R1'
	| 'CT';

/** Nodo requerido para expresar la información del documento relacionado a la erogación.**/
export interface GastosHidrocarburosErogacionDocumentoRelacionado extends XastElement {
	type: 'element';
	name: 'DocumentoRelacionado';
	attributes: {
		/** Atributo condicional para expresar la clave de pago del pedimento tramitado por el operador del consorcio con motivo de los costos, gastos o inversiones, realizadas en el extranjero.	**/
		ClavePagoPedimentoVinculado?: catCEH.ClavePagoPedimento;
		/** Atributo condicional para expresar la clave del pedimento de importación tramitado por el operador del consorcio con motivo de los costos, gastos o inversiones, realizadas en el extranjero.	**/
		ClavePedimentoVinculado?: catCEH.ClavePedimento;
		/** Atributo condicional para expresar la fecha del comprobante fiscal, emitido al operador del consorcio con motivo de los costos, gastos o inversiones. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.	**/
		/** A date, unknown format **/
		FechaFolioFiscalVinculado?: string;
		/** Atributo condicional para expresar el folio fiscal del CFDI emitido al operador del consorcio con motivo de los costos, gastos o inversiones.	**/
		FolioFiscalVinculado?: string;
		/** Atributo requerido para expresar el mes al que corresponden los costos, gastos o inversiones efectuadas.	**/
		Mes: catCEH.Meses;
		/** Atributo condicional para expresar el IVA pagado del pedimento de importación tramitado por el operador del consorcio con motivo de los costos, gastos o inversiones, realizadas en el extranjero.	**/
		MontoIVAPedimento?: string;
		/** Atributo condicional para expresar el monto de retención del ISR que conste en el CFDI expedido al operador del consorcio.	**/
		MontoRetencionISR?: string;
		/** Atributo condicional para expresar el monto de retención del IVA que conste en el CFDI expedido al operador del consorcio.	**/
		MontoRetencionIVA: string;
		/** Atributo condicional para expresar el monto de retención de otros impuestos que conste en el CFDI expedido al operador del consorcio.	**/
		MontoRetencionOtrosImpuestos?: string;
		/** Atributo requerido para expresar el monto total del costo, gasto o inversión, según corresponda, que conste en el CFDI o en el comprobante fiscal que cumpla con lo dispuesto en la regla 2.7.1.16. (o la regla que corresponda en la RMF del ejercicio que se trate), emitido a favor del operador del consorcio, el cual se encuentra vinculado con el CFDI emitido al integrante del consorcio.	**/
		MontoTotalErogaciones: string;
		/** Atributo condicional para expresar el monto total del IVA del CFDI expedido al operador del consorcio, el cual se encuentra vinculado con el CFDI emitido al integrante del consorcio.	**/
		MontoTotalIVA?: string;
		/** Atributo condicional para expresar el número del pedimento de importación tramitado por el operador del consorcio con motivo de los costos, gastos o inversiones realizados en el extranjero, se expresa en el siguiente formato: últimos 2 dígitos del año de validación seguidos por dos espacios, 2 dígitos de la aduana de despacho seguidos por dos espacios, 4 dígitos del número de la patente seguidos por dos espacios, 1 dígito que corresponde al último dígito del año en curso, salvo que se trate de un pedimento consolidado iniciado en el año inmediato anterior o del pedimento original de una rectificación, seguido de 6 dígitos de la numeración progresiva por aduana.	**/
		NumeroPedimentoVinculado?: string;
		/** Atributo requerido para expresar el origen de la operación nacional o extranjera, por lo que cuando sea nacional, deberá señalarse el FolioFiscalVinculado y cuando sea extranjera, deberá señalarse el NumeroPedimentoVinculado.	**/
		OrigenErogacion: GastosHidrocarburosErogacionDocumentoRelacionadoOrigenErogacion;
		/** Atributo condicional para expresar el monto total de otros impuestos pagados en el pedimento de importación, diferente de IVA, tramitado por el operador del consorcio con motivo de los costos, gastos o inversiones, realizadas en el extranjero.	**/
		OtrosImpuestosPagadosPedimento?: string;
		/** Atributo condicional para expresar el RFC del proveedor que expidió el CFDI a favor del operador del consorcio, con el que se encuentra vinculado el costo, gasto o inversión.	**/
		RFCProveedor?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo requerido para capturar los datos de la erogación.**/
export interface GastosHidrocarburosErogacion extends XastElement {
	type: 'element';
	name: 'Erogacion';
	attributes: {
		/** Atributo requerido para expresar el importe de cada uno de los costos, gastos o inversiones efectuados en el mes de que se trate y que integran el total del monto del CFDI emitido al integrante del consorcio y que se encuentran amparados en el CFDI o en el comprobante fiscal que cumpla con lo dispuesto en la regla 2.7.1.16. (o la regla que corresponda en la RMF del ejercicio de que se trate), expedido a favor del operador del consorcio.	**/
		MontocuErogacion: string;
		/** Atributo requerido para expresar el porcentaje que representa el importe total del CFDI que se expide al integrante del consorcio por los costos, gastos o inversiones efectuados en el mes de que se trate, en relación al importe total de los comprobantes expedidos al operador del consorcio.	**/
		Porcentaje: string;
		/** Atributo requerido para señalar el tipo de erogación realizada por el operador.	**/
		TipoErogacion: GastosHidrocarburosErogacionTipoErogacion;
	};
	children: (GastosHidrocarburosErogacionActividades | GastosHidrocarburosErogacionCentroCostos | GastosHidrocarburosErogacionDocumentoRelacionado)[];
}

/** Atributo condicional para expresar la fecha del comprobante fiscal, emitido al operador del consorcio con motivo de los costos, gastos o inversiones. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.
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
/** Atributo condicional para expresar la fecha del comprobante fiscal, emitido al operador del consorcio con motivo de los costos, gastos o inversiones. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601.
 * @pattern ([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
 **/
export type GastosHidrocarburosErogacionDocumentoRelacionadoFechaFolioFiscalVinculado = string;

/** Atributo condicional para expresar el folio fiscal del CFDI emitido al operador del consorcio con motivo de los costos, gastos o inversiones.
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
/** Atributo condicional para expresar el folio fiscal del CFDI emitido al operador del consorcio con motivo de los costos, gastos o inversiones.
 * @pattern [a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}
 **/
export type GastosHidrocarburosErogacionDocumentoRelacionadoFolioFiscalVinculado = string;

/** Complemento para incorporar la información sobre los gastos del consorcio derivados de la ejecución de un contrato de exploración o extracción de hidrocarburos.**/
export interface GastosHidrocarburos extends XastElement {
	type: 'element';
	name: 'GastosHidrocarburos';
	attributes: {
		/** Atributo opcional para especificar el centro de costos del área contractual al cual se encuentra relacionado el costo, gasto o inversión, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.	**/
		AreaContractual?: string;
		/** Atributo requerido para expresar el número de contrato asignado por la Comisión Nacional de Hidrocarburos con el cual se encuentra vinculado el gasto.	**/
		NumeroContrato: string;
		/** Atributo requerido que indicar la versión del complemento.	**/
		Version: string;
	};
	children: GastosHidrocarburosErogacion[];
}

/** Atributo requerido para expresar el mes al que corresponden los costos, gastos o inversiones efectuadas.**/
export type Meses = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface MontocuErogacion extends XastElement {
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

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface MontoIVAPedimento extends XastElement {
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
export interface MontoRetencionISR extends XastElement {
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
export interface MontoRetencionIVA extends XastElement {
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
export interface MontoRetencionOtrosImpuestos extends XastElement {
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
export interface MontoTotalErogaciones extends XastElement {
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
export interface MontoTotalIVA extends XastElement {
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

/** Atributo requerido para expresar el número de contrato asignado por la Comisión Nacional de Hidrocarburos con el cual se encuentra vinculado el gasto.
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
/** Atributo requerido para expresar el número de contrato asignado por la Comisión Nacional de Hidrocarburos con el cual se encuentra vinculado el gasto.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export type GastosHidrocarburosNumeroContrato = string;

/** Atributo condicional para expresar el número del pedimento de importación tramitado por el operador del consorcio con motivo de los costos, gastos o inversiones realizados en el extranjero, se expresa en el siguiente formato: últimos 2 dígitos del año de validación seguidos por dos espacios, 2 dígitos de la aduana de despacho seguidos por dos espacios, 4 dígitos del número de la patente seguidos por dos espacios, 1 dígito que corresponde al último dígito del año en curso, salvo que se trate de un pedimento consolidado iniciado en el año inmediato anterior o del pedimento original de una rectificación, seguido de 6 dígitos de la numeración progresiva por aduana.
 * @pattern [0-9]{2}  [0-9]{2}  [0-9]{4}  [0-9]{7}
 **/
export interface NumeroPedimentoVinculado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{2}  [0-9]{2}  [0-9]{4}  [0-9]{7}
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el número del pedimento de importación tramitado por el operador del consorcio con motivo de los costos, gastos o inversiones realizados en el extranjero, se expresa en el siguiente formato: últimos 2 dígitos del año de validación seguidos por dos espacios, 2 dígitos de la aduana de despacho seguidos por dos espacios, 4 dígitos del número de la patente seguidos por dos espacios, 1 dígito que corresponde al último dígito del año en curso, salvo que se trate de un pedimento consolidado iniciado en el año inmediato anterior o del pedimento original de una rectificación, seguido de 6 dígitos de la numeración progresiva por aduana.
 * @pattern [0-9]{2}  [0-9]{2}  [0-9]{4}  [0-9]{7}
 **/
export type GastosHidrocarburosErogacionDocumentoRelacionadoNumeroPedimentoVinculado = string;

/** Atributo requerido para expresar el origen de la operación nacional o extranjera, por lo que cuando sea nacional, deberá señalarse el FolioFiscalVinculado y cuando sea extranjera, deberá señalarse el NumeroPedimentoVinculado.**/
export type GastosHidrocarburosErogacionDocumentoRelacionadoOrigenErogacion = 'Nacional' | 'Extranjero';

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface OtrosImpuestosPagadosPedimento extends XastElement {
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

/** Atributo requerido para expresar el porcentaje que representa el importe total del CFDI que se expide al integrante del consorcio por los costos, gastos o inversiones efectuados en el mes de que se trate, en relación al importe total de los comprobantes expedidos al operador del consorcio.
 * @maxInclusive 99.999
 **/
export interface Porcentaje extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 99.999
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el porcentaje que representa el importe total del CFDI que se expide al integrante del consorcio por los costos, gastos o inversiones efectuados en el mes de que se trate, en relación al importe total de los comprobantes expedidos al operador del consorcio.
 * @maxInclusive 99.999
 **/
export type GastosHidrocarburosErogacionPorcentaje = string;

/** Atributo opcional para especificar el centro de costos del pozo al cual se encuentra relacionado el costo, gasto o inversión, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export interface Pozo extends XastElement {
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
/** Atributo opcional para especificar el centro de costos del pozo al cual se encuentra relacionado el costo, gasto o inversión, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export type GastosHidrocarburosErogacionCentroCostosYacimientosPozosPozo = string;

/** Nodo opcional para registrar el centro de costos del Pozo al cual se encuentra relacionado el Yacimiento.**/
export interface GastosHidrocarburosErogacionCentroCostosYacimientosPozos extends XastElement {
	type: 'element';
	name: 'Pozos';
	attributes: {
		/** Atributo opcional para especificar el centro de costos del pozo al cual se encuentra relacionado el costo, gasto o inversión, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.	**/
		Pozo?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo condicional para expresar el RFC del proveedor que expidió el CFDI a favor del operador del consorcio, con el que se encuentra vinculado el costo, gasto o inversión.
 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export interface RFCProveedor extends XastElement {
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
/** Atributo condicional para expresar el RFC del proveedor que expidió el CFDI a favor del operador del consorcio, con el que se encuentra vinculado el costo, gasto o inversión.
 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export type GastosHidrocarburosErogacionDocumentoRelacionadoRFCProveedor = string;

/** Nodo opcional para registrar las sub actividades relacionadas a cada actividad petrolera.**/
export interface GastosHidrocarburosErogacionActividadesSubActividades extends XastElement {
	type: 'element';
	name: 'SubActividades';
	attributes: {
		/** Atributo opcional para expresar la subactividad con la cual se encuentra relacionado el costo, gasto o inversión de que se trata, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.	**/
		SubActividadRelacionada?: catCEH.SubActividad;
	};
	children: GastosHidrocarburosErogacionActividadesSubActividadesTareas[];
}

/** Atributo opcional para expresar la subactividad con la cual se encuentra relacionado el costo, gasto o inversión de que se trata, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.**/
export type SubActividad = '001' | '002' | '003' | '004' | '005' | '006' | '007' | '008' | '009' | '010' | '011' | '012' | '013' | '014' | '015' | '016' | '017' | '018' | '019' | '020' | '021' | '022' | '023' | '024' | '025' | '026' | '027' | '028' | '029' | '030' | '031' | '032' | '033' | '034' | '035' | '036' | '037' | '038' | '039';

/** Atributo opcional para expresar la tarea con la cual se encuentra relacionado el costo, gasto o inversión de que se trata, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.**/
export type Tareas =
	| '0001'
	| '0002'
	| '0003'
	| '0004'
	| '0005'
	| '0006'
	| '0007'
	| '0008'
	| '0009'
	| '0010'
	| '0011'
	| '0012'
	| '0013'
	| '0014'
	| '0015'
	| '0016'
	| '0017'
	| '0018'
	| '0019'
	| '0020'
	| '0021'
	| '0022'
	| '0023'
	| '0024'
	| '0025'
	| '0026'
	| '0027'
	| '0028'
	| '0029'
	| '0030'
	| '0031'
	| '0032'
	| '0033'
	| '0034'
	| '0035'
	| '0036'
	| '0037'
	| '0038'
	| '0039'
	| '0040'
	| '0041'
	| '0042'
	| '0043'
	| '0044'
	| '0045'
	| '0046'
	| '0047'
	| '0048'
	| '0049'
	| '0050'
	| '0051'
	| '0052'
	| '0053'
	| '0054'
	| '0055'
	| '0056'
	| '0057'
	| '0058'
	| '0059'
	| '0060'
	| '0061'
	| '0062'
	| '0063'
	| '0064'
	| '0065'
	| '0066'
	| '0067'
	| '0068'
	| '0069'
	| '0070'
	| '0071'
	| '0072'
	| '0073'
	| '0074'
	| '0075'
	| '0076'
	| '0077'
	| '0078'
	| '0079'
	| '0080'
	| '0081'
	| '0082'
	| '0083'
	| '0084'
	| '0085'
	| '0086'
	| '0087'
	| '0088'
	| '0089'
	| '0090'
	| '0091'
	| '0092'
	| '0093'
	| '0094'
	| '0095'
	| '0096'
	| '0097'
	| '0098'
	| '0099'
	| '0100'
	| '0101'
	| '0102'
	| '0103'
	| '0104'
	| '0105'
	| '0106'
	| '0107'
	| '0108'
	| '0109'
	| '0110'
	| '0111'
	| '0112'
	| '0113'
	| '0114'
	| '0115'
	| '0116'
	| '0117'
	| '0118'
	| '0119'
	| '0120'
	| '0121'
	| '0122'
	| '0123'
	| '0124'
	| '0125'
	| '0126'
	| '0127'
	| '0128'
	| '0129'
	| '0130'
	| '0131'
	| '0132'
	| '0133'
	| '0134'
	| '0135'
	| '0136'
	| '0137'
	| '0138'
	| '0139'
	| '0140'
	| '0141'
	| '0142'
	| '0143'
	| '0144'
	| '0145'
	| '0146'
	| '0147'
	| '0148'
	| '0149'
	| '0150'
	| '0151'
	| '0152'
	| '0153'
	| '0154'
	| '0155';

/** Nodo opcional para registrar las tareas relacionadas a cada sub actividad petrolera.**/
export interface GastosHidrocarburosErogacionActividadesSubActividadesTareas extends XastElement {
	type: 'element';
	name: 'Tareas';
	attributes: {
		/** Atributo opcional para expresar la tarea con la cual se encuentra relacionado el costo, gasto o inversión de que se trata, conforme a los “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.	**/
		TareaRelacionada?: catCEH.Tareas;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para señalar el tipo de erogación realizada por el operador.**/
export type GastosHidrocarburosErogacionTipoErogacion = 'Costo' | 'Gasto' | 'Inversión';

/** Atributo requerido que indicar la versión del complemento.**/
export interface Version extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido que indicar la versión del complemento.**/
export type GastosHidrocarburosVersion = string;

/** Atributo opcional para especificar el centro de costos del yacimiento al cual se encuentra relacionado el costo, gasto o inversión,  conforme a los  “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export interface Yacimiento extends XastElement {
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
/** Atributo opcional para especificar el centro de costos del yacimiento al cual se encuentra relacionado el costo, gasto o inversión,  conforme a los  “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.
 * @pattern [^|]{1,50}
 * @minLength 1
 * @maxLength 50
 **/
export type GastosHidrocarburosErogacionCentroCostosYacimientosYacimiento = string;

/** Nodo opcional para registrar el centro de costos del yacimiento al cual se encuentra relacionado el campo.**/
export interface GastosHidrocarburosErogacionCentroCostosYacimientos extends XastElement {
	type: 'element';
	name: 'Yacimientos';
	attributes: {
		/** Atributo opcional para especificar el centro de costos del yacimiento al cual se encuentra relacionado el costo, gasto o inversión,  conforme a los  “Lineamientos para la elaboración y presentación de los costos, gastos e inversiones; la procura de bienes y servicios en los contratos y asignaciones; la verificación contable y financiera de los contratos, y la actualización de regalías en contratos y del derecho de extracción de hidrocarburos”, emitidos por la Secretaria de Hacienda y Crédito Público.	**/
		Yacimiento?: string;
	};
	children: GastosHidrocarburosErogacionCentroCostosYacimientosPozos[];
}
