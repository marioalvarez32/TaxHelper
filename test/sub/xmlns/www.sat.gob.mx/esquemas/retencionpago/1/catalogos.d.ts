import * as Primitive from '../../../../xml-primitives';

// Source files:
// http://localhost:56607/esquemas/retencionpago/1/catalogos/catRetenciones.xsd

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

export type CCveRetenc = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28';
interface _CCveRetenc extends Primitive._String {
	content: CCveRetenc;
}

export type CEjercicio = '2019' | '2020' | '2021' | '2022' | '2023' | '2024' | '2025' | '2026' | '2027';
interface _CEjercicio extends Primitive._String {
	content: CEjercicio;
}

export type CPeriodo = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
interface _CPeriodo extends Primitive._String {
	content: CPeriodo;
}

export type CTipoPagoRet = '01' | '02' | '03' | '04';
interface _CTipoPagoRet extends Primitive._String {
	content: CTipoPagoRet;
}

export type CRetenciones = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26';
interface _CRetenciones extends Primitive._String {
	content: CRetenciones;
}

export type CTipoDividendoOUtilidadDistribuida = '01' | '02' | '03' | '04' | '05' | '06';
interface _CTipoDividendoOUtilidadDistribuida extends Primitive._String {
	content: CTipoDividendoOUtilidadDistribuida;
}

export type CTipoContribuyenteSujetoRetencion = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
interface _CTipoContribuyenteSujetoRetencion extends Primitive._String {
	content: CTipoContribuyenteSujetoRetencion;
}

export type CPais =
	| 'AF'
	| 'AL'
	| 'DE'
	| 'AD'
	| 'AO'
	| 'AI'
	| 'AQ'
	| 'AG'
	| 'AN'
	| 'SA'
	| 'DZ'
	| 'AR'
	| 'AM'
	| 'AW'
	| 'AU'
	| 'AT'
	| 'AZ'
	| 'BS'
	| 'BH'
	| 'BD'
	| 'BB'
	| 'BE'
	| 'BZ'
	| 'BJ'
	| 'BM'
	| 'BY'
	| 'BO'
	| 'BA'
	| 'BW'
	| 'BR'
	| 'BN'
	| 'BG'
	| 'BF'
	| 'BI'
	| 'BT'
	| 'CV'
	| 'TD'
	| 'KY'
	| 'KH'
	| 'CM'
	| 'CA'
	| 'CL'
	| 'CN'
	| 'CY'
	| 'VA'
	| 'CC'
	| 'CO'
	| 'KM'
	| 'CG'
	| 'CK'
	| 'KP'
	| 'KR'
	| 'CI'
	| 'CR'
	| 'HR'
	| 'CU'
	| 'DK'
	| 'DJ'
	| 'DM'
	| 'EC'
	| 'EG'
	| 'SV'
	| 'AE'
	| 'ER'
	| 'SI'
	| 'ES'
	| 'FM'
	| 'US'
	| 'EE'
	| 'ET'
	| 'FJ'
	| 'PH'
	| 'FI'
	| 'FR'
	| 'GA'
	| 'GM'
	| 'GE'
	| 'GH'
	| 'GI'
	| 'GD'
	| 'GR'
	| 'GL'
	| 'GP'
	| 'GU'
	| 'GT'
	| 'GG'
	| 'GW'
	| 'GQ'
	| 'GN'
	| 'GF'
	| 'GY'
	| 'HT'
	| 'HN'
	| 'HK'
	| 'HU'
	| 'IN'
	| 'ID'
	| 'IQ'
	| 'IR'
	| 'IE'
	| 'IS'
	| 'BV'
	| 'IM'
	| 'AX'
	| 'FO'
	| 'GS'
	| 'HM'
	| 'FK'
	| 'MP'
	| 'MH'
	| 'UM'
	| 'SB'
	| 'SJ'
	| 'TK'
	| 'WF'
	| 'IL'
	| 'IT'
	| 'JM'
	| 'JP'
	| 'JE'
	| 'JO'
	| 'KZ'
	| 'KE'
	| 'KI'
	| 'KW'
	| 'KG'
	| 'LS'
	| 'LV'
	| 'LB'
	| 'LR'
	| 'LY'
	| 'LI'
	| 'LT'
	| 'LU'
	| 'MO'
	| 'MK'
	| 'MG'
	| 'MY'
	| 'MW'
	| 'MV'
	| 'ML'
	| 'MT'
	| 'MA'
	| 'MQ'
	| 'MU'
	| 'MR'
	| 'YT'
	| 'MX'
	| 'MD'
	| 'MC'
	| 'MN'
	| 'MS'
	| 'ME'
	| 'MZ'
	| 'MM'
	| 'NA'
	| 'NR'
	| 'CX'
	| 'NP'
	| 'NI'
	| 'NE'
	| 'NG'
	| 'NU'
	| 'NF'
	| 'NO'
	| 'NC'
	| 'NZ'
	| 'OM'
	| 'PIK'
	| 'NL'
	| 'PK'
	| 'PW'
	| 'PS'
	| 'PA'
	| 'PG'
	| 'PY'
	| 'PE'
	| 'PN'
	| 'PF'
	| 'PL'
	| 'PT'
	| 'PR'
	| 'QA'
	| 'GB'
	| 'CZ'
	| 'CF'
	| 'LA'
	| 'RS'
	| 'DO'
	| 'SK'
	| 'CD'
	| 'RW'
	| 'RE'
	| 'RO'
	| 'RU'
	| 'EH'
	| 'WS'
	| 'AS'
	| 'BL'
	| 'KN'
	| 'SM'
	| 'MF'
	| 'PM'
	| 'VC'
	| 'SH'
	| 'LC'
	| 'ST'
	| 'SN'
	| 'SC'
	| 'SL'
	| 'SG'
	| 'SY'
	| 'SO'
	| 'LK'
	| 'ZA'
	| 'SD'
	| 'SE'
	| 'CH'
	| 'SR'
	| 'SZ'
	| 'TJ'
	| 'TH'
	| 'TW'
	| 'TZ'
	| 'IO'
	| 'TF'
	| 'TL'
	| 'TG'
	| 'TO'
	| 'TT'
	| 'TN'
	| 'TC'
	| 'TM'
	| 'TR'
	| 'TV'
	| 'UA'
	| 'UG'
	| 'UY'
	| 'UZ'
	| 'VU'
	| 'VE'
	| 'VN'
	| 'VG'
	| 'VI'
	| 'YE'
	| 'ZM'
	| 'ZW';
interface _CPais extends Primitive._String {
	content: CPais;
}

export type CEntidadesFederativas = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32';
interface _CEntidadesFederativas extends Primitive._String {
	content: CEntidadesFederativas;
}

export type CTipoImpuesto = '01' | '02' | '03';
interface _CTipoImpuesto extends Primitive._String {
	content: CTipoImpuesto;
}

export type CPeriodicidad = '01' | '02' | '03' | '04' | '05';
interface _CPeriodicidad extends Primitive._String {
	content: CPeriodicidad;
}
