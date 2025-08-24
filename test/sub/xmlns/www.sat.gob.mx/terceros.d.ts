import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/terceros/terceros11.xsd

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

/** Tipo definido para expresar domicilios o direcciones**/
export interface TUbicacionFiscal extends XastElement {
	type: 'element';
	name: string;
	attributes: {
		/** Este atributo requerido sirve para precisar la avenida, calle, camino o carretera donde se da la ubicación.	**/
		calle: string;
		/** Atributo requerido que sirve para asentar el código postal en donde se da la ubicación.	**/
		codigoPostal: string;
		/** Este atributo opcional sirve para precisar la colonia en donde se da la ubicación cuando se desea ser más específico en casos de ubicaciones urbanas.	**/
		colonia?: string;
		/** Atributo requerido que sirve para precisar el estado o entidad federativa donde se da la ubicación.	**/
		estado: string;
		/** Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación.	**/
		localidad?: string;
		/** Atributo requerido que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación.	**/
		municipio: string;
		/** Este atributo opcional sirve para expresar el número particular en donde se da la ubicación sobre una calle dada.	**/
		noExterior?: string;
		/** Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación de forma precisa.	**/
		noInterior?: string;
		/** Atributo requerido que sirve para precisar el país donde se da la ubicación.	**/
		pais: string;
		/** Atributo opcional para expresar una referencia de ubicación adicional.	**/
		referencia?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo opcional para precisar la aduana por la que se efectuó la importación del bien.
 * @minLength 1
 **/
export interface Aduana extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para precisar la aduana por la que se efectuó la importación del bien.
 * @minLength 1
 **/
export type TInformacionAduaneraAduana = string;

/** Este atributo requerido sirve para precisar la avenida, calle, camino o carretera donde se da la ubicación.
 * @minLength 1
 **/
export interface Calle extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Este atributo requerido sirve para precisar la avenida, calle, camino o carretera donde se da la ubicación.
 * @minLength 1
 **/
export type TUbicacionFiscalCalle = string;

/** Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por la presente parte.**/
export interface Cantidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por la presente parte.**/
export type PorCuentadeTercerosParteCantidad = string;

/** Atributo requerido que sirve para asentar el código postal en donde se da la ubicación.**/
export interface CodigoPostal extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido que sirve para asentar el código postal en donde se da la ubicación.**/
export type TUbicacionFiscalCodigoPostal = string;

/** Este atributo opcional sirve para precisar la colonia en donde se da la ubicación cuando se desea ser más específico en casos de ubicaciones urbanas.
 * @minLength 1
 **/
export interface Colonia extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Este atributo opcional sirve para precisar la colonia en donde se da la ubicación cuando se desea ser más específico en casos de ubicaciones urbanas.
 * @minLength 1
 **/
export type TUbicacionFiscalColonia = string;

/** Nodo opcional para asentar el número de cuenta predial con el que fue registrado el inmueble, en el sistema catastral de la entidad federativa de que trate.**/
export interface PorCuentadeTercerosCuentaPredial extends XastElement {
	type: 'element';
	name: 'CuentaPredial';
	attributes: {
		/** Atributo requerido para precisar el número de la cuenta predial del inmueble cubierto por el presente concepto en caso de recibos de arrendamiento.	**/
		numero: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para precisar la descripción del bien o servicio cubierto por la presente parte.
 * @minLength 1
 **/
export interface Descripcion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para precisar la descripción del bien o servicio cubierto por la presente parte.
 * @minLength 1
 **/
export type PorCuentadeTercerosParteDescripcion = string;

/** Atributo requerido que sirve para precisar el estado o entidad federativa donde se da la ubicación.
 * @minLength 1
 **/
export interface Estado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido que sirve para precisar el estado o entidad federativa donde se da la ubicación.
 * @minLength 1
 **/
export type TUbicacionFiscalEstado = string;

/** Atributo requerido para expresar la fecha de expedición del documento aduanero que ampara la importación del bien.**/
export interface Fecha extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para expresar la fecha de expedición del documento aduanero que ampara la importación del bien.**/
export type TInformacionAduaneraFecha = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface Importe extends XastElement {
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

/** Atributo requerido para señalar el tipo de impuesto retenido**/
export type PorCuentadeTercerosImpuestosRetencionesRetencionImpuesto = 'ISR' | 'IVA';

/** Atributo requerido para señalar el tipo de impuesto trasladado**/
export type PorCuentadeTercerosImpuestosTrasladosTrasladoImpuesto = 'IVA' | 'IEPS';

/** Nodo requerido para capturar los impuestos aplicables.**/
export interface PorCuentadeTercerosImpuestos extends XastElement {
	type: 'element';
	name: 'Impuestos';
	children: (PorCuentadeTercerosImpuestosRetenciones | PorCuentadeTercerosImpuestosTraslados)[];
}

/** Nodo opcional para introducir la información aduanera aplicable cuando se trate de ventas de primera mano de mercancías importadas.**/
export interface PorCuentadeTercerosInformacionAduanera extends TInformacionAduanera {
	type: 'element';
	name: 'InformacionAduanera';
}

/** Tipo definido para expresar información aduanera**/
export interface TInformacionAduanera extends XastElement {
	type: 'element';
	name: string;
	attributes: {
		/** Atributo opcional para precisar la aduana por la que se efectuó la importación del bien.	**/
		aduana: string;
		/** Atributo requerido para expresar la fecha de expedición del documento aduanero que ampara la importación del bien.	**/
		/** A date, unknown format **/
		fecha: string;
		/** Atributo requerido para expresar el número del documento aduanero que ampara la importación del bien.	**/
		numero: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para expresar información fiscal de terceros**/
export interface PorCuentadeTercerosInformacionFiscalTercero extends TUbicacionFiscal {
	type: 'element';
	name: 'InformacionFiscalTercero';
}

/** Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación.
 * @minLength 1
 **/
export interface Localidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación.
 * @minLength 1
 **/
export type TUbicacionFiscalLocalidad = string;

/** Atributo requerido que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación.
 * @minLength 1
 **/
export interface Municipio extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación.
 * @minLength 1
 **/
export type TUbicacionFiscalMunicipio = string;

/** Este atributo opcional sirve para expresar el número particular en donde se da la ubicación sobre una calle dada.
 * @minLength 1
 **/
export interface NoExterior extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Este atributo opcional sirve para expresar el número particular en donde se da la ubicación sobre una calle dada.
 * @minLength 1
 **/
export type TUbicacionFiscalNoExterior = string;

/** Atributo opcional para expresar el número de serie del bien o identificador del servicio amparado por la presente parte.
 * @minLength 1
 **/
export interface NoIdentificacion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar el número de serie del bien o identificador del servicio amparado por la presente parte.
 * @minLength 1
 **/
export type PorCuentadeTercerosParteNoIdentificacion = string;

/** Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación de forma precisa.
 * @minLength 1
 **/
export interface NoInterior extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación de forma precisa.
 * @minLength 1
 **/
export type TUbicacionFiscalNoInterior = string;

/** Atributo opcional para el nombre o razón social del contribuyente emisor del comprobante.
 * @minLength 1
 **/
export interface Nombre extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para el nombre o razón social del contribuyente emisor del comprobante.
 * @minLength 1
 **/
export type PorCuentadeTercerosNombre = string;

/** Atributo requerido para expresar el número del documento aduanero que ampara la importación del bien.
 * @minLength 1
 **/
export interface Numero extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número del documento aduanero que ampara la importación del bien.
 * @minLength 1
 **/
export type TInformacionAduaneraNumero = string;

/** Atributo requerido para precisar el número de la cuenta predial del inmueble cubierto por el presente concepto en caso de recibos de arrendamiento.
 * @minLength 1
 **/
export type PorCuentadeTercerosCuentaPredialNumero = string;

/** Atributo requerido que sirve para precisar el país donde se da la ubicación.
 * @minLength 1
 **/
export interface Pais extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido que sirve para precisar el país donde se da la ubicación.
 * @minLength 1
 **/
export type TUbicacionFiscalPais = string;

/** Nodo opcional para expresar las partes o componentes que integran la totalidad del concepto expresado en el CFD o CFDI**/
export interface PorCuentadeTercerosParte extends XastElement {
	type: 'element';
	name: 'Parte';
	attributes: {
		/** Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por la presente parte.	**/
		cantidad: string;
		/** Atributo requerido para precisar la descripción del bien o servicio cubierto por la presente parte.	**/
		descripcion: string;
		/** Atributo opcional para precisar el importe total de los bienes o servicios de la presente parte. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario expresado en la parte.	**/
		importe?: string;
		/** Atributo opcional para expresar el número de serie del bien o identificador del servicio amparado por la presente parte.	**/
		noIdentificacion?: string;
		/** Atributo opcional para precisar la unidad de medida aplicable para la cantidad expresada en la parte.	**/
		unidad?: string;
		/** Atributo opcional para precisar el valor o precio unitario del bien o servicio cubierto por la presente parte.	**/
		valorUnitario?: string;
	};
	children: TInformacionAduanera[];
}

/** Complemento concepto para la emisión de Comprobante Fiscal Digital (CFD) y Comprobante Fiscal Digital a través de Internet (CFDI) por orden y cuenta de terceros.**/
export interface PorCuentadeTerceros extends XastElement {
	type: 'element';
	name: 'PorCuentadeTerceros';
	attributes: {
		/** Atributo opcional para el nombre o razón social del contribuyente emisor del comprobante.	**/
		nombre: string;
		/** Atributo requerido para la Clave del Registro Federal de Contribuyentes correspondiente al contribuyente emisor del comprobante sin guiones o espacios.	**/
		rfc: string;
	};
	children: (PorCuentadeTercerosCuentaPredial | PorCuentadeTercerosImpuestos | PorCuentadeTercerosInformacionAduanera | PorCuentadeTercerosInformacionFiscalTercero | PorCuentadeTercerosParte)[];
}

/** Atributo opcional para expresar una referencia de ubicación adicional.
 * @minLength 1
 **/
export interface Referencia extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar una referencia de ubicación adicional.
 * @minLength 1
 **/
export type TUbicacionFiscalReferencia = string;

/** Nodo para la información detallada de una retención de impuesto específico**/
export interface PorCuentadeTercerosImpuestosRetencionesRetencion extends XastElement {
	type: 'element';
	name: 'Retencion';
	attributes: {
		/** Atributo requerido para señalar el importe o monto del impuesto retenido	**/
		importe: string;
		/** Atributo requerido para señalar el tipo de impuesto retenido	**/
		impuesto: PorCuentadeTercerosImpuestosRetencionesRetencionImpuesto;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para capturar los impuestos retenidos aplicables**/
export interface PorCuentadeTercerosImpuestosRetenciones extends XastElement {
	type: 'element';
	name: 'Retenciones';
	children: PorCuentadeTercerosImpuestosRetencionesRetencion[];
}

/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @minLength 12
 * @maxLength 13
 **/
export interface Rfc extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 12
			 * @maxLength 13
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @minLength 12
 * @maxLength 13
 **/
export type TRFC = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface Tasa extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo para la información detallada de un traslado de impuesto específico**/
export interface PorCuentadeTercerosImpuestosTrasladosTraslado extends XastElement {
	type: 'element';
	name: 'Traslado';
	attributes: {
		/** Atributo requerido para señalar el importe del impuesto trasladado	**/
		importe: string;
		/** Atributo requerido para señalar el tipo de impuesto trasladado	**/
		impuesto: PorCuentadeTercerosImpuestosTrasladosTrasladoImpuesto;
		/** Atributo requerido para señalar la tasa del impuesto que se traslada por cada concepto amparado en el comprobante	**/
		tasa: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para asentar o referir los impuestos trasladados aplicables**/
export interface PorCuentadeTercerosImpuestosTraslados extends XastElement {
	type: 'element';
	name: 'Traslados';
	children: PorCuentadeTercerosImpuestosTrasladosTraslado[];
}

/** Atributo opcional para precisar la unidad de medida aplicable para la cantidad expresada en la parte.
 * @minLength 1
 **/
export interface Unidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para precisar la unidad de medida aplicable para la cantidad expresada en la parte.
 * @minLength 1
 **/
export type PorCuentadeTercerosParteUnidad = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface ValorUnitario extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
