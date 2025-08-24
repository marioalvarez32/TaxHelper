import * as Primitive from '../../../../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/catalogos/hidrocarburos/catHidrocarburos.xsd

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

export type Actividades = '01' | '02' | '03' | '04' | '05';
interface _Actividades extends Primitive._String {
	content: Actividades;
}

export type SubActividad = '001' | '002' | '003' | '004' | '005' | '006' | '007' | '008' | '009' | '010' | '011' | '012' | '013' | '014' | '015' | '016' | '017' | '018' | '019' | '020' | '021' | '022' | '023' | '024' | '025' | '026' | '027' | '028' | '029' | '030' | '031' | '032' | '033' | '034' | '035' | '036' | '037' | '038' | '039';
interface _SubActividad extends Primitive._String {
	content: SubActividad;
}

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
interface _Tareas extends Primitive._String {
	content: Tareas;
}

export type ClavePagoPedimento = '00' | '02' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '18' | '19' | '20' | '21' | '22';
interface _ClavePagoPedimento extends Primitive._String {
	content: ClavePagoPedimento;
}

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
interface _ClavePedimento extends Primitive._String {
	content: ClavePedimento;
}

export type Meses = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
interface _Meses extends Primitive._String {
	content: Meses;
}
