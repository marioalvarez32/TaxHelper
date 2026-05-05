import type { CExportacion, CFormaPago, CMetodoPago, CMoneda, CTipoDeComprobante, CCodigoPostal, CTipoRelacion, CClaveProdServ, CClaveUnidad, CObjetoImp, CRegimenFiscal, CImpuesto, CTipoFactor, CPeriodicidad, CMeses, CUsoCFDI, CPais } from 'Resources/xmlTypes/www.sat.gob.mx/sitio_internet/cfd/catalogos';
import type { Comprobante } from '../../xmlTypes/www.sat.gob.mx/cfd/4';

export class Cfdi4 {
	public readonly Fecha: Date;
	public readonly Certificado: string;
	public readonly CondicionesDePago?: string;
	public readonly Confirmacion?: string;
	public readonly Descuento?: string;
	public readonly Folio?: string;
	public readonly NoCertificado: string;
	public readonly Sello: string;
	public readonly Serie?: string;
	public readonly SubTotal: string;
	public readonly TipoCambio?: string;
	public readonly Total: string;
	public readonly Version: string;

	// ... other properties
	public Exportacion: CExportacion;
	public FormaPago?: CFormaPago;
	public LugarExpedicion: CCodigoPostal;
	public MetodoPago: CMetodoPago;
	public Moneda: CMoneda;
	public TipoDeComprobante: CTipoDeComprobante;

	// Sub elements
	public Addenda?: Addenda;
	public ComprobanteRelacionados?: ComprobantesRelacionados;
	public Complemento: Complemento;
	public Conceptos: Conceptos;
	public Emisor: Emisor;
	public Impuestos?: Impuestos;
	public InformacionGlobal?: InformacionGlobal;
	public Receptor: Receptor;

	constructor(comprobante: Comprobante) {}

	private extractEmisor(children: Comprobante['children']) {
		const emisorElement = children.find((child) => child.name === 'Emisor');
		return {
			rfc: emisorElement?.attributes?.Rfc,
			nombre: emisorElement?.attributes?.Nombre,
		};
	}
}

/**
 * Nodo opcional para recibir las extensiones al presente
 * formato que sean de utilidad al contribuyente. Para las reglas de uso
 * del mismo, referirse al formato origen.
 *
 * Notas:
 * - No estandarizado por el SAT.
 * - Inlcluye informacion de utilitiad al contribuyente y puede ser
 *   cualquier informacion que el contribuyente desee agregar.
 */
export class Addenda {
	public readonly children: any[];

	constructor(children: any[]) {
		this.children = children;
	}
}

/**
 * Nodo opcional para precisar la información de los
 * comprobantes relacionados.
 *
 * Notes:
 * - Despite being marked as optional in the schema, CfdiRelacionados becomes required in specific scenarios—such as when issuing a factura de sustitución (replacement invoice), where TipoRelacion = "01" must reference the canceled invoice.
 * - The TipoRelacion field uses codes defined in the SAT catalog c_TipoRelacion, which are critical for correct tax reporting. For example:
 * "01" = CFDI replacement
 * "04" = Devolución (return)
 * "07" = Relación con contraprestación
 * The actual validation of UUIDs (e.g., existence, non-reuse, correct type) is not enforced by this type alone—it requires integration with SAT’s web services or business logic layers.
 **/
export class ComprobantesRelacionados {
	TipoRelacion: CTipoRelacion;
	ComprobanteRelacionado: ComprobanteRelacionado[];

	constructor(cfdiRelacionados: any) {
		this.TipoRelacion = cfdiRelacionados.TipoRelacion;
		this.ComprobanteRelacionado = cfdiRelacionados.ComprobanteRelacionado.map((comprobanteRelacionado: any) => new ComprobanteRelacionado(comprobanteRelacionado));
	}
}

/** Nodo requerido para precisar la información de
 * los comprobantes relacionados.
 *
 * Notes:
 * - Despite being marked as optional in the schema, CfdiRelacionados becomes required in specific scenarios—such as when issuing a factura de sustitución (replacement invoice), where TipoRelacion = "01" must reference the canceled invoice.
 **/
export class ComprobanteRelacionado {
	UUID: string;

	constructor(comprobanteRelacionado: any) {
		this.UUID = comprobanteRelacionado.UUID;
	}
}

export class Complemento {
	TimbreFiscalDigital: TimbreFiscalDigital;

	constructor(timbreFiscalDigital: any) {
		this.TimbreFiscalDigital = new TimbreFiscalDigital(timbreFiscalDigital);
	}
}

export class TimbreFiscalDigital {
	UUID: string;
	FechaTimbrado: Date;
	NoCertificadoSAT: string;
	SelloSAT: string;
	SelloCFD: string;

	constructor(timbreFiscalDigital: any) {
		this.UUID = timbreFiscalDigital.UUID;
		this.FechaTimbrado = timbreFiscalDigital.FechaTimbrado;
		this.NoCertificadoSAT = timbreFiscalDigital.NoCertificadoSAT;
		this.SelloSAT = timbreFiscalDigital.SelloSAT;
		this.SelloCFD = timbreFiscalDigital.SelloCFD;
	}
}

/** Nodo requerido para listar los conceptos cubiertos por el
 * comprobante.
 *
 *
 * Notes
 * Despite being named ComprobanteConceptos, it does not represent a single concept — rather, it's a wrapper for multiple Concepto entries.
 * The name follows a naming convention where ComprobanteX denotes a component of the main Comprobante, even if it's nested.
 * It has no attributes — all configuration is done via its child Concepto elements.
 **/
export class Conceptos {
	Concepto: Concepto[];

	constructor(conceptos: any) {
		this.Concepto = conceptos.Concepto.map((concepto: any) => new Concepto(concepto));
	}
}

/** Nodo requerido para registrar la información
 * detallada de un bien o servicio amparado en el comprobante.
 *
 *
 * Notes
 * String-based numeric fields: All monetary and numeric values are typed as string because XML does not distinguish number types, and precision must be preserved during serialization.
 * SAT Catalog Dependencies: ClaveProdServ, ClaveUnidad, and ObjetoImp depend on external SAT catalogs (catCFDI.*), which are updated periodically and must be validated against official lists.
 * Child extensibility: The children array allows integration of sector-specific complements (e.g., customs, real estate, third-party billing), making this interface adaptable to complex fiscal scenarios.
 **/
export class Concepto {
	ClaveProdServ: CClaveProdServ;
	ClaveUnidad: CClaveUnidad;
	Cantidad: number;
	Descripcion: string;
	ValorUnitario: string;
	Importe: string;
	Descuento?: string;
	NoIdentificacion?: string;
	ObjetoImp: CObjetoImp;
	Unidad?: string;

	ConceptoACuentaTerceros?: ConceptoACuentaTerceros[];
	ComplementoConcepto?: ComplementoConcepto[];
	ConceptoCuentaPredial?: ConceptoCuentaPredial[];
	ConceptoImpuestos?: ConceptoImpuestos[];
	ConceptoInformacionAduenaera?: ConceptoInformacionAduenaera[];
	ConceptoParte?: ConceptoParte[];

	constructor(concepto: any) {
		this.ClaveProdServ = concepto.ClaveProdServ;
		this.ClaveUnidad = concepto.ClaveUnidad;
		this.Cantidad = concepto.Cantidad;
		this.Descripcion = concepto.Descripcion;
		this.ValorUnitario = concepto.ValorUnitario;
		this.Importe = concepto.Importe;
		this.Descuento = concepto.Descuento;
		this.NoIdentificacion = concepto.NoIdentificacion;
		this.ObjetoImp = concepto.ObjetoImp;
		this.Unidad = concepto.Unidad;
	}
}

/** Nodo opcional para registrar
 * información del contribuyente Tercero, a cuenta
 * del que se realiza la operación.
 *
 * Notes
 * Despite being optional, ACuentaTerceros is required by law in certain commercial arrangements where the invoice issuer is not the actual seller.
 * All four attributes are mandatory when the node is present — there are no optional fields within it.
 * The interface is self-closing (children: []), meaning it cannot contain nested elements, consistent with CFDI 4.0 XML schema rules.
 **/
export class ConceptoACuentaTerceros {
	DomicilioFiscalACuentaTerceros: string;
	NombreACuentaTerceros: string;
	RegimenFiscalACuentaTerceros: CRegimenFiscal;
	RfcACuentaTerceros: string;

	constructor(conceptoACuentaTerceros: any) {
		this.DomicilioFiscalACuentaTerceros = conceptoACuentaTerceros.DomicilioFiscalACuentaTerceros;
		this.NombreACuentaTerceros = conceptoACuentaTerceros.NombreACuentaTerceros;
		this.RegimenFiscalACuentaTerceros = conceptoACuentaTerceros.RegimenFiscalACuentaTerceros;
		this.RfcACuentaTerceros = conceptoACuentaTerceros.RfcACuentaTerceros;
	}
}

/** Nodo opcional donde se incluyen
 * los nodos complementarios de extensión al
 * concepto definidos por el SAT, de acuerdo con
 * las disposiciones particulares para un sector o
 * actividad específica.
 *
 *
 * Notes
 * Despite being an interface with children: [], it is not truly "empty" in XML terms — it can contain arbitrary elements from other namespaces, as permitted by SAT rules.
 * The comment self closing indicates that this element may appear without content but must still be valid in the XML structure.
 * This symbol is part of a generated type system (likely from XSD-to-TypeScript conversion), meaning it reflects strict compliance with official CFDI 4.0 specifications rather than application logic.
 *
 *
 * Requiere validacion con schemas externos. TODO: implementar.
 **/
export class ComplementoConcepto {
	constructor() {}
}

/** Nodo opcional para asentar el
 * número de cuenta predial con el que fue
 * registrado el inmueble, en el sistema catastral
 * de la entidad federativa de que trate, o bien
 * para incorporar los datos de identificación del
 * certificado de participación inmobiliaria no
 * amortizable.
 **/
export class ConceptoCuentaPredial {
	Numero: string;

	constructor(conceptoCuentaPredial: any) {
		this.Numero = conceptoCuentaPredial.Numero;
	}
}

/** Nodo condicional para capturar los
 * impuestos aplicables al presente concepto.
 *
 * Notes:
 * In practice, when generating a CFDI-compliant invoice, if a line item is subject to IVA (VAT), the Impuestos node would include a Traslados child with the tax rate and amount.
 *
 * Notes
 * Despite its name suggesting a collection, ComprobanteConceptosConceptoImpuestos represents a single <Impuestos> node per concept, not a list.
 * It is not the same as the top-level ComprobanteImpuestos, which aggregates totals for the entire invoice.
 * The actual tax values (e.g., Importe, TasaOCuota) are defined deeper in the child interfaces (Traslado, Retencion), not in this interface itself.
 **/
export class ConceptoImpuestos {
	ConceptoImpuestosRetenciones: ConceptoImpuestosRetenciones[];
	ConceptoImpuestosTraslados: ConceptoImpuestosTraslados[];

	constructor(conceptoImpuestos: any) {
		this.ConceptoImpuestosRetenciones = conceptoImpuestos.ConceptoImpuestosRetenciones;
		this.ConceptoImpuestosTraslados = conceptoImpuestos.ConceptoImpuestosTraslados;
	}
}

export class ConceptoImpuestosRetenciones {
	ConceptoImpuestosRetencion: ConceptoImpuestosRetencion[];

	constructor(conceptoImpuestosRetenciones: any) {
		this.ConceptoImpuestosRetencion = conceptoImpuestosRetenciones.ConceptoImpuestosRetencion;
	}
}

/** Nodo
 * requerido para asentar
 * la información detallada
 * de una retención de
 * impuestos aplicable al
 * presente concepto.
 *
 * Notes
 * Unlike global withholdings (at the invoice level), this interface captures per-concept withholdings, which are less common but required in specific scenarios (e.g., rental payments, professional services with source withholding).
 * The use of catCFDI.CImpuesto and catCFDI.CTipoFactor ties this interface directly to official SAT catalogs, ensuring only valid tax codes and factor types are used.
 * Although the interface appears simple, it plays a critical role in fiscal compliance: incorrect Base or TasaOCuota values can invalidate the entire CFDI during SAT validation.
 **/
export class ConceptoImpuestosRetencion {
	Base: string;
	Importe: string;
	Impuesto: CImpuesto;
	TasaOCuota: string;
	TipoFactor: CTipoFactor;

	constructor(conceptoImpuestosRetencion: any) {
		this.Base = conceptoImpuestosRetencion.Base;
		this.Importe = conceptoImpuestosRetencion.Importe;
		this.Impuesto = conceptoImpuestosRetencion.Impuesto;
		this.TasaOCuota = conceptoImpuestosRetencion.TasaOCuota;
		this.TipoFactor = conceptoImpuestosRetencion.TipoFactor;
	}
}

/** Nodo opcional para
 * asentar los impuestos trasladados
 * aplicables al presente concepto.
 **/
export class ConceptoImpuestosTraslados {
	ConceptoImpuestosTrasladosTraslado: ConceptoImpuestosTrasladosTraslado[];

	constructor(conceptoImpuestosTraslados: any) {
		this.ConceptoImpuestosTrasladosTraslado = conceptoImpuestosTraslados.ConceptoImpuestosTrasladosTraslado;
	}
}

/** Nodo
 * requerido para asentar
 * la información detallada
 * de un traslado de
 * impuestos aplicable al
 * presente concepto.
 **/
export class ConceptoImpuestosTrasladosTraslado {
	Base: string;
	Importe: string;
	Impuesto: CImpuesto;
	TasaOCuota: string;
	TipoFactor: CTipoFactor;

	constructor(conceptoImpuestosTrasladosTraslado: any) {
		this.Base = conceptoImpuestosTrasladosTraslado.Base;
		this.Importe = conceptoImpuestosTrasladosTraslado.Importe;
		this.Impuesto = conceptoImpuestosTrasladosTraslado.Impuesto;
		this.TasaOCuota = conceptoImpuestosTrasladosTraslado.TasaOCuota;
		this.TipoFactor = conceptoImpuestosTrasladosTraslado.TipoFactor;
	}
}

/** Nodo opcional para introducir la
 * información aduanera aplicable cuando se trate
 * de ventas de primera mano de mercancías
 * importadas o se trate de operaciones de comercio
 * exterior con bienes o servicios.
 **/
export class ConceptoInformacionAduenaera {
	NumeroPedimento: string;
	constructor(conceptoInformacionAduenaera: any) {
		this.NumeroPedimento = conceptoInformacionAduenaera.NumeroPedimento;
	}
}

/** Nodo opcional para expresar las
 * partes o componentes que integran la totalidad
 * del concepto expresado en el comprobante fiscal
 * digital por Internet.
 **/
export class ConceptoParte {
	Cantidad?: string;
	ClaveProdServ?: CClaveProdServ;
	Descripcion?: string;
	Importe?: string;
	NoIdentificacion?: string;
	Unidad?: string;
	ValorUnitario?: string;

	ConceptoParteInformacionAduanera?: ConceptoParteInformacionAduanera[];

	constructor(conceptoParte: any) {
		this.Cantidad = conceptoParte.Cantidad;
		this.ClaveProdServ = conceptoParte.ClaveProdServ;
		this.Descripcion = conceptoParte.Descripcion;
		this.Importe = conceptoParte.Importe;
		this.NoIdentificacion = conceptoParte.NoIdentificacion;
		this.Unidad = conceptoParte.Unidad;
		this.ValorUnitario = conceptoParte.ValorUnitario;
	}
}

export class ConceptoParteInformacionAduanera {
	NumeroPedimento: string;
	constructor(conceptoParteInformacionAduanera: any) {
		this.NumeroPedimento = conceptoParteInformacionAduanera.NumeroPedimento;
	}
}

/** Nodo requerido para expresar la información del
 * contribuyente emisor del comprobante.
 *
 *
 * Notes
 * The RegimenFiscal field uses an external catalog (catCFDI.CRegimenFiscal) — this is a type-safe enumeration of valid fiscal regimes defined by the SAT.
 * Despite being an XastElement, ComprobanteEmisor has no children, reflecting the self-closing nature of the <Emisor> tag in XML.
 * The optional FacAtrAdquirente attribute is only relevant when the invoice is issued through a third-party certification platform (PCECFDI) or simplified regime (PCGCFDISP).
 **/
export class Emisor {
	FacAtrAdquirente?: string;
	Nombre?: string;
	RegimenFiscal?: CRegimenFiscal;
	Rfc?: string;

	constructor() {}
}

/** Nodo condicional para expresar el resumen de los impuestos
 * aplicables.
 *
 * Notes
 * ComprobanteImpuestos is not where individual tax rates or per-item calculations are stored. Those reside in ComprobanteConceptosConceptoImpuestos (per concept) and deeper in Traslado or Retencion interfaces.
 * The interface is conditionally required: only included in the XML when taxes (either retained or transferred) apply to the invoice.
 * Even though children is typed as an array, in practice it contains at most two elements: one Retenciones and one Traslados node, as per CFDI 4.0 schema rules.
 *
 * Children: one or zero.
 **/
export class Impuestos {
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

	ComprobanteImpuestosRetenciones?: ComprobanteImpuestosRetenciones[];
	ComprobanteImpuestosTraslados?: ComprobanteImpuestosTraslados[];
	constructor() {}
}

export class ComprobanteImpuestosRetenciones {
	ComprobanteImpuestosRetencion: ComprobanteImpuestosRetencion[];
	constructor(comprobanteImpuestosRetencion: any) {
		this.ComprobanteImpuestosRetencion = comprobanteImpuestosRetencion.ComprobanteImpuestosRetencion;
	}
}

/** Nodo requerido para la información
 * detallada de una retención de impuesto
 * específico.
 **/
export class ComprobanteImpuestosRetencion {
	Importe: string;
	Impuesto: CImpuesto;
	constructor(comprobanteImpuestosRetencion: any) {
		this.Importe = comprobanteImpuestosRetencion.Importe;
		this.Impuesto = comprobanteImpuestosRetencion.Impuesto;
	}
}

export class ComprobanteImpuestosTraslados {
	ComprobanteImpuestosTraslado: ComprobanteImpuestosTraslado[];
	constructor(comprobanteImpuestosTraslado: any) {
		this.ComprobanteImpuestosTraslado = comprobanteImpuestosTraslado.ComprobanteImpuestosTraslado;
	}
}

/** Nodo requerido para la información
 * detallada de un traslado de impuesto específico.
 *
 * Notes
 * NumRegIdTrib is only required when the Complemento de Comercio Exterior is included, meaning this field is critical for export invoices but optional otherwise.
 * ResidenciaFiscal must conform to ISO 3166-1 alpha-3 country codes (e.g., USA, CAN, GTM), not the more common alpha-2 format.
 * The UsoCFDI field determines how the receiver reports the invoice in their tax filings and must be selected from a predefined catalog (catCFDI.CUsoCFDI), such as G01 for acquisitions or I06 for foreign payments.
 **/
export class ComprobanteImpuestosTraslado {
	Base: string;
	Importe?: string;
	Impuesto: CImpuesto;
	TasaOCuota?: string;
	TipoFactor: CTipoFactor;

	constructor(comprobanteImpuestosTraslado: any) {
		this.Base = comprobanteImpuestosTraslado.Base;
		this.Importe = comprobanteImpuestosTraslado.Importe;
		this.Impuesto = comprobanteImpuestosTraslado.Impuesto;
		this.TasaOCuota = comprobanteImpuestosTraslado.TasaOCuota;
		this.TipoFactor = comprobanteImpuestosTraslado.TipoFactor;
	}
}

/** Nodo condicional para precisar la información relacionada
 * con el comprobante global.
 *
 * Notes
 * ComprobanteInformacionGlobal is not required in standard invoices. It is only used when issuing a global invoice, which is a special type allowed under Mexican fiscal rules.
 * The Meses field uses pipe-separated values (e.g., '01|02|03') to represent multiple months, even though the type CMeses is a union of single values—this suggests the actual validation may occur at runtime or via external schema rules.
 * This interface is self-closing (children: []), meaning it cannot contain nested elements, consistent with the CFDI 4.0 specification.
 **/
export class InformacionGlobal {
	Año: string;
	Meses: CMeses;
	Periodicidad: CPeriodicidad;

	constructor(informacionGlobal: any) {
		this.Año = informacionGlobal.Año;
		this.Meses = informacionGlobal.Meses;
		this.Periodicidad = informacionGlobal.Periodicidad;
	}
}

export class Receptor {
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
	RegimenFiscalReceptor: CRegimenFiscal;
	/** Atributo condicional para registrar la clave del
	 * país de residencia para efectos fiscales del receptor del
	 * comprobante, cuando se trate de un extranjero, y que es conforme
	 * con la especificación ISO 3166-1 alpha-3. Es requerido cuando se
	 * incluya el complemento de comercio exterior o se registre el
	 * atributo NumRegIdTrib.
	 **/
	ResidenciaFiscal?: CPais;
	/** Atributo requerido para registrar la Clave del
	 * Registro Federal de Contribuyentes correspondiente al
	 * contribuyente receptor del comprobante.
	 **/
	Rfc: string;
	/** Atributo requerido para expresar la clave del uso
	 * que dará a esta factura el receptor del CFDI.
	 **/
	UsoCFDI: CUsoCFDI;
	constructor(receptor: any) {
		this.DomicilioFiscalReceptor = receptor.DomicilioFiscalReceptor;
		this.Nombre = receptor.Nombre;
		this.NumRegIdTrib = receptor.NumRegIdTrib;
		this.RegimenFiscalReceptor = receptor.RegimenFiscalReceptor;
		this.ResidenciaFiscal = receptor.ResidenciaFiscal;
		this.Rfc = receptor.Rfc;
		this.UsoCFDI = receptor.UsoCFDI;
	}
}
