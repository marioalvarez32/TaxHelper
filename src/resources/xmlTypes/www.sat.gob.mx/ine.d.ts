import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/ine/ine10.xsd

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

/** Tipo de proceso.**/
export type TTipoProc = 'Ordinario' | 'Precampaña' | 'Campaña';
interface _TTipoProc extends Primitive._String {
	content: TTipoProc;
}

/** Tipo Comite**/
export type TTipoComite = 'Ejecutivo Nacional' | 'Ejecutivo Estatal';
interface _TTipoComite extends Primitive._String {
	content: TTipoComite;
}

/** Ambito**/
export type TAmbito = 'Local' | 'Federal';
interface _TAmbito extends Primitive._String {
	content: TAmbito;
}

/** Atributo condicional para registrar el tipo de ámbito de un proceso de tipo Campaña o Precampaña. este atributo no se debe registrar para los procesos de tipo Ordinario.**/
export interface Ambito extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo condicional para registrar el tipo de ámbito de un proceso de tipo Campaña o Precampaña. este atributo no se debe registrar para los procesos de tipo Ordinario.**/
export type INEEntidadAmbito = string;

/** Clave Entidad.**/
export type TClaveEntidad = 'AGU' | 'BCN' | 'BCS' | 'CAM' | 'CHP' | 'CHH' | 'COA' | 'COL' | 'DIF' | 'DUR' | 'GUA' | 'GRO' | 'HID' | 'JAL' | 'MEX' | 'MIC' | 'MOR' | 'NAY' | 'NLE' | 'OAX' | 'PUE' | 'QTO' | 'ROO' | 'SLP' | 'SIN' | 'SON' | 'TAB' | 'TAM' | 'TLA' | 'VER' | 'YUC' | 'ZAC';

/** Nodo para expresar la clave de contabilidad de aspirantes precandidatos, candidatos y concentradoras.**/
export interface INEEntidadContabilidad extends XastElement {
	type: 'element';
	name: 'Contabilidad';
	attributes: {
		/** Atributo para registrar la clave de contabilidad de aspirantes precandidatos, candidatos y concentradoras, si se trata de un tipo de proceso Campaña o Precampaña; o se trata de un proceso Ordinario con comité Ejecutivo Estatal.	**/
		IdContabilidad: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo condicional para expresar los datos correspondientes a las entidades federativas en las que se va a aplicar el gasto.**/
export interface INEEntidad extends XastElement {
	type: 'element';
	name: 'Entidad';
	attributes: {
		/** Atributo condicional para registrar el tipo de ámbito de un proceso de tipo Campaña o Precampaña. este atributo no se debe registrar para los procesos de tipo Ordinario.	**/
		Ambito?: string;
		/** Atributo requerido para registrar la clave de la entidad a la que aplica el gasto.	**/
		ClaveEntidad: TClaveEntidad;
	};
	children: INEEntidadContabilidad[];
}

/** Atributo opcional para registrar la clave de contabilidad de aspirantes precandidatos, candidatos y concentradoras, si se trata de un tipo de proceso ordinario y un comité ejecutivo nacional.Para los otros casos, la clave de contabilidad se registra en el atributo ine:Entidad:Contabilidad:IdContabilidad.
   * @maxLength 6
   * @minLength 6

**/
export interface IdContabilidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxLength 6
			 * @minLength 6
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para registrar la clave de contabilidad de aspirantes precandidatos, candidatos y concentradoras, si se trata de un tipo de proceso ordinario y un comité ejecutivo nacional.Para los otros casos, la clave de contabilidad se registra en el atributo ine:Entidad:Contabilidad:IdContabilidad.
   * @maxLength 6
   * @minLength 6

**/
export type INEIdContabilidad = string;

/** Atributo para registrar la clave de contabilidad de aspirantes precandidatos, candidatos y concentradoras, si se trata de un tipo de proceso Campaña o Precampaña; o se trata de un proceso Ordinario con comité Ejecutivo Estatal.
 * @maxLength 6
 * @minLength 6
 **/
export type INEEntidadContabilidadIdContabilidad = string;

/** Complemento al Comprobante Fiscal Digital por Internet (CFDI) para incluir los datos que identifiquen el tipo de proceso al que van dirigidos los gastos que realizan los partidos o las Asociaciones Civiles.**/
export interface INE extends XastElement {
	type: 'element';
	name: 'INE';
	attributes: {
		/** Atributo opcional para registrar la clave de contabilidad de aspirantes precandidatos, candidatos y concentradoras, si se trata de un tipo de proceso ordinario y un comité ejecutivo nacional.Para los otros casos, la clave de contabilidad se registra en el atributo ine:Entidad:Contabilidad:IdContabilidad.
		 **/
		IdContabilidad?: string;
		/** Atributo condicional para expresar el tipo de comité de que se trate.	**/
		TipoComite?: string;
		/** Atributo requerido para expresar el tipo de proceso de que se trate.	**/
		TipoProceso: string;
		/** Atributo requerido que indica la versión del complemento.	**/
		Version: string;
	};
	children: INEEntidad[];
}

/** Atributo condicional para expresar el tipo de comité de que se trate.**/
export interface TipoComite extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo condicional para expresar el tipo de comité de que se trate.**/
export type INETipoComite = string;

/** Atributo requerido para expresar el tipo de proceso de que se trate.**/
export interface TipoProceso extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar el tipo de proceso de que se trate.**/
export type INETipoProceso = string;

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
export type INEVersion = string;
