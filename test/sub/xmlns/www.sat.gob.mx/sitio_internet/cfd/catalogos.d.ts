import * as Primitive from '../../../xml-primitives';
import { XastAttributes, XastText, XastComment, XastCData, XastInstruction } from '../../../xml-primitives';
import { CClaveProdServ as CClaveProdServType } from './CClaveProdServ';
import { CCodigoPostal as CCodigoPostalType } from './CCodigoPostal';
import { CMoneda as CMonedaType } from './Cmoneda';
import { CClaveUnidad as CClaveUnidadType } from './CClaveUnidad';
import { CPais as CPaisType } from './CPais';
import { CEstado as CEstadoType } from './CEstado';
import { CColonia as CColoniaType } from './CColonia';
import { CMunicipio as CMunicipioType } from './CMunicipio';

// Source files:
// http://localhost:56607/sitio_internet/cfd/catalogos/catCFDI.xsd

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

export type CExportacion = '01' | '02' | '03' | '04';
interface _CExportacion extends Primitive._String {
	content: CExportacion;
}

export type CFormaPago = '01' | '02' | '03' | '04' | '05' | '06' | '08' | '12' | '13' | '14' | '15' | '17' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '99';

interface _CFormaPago extends Primitive._String {
	content: CFormaPago;
}

export type CCodigoPostal = CCodigoPostalType;

interface _CCodigoPostal extends Primitive._String {
	content: CCodigoPostal;
}

export type CMetodoPago = 'PUE' | 'PPD';
interface _CMetodoPago extends Primitive._String {
	content: CMetodoPago;
}

export type CMoneda = CMonedaType;
interface _CMoneda extends Primitive._String {
	content: CMoneda;
}

export type CTipoDeComprobante = 'I' | 'E' | 'T' | 'N' | 'P';
interface _CTipoDeComprobante extends Primitive._String {
	content: CTipoDeComprobante;
}

export type CTipoRelacion = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09';
interface _CTipoRelacion extends Primitive._String {
	content: CTipoRelacion;
}

export type CClaveProdServ = CClaveProdServType;
interface _CClaveProdServ extends Primitive._String {
	content: CClaveProdServ;
}
export type CClaveUnidad = CClaveUnidadType;
interface _CClaveUnidad extends Primitive._String {
	content: CClaveUnidad;
}

export type CObjetoImp = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08';
interface _CObjetoImp extends Primitive._String {
	content: CObjetoImp;
}

/** Atributo requerido para incorporar la clave del
 * régimen del contribuyente emisor al que aplicará el efecto
 * fiscal de este comprobante.
 **/
export type CRegimenFiscal = '601' | '603' | '605' | '606' | '607' | '608' | '609' | '610' | '611' | '612' | '614' | '615' | '616' | '620' | '621' | '622' | '623' | '624' | '625' | '626' | '628' | '629' | '630';
interface _CRegimenFiscal extends Primitive._String {
	content: CRegimenFiscal;
}

export type CImpuesto = '001' | '002' | '003';
interface _CImpuesto extends Primitive._String {
	content: CImpuesto;
}

export type CTipoFactor = 'Tasa' | 'Cuota' | 'Exento';
interface _CTipoFactor extends Primitive._String {
	content: CTipoFactor;
}

export type CMeses = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18';
interface _CMeses extends Primitive._String {
	content: CMeses;
}

export type CPeriodicidad = '01' | '02' | '03' | '04' | '05';
interface _CPeriodicidad extends Primitive._String {
	content: CPeriodicidad;
}

/** Atributo condicional para registrar la clave del
 * país de residencia para efectos fiscales del receptor del
 * comprobante, cuando se trate de un extranjero, y que es conforme
 * con la especificación ISO 3166-1 alpha-3. Es requerido cuando se
 * incluya el complemento de comercio exterior o se registre el
 * atributo NumRegIdTrib.
 **/
export type CPais = CPaisType;
interface _CPais extends Primitive._String {
	content: CPais;
}

export type CUsoCFDI = 'G01' | 'G02' | 'G03' | 'I01' | 'I02' | 'I03' | 'I04' | 'I05' | 'I06' | 'I07' | 'I08' | 'D01' | 'D02' | 'D03' | 'D04' | 'D05' | 'D06' | 'D07' | 'D08' | 'D09' | 'D10' | 'P01' | 'S01' | 'CP01' | 'CN01';
interface _CUsoCFDI extends Primitive._String {
	content: CUsoCFDI;
}

export type CEstado = CEstadoType;
interface _CEstado extends Primitive._String {
	content: CEstado;
}

export type CColonia = CColoniaType;
interface _CColonia extends Primitive._String {
	content: CColonia;
}

export type CLocalidad = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '60' | '61' | '62' | '66' | '67' | '68' | '69';
interface _CLocalidad extends Primitive._String {
	content: CLocalidad;
}

export type CMunicipio = CMunicipioType;
interface _CMunicipio extends Primitive._String {
	content: CMunicipio;
}
