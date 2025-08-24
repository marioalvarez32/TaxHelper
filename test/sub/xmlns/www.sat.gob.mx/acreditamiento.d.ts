import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/acreditamiento/AcreditamientoIEPS10.xsd

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

export type CTAR =
	| '617'
	| '619'
	| '624'
	| '652'
	| '654'
	| '655'
	| '656'
	| '658'
	| '659'
	| '660'
	| '661'
	| '667'
	| '693'
	| '602'
	| '603'
	| '604'
	| '605'
	| '606'
	| '607'
	| '608'
	| '609'
	| '611'
	| '612'
	| '613'
	| '614'
	| '615'
	| '620'
	| '621'
	| '622'
	| '623'
	| '625'
	| '657'
	| '664'
	| '665'
	| '666'
	| '669'
	| '695'
	| '696'
	| '697'
	| '699'
	| '627'
	| '628'
	| '629'
	| '630'
	| '631'
	| '632'
	| '633'
	| '636'
	| '637'
	| '638'
	| '639'
	| '640'
	| '641'
	| '644'
	| '645'
	| '646'
	| '647'
	| '648'
	| '649'
	| '650'
	| '663'
	| '668'
	| '672'
	| '673'
	| '674'
	| '675'
	| '676'
	| '677'
	| '678'
	| '681'
	| '682'
	| '683'
	| '684'
	| '685'
	| '688'
	| '689'
	| '690'
	| '698';
interface _CTAR extends Primitive._String {
	content: CTAR;
}

/** Nodo requerido para expresar los detalles de la descripción del concepto para efectos de poder determinar el monto del estímulo aplicable.**/
export interface AcreditamientoIEPS extends XastElement {
	type: 'element';
	name: 'acreditamientoIEPS';
	attributes: {
		/** Atributo requerido  para expresar la clave de la Terminal de Almacenamiento y Reparto (CVE TAR), conforme al catálogo publicado en la página de Internet del SAT,  mismo que servirá para identificar la cuota por litro conforme a las tablas que publique la Secretaría de Hacienda y Crédito Público para determinar el monto del estímulo fiscal.	**/
		TAR: string;
		/** Atributo requerido que indica la versión del complemento concepto.	**/
		Version: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido  para expresar la clave de la Terminal de Almacenamiento y Reparto (CVE TAR), conforme al catálogo publicado en la página de Internet del SAT,  mismo que servirá para identificar la cuota por litro conforme a las tablas que publique la Secretaría de Hacienda y Crédito Público para determinar el monto del estímulo fiscal.**/
export interface TAR extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido  para expresar la clave de la Terminal de Almacenamiento y Reparto (CVE TAR), conforme al catálogo publicado en la página de Internet del SAT,  mismo que servirá para identificar la cuota por litro conforme a las tablas que publique la Secretaría de Hacienda y Crédito Público para determinar el monto del estímulo fiscal.**/
export type AcreditamientoIEPSTAR = string;

/** Atributo requerido que indica la versión del complemento concepto.**/
export interface Version extends XastElement {
	name: 'Version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
