import * as Primitive from '../../../../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/catalogos/Nomina/catNomina.xsd

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
interface _CBanco extends Primitive._String {
	content: CBanco;
}

export type COrigenRecurso = 'IP' | 'IF' | 'IM';
interface _COrigenRecurso extends Primitive._String {
	content: COrigenRecurso;
}

export type CPeriodicidadPago = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '99';
interface _CPeriodicidadPago extends Primitive._String {
	content: CPeriodicidadPago;
}

export type CTipoContrato = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '99';
interface _CTipoContrato extends Primitive._String {
	content: CTipoContrato;
}

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
interface _CTipoDeduccion extends Primitive._String {
	content: CTipoDeduccion;
}

export type CTipoHoras = '01' | '02' | '03';
interface _CTipoHoras extends Primitive._String {
	content: CTipoHoras;
}

export type CTipoIncapacidad = '01' | '02' | '03' | '04';
interface _CTipoIncapacidad extends Primitive._String {
	content: CTipoIncapacidad;
}

export type CTipoJornada = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '99';
interface _CTipoJornada extends Primitive._String {
	content: CTipoJornada;
}

export type CTipoNomina = 'O' | 'E';
interface _CTipoNomina extends Primitive._String {
	content: CTipoNomina;
}

export type CTipoOtroPago = '001' | '002' | '003' | '004' | '005' | '006' | '007' | '008' | '009' | '999';
interface _CTipoOtroPago extends Primitive._String {
	content: CTipoOtroPago;
}

export type CTipoPercepcion = '001' | '002' | '003' | '004' | '005' | '006' | '009' | '010' | '011' | '012' | '013' | '014' | '015' | '019' | '020' | '021' | '022' | '023' | '024' | '025' | '026' | '027' | '028' | '029' | '030' | '031' | '032' | '033' | '034' | '035' | '036' | '037' | '038' | '039' | '044' | '045' | '046' | '047' | '048' | '049' | '050' | '051' | '052' | '053';
interface _CTipoPercepcion extends Primitive._String {
	content: CTipoPercepcion;
}

export type CTipoRegimen = '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '99';
interface _CTipoRegimen extends Primitive._String {
	content: CTipoRegimen;
}

export type CRiesgoPuesto = '1' | '2' | '3' | '4' | '5' | '99';
interface _CRiesgoPuesto extends Primitive._String {
	content: CRiesgoPuesto;
}
