// Source files:
//

export interface XastAttributes {
	[name: string]: string | null | undefined;
}

export interface XastText {
	type: 'text';
	value: string;
}

export interface XastComment {
	type: 'comment';
	value: string;
}

export interface XastCData {
	type: 'cdata';
	value: string;
}

export interface XastInstruction {
	type: 'instruction';
	name: string;
	value: string;
}

export interface FakerXastElement {
	type: 'element';
	name: string;
	attributes?: XastAttributes | undefined;
	children: ({ type: string; name?: string; attributes?: Record<string, any>; children: any[] } | XastText | XastComment | XastInstruction | XastCData)[];
}

export interface FakeXastElement {
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

export interface XastTextElement extends XastElement {
	children: [XastText];
}

export interface _Boolean extends XastElement {
	content: boolean;
}

export interface _Date extends XastElement {
	content: Date;
}

export interface _Number extends XastElement {
	content: number;
}

export interface _String extends XastElement {
	content: string;
}

export interface _Any extends XastElement {
	content: any;
}
