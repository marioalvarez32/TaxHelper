import * as catCFDI from '../sitio_internet/cfd/catalogos';
import * as tdCFDI from '../sitio_internet/cfd/tipoDatos/tdCFDI';
import { XastAttributes, XastText, XastComment, XastCData, XastInstruction, FakerXastElement, FakeXastElement, XastElement, XastTextElement } from '../../xml-primitives';

/** Estándar de Comprobante Fiscal Digital por Internet.**/
export interface Comprobante extends XastElement {
	type: 'element';
	name: 'Comprobante';
	attributes: {
		/** Atributo requerido que sirve para incorporar el certificado de
		 * sello digital que ampara al comprobante, como texto en formato base 64.
		 **/
		Certificado: string;
		/** Atributo condicional para expresar las condiciones comerciales
		 * aplicables para el pago del comprobante fiscal digital por Internet. Este
		 * atributo puede ser condicionado mediante atributos o complementos.
		 **/
		CondicionesDePago?: string;
		/** Atributo condicional para registrar la clave de confirmación
		 * que entregue el PAC para expedir el comprobante con importes grandes, con un
		 * tipo de cambio fuera del rango establecido o con ambos casos. Es requerido
		 * cuando se registra un tipo de cambio o un total fuera del rango establecido.
		 **/
		Confirmacion?: string;
		/** Atributo condicional para representar el importe total de los
		 * descuentos aplicables antes de impuestos. No se permiten valores negativos.
		 * Se debe registrar cuando existan conceptos con descuento.
		 **/
		Descuento?: string;
		/** Atributo requerido para expresar si el comprobante ampara una
		 * operación de exportación.
		 **/
		Exportacion: catCFDI.CExportacion;
		/** Atributo requerido para la expresión de la fecha y hora de
		 * expedición del Comprobante Fiscal Digital por Internet. Se expresa en la
		 * forma AAAA-MM-DDThh:mm:ss y debe corresponder con la hora local donde se
		 * expide el comprobante.
		 **/
		/** A date, unknown format **/
		Fecha: string;
		/** Atributo opcional para control interno del contribuyente que
		 * expresa el folio del comprobante, acepta una cadena de caracteres.
		 **/
		Folio?: string;
		/** Atributo condicional para expresar la clave de la forma de
		 * pago de los bienes o servicios amparados por el comprobante.
		 **/
		FormaPago?: catCFDI.CFormaPago;
		/** Atributo requerido para incorporar el código postal del lugar
		 * de expedición del comprobante (domicilio de la matriz o de la sucursal).
		 **/
		LugarExpedicion: catCFDI.CCodigoPostal;
		/** Atributo condicional para precisar la clave del método de pago
		 * que aplica para este comprobante fiscal digital por Internet, conforme al
		 * Artículo 29-A fracción VII incisos a y b del CFF.
		 **/
		MetodoPago?: catCFDI.CMetodoPago;
		/** Atributo requerido para identificar la clave de la moneda
		 * utilizada para expresar los montos, cuando se usa moneda nacional se
		 * registra MXN. Conforme con la especificación ISO 4217.
		 **/
		Moneda: catCFDI.CMoneda;
		/** Atributo requerido para expresar el número de serie del
		 * certificado de sello digital que ampara al comprobante, de acuerdo con el
		 * acuse correspondiente a 20 posiciones otorgado por el sistema del SAT.
		 **/
		NoCertificado: string;
		/** Atributo requerido para contener el sello digital del
		 * comprobante fiscal, al que hacen referencia las reglas de resolución
		 * miscelánea vigente. El sello debe ser expresado como una cadena de texto en
		 * formato Base 64.
		 **/
		Sello: string;
		/** Atributo opcional para precisar la serie para control interno
		 * del contribuyente. Este atributo acepta una cadena de caracteres.
		 **/
		Serie?: string;
		/** Atributo requerido para representar la suma de los importes de
		 * los conceptos antes de descuentos e impuesto. No se permiten valores
		 * negativos.
		 **/
		SubTotal: string;
		/** Atributo condicional para representar el tipo de cambio FIX
		 * conforme con la moneda usada. Es requerido cuando la clave de moneda es
		 * distinta de MXN y de XXX. El valor debe reflejar el número de pesos
		 * mexicanos que equivalen a una unidad de la divisa señalada en el atributo
		 * moneda. Si el valor está fuera del porcentaje aplicable a la moneda tomado
		 * del catálogo c_Moneda, el emisor debe obtener del PAC que vaya a timbrar el
		 * CFDI, de manera no automática, una clave de confirmación para ratificar que
		 * el valor es correcto e integrar dicha clave en el atributo Confirmacion.
		 **/
		TipoCambio?: string;
		/** Atributo requerido para expresar la clave del efecto del
		 * comprobante fiscal para el contribuyente emisor.
		 **/
		TipoDeComprobante: catCFDI.CTipoDeComprobante;
		/** Atributo requerido para representar la suma del subtotal,
		 * menos los descuentos aplicables, más las contribuciones recibidas (impuestos
		 * trasladados - federales y/o locales, derechos, productos, aprovechamientos,
		 * aportaciones de seguridad social, contribuciones de mejoras) menos los
		 * impuestos retenidos federales y/o locales. Si el valor es superior al límite
		 * que establezca el SAT en la Resolución Miscelánea Fiscal vigente, el emisor
		 * debe obtener del PAC que vaya a timbrar el CFDI, de manera no automática,
		 * una clave de confirmación para ratificar que el valor es correcto e integrar
		 * dicha clave en el atributo Confirmacion. No se permiten valores negativos.
		 **/
		Total: string;
		/** Atributo requerido con valor prefijado a 4.0 que indica la
		 * versión del estándar bajo el que se encuentra expresado el comprobante.
		 **/
		Version: string;
	};
	children: (ComprobanteAddenda | ComprobanteCfdiRelacionados | ComprobanteComplemento | ComprobanteConceptos | ComprobanteEmisor | ComprobanteImpuestos | ComprobanteInformacionGlobal | ComprobanteReceptor)[];
}

/** Nodo opcional para registrar
 * información del contribuyente Tercero, a cuenta
 * del que se realiza la operación.
 **/
export interface ComprobanteConceptosConceptoACuentaTerceros extends XastElement {
	type: 'element';
	name: 'ACuentaTerceros';
	attributes: {
		/** Atributo requerido para
		 * incorporar el código postal del
		 * domicilio fiscal del Tercero, a cuenta
		 * del que se realiza la operación.
		 **/
		DomicilioFiscalACuentaTerceros: string;
		/** Atributo requerido para
		 * registrar el nombre, denominación o
		 * razón social del contribuyente Tercero
		 * correspondiente con el Rfc, a cuenta del
		 * que se realiza la operación.
		 **/
		NombreACuentaTerceros: string;
		/** Atributo requerido para
		 * incorporar la clave del régimen del
		 * contribuyente Tercero, a cuenta del que
		 * se realiza la operación.
		 **/
		RegimenFiscalACuentaTerceros: catCFDI.CRegimenFiscal;
		/** Atributo requerido para
		 * registrar la Clave del Registro Federal
		 * de Contribuyentes del contribuyente
		 * Tercero, a cuenta del que se realiza la
		 * operación.
		 **/
		RfcACuentaTerceros: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para recibir las extensiones al presente
 * formato que sean de utilidad al contribuyente. Para las reglas de uso
 * del mismo, referirse al formato origen.
 **/
export interface ComprobanteAddenda extends XastElement {
	type: 'element';
	name: 'Addenda' /** XastElement is self-closing */;
	children: [];
}

/** Atributo requerido para expresar el año al que
 * corresponde la información del comprobante global.
 * @maxInclusive 2019
 **/
export interface Año extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 2019
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el año al que
  * corresponde la información del comprobante global.
   * @maxInclusive 2019

**/
export type ComprobanteInformacionGlobalAo = string;

/** Atributo
 * requerido para
 * señalar la base
 * para el cálculo
 * de la retención,
 * la determinación
 * de la base se
 * realiza de
 * acuerdo con las
 * disposiciones
 * fiscales
 * vigentes. No se
 * permiten valores
 * negativos.
 * @maxInclusive 0.000001
 **/
export interface Base extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.000001
			 **/
			value: string;
		},
	];
}
/** Atributo
  * requerido para
  * señalar la base
  * para el cálculo
  * de la retención,
  * la determinación
  * de la base se
  * realiza de
  * acuerdo con las
  * disposiciones
  * fiscales
  * vigentes. No se
  * permiten valores
  * negativos.
   * @maxInclusive 0.000001

**/
export type ComprobanteConceptosConceptoImpuestosRetencionesRetencionBase = string;

/** Atributo
  * requerido para
  * señalar la base
  * para el cálculo
  * del impuesto, la
  * determinación de
  * la base se
  * realiza de
  * acuerdo con las
  * disposiciones
  * fiscales
  * vigentes. No se
  * permiten valores
  * negativos.
   * @maxInclusive 0.000001

**/
export type ComprobanteConceptosConceptoImpuestosTrasladosTrasladoBase = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export type TImporte = string;

/** Atributo requerido para precisar la
  * cantidad de bienes o servicios del tipo particular
  * definido por el presente concepto.
   * @maxInclusive 0.000001

**/
export interface Cantidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.000001
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para precisar la
  * cantidad de bienes o servicios del tipo particular
  * definido por el presente concepto.
   * @maxInclusive 0.000001

**/
export type ComprobanteConceptosConceptoCantidad = string;

/** Atributo requerido para
  * precisar la cantidad de bienes o
  * servicios del tipo particular definido
  * por la presente parte.
   * @maxInclusive 0.000001

**/
export type ComprobanteConceptosConceptoParteCantidad = string;

/** Atributo requerido que sirve para incorporar el certificado de
 * sello digital que ampara al comprobante, como texto en formato base 64.
 **/
export interface Certificado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido que sirve para incorporar el certificado de
 * sello digital que ampara al comprobante, como texto en formato base 64.
 **/
export type ComprobanteCertificado = string;

/** Nodo requerido para precisar la información de
 * los comprobantes relacionados.
 **/
export interface ComprobanteCfdiRelacionadosCfdiRelacionado extends XastElement {
	type: 'element';
	name: 'CfdiRelacionado';
	attributes: {
		/** Atributo requerido para registrar el
		 * folio fiscal (UUID) de un CFDI relacionado con el
		 * presente comprobante, por ejemplo: Si el CFDI
		 * relacionado es un comprobante de traslado que sirve
		 * para registrar el movimiento de la mercancía. Si
		 * este comprobante se usa como nota de crédito o nota
		 * de débito del comprobante relacionado. Si este
		 * comprobante es una devolución sobre el comprobante
		 * relacionado. Si éste sustituye a una factura
		 * cancelada.
		 **/
		UUID: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para precisar la información de los
 * comprobantes relacionados.
 **/
export interface ComprobanteCfdiRelacionados extends XastElement {
	type: 'element';
	name: 'CfdiRelacionados';
	attributes: {
		/** Atributo requerido para indicar la clave de la
		 * relación que existe entre éste que se está generando y el o los
		 * CFDI previos.
		 **/
		TipoRelacion: catCFDI.CTipoRelacion;
	};
	children: ComprobanteCfdiRelacionadosCfdiRelacionado[];
}

/** CClaveProdServ
 * Atributo requerido para expresar la
 * clave del producto o del servicio amparado por el
 * presente concepto. Es requerido y deben utilizar las
 * claves del catálogo de productos y servicios, cuando
 * los conceptos que registren por sus actividades
 * correspondan con dichos conceptos.
 **/

/** CClaveUnidad Atributo requerido para precisar la
 * clave de unidad de medida estandarizada aplicable
 * para la cantidad expresada en el concepto. La unidad
 * debe corresponder con la descripción del concepto.
 **/
/** Nodo opcional donde se incluye el complemento Timbre
 * Fiscal Digital de manera obligatoria y los nodos complementarios
 * determinados por el SAT, de acuerdo con las disposiciones particulares
 * para un sector o actividad específica.
 **/
export interface ComprobanteComplemento extends XastElement {
	type: 'element';
	name: 'Complemento' /** XastElement is self-closing */;
	children: [];
}

/** Nodo opcional donde se incluyen
 * los nodos complementarios de extensión al
 * concepto definidos por el SAT, de acuerdo con
 * las disposiciones particulares para un sector o
 * actividad específica.
 **/
export interface ComprobanteConceptosConceptoComplementoConcepto extends XastElement {
	type: 'element';
	name: 'ComplementoConcepto' /** XastElement is self-closing */;
	children: [];
}

/** Nodo requerido para registrar la información
 * detallada de un bien o servicio amparado en el comprobante.
 **/
export interface ComprobanteConceptosConcepto extends XastElement {
	type: 'element';
	name: 'Concepto';
	attributes: {
		/** Atributo requerido para precisar la
		 * cantidad de bienes o servicios del tipo particular
		 * definido por el presente concepto.
		 **/
		Cantidad: string;
		/** Atributo requerido para expresar la
		 * clave del producto o del servicio amparado por el
		 * presente concepto. Es requerido y deben utilizar las
		 * claves del catálogo de productos y servicios, cuando
		 * los conceptos que registren por sus actividades
		 * correspondan con dichos conceptos.
		 **/
		ClaveProdServ: catCFDI.CClaveProdServ;
		/** Atributo requerido para precisar la
		 * clave de unidad de medida estandarizada aplicable
		 * para la cantidad expresada en el concepto. La unidad
		 * debe corresponder con la descripción del concepto.
		 **/
		ClaveUnidad: catCFDI.CClaveUnidad;
		/** Atributo requerido para precisar la
		 * descripción del bien o servicio cubierto por el
		 * presente concepto.
		 **/
		Descripcion: string;
		/** Atributo opcional para representar el
		 * importe de los descuentos aplicables al concepto. No
		 * se permiten valores negativos.
		 **/
		Descuento?: string;
		/** Atributo requerido para precisar el
		 * importe total de los bienes o servicios del presente
		 * concepto. Debe ser equivalente al resultado de
		 * multiplicar la cantidad por el valor unitario
		 * expresado en el concepto. No se permiten valores
		 * negativos.
		 **/
		Importe: string;
		/** Atributo opcional para expresar el
		 * número de parte, identificador del producto o del
		 * servicio, la clave de producto o servicio, SKU o
		 * equivalente, propia de la operación del emisor,
		 * amparado por el presente concepto. Opcionalmente se
		 * puede utilizar claves del estándar GTIN.
		 **/
		NoIdentificacion?: string;
		/** Atributo requerido para expresar si la
		 * operación comercial es objeto o no de impuesto.
		 **/
		ObjetoImp: catCFDI.CObjetoImp;
		/** Atributo opcional para precisar la
		 * unidad de medida propia de la operación del emisor,
		 * aplicable para la cantidad expresada en el concepto.
		 * La unidad debe corresponder con la descripción del
		 * concepto.
		 **/
		Unidad?: string;
		/** Atributo requerido para precisar el
		 * valor o precio unitario del bien o servicio cubierto
		 * por el presente concepto.
		 **/
		ValorUnitario: string;
	};
	children: (ComprobanteConceptosConceptoACuentaTerceros | ComprobanteConceptosConceptoComplementoConcepto | ComprobanteConceptosConceptoCuentaPredial | ComprobanteConceptosConceptoImpuestos | ComprobanteConceptosConceptoInformacionAduanera | ComprobanteConceptosConceptoParte)[];
}

/** Nodo requerido para listar los conceptos cubiertos por el
 * comprobante.
 **/
export interface ComprobanteConceptos extends XastElement {
	type: 'element';
	name: 'Conceptos';
	children: ComprobanteConceptosConcepto[];
}

/** Atributo condicional para expresar las condiciones comerciales
  * aplicables para el pago del comprobante fiscal digital por Internet. Este
  * atributo puede ser condicionado mediante atributos o complementos.
   * @pattern [^|]{1,1000}
  * @minLength 1
  * @maxLength 1000

**/
export interface CondicionesDePago extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,1000}
			 * @minLength 1
			 * @maxLength 1000
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar las condiciones comerciales
  * aplicables para el pago del comprobante fiscal digital por Internet. Este
  * atributo puede ser condicionado mediante atributos o complementos.
   * @pattern [^|]{1,1000}
  * @minLength 1
  * @maxLength 1000

**/
export type ComprobanteCondicionesDePago = string;

/** Atributo condicional para registrar la clave de confirmación
  * que entregue el PAC para expedir el comprobante con importes grandes, con un
  * tipo de cambio fuera del rango establecido o con ambos casos. Es requerido
  * cuando se registra un tipo de cambio o un total fuera del rango establecido.
   * @pattern [0-9a-zA-Z]{5}

**/
export interface Confirmacion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9a-zA-Z]{5}
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para registrar la clave de confirmación
  * que entregue el PAC para expedir el comprobante con importes grandes, con un
  * tipo de cambio fuera del rango establecido o con ambos casos. Es requerido
  * cuando se registra un tipo de cambio o un total fuera del rango establecido.
   * @pattern [0-9a-zA-Z]{5}

**/
export type ComprobanteConfirmacion = string;

/** Nodo opcional para asentar el
 * número de cuenta predial con el que fue
 * registrado el inmueble, en el sistema catastral
 * de la entidad federativa de que trate, o bien
 * para incorporar los datos de identificación del
 * certificado de participación inmobiliaria no
 * amortizable.
 **/
export interface ComprobanteConceptosConceptoCuentaPredial extends XastElement {
	type: 'element';
	name: 'CuentaPredial';
	attributes: {
		/** Atributo requerido para
		 * precisar el número de la cuenta predial
		 * del inmueble cubierto por el presente
		 * concepto, o bien para incorporar los
		 * datos de identificación del certificado
		 * de participación inmobiliaria no
		 * amortizable, tratándose de
		 * arrendamiento.
		 **/
		Numero: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para precisar la
  * descripción del bien o servicio cubierto por el
  * presente concepto.
   * @pattern [^|]{1,1000}
  * @minLength 1
  * @maxLength 1000

**/
export interface Descripcion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,1000}
			 * @minLength 1
			 * @maxLength 1000
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para precisar la
  * descripción del bien o servicio cubierto por el
  * presente concepto.
   * @pattern [^|]{1,1000}
  * @minLength 1
  * @maxLength 1000

**/
export type ComprobanteConceptosConceptoDescripcion = string;

/** Atributo requerido para
  * precisar la descripción del bien o
  * servicio cubierto por la presente parte.
   * @pattern [^|]{1,1000}
  * @minLength 1
  * @maxLength 1000

**/
export type ComprobanteConceptosConceptoParteDescripcion = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface Descuento extends XastElement {
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

/** Atributo requerido para
  * incorporar el código postal del
  * domicilio fiscal del Tercero, a cuenta
  * del que se realiza la operación.
   * @pattern [0-9]{5}

**/
export interface DomicilioFiscalACuentaTerceros extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{5}
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para
  * incorporar el código postal del
  * domicilio fiscal del Tercero, a cuenta
  * del que se realiza la operación.
   * @pattern [0-9]{5}

**/
export type ComprobanteConceptosConceptoACuentaTercerosDomicilioFiscalACuentaTerceros = string;

/** Atributo requerido para registrar el código postal
  * del domicilio fiscal del receptor del comprobante.
   * @pattern [0-9]{5}

**/
export interface DomicilioFiscalReceptor extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{5}
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para registrar el código postal
  * del domicilio fiscal del receptor del comprobante.
   * @pattern [0-9]{5}

**/
export type ComprobanteReceptorDomicilioFiscalReceptor = string;

/** Nodo requerido para expresar la información del
 * contribuyente emisor del comprobante.
 **/
export interface ComprobanteEmisor extends XastElement {
	type: 'element';
	name: 'Emisor';
	attributes: {
		/** Atributo condicional para expresar el número de
		 * operación proporcionado por el SAT cuando se trate de un
		 * comprobante a través de un PCECFDI o un PCGCFDISP.
		 **/
		FacAtrAdquirente?: string;
		/** Atributo requerido para registrar el nombre,
		 * denominación o razón social del contribuyente inscrito en el
		 * RFC, del emisor del comprobante.
		 **/
		Nombre: string;
		/** Atributo requerido para incorporar la clave del
		 * régimen del contribuyente emisor al que aplicará el efecto
		 * fiscal de este comprobante.
		 **/
		RegimenFiscal: catCFDI.CRegimenFiscal;
		/** Atributo requerido para registrar la Clave del
		 * Registro Federal de Contribuyentes correspondiente al
		 * contribuyente emisor del comprobante.
		 **/
		Rfc: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para expresar si el comprobante ampara una
 * operación de exportación.
 **/
export type CExportacion = '01' | '02' | '03' | '04';

/** Atributo condicional para expresar el número de
  * operación proporcionado por el SAT cuando se trate de un
  * comprobante a través de un PCECFDI o un PCGCFDISP.
   * @pattern [0-9]{10}

**/
export interface FacAtrAdquirente extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{10}
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el número de
  * operación proporcionado por el SAT cuando se trate de un
  * comprobante a través de un PCECFDI o un PCGCFDISP.
   * @pattern [0-9]{10}

**/
export type ComprobanteEmisorFacAtrAdquirente = string;

/** Tipo definido para la expresión de la fecha y hora. Se expresa en la forma AAAA-MM-DDThh:mm:ss
 * @pattern (20[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
 **/
export interface Fecha extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern (20[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
			 **/
			value: string;
		},
	];
}
/** Tipo definido para la expresión de la fecha y hora. Se expresa en la forma AAAA-MM-DDThh:mm:ss
 * @pattern (20[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
 **/
export type TFechaH = string;

/** Atributo opcional para control interno del contribuyente que
  * expresa el folio del comprobante, acepta una cadena de caracteres.
   * @pattern [^|]{1,40}
  * @minLength 1
  * @maxLength 40

**/
export interface Folio extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,40}
			 * @minLength 1
			 * @maxLength 40
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para control interno del contribuyente que
  * expresa el folio del comprobante, acepta una cadena de caracteres.
   * @pattern [^|]{1,40}
  * @minLength 1
  * @maxLength 40

**/
export type ComprobanteFolio = string;

/** Atributo condicional para expresar la clave de la forma de
 * pago de los bienes o servicios amparados por el comprobante.
 **/
export type CFormaPago = '01' | '02' | '03' | '04' | '05' | '06' | '08' | '12' | '13' | '14' | '15' | '17' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '99';

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface Importe extends XastElement {
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

/** Atributo
 * requerido para
 * señalar la clave
 * del tipo de
 * impuesto
 * retenido
 * aplicable al
 * concepto.
 **/
export type CImpuesto = '001' | '002' | '003';

/** Nodo condicional para capturar los
 * impuestos aplicables al presente concepto.
 **/
export interface ComprobanteConceptosConceptoImpuestos extends XastElement {
	type: 'element';
	name: 'Impuestos';
	children: (ComprobanteConceptosConceptoImpuestosRetenciones | ComprobanteConceptosConceptoImpuestosTraslados)[];
}

/** Nodo condicional para expresar el resumen de los impuestos
 * aplicables.
 **/
export interface ComprobanteImpuestos extends XastElement {
	type: 'element';
	name: 'Impuestos';
	attributes: {
		/** Atributo condicional para expresar el total de los
		 * impuestos retenidos que se desprenden de los conceptos
		 * expresados en el comprobante fiscal digital por Internet. No se
		 * permiten valores negativos. Es requerido cuando en los conceptos
		 * se registren impuestos retenidos.
		 **/
		TotalImpuestosRetenidos?: string;
		/** Atributo condicional para expresar el total de los
		 * impuestos trasladados que se desprenden de los conceptos
		 * expresados en el comprobante fiscal digital por Internet. No se
		 * permiten valores negativos. Es requerido cuando en los conceptos
		 * se registren impuestos trasladados.
		 **/
		TotalImpuestosTrasladados?: string;
	};
	children: (ComprobanteImpuestosRetenciones | ComprobanteImpuestosTraslados)[];
}

/** Nodo opcional para introducir la
 * información aduanera aplicable cuando se trate
 * de ventas de primera mano de mercancías
 * importadas o se trate de operaciones de comercio
 * exterior con bienes o servicios.
 **/
export interface ComprobanteConceptosConceptoInformacionAduanera extends XastElement {
	type: 'element';
	name: 'InformacionAduanera';
	attributes: {
		/** Atributo requerido para
		 * expresar el número del pedimento que
		 * ampara la importación del bien que se
		 * expresa en el siguiente formato: últimos
		 * 2 dígitos del año de validación seguidos
		 * por dos espacios, 2 dígitos de la aduana
		 * de despacho seguidos por dos espacios, 4
		 * dígitos del número de la patente
		 * seguidos por dos espacios, 1 dígito que
		 * corresponde al último dígito del año en
		 * curso, salvo que se trate de un
		 * pedimento consolidado iniciado en el año
		 * inmediato anterior o del pedimento
		 * original de una rectificación, seguido
		 * de 6 dígitos de la numeración progresiva
		 * por aduana.
		 **/
		NumeroPedimento: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para
 * introducir la información aduanera
 * aplicable cuando se trate de ventas
 * de primera mano de mercancías
 * importadas o se trate de operaciones
 * de comercio exterior con bienes o
 * servicios.
 **/
export interface ComprobanteConceptosConceptoParteInformacionAduanera extends XastElement {
	type: 'element';
	name: 'InformacionAduanera';
	attributes: {
		/** Atributo
		 * requerido para expresar el
		 * número del pedimento que
		 * ampara la importación del
		 * bien que se expresa en el
		 * siguiente formato: últimos 2
		 * dígitos del año de
		 * validación seguidos por dos
		 * espacios, 2 dígitos de la
		 * aduana de despacho seguidos
		 * por dos espacios, 4 dígitos
		 * del número de la patente
		 * seguidos por dos espacios, 1
		 * dígito que corresponde al
		 * último dígito del año en
		 * curso, salvo que se trate de
		 * un pedimento consolidado
		 * iniciado en el año inmediato
		 * anterior o del pedimento
		 * original de una
		 * rectificación, seguido de 6
		 * dígitos de la numeración
		 * progresiva por aduana.
		 **/
		NumeroPedimento: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo condicional para precisar la información relacionada
 * con el comprobante global.
 **/
export interface ComprobanteInformacionGlobal extends XastElement {
	type: 'element';
	name: 'InformacionGlobal';
	attributes: {
		/** Atributo requerido para expresar el año al que
		 * corresponde la información del comprobante global.
		 **/
		Ao: string;
		/** Atributo requerido para expresar el mes o los
		 * meses al que corresponde la información del comprobante global.
		 **/
		Meses: catCFDI.CMeses;
		/** Atributo requerido para expresar el período al que
		 * corresponde la información del comprobante global.
		 **/
		Periodicidad: catCFDI.CPeriodicidad;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Atributo requerido para expresar el mes o los
 * meses al que corresponde la información del comprobante global.
 **/
export type CMeses = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18';

/** Atributo condicional para precisar la clave del método de pago
 * que aplica para este comprobante fiscal digital por Internet, conforme al
 * Artículo 29-A fracción VII incisos a y b del CFF.
 **/
export type CMetodoPago = 'PUE' | 'PPD';

/**CMoneda Atributo requerido para identificar la clave de la moneda
 * utilizada para expresar los montos, cuando se usa moneda nacional se
 * registra MXN. Conforme con la especificación ISO 4217.
 **/

/** Atributo requerido para expresar el número de serie del
  * certificado de sello digital que ampara al comprobante, de acuerdo con el
  * acuse correspondiente a 20 posiciones otorgado por el sistema del SAT.
   * @pattern [0-9]{20}

**/
export interface NoCertificado extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{20}
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de serie del
  * certificado de sello digital que ampara al comprobante, de acuerdo con el
  * acuse correspondiente a 20 posiciones otorgado por el sistema del SAT.
   * @pattern [0-9]{20}

**/
export type ComprobanteNoCertificado = string;

/** Atributo opcional para expresar el
  * número de parte, identificador del producto o del
  * servicio, la clave de producto o servicio, SKU o
  * equivalente, propia de la operación del emisor,
  * amparado por el presente concepto. Opcionalmente se
  * puede utilizar claves del estándar GTIN.
   * @pattern [^|]{1,100}
  * @minLength 1
  * @maxLength 100

**/
export interface NoIdentificacion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,100}
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar el
  * número de parte, identificador del producto o del
  * servicio, la clave de producto o servicio, SKU o
  * equivalente, propia de la operación del emisor,
  * amparado por el presente concepto. Opcionalmente se
  * puede utilizar claves del estándar GTIN.
   * @pattern [^|]{1,100}
  * @minLength 1
  * @maxLength 100

**/
export type ComprobanteConceptosConceptoNoIdentificacion = string;

/** Atributo opcional para
  * expresar el número de serie, número de
  * parte del bien o identificador del
  * producto o del servicio amparado por la
  * presente parte. Opcionalmente se puede
  * utilizar claves del estándar GTIN.
   * @pattern [^|]{1,100}
  * @minLength 1
  * @maxLength 100

**/
export type ComprobanteConceptosConceptoParteNoIdentificacion = string;

/** Atributo requerido para registrar el nombre,
  * denominación o razón social del contribuyente inscrito en el
  * RFC, del emisor del comprobante.
   * @pattern [^|]{1,300}
  * @minLength 1
  * @maxLength 300

**/
export interface Nombre extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,300}
			 * @minLength 1
			 * @maxLength 300
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para registrar el nombre,
  * denominación o razón social del contribuyente inscrito en el
  * RFC, del emisor del comprobante.
   * @pattern [^|]{1,300}
  * @minLength 1
  * @maxLength 300

**/
export type ComprobanteEmisorNombre = string;

/** Atributo requerido para registrar el nombre(s),
  * primer apellido, segundo apellido, según corresponda,
  * denominación o razón social del contribuyente, inscrito en el
  * RFC, del receptor del comprobante.
   * @pattern [^|]{1,300}
  * @minLength 1
  * @maxLength 300

**/
export type ComprobanteReceptorNombre = string;

/** Atributo requerido para
  * registrar el nombre, denominación o
  * razón social del contribuyente Tercero
  * correspondiente con el Rfc, a cuenta del
  * que se realiza la operación.
   * @pattern [^|]{1,300}
  * @minLength 1
  * @maxLength 300

**/
export interface NombreACuentaTerceros extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,300}
			 * @minLength 1
			 * @maxLength 300
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para
  * registrar el nombre, denominación o
  * razón social del contribuyente Tercero
  * correspondiente con el Rfc, a cuenta del
  * que se realiza la operación.
   * @pattern [^|]{1,300}
  * @minLength 1
  * @maxLength 300

**/
export type ComprobanteConceptosConceptoACuentaTercerosNombreACuentaTerceros = string;

/** Atributo requerido para
  * precisar el número de la cuenta predial
  * del inmueble cubierto por el presente
  * concepto, o bien para incorporar los
  * datos de identificación del certificado
  * de participación inmobiliaria no
  * amortizable, tratándose de
  * arrendamiento.
   * @pattern [0-9a-zA-Z]{1,150}
  * @minLength 1
  * @maxLength 150

**/
export interface Numero extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9a-zA-Z]{1,150}
			 * @minLength 1
			 * @maxLength 150
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para
  * precisar el número de la cuenta predial
  * del inmueble cubierto por el presente
  * concepto, o bien para incorporar los
  * datos de identificación del certificado
  * de participación inmobiliaria no
  * amortizable, tratándose de
  * arrendamiento.
   * @pattern [0-9a-zA-Z]{1,150}
  * @minLength 1
  * @maxLength 150

**/
export type ComprobanteConceptosConceptoCuentaPredialNumero = string;

/** Atributo requerido para
  * expresar el número del pedimento que
  * ampara la importación del bien que se
  * expresa en el siguiente formato: últimos
  * 2 dígitos del año de validación seguidos
  * por dos espacios, 2 dígitos de la aduana
  * de despacho seguidos por dos espacios, 4
  * dígitos del número de la patente
  * seguidos por dos espacios, 1 dígito que
  * corresponde al último dígito del año en
  * curso, salvo que se trate de un
  * pedimento consolidado iniciado en el año
  * inmediato anterior o del pedimento
  * original de una rectificación, seguido
  * de 6 dígitos de la numeración progresiva
  * por aduana.
   * @pattern [0-9]{2}  [0-9]{2}  [0-9]{4}  [0-9]{7}

**/
export interface NumeroPedimento extends XastElement {
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
/** Atributo requerido para
  * expresar el número del pedimento que
  * ampara la importación del bien que se
  * expresa en el siguiente formato: últimos
  * 2 dígitos del año de validación seguidos
  * por dos espacios, 2 dígitos de la aduana
  * de despacho seguidos por dos espacios, 4
  * dígitos del número de la patente
  * seguidos por dos espacios, 1 dígito que
  * corresponde al último dígito del año en
  * curso, salvo que se trate de un
  * pedimento consolidado iniciado en el año
  * inmediato anterior o del pedimento
  * original de una rectificación, seguido
  * de 6 dígitos de la numeración progresiva
  * por aduana.
   * @pattern [0-9]{2}  [0-9]{2}  [0-9]{4}  [0-9]{7}

**/
export type ComprobanteConceptosConceptoInformacionAduaneraNumeroPedimento = string;

/** Atributo
  * requerido para expresar el
  * número del pedimento que
  * ampara la importación del
  * bien que se expresa en el
  * siguiente formato: últimos 2
  * dígitos del año de
  * validación seguidos por dos
  * espacios, 2 dígitos de la
  * aduana de despacho seguidos
  * por dos espacios, 4 dígitos
  * del número de la patente
  * seguidos por dos espacios, 1
  * dígito que corresponde al
  * último dígito del año en
  * curso, salvo que se trate de
  * un pedimento consolidado
  * iniciado en el año inmediato
  * anterior o del pedimento
  * original de una
  * rectificación, seguido de 6
  * dígitos de la numeración
  * progresiva por aduana.
   * @pattern [0-9]{2}  [0-9]{2}  [0-9]{4}  [0-9]{7}

**/
export type ComprobanteConceptosConceptoParteInformacionAduaneraNumeroPedimento = string;

/** Atributo condicional para expresar el número de
  * registro de identidad fiscal del receptor cuando sea residente
  * en el extranjero. Es requerido cuando se incluya el complemento
  * de comercio exterior.
   * @minLength 1
  * @maxLength 40

**/
export interface NumRegIdTrib extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 40
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para expresar el número de
  * registro de identidad fiscal del receptor cuando sea residente
  * en el extranjero. Es requerido cuando se incluya el complemento
  * de comercio exterior.
   * @minLength 1
  * @maxLength 40

**/
export type ComprobanteReceptorNumRegIdTrib = string;

/** Atributo requerido para expresar si la
 * operación comercial es objeto o no de impuesto.
 **/
export type CObjetoImp = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08';

/** Nodo opcional para expresar las
 * partes o componentes que integran la totalidad
 * del concepto expresado en el comprobante fiscal
 * digital por Internet.
 **/
export interface ComprobanteConceptosConceptoParte extends XastElement {
	type: 'element';
	name: 'Parte';
	attributes: {
		/** Atributo requerido para
		 * precisar la cantidad de bienes o
		 * servicios del tipo particular definido
		 * por la presente parte.
		 **/
		Cantidad: string;
		/** Atributo requerido para
		 * expresar la clave del producto o del
		 * servicio amparado por la presente parte.
		 * Es requerido y deben utilizar las claves
		 * del catálogo de productos y servicios,
		 * cuando los conceptos que registren por
		 * sus actividades correspondan con dichos
		 * conceptos.
		 **/
		ClaveProdServ: catCFDI.CClaveProdServ;
		/** Atributo requerido para
		 * precisar la descripción del bien o
		 * servicio cubierto por la presente parte.
		 **/
		Descripcion: string;
		/** Atributo opcional para
		 * precisar el importe total de los bienes
		 * o servicios de la presente parte. Debe
		 * ser equivalente al resultado de
		 * multiplicar la cantidad por el valor
		 * unitario expresado en la parte. No se
		 * permiten valores negativos.
		 **/
		Importe?: string;
		/** Atributo opcional para
		 * expresar el número de serie, número de
		 * parte del bien o identificador del
		 * producto o del servicio amparado por la
		 * presente parte. Opcionalmente se puede
		 * utilizar claves del estándar GTIN.
		 **/
		NoIdentificacion?: string;
		/** Atributo opcional para
		 * precisar la unidad de medida propia de
		 * la operación del emisor, aplicable para
		 * la cantidad expresada en la parte. La
		 * unidad debe corresponder con la
		 * descripción de la parte.
		 **/
		Unidad?: string;
		/** Atributo opcional para
		 * precisar el valor o precio unitario del
		 * bien o servicio cubierto por la presente
		 * parte. No se permiten valores negativos.
		 **/
		ValorUnitario?: string;
	};
	children: ComprobanteConceptosConceptoParteInformacionAduanera[];
}

/** Atributo requerido para expresar el período al que
 * corresponde la información del comprobante global.
 **/
export type CPeriodicidad = '01' | '02' | '03' | '04' | '05';

/** Nodo requerido para precisar la información del
 * contribuyente receptor del comprobante.
 **/
export interface ComprobanteReceptor extends XastElement {
	type: 'element';
	name: 'Receptor';
	attributes: {
		/** Atributo requerido para registrar el código postal
		 * del domicilio fiscal del receptor del comprobante.
		 **/
		DomicilioFiscalReceptor: string;
		/** Atributo requerido para registrar el nombre(s),
		 * primer apellido, segundo apellido, según corresponda,
		 * denominación o razón social del contribuyente, inscrito en el
		 * RFC, del receptor del comprobante.
		 **/
		Nombre: string;
		/** Atributo condicional para expresar el número de
		 * registro de identidad fiscal del receptor cuando sea residente
		 * en el extranjero. Es requerido cuando se incluya el complemento
		 * de comercio exterior.
		 **/
		NumRegIdTrib?: string;
		/** Atributo requerido para incorporar la clave del
		 * régimen fiscal del contribuyente receptor al que aplicará el
		 * efecto fiscal de este comprobante.
		 **/
		RegimenFiscalReceptor: catCFDI.CRegimenFiscal;
		/** Atributo condicional para registrar la clave del
		 * país de residencia para efectos fiscales del receptor del
		 * comprobante, cuando se trate de un extranjero, y que es conforme
		 * con la especificación ISO 3166-1 alpha-3. Es requerido cuando se
		 * incluya el complemento de comercio exterior o se registre el
		 * atributo NumRegIdTrib.
		 **/
		ResidenciaFiscal?: catCFDI.CPais;
		/** Atributo requerido para registrar la Clave del
		 * Registro Federal de Contribuyentes correspondiente al
		 * contribuyente receptor del comprobante.
		 **/
		Rfc: string;
		/** Atributo requerido para expresar la clave del uso
		 * que dará a esta factura el receptor del CFDI.
		 **/
		UsoCFDI: catCFDI.CUsoCFDI;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo
 * requerido para asentar
 * la información detallada
 * de una retención de
 * impuestos aplicable al
 * presente concepto.
 **/
export interface ComprobanteConceptosConceptoImpuestosRetencionesRetencion extends XastElement {
	type: 'element';
	name: 'Retencion';
	attributes: {
		/** Atributo
		 * requerido para
		 * señalar la base
		 * para el cálculo
		 * de la retención,
		 * la determinación
		 * de la base se
		 * realiza de
		 * acuerdo con las
		 * disposiciones
		 * fiscales
		 * vigentes. No se
		 * permiten valores
		 * negativos.
		 **/
		Base: string;
		/** Atributo
		 * requerido para
		 * señalar el
		 * importe del
		 * impuesto
		 * retenido que
		 * aplica al
		 * concepto. No se
		 * permiten valores
		 * negativos.
		 **/
		Importe: string;
		/** Atributo
		 * requerido para
		 * señalar la clave
		 * del tipo de
		 * impuesto
		 * retenido
		 * aplicable al
		 * concepto.
		 **/
		Impuesto: catCFDI.CImpuesto;
		/** Atributo
		 * requerido para
		 * señalar la tasa
		 * o cuota del
		 * impuesto que se
		 * retiene para el
		 * presente
		 * concepto.
		 **/
		TasaOCuota: string;
		/** Atributo
		 * requerido para
		 * señalar la clave
		 * del tipo de
		 * factor que se
		 * aplica a la base
		 * del impuesto.
		 **/
		TipoFactor: catCFDI.CTipoFactor;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo requerido para la información
 * detallada de una retención de impuesto
 * específico.
 **/
export interface ComprobanteImpuestosRetencionesRetencion extends XastElement {
	type: 'element';
	name: 'Retencion';
	attributes: {
		/** Atributo requerido para
		 * señalar el monto del impuesto retenido.
		 * No se permiten valores negativos.
		 **/
		Importe: string;
		/** Atributo requerido para
		 * señalar la clave del tipo de impuesto
		 * retenido.
		 **/
		Impuesto: catCFDI.CImpuesto;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para
 * asentar los impuestos retenidos
 * aplicables al presente concepto.
 **/
export interface ComprobanteConceptosConceptoImpuestosRetenciones extends XastElement {
	type: 'element';
	name: 'Retenciones';
	children: ComprobanteConceptosConceptoImpuestosRetencionesRetencion[];
}

/** Nodo condicional para capturar los impuestos
 * retenidos aplicables. Es requerido cuando en los conceptos
 * se registre algún impuesto retenido.
 **/
export interface ComprobanteImpuestosRetenciones extends XastElement {
	type: 'element';
	name: 'Retenciones';
	children: ComprobanteImpuestosRetencionesRetencion[];
}

/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export interface Rfc extends XastElement {
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
/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export type TRFC = string;

/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]
 * @minLength 12
 * @maxLength 13
 **/
export interface RfcACuentaTerceros extends XastElement {
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

/** Atributo requerido para contener el sello digital del
 * comprobante fiscal, al que hacen referencia las reglas de resolución
 * miscelánea vigente. El sello debe ser expresado como una cadena de texto en
 * formato Base 64.
 **/
export interface Sello extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido para contener el sello digital del
 * comprobante fiscal, al que hacen referencia las reglas de resolución
 * miscelánea vigente. El sello debe ser expresado como una cadena de texto en
 * formato Base 64.
 **/
export type ComprobanteSello = string;

/** Atributo opcional para precisar la serie para control interno
  * del contribuyente. Este atributo acepta una cadena de caracteres.
   * @pattern [^|]{1,25}
  * @minLength 1
  * @maxLength 25

**/
export interface Serie extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,25}
			 * @minLength 1
			 * @maxLength 25
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para precisar la serie para control interno
  * del contribuyente. Este atributo acepta una cadena de caracteres.
   * @pattern [^|]{1,25}
  * @minLength 1
  * @maxLength 25

**/
export type ComprobanteSerie = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface SubTotal extends XastElement {
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

/** Atributo
  * requerido para
  * señalar la tasa
  * o cuota del
  * impuesto que se
  * retiene para el
  * presente
  * concepto.
   * @maxInclusive 0.000000

**/
export interface TasaOCuota extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.000000
			 **/
			value: string;
		},
	];
}
/** Atributo
  * requerido para
  * señalar la tasa
  * o cuota del
  * impuesto que se
  * retiene para el
  * presente
  * concepto.
   * @maxInclusive 0.000000

**/
export type ComprobanteConceptosConceptoImpuestosRetencionesRetencionTasaOCuota = string;

/** Atributo
  * condicional para
  * señalar el valor
  * de la tasa o
  * cuota del
  * impuesto que se
  * traslada para el
  * presente
  * concepto. Es
  * requerido cuando
  * el atributo
  * TipoFactor tenga
  * una clave que
  * corresponda a
  * Tasa o Cuota.
   * @maxInclusive 0.000000

**/
export type ComprobanteConceptosConceptoImpuestosTrasladosTrasladoTasaOCuota = string;

/** Atributo condicional para
  * señalar el valor de la tasa o cuota del
  * impuesto que se traslada por los
  * conceptos amparados en el comprobante.
   * @maxInclusive 0.000000

**/
export type ComprobanteImpuestosTrasladosTrasladoTasaOCuota = string;

/** Atributo condicional para representar el tipo de cambio FIX
  * conforme con la moneda usada. Es requerido cuando la clave de moneda es
  * distinta de MXN y de XXX. El valor debe reflejar el número de pesos
  * mexicanos que equivalen a una unidad de la divisa señalada en el atributo
  * moneda. Si el valor está fuera del porcentaje aplicable a la moneda tomado
  * del catálogo c_Moneda, el emisor debe obtener del PAC que vaya a timbrar el
  * CFDI, de manera no automática, una clave de confirmación para ratificar que
  * el valor es correcto e integrar dicha clave en el atributo Confirmacion.
   * @maxInclusive 0.000001

**/
export interface TipoCambio extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.000001
			 **/
			value: string;
		},
	];
}
/** Atributo condicional para representar el tipo de cambio FIX
  * conforme con la moneda usada. Es requerido cuando la clave de moneda es
  * distinta de MXN y de XXX. El valor debe reflejar el número de pesos
  * mexicanos que equivalen a una unidad de la divisa señalada en el atributo
  * moneda. Si el valor está fuera del porcentaje aplicable a la moneda tomado
  * del catálogo c_Moneda, el emisor debe obtener del PAC que vaya a timbrar el
  * CFDI, de manera no automática, una clave de confirmación para ratificar que
  * el valor es correcto e integrar dicha clave en el atributo Confirmacion.
   * @maxInclusive 0.000001

**/
export type ComprobanteTipoCambio = string;

/** Atributo requerido para expresar la clave del efecto del
 * comprobante fiscal para el contribuyente emisor.
 **/
export type CTipoDeComprobante = 'I' | 'E' | 'T' | 'N' | 'P';

/** Atributo
 * requerido para
 * señalar la clave
 * del tipo de
 * factor que se
 * aplica a la base
 * del impuesto.
 **/
export type CTipoFactor = 'Tasa' | 'Cuota' | 'Exento';

/** Atributo requerido para indicar la clave de la
 * relación que existe entre éste que se está generando y el o los
 * CFDI previos.
 **/
export type CTipoRelacion = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09';

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface Total extends XastElement {
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
export interface TotalImpuestosRetenidos extends XastElement {
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
export interface TotalImpuestosTrasladados extends XastElement {
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

/** Nodo
 * requerido para asentar
 * la información detallada
 * de un traslado de
 * impuestos aplicable al
 * presente concepto.
 **/
export interface ComprobanteConceptosConceptoImpuestosTrasladosTraslado extends XastElement {
	type: 'element';
	name: 'Traslado';
	attributes: {
		/** Atributo
		 * requerido para
		 * señalar la base
		 * para el cálculo
		 * del impuesto, la
		 * determinación de
		 * la base se
		 * realiza de
		 * acuerdo con las
		 * disposiciones
		 * fiscales
		 * vigentes. No se
		 * permiten valores
		 * negativos.
		 **/
		Base: string;
		/** Atributo
		 * condicional para
		 * señalar el
		 * importe del
		 * impuesto
		 * trasladado que
		 * aplica al
		 * concepto. No se
		 * permiten valores
		 * negativos. Es
		 * requerido cuando
		 * TipoFactor sea
		 * Tasa o Cuota.
		 **/
		Importe?: string;
		/** Atributo
		 * requerido para
		 * señalar la clave
		 * del tipo de
		 * impuesto
		 * trasladado
		 * aplicable al
		 * concepto.
		 **/
		Impuesto: catCFDI.CImpuesto;
		/** Atributo
		 * condicional para
		 * señalar el valor
		 * de la tasa o
		 * cuota del
		 * impuesto que se
		 * traslada para el
		 * presente
		 * concepto. Es
		 * requerido cuando
		 * el atributo
		 * TipoFactor tenga
		 * una clave que
		 * corresponda a
		 * Tasa o Cuota.
		 **/
		TasaOCuota?: string;
		/** Atributo
		 * requerido para
		 * señalar la clave
		 * del tipo de
		 * factor que se
		 * aplica a la base
		 * del impuesto.
		 **/
		TipoFactor: catCFDI.CTipoFactor;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo requerido para la información
 * detallada de un traslado de impuesto específico.
 *
 * Notes:
 * Unlike ComprobanteConceptosConceptoImpuestosTrasladosTraslado, which applies to individual line items, this interface is for document-level summary of transferred taxes.
 * The Base attribute here is the sum of all Base values from item-level Traslado entries with the same tax characteristics.
 * TasaOCuota is optional but required when TipoFactor is Tasa or Cuota—this logic is enforced by business rules, not TypeScript, making validation critical.
 **/
export interface ComprobanteImpuestosTrasladosTraslado extends XastElement {
	type: 'element';
	name: 'Traslado';
	attributes: {
		/** Atributo requerido para
		 * señalar la suma de los atributos Base de
		 * los conceptos del impuesto trasladado.
		 * No se permiten valores negativos.
		 **/
		Base: string;
		/** Atributo condicional para
		 * señalar la suma del importe del impuesto
		 * trasladado, agrupado por impuesto,
		 * TipoFactor y TasaOCuota. No se permiten
		 * valores negativos.
		 **/
		Importe?: string;
		/** Atributo requerido para
		 * señalar la clave del tipo de impuesto
		 * trasladado.
		 **/
		Impuesto: catCFDI.CImpuesto;
		/** Atributo condicional para
		 * señalar el valor de la tasa o cuota del
		 * impuesto que se traslada por los
		 * conceptos amparados en el comprobante.
		 **/
		TasaOCuota?: string;
		/** Atributo requerido para
		 * señalar la clave del tipo de factor que
		 * se aplica a la base del impuesto.
		 **/
		TipoFactor: catCFDI.CTipoFactor;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo opcional para
 * asentar los impuestos trasladados
 * aplicables al presente concepto.
 **/
export interface ComprobanteConceptosConceptoImpuestosTraslados extends XastElement {
	type: 'element';
	name: 'Traslados';
	children: ComprobanteConceptosConceptoImpuestosTrasladosTraslado[];
}

/** Nodo condicional para capturar los impuestos
 * trasladados aplicables. Es requerido cuando en los conceptos
 * se registre un impuesto trasladado.
 **/
export interface ComprobanteImpuestosTraslados extends XastElement {
	type: 'element';
	name: 'Traslados';
	children: ComprobanteImpuestosTrasladosTraslado[];
}

/** Atributo opcional para precisar la
  * unidad de medida propia de la operación del emisor,
  * aplicable para la cantidad expresada en el concepto.
  * La unidad debe corresponder con la descripción del
  * concepto.
   * @pattern [^|]{1,20}
  * @minLength 1
  * @maxLength 20

**/
export interface Unidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [^|]{1,20}
			 * @minLength 1
			 * @maxLength 20
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para precisar la
  * unidad de medida propia de la operación del emisor,
  * aplicable para la cantidad expresada en el concepto.
  * La unidad debe corresponder con la descripción del
  * concepto.
   * @pattern [^|]{1,20}
  * @minLength 1
  * @maxLength 20

**/
export type ComprobanteConceptosConceptoUnidad = string;

/** Atributo opcional para
  * precisar la unidad de medida propia de
  * la operación del emisor, aplicable para
  * la cantidad expresada en la parte. La
  * unidad debe corresponder con la
  * descripción de la parte.
   * @pattern [^|]{1,20}
  * @minLength 1
  * @maxLength 20

**/
export type ComprobanteConceptosConceptoParteUnidad = string;

/** Atributo requerido para expresar la clave del uso
 * que dará a esta factura el receptor del CFDI.
 **/
export type CUsoCFDI = 'G01' | 'G02' | 'G03' | 'I01' | 'I02' | 'I03' | 'I04' | 'I05' | 'I06' | 'I07' | 'I08' | 'D01' | 'D02' | 'D03' | 'D04' | 'D05' | 'D06' | 'D07' | 'D08' | 'D09' | 'D10' | 'P01' | 'S01' | 'CP01' | 'CN01';

/** Atributo requerido para registrar el
  * folio fiscal (UUID) de un CFDI relacionado con el
  * presente comprobante, por ejemplo: Si el CFDI
  * relacionado es un comprobante de traslado que sirve
  * para registrar el movimiento de la mercancía. Si
  * este comprobante se usa como nota de crédito o nota
  * de débito del comprobante relacionado. Si este
  * comprobante es una devolución sobre el comprobante
  * relacionado. Si éste sustituye a una factura
  * cancelada.
   * @pattern [a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}

**/
export interface UUID extends XastElement {
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
/** Atributo requerido para registrar el
  * folio fiscal (UUID) de un CFDI relacionado con el
  * presente comprobante, por ejemplo: Si el CFDI
  * relacionado es un comprobante de traslado que sirve
  * para registrar el movimiento de la mercancía. Si
  * este comprobante se usa como nota de crédito o nota
  * de débito del comprobante relacionado. Si este
  * comprobante es una devolución sobre el comprobante
  * relacionado. Si éste sustituye a una factura
  * cancelada.
   * @pattern [a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}

**/
export type ComprobanteCfdiRelacionadosCfdiRelacionadoUUID = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales. No se permiten valores negativos.
 * @pattern [0-9]{1,18}(.[0-9]{1,6})?
 * @maxInclusive 0.000000
 **/
export interface ValorUnitario extends XastElement {
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

/** Atributo requerido con valor prefijado a 4.0 que indica la
 * versión del estándar bajo el que se encuentra expresado el comprobante.
 **/
export interface Version extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido con valor prefijado a 4.0 que indica la
 * versión del estándar bajo el que se encuentra expresado el comprobante.
 **/
export type ComprobanteVersion = string;
