import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/detallista/detallista.xsd

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

/** Nodo requerido que especifica las referencias adicionales a nivel global de la factura**/
export interface DetallistaAdditionalInformation extends XastElement {
	type: 'element';
	name: 'AdditionalInformation';
	children: DetallistaAdditionalInformationReferenceIdentification[];
}

/** Nodo opcional que especifica la información adicional de referencia en el detalle de productos**/
export interface DetallistaLineItemAdditionalInformation extends XastElement {
	type: 'element';
	name: 'AdditionalInformation';
	children: DetallistaLineItemAdditionalInformationReferenceIdentification[];
}

/** Nodo opcional que especifica  la cantidad que se esta declarando como adicional**/
export interface DetallistaLineItemAditionalQuantity extends XastTextElement {
	type: 'element';
	name: 'aditionalQuantity';
	attributes: {
		/** Atributo para especificar el codigo  de tipo de cantidad adicional declarada	**/
		QuantityType: DetallistaLineItemAditionalQuantityQuantityType;
	};
}

/** Nodo opcional que especifica la información de los cargos o descuentos globales mercantiles por factura**/
export interface DetallistaAllowanceCharge extends XastElement {
	type: 'element';
	name: 'allowanceCharge';
	attributes: {
		/** Atributo indicador de cargo o descuento	**/
		allowanceChargeType: DetallistaAllowanceChargeAllowanceChargeType;
		/** Atributo indicador de secuencia de calculo	**/
		sequenceNumber?: string;
		/** Atributo para especificar la imputación del descuento o cargo	**/
		settlementType: DetallistaAllowanceChargeSettlementType;
	};
	children: (DetallistaAllowanceChargeMonetaryAmountOrPercentage | DetallistaAllowanceChargeSpecialServicesType)[];
}

/** Nodo opcional que especifica  la información de los cargos o descuentos globales por línea de artículo**/
export interface DetallistaLineItemAllowanceCharge extends XastElement {
	type: 'element';
	name: 'allowanceCharge';
	attributes: {
		/** Atributo para especificar el cargo o descuento	**/
		allowanceChargeType: DetallistaLineItemAllowanceChargeAllowanceChargeType;
		/** Atributo para especificar la secuencia de cálculo	**/
		sequenceNumber?: string;
		/** Atributo para especificar la imputación del cargo o descuento	**/
		settlementType?: DetallistaLineItemAllowanceChargeSettlementType;
	};
	children: (DetallistaLineItemAllowanceChargeMonetaryAmountOrPercentage | DetallistaLineItemAllowanceChargeSpecialServicesType)[];
}

/** Atributo indicador de cargo o descuento
 * @minLength 1
 * @maxLength 16
 **/
export type DetallistaAllowanceChargeAllowanceChargeType = 'ALLOWANCE_GLOBAL' | 'CHARGE_GLOBAL';

/** Atributo para especificar el cargo o descuento
 * @minLength 1
 * @maxLength 16
 **/
export type DetallistaLineItemAllowanceChargeAllowanceChargeType = 'ALLOWANCE_GLOBAL' | 'CHARGE_GLOBAL';

/** Atributo para especificar los cargos o descuentos consolidados
 * @minLength 1
 * @maxLength 9
 **/
export type DetallistaTotalAllowanceChargeAllowanceOrChargeType = 'ALLOWANCE' | 'CHARGE';

/** Nodo opcional que especifica la identificación secundaria del emisor de la factura**/
export interface DetallistaInvoiceCreatorAlternatePartyIdentification extends XastTextElement {
	type: 'element';
	name: 'alternatePartyIdentification';
	attributes: {
		/** Atributo para especificar el tipo de identificación secundaria se le asigno al proveedor	**/
		type: DetallistaInvoiceCreatorAlternatePartyIdentificationType;
	};
}

/** Nodo requerido que especifica la identificación del no. pedimento a nivel detalle**/
export interface DetallistaLineItemCustomsAlternatePartyIdentification extends XastTextElement {
	type: 'element';
	name: 'alternatePartyIdentification';
	attributes: {
		/** Atributo para especificar el codigo de identificación secundaria	**/
		type: DetallistaLineItemCustomsAlternatePartyIdentificationType;
	};
}

/** Nodo requerido que especifica el código para identificar qué tipo de identificación secundaria se le asignó al proveedor**/
export interface DetallistaSellerAlternatePartyIdentification extends XastTextElement {
	type: 'element';
	name: 'alternatePartyIdentification';
	attributes: {
		/** Atributo para especificar el tipo de identificación secundaria se le asigno al proveedor	**/
		type: DetallistaSellerAlternatePartyIdentificationType;
	};
}

/** Nodo opcional que especifica el numero de identificación adicional para el artículo.**/
export interface DetallistaLineItemAlternateTradeItemIdentification extends XastTextElement {
	type: 'element';
	name: 'alternateTradeItemIdentification';
	attributes: {
		/** Atributo para especificar el tipo de identificación adicional, en caso de no utilizar condigo GTIN	**/
		type: DetallistaLineItemAlternateTradeItemIdentificationType;
	};
}

/** Nodo requerido que especifica el precio Bruto del artículo sin incluir descuento ni cargos**/
export interface Amount extends XastElement {
	name: 'Amount';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo requerido que especifica el precio neto de cada artículo**/
export type Number = string;

/** Nodo requerido que especifica el importe monetario del cargo o descuento por unidad
 * @minLength 1
 * @maxLength 5
 **/
export interface AmountPerUnit extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 5
			 **/
			value: string;
		},
	];
}
/** Nodo requerido que especifica el importe monetario del cargo o descuento por unidad
 * @minLength 1
 * @maxLength 5
 **/
export type DetallistaLineItemAllowanceChargeMonetaryAmountOrPercentageRatePerUnitAmountPerUnit = string;

/** Atributo para especificar la base del porcentaje que se aplicara**/
export type DetallistaAllowanceChargeMonetaryAmountOrPercentageRateBase = 'INVOICE_VALUE';

/** Nodo requerido que especifica información del comprador**/
export interface DetallistaBuyer extends XastElement {
	type: 'element';
	name: 'buyer';
	children: (DetallistaBuyerContactInformation | Gln)[];
}

/** Nodo opcional que especifica  la ciudad donde se encuentra el domicilio del emisor de la factura
 * @minLength 1
 * @maxLength 35
 **/
export interface City extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 35
			 **/
			value: string;
		},
	];
}
/** Nodo opcional que especifica  la ciudad donde se encuentra el domicilio del emisor de la factura
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaInvoiceCreatorNameAndAddressCity = string;

/** Nodo opcional que especifica  la ciudad donde se encuentra el domicilio a donde se embarcará la mercancía
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaShipToNameAndAddressCity = string;

/** Atributo para especificar el codigo del tipo de instrucciones comerciales que son enviadas
 * @minLength 1
 * @maxLength 3
 **/
export type DetallistaSpecialInstructionCode = 'AAB' | 'DUT' | 'PUR' | 'ZZZ';

/** Nodo requerido que especifica información del contacto de compras**/
export interface DetallistaBuyerContactInformation extends XastElement {
	type: 'element';
	name: 'contactInformation';
	children: DetallistaBuyerContactInformationPersonOrDepartmentName[];
}

/** Versión del estandar XML utilizado para la elaboración de la guia del sector detallista**/
export interface ContentVersion extends XastElement {
	name: 'contentVersion';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo opcional que especifica  el tipo de divisa utilizada, para efectos de comprobantes fiscales digitales emitidos UNICAMENTE se podrá utilizar como divisa la moneda nacional (MXN), sin embargo dentro del complemento  se podrá detallar en otra de forma informativa. Lo detallado en esta etiqueta deberá coincidir con lo declarado en las etiquetas del SAT considerando el tipo de cambio.**/
export interface DetallistaCurrency extends XastElement {
	type: 'element';
	name: 'currency';
	attributes: {
		/** Atributo para especificar el codigo de la moneda utilizada para detallar la relación de facturas.Todas las cantidades posteriores seran expresadas en la divisa detallada en esta etiqueta	**/
		currencyISOCode: DetallistaCurrencyCurrencyISOCode;
	};
	children: (DetallistaCurrencyCurrencyFunction | RateOfChange)[];
}

/** Nodo requerido que especifica la función de divisa
 * @minLength 1
 * @maxLength 16
 **/
export type DetallistaCurrencyCurrencyFunction = 'BILLING_CURRENCY' | 'PRICE_CURRENCY' | 'PAYMENT_CURRENCY';

/** Atributo para especificar el codigo de la moneda utilizada para detallar la relación de facturas.Todas las cantidades posteriores seran expresadas en la divisa detallada en esta etiqueta**/
export type DetallistaCurrencyCurrencyISOCode = 'MXN' | 'XEU' | 'USD';

/** Nodo opcional que especifica la ubicación de la aduana**/
export interface DetallistaCustoms extends XastElement {
	type: 'element';
	name: 'Customs';
	children: Gln[];
}

/** Nodo opcional que especifica la ubicación donde se especifica el identificador de la aduana**/
export interface DetallistaLineItemCustoms extends XastElement {
	type: 'element';
	name: 'Customs';
	children: (DetallistaLineItemCustomsAlternatePartyIdentification | Gln | DetallistaLineItemCustomsNameAndAddress | Date)[];
}

/** Nodo opcional donde se especifica información de recepción de mercancia.Información emitida por el comprador cuando recibe la mercancía que es facturada**/
export interface DetallistaDeliveryNote extends XastElement {
	type: 'element';
	name: 'DeliveryNote';
	children: (Date | ReferenceIdentification)[];
}

/** Nodo requerido que especifica la descripción del  empaquetado**/
export interface DetallistaLineItemPalletInformationDescription extends XastTextElement {
	type: 'element';
	name: 'description';
	attributes: {
		/** Atributo para especificar el tipo de empaquetado	**/
		type: DetallistaLineItemPalletInformationDescriptionType;
	};
}

/** Complemento requerido para la emision y recepcion de comprobantes fiscales digitales en el sector Retail**/
export interface Detallista extends XastElement {
	type: 'element';
	name: 'detallista';
	attributes: {
		/** Versión del estandar XML utilizado para la elaboración de la guia del sector detallista	**/
		contentVersion?: string;
		/** Función del mensaje	**/
		documentStatus: DetallistaDocumentStatus;
		/** Versión de la estructura del documento generado "AMC8.1	**/
		documentStructureVersion: string;
		/** Tipo de transacción bajo estandar del sector detallista	**/
		type?: string;
	};
	children: (DetallistaAdditionalInformation | DetallistaAllowanceCharge | DetallistaBuyer | DetallistaCurrency | DetallistaCustoms | DetallistaDeliveryNote | DetallistaInvoiceCreator | DetallistaLineItem | DetallistaOrderIdentification | DetallistaPaymentTerms | DetallistaRequestForPaymentIdentification | DetallistaSeller | DetallistaShipmentDetail | DetallistaShipTo | DetallistaSpecialInstruction | DetallistaTotalAllowanceCharge | DetallistaTotalAmount)[];
}

/** Nodo opcional que especifica los descuentos por pago**/
export interface DetallistaPaymentTermsDiscountPayment extends XastElement {
	type: 'element';
	name: 'discountPayment';
	attributes: {
		/** Atributo para especificar el calificador de porcentajes	**/
		discountType: DetallistaPaymentTermsDiscountPaymentDiscountType;
	};
	children: Percentage[];
}

/** Atributo para especificar el calificador de porcentajes
 * @minLength 1
 * @maxLength 28
 **/
export type DetallistaPaymentTermsDiscountPaymentDiscountType = 'ALLOWANCE_BY_PAYMENT_ON_TIME' | 'SANCTION';

/** Función del mensaje**/
export type DetallistaDocumentStatus = 'ORIGINAL' | 'COPY' | 'REEMPLAZA' | 'DELETE';

/** Versión de la estructura del documento generado "AMC8.1**/
export interface DocumentStructureVersion extends XastElement {
	name: 'documentStructureVersion';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo requerido que especifica el tipo de transacción**/
export type DetallistaRequestForPaymentIdentificationEntityType = 'INVOICE' | 'DEBIT_NOTE' | 'CREDIT_NOTE' | 'LEASE_RECEIPT' | 'HONORARY_RECEIPT' | 'PARTIAL_INVOICE' | 'TRANSPORT_DOCUMENT' | 'AUTO_INVOICE';

/** Nodo opcional que especifica la información adicional de lote del producto facturado**/
export interface DetallistaLineItemExtendedAttributes extends XastElement {
	type: 'element';
	name: 'extendedAttributes';
	children: DetallistaLineItemExtendedAttributesLotNumber[];
}

/** Nodo requerido que especifica el número global de localización (GLN) del comprador.**/
export interface Gln extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Nodo requerido que especifica el número global de localización (GLN) del comprador.**/
export type DetallistaBuyerGln = string;

/** Nodo opcional que especifica el número global de localización (GLN) de la aduana**/
export type DetallistaCustomsGln = string;

/** Nodo opcional que especifica el número global de localización (GLN)de la ubicación del emisor de la factura**/
export type DetallistaInvoiceCreatorGln = string;

/** Nodo opcional que especifica el número global de localización (GLN) de la aduana**/
export type DetallistaLineItemCustomsGln = string;

/** Nodo requerido que especifica el número global de localización (GLN) del vendedor.**/
export type DetallistaSellerGln = string;

/** Nodo opcional que especifica el número global de localización (GLN) de la ubicación a entregar la mercancía**/
export type DetallistaShipToGln = string;

/** Nodo opcional que especifica el  importe bruto**/
export interface DetallistaLineItemTotalLineAmountGrossAmount extends XastElement {
	type: 'element';
	name: 'grossAmount';
	children: Amount[];
}

/** Nodo opcional que especifica  la declaración del precio bruto**/
export interface DetallistaLineItemGrossPrice extends XastElement {
	type: 'element';
	name: 'grossPrice';
	children: Amount[];
}

/** Nodo requerido que especifica el código EAN del artículo solicitado
 * @minLength 1
 * @maxLength 14
 **/
export interface Gtin extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 14
			 **/
			value: string;
		},
	];
}
/** Nodo requerido que especifica el código EAN del artículo solicitado
 * @minLength 1
 * @maxLength 14
 **/
export type DetallistaLineItemTradeItemIdentificationGtin = string;

/** Nodo opcional que especifica la ubicación donde se especifica el identificador del emisor de la factura si es distinto del identificador del proveedor.**/
export interface DetallistaInvoiceCreator extends XastElement {
	type: 'element';
	name: 'InvoiceCreator';
	children: (DetallistaInvoiceCreatorAlternatePartyIdentification | Gln | DetallistaInvoiceCreatorNameAndAddress)[];
}

/** Nodo requerido que especifica la cantidad facturada del producto en la línea de articulo actual**/
export interface DetallistaLineItemInvoicedQuantity extends XastTextElement {
	type: 'element';
	name: 'invoicedQuantity';
	attributes: {
		/** Atributo para especificar la unidad de medida, solo si el articulo es de unidad variable	**/
		unitOfMeasure: string;
	};
}

/** Atributo para especificar el codigo del idioma en que esta la descripción del articulo**/
export type DetallistaLineItemTradeItemDescriptionInformationLanguage = 'ES' | 'EN';

/** Nodo opcional que especifica la linea de detalle de la factura**/
export interface DetallistaLineItem extends XastElement {
	type: 'element';
	name: 'lineItem';
	attributes: {
		/** Atributo para especificar el numero secuencial que se asigna a cada línea de detalle	**/
		number?: string;
		/** Atributo para especificar el tipo de línea de detalle	**/
		type?: string;
	};
	children: (
		| DetallistaLineItemAdditionalInformation
		| DetallistaLineItemAditionalQuantity
		| DetallistaLineItemAllowanceCharge
		| DetallistaLineItemAlternateTradeItemIdentification
		| DetallistaLineItemCustoms
		| DetallistaLineItemExtendedAttributes
		| DetallistaLineItemGrossPrice
		| DetallistaLineItemInvoicedQuantity
		| DetallistaLineItemLogisticUnits
		| DetallistaLineItemNetPrice
		| DetallistaLineItemPalletInformation
		| DetallistaLineItemTotalLineAmount
		| DetallistaLineItemTradeItemDescriptionInformation
		| DetallistaLineItemTradeItemIdentification
		| DetallistaLineItemTradeItemTaxInformation
	)[];
}

/** Nodo opcional que especifica la información de identificación logística**/
export interface DetallistaLineItemLogisticUnits extends XastElement {
	type: 'element';
	name: 'LogisticUnits';
	children: DetallistaLineItemLogisticUnitsSerialShippingContainerCode[];
}

/** Nodo requerido que especifica la descripción del artículo solicitado
 * @minLength 1
 * @maxLength 35
 **/
export interface LongText extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 35
			 **/
			value: string;
		},
	];
}
/** Nodo requerido que especifica la descripción del artículo solicitado
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaLineItemTradeItemDescriptionInformationLongText = string;

/** Nodo requerido que especifica el No. De lote**/
export interface DetallistaLineItemExtendedAttributesLotNumber extends XastTextElement {
	type: 'element';
	name: 'lotNumber';
	attributes: {
		/** Atributo para especificar la fecha de producción	**/
		/** A date, unknown format **/
		productionDate?: string;
	};
}

/** Nodo requerido que especifica el metodo de pago
 * @minLength 1
 * @maxLength 17
 **/
export type DetallistaLineItemPalletInformationTransportMethodOfPayment = 'PREPAID_BY_SELLER' | 'PAID_BY_BUYER';

/** Nodo opcional que especifica la cantidad monetaria o porcentaje del descuento**/
export interface DetallistaAllowanceChargeMonetaryAmountOrPercentage extends XastElement {
	type: 'element';
	name: 'monetaryAmountOrPercentage';
	children: DetallistaAllowanceChargeMonetaryAmountOrPercentageRate[];
}

/** Nodo requerido que especifica la cantidad monetaria o descuento por linea de articulo**/
export interface DetallistaLineItemAllowanceChargeMonetaryAmountOrPercentage extends XastElement {
	type: 'element';
	name: 'monetaryAmountOrPercentage';
	children: (PercentagePerUnit | DetallistaLineItemAllowanceChargeMonetaryAmountOrPercentageRatePerUnit)[];
}

/** Nodo opcional que especifica la razón social de la empresa a dende se emite la factura en caso de ser diferente al identificador del proveedor
 * @minLength 1
 * @maxLength 35
 **/
export interface Name extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 35
			 **/
			value: string;
		},
	];
}
/** Nodo opcional que especifica la razón social de la empresa a dende se emite la factura en caso de ser diferente al identificador del proveedor
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaInvoiceCreatorNameAndAddressName = string;

/** Nodo requerido que especifica el nombre de la Aduana
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaLineItemCustomsNameAndAddressName = string;

/** Nodo opcional que especifica la razón social de la empresa a donde se va a embarcar en caso de ser diferente al comprador, o el nombre de la bodega o centro de distribución
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaShipToNameAndAddressName = string;

export interface DetallistaInvoiceCreatorNameAndAddress extends XastElement {
	type: 'element';
	name: 'nameAndAddress';
	children: (City | Name | PostalCode | StreetAddressOne)[];
}

/** Nodo requerido que especifica la etiqueta padre que indica que se empezará a definir el nombre y dirección de la ubicación donde esta la aduana**/
export interface DetallistaLineItemCustomsNameAndAddress extends XastElement {
	type: 'element';
	name: 'nameAndAddress';
	children: Name[];
}

/** Nodo opcional que especifica el nombre y dirección de la ubicación donde debe realizarse la entrega de mercancía**/
export interface DetallistaShipToNameAndAddress extends XastElement {
	type: 'element';
	name: 'nameAndAddress';
	children: (City | Name | PostalCode | StreetAddressOne)[];
}

/** Nodo requerido que especifica el importe neto**/
export interface DetallistaLineItemTotalLineAmountNetAmount extends XastElement {
	type: 'element';
	name: 'netAmount';
	children: Amount[];
}

/** Nodo opcional que especifica  las condiciones de pago**/
export interface DetallistaPaymentTermsNetPayment extends XastElement {
	type: 'element';
	name: 'netPayment';
	attributes: {
		/** Atributo para especificar las condiciones de pago	**/
		netPaymentTermsType: DetallistaPaymentTermsNetPaymentNetPaymentTermsType;
	};
	children: DetallistaPaymentTermsNetPaymentPaymentTimePeriod[];
}

/** Atributo para especificar las condiciones de pago
 * @minLength 1
 * @maxLength 22
 **/
export type DetallistaPaymentTermsNetPaymentNetPaymentTermsType = 'BASIC_NET' | 'END_OF_MONTH' | 'BASIC_DISCOUNT_OFFERED';

/** Nodo opcional que especifica la declaración del precion neto**/
export interface DetallistaLineItemNetPrice extends XastElement {
	type: 'element';
	name: 'netPrice';
	children: Amount[];
}

/** Atributo para especificar el numero secuencial que se asigna a cada línea de detalle
 * @maxLength 5
 * @minLength 5
 **/
export type DetallistaLineItemNumber = string;

/** Nodo requerido que especifica información sobre la orden de compra a la que hace referencia la factura**/
export interface DetallistaOrderIdentification extends XastElement {
	type: 'element';
	name: 'orderIdentification';
	children: (Date | DetallistaOrderIdentificationReferenceIdentification)[];
}

/** Nodo opcional que especifica la información de empaquetado**/
export interface DetallistaLineItemPalletInformation extends XastElement {
	type: 'element';
	name: 'palletInformation';
	children: (DetallistaLineItemPalletInformationDescription | PalletQuantity | DetallistaLineItemPalletInformationTransport)[];
}

/** Nodo requerido que especifica el numero de paquetes
 * @minLength 1
 * @maxLength 15
 **/
export interface PalletQuantity extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 15
			 **/
			value: string;
		},
	];
}
/** Nodo requerido que especifica el numero de paquetes
 * @minLength 1
 * @maxLength 15
 **/
export type DetallistaLineItemPalletInformationPalletQuantity = string;

/** Nodo opcional que especifica los términos de pago de la factura**/
export interface DetallistaPaymentTerms extends XastElement {
	type: 'element';
	name: 'paymentTerms';
	attributes: {
		/** Atributo para especificar la referencia del tiempo de pago	**/
		paymentTermsEvent?: DetallistaPaymentTermsPaymentTermsEvent;
		/** Atributo para especificar el termino de relación del tiempo de pago	**/
		PaymentTermsRelationTime?: DetallistaPaymentTermsPaymentTermsRelationTime;
	};
	children: (DetallistaPaymentTermsDiscountPayment | DetallistaPaymentTermsNetPayment)[];
}

/** Atributo para especificar la referencia del tiempo de pago
 * @minLength 1
 * @maxLength 15
 **/
export type DetallistaPaymentTermsPaymentTermsEvent = 'DATE_OF_INVOICE' | 'EFFECTIVE_DATE';

/** Atributo para especificar el termino de relación del tiempo de pago
 * @minLength 1
 * @maxLength 15
 **/
export type DetallistaPaymentTermsPaymentTermsRelationTime = 'REFERENCE_AFTER';

/** Nodo opcional que especifica el periodo de pago de la factura**/
export interface DetallistaPaymentTermsNetPaymentPaymentTimePeriod extends XastElement {
	type: 'element';
	name: 'paymentTimePeriod';
	children: DetallistaPaymentTermsNetPaymentPaymentTimePeriodTimePeriodDue[];
}

/** Nodo opcional que especifica el porcentaje de descuento que se está aplicando según se ha indicado en el campo anterior a toda la factura**/
export interface Percentage extends XastElement {
	name: 'percentage';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo requerido que especifica el valor de los porcentajes que serán descontados o cargados si la factura no se paga dentro del término. El porcentaje será en base al valor de la factura
 * @minLength 1
 * @maxLength 5
 **/
export type DetallistaPaymentTermsDiscountPaymentPercentage = string;

/** Nodo requerido que especifica el porcentaje del cargo o descuento
 * @minLength 1
 * @maxLength 5
 **/
export interface PercentagePerUnit extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 5
			 **/
			value: string;
		},
	];
}
/** Nodo requerido que especifica el porcentaje del cargo o descuento
 * @minLength 1
 * @maxLength 5
 **/
export type DetallistaLineItemAllowanceChargeMonetaryAmountOrPercentagePercentagePerUnit = string;

/** Etiqueta que especifica el contacto de compras**/
export interface DetallistaBuyerContactInformationPersonOrDepartmentName extends XastElement {
	type: 'element';
	name: 'personOrDepartmentName';
	children: Text[];
}

/** Nodo opcional que especifica el codigo postal del domicilio del emisor de la factura
 * @minLength 1
 * @maxLength 9
 **/
export interface PostalCode extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 9
			 **/
			value: string;
		},
	];
}
/** Nodo opcional que especifica el codigo postal del domicilio del emisor de la factura
 * @minLength 1
 * @maxLength 9
 **/
export type DetallistaInvoiceCreatorNameAndAddressPostalCode = string;

/** Nodo opcional que especifica el codigo postal del domicilio a donde se embarcara la mercancía
 * @minLength 1
 * @maxLength 9
 **/
export type DetallistaShipToNameAndAddressPostalCode = string;

/** Atributo para especificar la fecha de producción**/
export interface ProductionDate extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo para especificar la fecha de producción**/
export type Date = string;

/** Atributo para especificar el codigo  de tipo de cantidad adicional declarada
 * @minLength 1
 * @maxLength 18
 **/
export type DetallistaLineItemAditionalQuantityQuantityType = 'NUM_CONSUMER_UNITS' | 'FREE_GOODS';

/** Nodo opcional que especifica  la tarifa**/
export interface DetallistaAllowanceChargeMonetaryAmountOrPercentageRate extends XastElement {
	type: 'element';
	name: 'rate';
	attributes: {
		/** Atributo para especificar la base del porcentaje que se aplicara	**/
		base: DetallistaAllowanceChargeMonetaryAmountOrPercentageRateBase;
	};
	children: Percentage[];
}

/** Nodo opcional que especifical la tasa de cambio que se aplica a las monedas. La regla general para calcular la tasa de cambio es la siguiente:
 * Divisa de Referencia multiplicada por la Tasa =  Divisa Objetivo
 **/
export interface RateOfChange extends XastElement {
	name: 'rateOfChange';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo opcional que especifica la Tarifa por unidad**/
export interface DetallistaLineItemAllowanceChargeMonetaryAmountOrPercentageRatePerUnit extends XastElement {
	type: 'element';
	name: 'ratePerUnit';
	children: AmountPerUnit[];
}

/** Nodo opcional que especifica la fecha en que fue asignado el no. de folio de recibo**/
export interface ReferenceDate extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo requerido que especifica el número de referencia adicional**/
export interface DetallistaAdditionalInformationReferenceIdentification extends XastTextElement {
	type: 'element';
	name: 'referenceIdentification';
	attributes: {
		/** Atributo para especificar el codigo de referencias adicionales	**/
		type: DetallistaAdditionalInformationReferenceIdentificationType;
	};
}

/** Nodo requerido que especifica el numero de folio. Número emitido por el comprador cuando recibe la mercancía que es facturada
 * @minLength 1
 * @maxLength 35
 **/
export interface ReferenceIdentification extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 35
			 **/
			value: string;
		},
	];
}
/** Nodo requerido que especifica el numero de folio. Número emitido por el comprador cuando recibe la mercancía que es facturada
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaDeliveryNoteReferenceIdentification = string;

/** Nodo opcional que especifica la referencia adicional de los productos**/
export interface DetallistaLineItemAdditionalInformationReferenceIdentification extends XastTextElement {
	type: 'element';
	name: 'referenceIdentification';
	attributes: {
		/** Atributo para especificar el tipo de referencia	**/
		type: DetallistaLineItemAdditionalInformationReferenceIdentificationType;
	};
}

/** Nodo requerido que especifica el número de  orden de compra (comprador) a la que hace referencia la factura**/
export interface DetallistaOrderIdentificationReferenceIdentification extends XastTextElement {
	type: 'element';
	name: 'referenceIdentification';
	attributes: {
		/** Atributo para especificar el codigo para identificar la orden de compra	**/
		type: DetallistaOrderIdentificationReferenceIdentificationType;
	};
}

/** Nodo opcional que especifica el numero de identificación del impuesto. Numero asignado al comprador por una jurisdicción de impuesto
 * @minLength 1
 * @maxLength 20
 **/
export interface ReferenceNumber extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 20
			 **/
			value: string;
		},
	];
}
/** Nodo opcional que especifica el numero de identificación del impuesto. Numero asignado al comprador por una jurisdicción de impuesto
 * @minLength 1
 * @maxLength 20
 **/
export type DetallistaLineItemTradeItemTaxInformationReferenceNumber = string;

/** Nodo requerido que especifica la transacción a utilizar**/
export interface DetallistaRequestForPaymentIdentification extends XastElement {
	type: 'element';
	name: 'requestForPaymentIdentification';
	children: DetallistaRequestForPaymentIdentificationEntityType[];
}

/** Nodo opcional que especifica información del vendedor**/
export interface DetallistaSeller extends XastElement {
	type: 'element';
	name: 'seller';
	children: (DetallistaSellerAlternatePartyIdentification | Gln)[];
}

/** Atributo indicador de secuencia de calculo
 * @minLength 1
 * @maxLength 15
 **/
export interface SequenceNumber extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 15
			 **/
			value: string;
		},
	];
}
/** Atributo indicador de secuencia de calculo
 * @minLength 1
 * @maxLength 15
 **/
export type DetallistaAllowanceChargeSequenceNumber = string;

/** Atributo para especificar la secuencia de cálculo
 * @minLength 1
 * @maxLength 15
 **/
export type DetallistaLineItemAllowanceChargeSequenceNumber = string;

/** Nodo requerido que especifica la información de Rangos de identificación de productos**/
export interface DetallistaLineItemLogisticUnitsSerialShippingContainerCode extends XastTextElement {
	type: 'element';
	name: 'serialShippingContainerCode';
	attributes: {
		/** Atributo para especificar el codigo del numero de identidad	**/
		type: DetallistaLineItemLogisticUnitsSerialShippingContainerCodeType;
	};
}

/** Atributo para especificar la imputación del descuento o cargo
 * @minLength 1
 * @maxLength 11
 **/
export type DetallistaAllowanceChargeSettlementType = 'BILL_BACK' | 'OFF_INVOICE';

/** Atributo para especificar la imputación del cargo o descuento
 * @minLength 1
 * @maxLength 29
 **/
export type DetallistaLineItemAllowanceChargeSettlementType = 'OFF_INVOICE' | 'CHARGE_TO_BE_PAID_BY_VENDOR' | 'CHARGE_TO_BE_PAID_BY_CUSTOMER';

/** Nodo opcional que especifica la información pertinente para el embarque de la mercancía.**/
export interface DetallistaShipmentDetail extends XastElement {
	type: 'element';
	name: 'shipmentDetail' /** XastElement is self-closing */;
	children: [];
}

/** Nodo opcional que especifica la ubicación donde debe realizarse la entrega de la mercancía.**/
export interface DetallistaShipTo extends XastElement {
	type: 'element';
	name: 'shipTo';
	children: (Gln | DetallistaShipToNameAndAddress)[];
}

/** Nodo opcional que especifica que tipo de instrucciones comerciales son enviadas**/
export interface DetallistaSpecialInstruction extends XastElement {
	type: 'element';
	name: 'specialInstruction';
	attributes: {
		/** Atributo para especificar el codigo del tipo de instrucciones comerciales que son enviadas	**/
		code: DetallistaSpecialInstructionCode;
	};
	children: Text[];
}

/** Nodo opcional que especifica  el tipo de descuento o cargo. Este atributo sólo se utiliza si el comprador conoce los descuentos
 * @minLength 1
 * @maxLength 3
 **/
export type DetallistaAllowanceChargeSpecialServicesType = 'AA' | 'AJ' | 'ADO' | 'ADT' | 'ADS' | 'ABZ' | 'DA' | 'EAA' | 'EAB' | 'PI' | 'TAE' | 'SAB' | 'RAA' | 'PAD' | 'FG' | 'FA' | 'TD' | 'TS' | 'TX' | 'TZ' | 'ZZZ' | 'VAB' | 'UM' | 'DI' | 'CAC' | 'COD' | 'EAB' | 'FC' | 'FI' | 'HD' | 'QD';

/** Nodo opcional que especifica el tipo de descuento o cargo. Este atributo sólo se utiliza si el comprador conoce el tipo de descuento o cargo.
 * @minLength 1
 * @maxLength 3
 **/
export type DetallistaLineItemAllowanceChargeSpecialServicesType = 'AA' | 'ADS' | 'ADO' | 'ABZ' | 'DA' | 'EAA' | 'PI' | 'TAE' | 'SAB' | 'RAA' | 'PAD' | 'FG' | 'FA' | 'TD' | 'TS' | 'TX' | 'ZZZ' | 'VAB' | 'UM' | 'DI' | 'ADT' | 'AJ' | 'CAC' | 'COD' | 'EAB' | 'FC' | 'FI' | 'HD' | 'QD';

/** Nodo opcional que especifica el tipo de descuento o cargo. Este atributo sólo se utiliza si el comprador conoce el tipo de descuento o cargo.
 * @minLength 1
 * @maxLength 3
 **/
export type DetallistaTotalAllowanceChargeSpecialServicesType = 'AA' | 'ADS' | 'ADO' | 'ABZ' | 'DA' | 'EAA' | 'PI' | 'TAE' | 'SAB' | 'RAA' | 'PAD' | 'FG' | 'FA' | 'TD' | 'TS' | 'TX' | 'ZZZ' | 'VAB' | 'UM' | 'DI' | 'ADT' | 'AJ' | 'CAC' | 'COD' | 'EAB' | 'FC' | 'FI' | 'HD' | 'QD';

/** Nodo opcional que especifica el domicilio del emisor de la factura: Calle, número exterior, número interior y colonias
 * @minLength 1
 * @maxLength 35
 **/
export interface StreetAddressOne extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 35
			 **/
			value: string;
		},
	];
}
/** Nodo opcional que especifica el domicilio del emisor de la factura: Calle, número exterior, número interior y colonias
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaInvoiceCreatorNameAndAddressStreetAddressOne = string;

/** Nodo opcional que especifica el domicilio a donde se embarcara la mercancía: Calle, número exterior, número interior y colonias
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaShipToNameAndAddressStreetAddressOne = string;

/** Nodo requerido que especifica el monto del impuesto**/
export interface TaxAmount extends XastElement {
	name: 'taxAmount';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo opcional que especifica el identificador de impuesto retenido o transferido
 * @minLength 0
 * @maxLength 11
 **/
export type DetallistaLineItemTradeItemTaxInformationTaxCategory = 'TRANSFERIDO' | 'RETENIDO';

/** Nodo requerido que especifica el porcentaje del impuesto**/
export interface TaxPercentage extends XastElement {
	name: 'taxPercentage';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo requerido que especifica el tipo de arancel, impuesto o cuota.**/
export type DetallistaLineItemTradeItemTaxInformationTaxTypeDescription = 'GST' | 'VAT' | 'LAC' | 'AAA' | 'ADD' | 'FRE' | 'LOC' | 'STT' | 'OTH';

/** Contacto de Nodo requerido que especifica el contacto de compras
 * @minLength 1
 * @maxLength 35
 **/
export interface Text extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 35
			 **/
			value: string;
		},
	];
}
/** Contacto de Nodo requerido que especifica el contacto de compras
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaBuyerContactInformationPersonOrDepartmentNameText = string;

/** Nodo requerido que especifica información de texto que aplica a todo el mensaje de la factura. La información estará en función al código del tema de texto
 * @minLength 1
 * @maxLength 255
 **/
export type DetallistaSpecialInstructionText = string;

/** Atributo para especificar el tipo de periodo
 * @minLength 1
 * @maxLength 6
 **/
export type DetallistaPaymentTermsNetPaymentPaymentTimePeriodTimePeriodDueTimePeriod = 'DAYS';

/** Nodo requerido que especifica el tiempo de pago**/
export interface DetallistaPaymentTermsNetPaymentPaymentTimePeriodTimePeriodDue extends XastElement {
	type: 'element';
	name: 'timePeriodDue';
	attributes: {
		/** Atributo para especificar el tipo de periodo	**/
		timePeriod: DetallistaPaymentTermsNetPaymentPaymentTimePeriodTimePeriodDueTimePeriod;
	};
	children: Value[];
}

/** Nodo opcional que especifica el monto total de cargos o descuentos**/
export interface DetallistaTotalAllowanceCharge extends XastElement {
	type: 'element';
	name: 'TotalAllowanceCharge';
	attributes: {
		/** Atributo para especificar los cargos o descuentos consolidados	**/
		allowanceOrChargeType: DetallistaTotalAllowanceChargeAllowanceOrChargeType;
	};
	children: (Amount | DetallistaTotalAllowanceChargeSpecialServicesType)[];
}

/** Nodo opcional que especifica el monto total de las líneas de artículos.**/
export interface DetallistaTotalAmount extends XastElement {
	type: 'element';
	name: 'totalAmount';
	children: Amount[];
}

/** Nodo requerido que especifica los importes monetarios por línea de articulo**/
export interface DetallistaLineItemTotalLineAmount extends XastElement {
	type: 'element';
	name: 'totalLineAmount';
	children: (DetallistaLineItemTotalLineAmountGrossAmount | DetallistaLineItemTotalLineAmountNetAmount)[];
}

/** Nodo opcional que especifica el inicio de la descripción del artículo**/
export interface DetallistaLineItemTradeItemDescriptionInformation extends XastElement {
	type: 'element';
	name: 'tradeItemDescriptionInformation';
	attributes: {
		/** Atributo para especificar el codigo del idioma en que esta la descripción del articulo	**/
		language?: DetallistaLineItemTradeItemDescriptionInformationLanguage;
	};
	children: LongText[];
}

/** Nodo requerido que especifica la identificación de cada artículo**/
export interface DetallistaLineItemTradeItemIdentification extends XastElement {
	type: 'element';
	name: 'tradeItemIdentification';
	children: Gtin[];
}

/** Nodo opcional que especifica el importe o porcentaje del descuento**/
export interface DetallistaLineItemTradeItemTaxInformationTradeItemTaxAmount extends XastElement {
	type: 'element';
	name: 'tradeItemTaxAmount';
	children: (TaxAmount | TaxPercentage)[];
}

/** Nodo opcional que especifica los impuestos por cada línea de artículo**/
export interface DetallistaLineItemTradeItemTaxInformation extends XastElement {
	type: 'element';
	name: 'tradeItemTaxInformation';
	children: (ReferenceNumber | DetallistaLineItemTradeItemTaxInformationTaxCategory | DetallistaLineItemTradeItemTaxInformationTaxTypeDescription | DetallistaLineItemTradeItemTaxInformationTradeItemTaxAmount)[];
}

/** Nodo requerido que especifica el pago de transporte de embalaje**/
export interface DetallistaLineItemPalletInformationTransport extends XastElement {
	type: 'element';
	name: 'transport';
	children: DetallistaLineItemPalletInformationTransportMethodOfPayment[];
}

/** Tipo de transacción bajo estandar del sector detallista**/
export interface Type extends XastElement {
	name: 'type';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo para especificar el codigo de referencias adicionales**/
export type DetallistaAdditionalInformationReferenceIdentificationType = 'AAE' | 'CK' | 'ACE' | 'ATZ' | 'DQ' | 'IV' | 'ON' | 'AWR';

/** Atributo para especificar el tipo de identificación secundaria se le asigno al proveedor**/
export type DetallistaInvoiceCreatorAlternatePartyIdentificationType = 'VA' | 'IA';

/** Atributo para especificar el tipo de línea de detalle
 * @minLength 1
 * @maxLength 32
 **/
export type DetallistaLineItemType = string;

/** Atributo para especificar el tipo de referencia**/
export type DetallistaLineItemAdditionalInformationReferenceIdentificationType = 'ON';

/** Atributo para especificar el tipo de identificación adicional, en caso de no utilizar condigo GTIN
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaLineItemAlternateTradeItemIdentificationType = 'BUYER_ASSIGNED' | 'SUPPLIER_ASSIGNED' | 'SERIAL_NUMBER' | 'GLOBAL_TRADE_ITEM_IDENTIFICATION';

/** Atributo para especificar el codigo de identificación secundaria**/
export type DetallistaLineItemCustomsAlternatePartyIdentificationType = 'TN';

/** Atributo para especificar el codigo del numero de identidad
 * @minLength 1
 * @maxLength 3
 **/
export type DetallistaLineItemLogisticUnitsSerialShippingContainerCodeType = 'BJ' | 'SRV';

/** Atributo para especificar el tipo de empaquetado
 * @minLength 1
 * @maxLength 35
 **/
export type DetallistaLineItemPalletInformationDescriptionType = 'EXCHANGE_PALLETS' | 'RETURN_PALLETS' | 'PALLET_80x100' | 'CASE' | 'BOX';

/** Atributo para especificar el codigo para identificar la orden de compra**/
export type DetallistaOrderIdentificationReferenceIdentificationType = 'ON';

/** Atributo para especificar el tipo de identificación secundaria se le asigno al proveedor
 * @minLength 1
 * @maxLength 40
 **/
export type DetallistaSellerAlternatePartyIdentificationType = 'SELLER_ASSIGNED_IDENTIFIER_FOR_A_PARTY' | 'IEPS_REFERENCE';

/** Atributo para especificar la unidad de medida, solo si el articulo es de unidad variable**/
export interface UnitOfMeasure extends XastElement {
	name: 'unitOfMeasure';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Nodo requerido que especifica el numero de periodos
 * @minLength 1
 * @maxLength 5
 **/
export interface Value extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 5
			 **/
			value: string;
		},
	];
}
/** Nodo requerido que especifica el numero de periodos
 * @minLength 1
 * @maxLength 5
 **/
export type DetallistaPaymentTermsNetPaymentPaymentTimePeriodTimePeriodDueValue = string;
