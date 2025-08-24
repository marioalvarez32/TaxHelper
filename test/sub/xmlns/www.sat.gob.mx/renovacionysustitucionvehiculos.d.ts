import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/renovacionysustitucionvehiculos/renovacionysustitucionvehiculos.xsd

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

/** Atributo opcional para precisar la aduana por la que se efectuó la importación del vehículo usado, en su caso.
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
/** Atributo opcional para precisar la aduana por la que se efectuó la importación del vehículo usado, en su caso.
 * @minLength 1
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabAduana = string;

/** Atributo requerido para precisar la aduana por la que se efectuó la importación del vehículo usado.
 * @minLength 1
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabAduana = string;

/** Atributo requerido para la expresión del año ó año modelo del vehículo nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.
 * @maxInclusive 1900
 **/
export interface Ao extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 1900
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para la expresión del año ó año modelo del vehículo nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.
 * @maxInclusive 1900
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculoNuvoSemEnajenadoFabAlPermAo = string;

/** Atributo requerido para la expresión del año ó año modelo del vehículo usado que se enajena.
 * @maxInclusive 1900
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabAo = string;

/** Atributo requerido para la expresión del año ó año modelo del vehículo nuevo o seminuevo  que enajena el fabricante, ensamblador o distribuidor autorizado.
 * @maxInclusive 1900
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoNuvoSemEnajenadoFabAlPermAo = string;

/** Atributo requerido para la expresión del año ó año modelo del vehículo usado que se enajena.
 * @maxInclusive 1900
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabAo = string;

/** Nodo opcional para expresar los datos aplicables al estimulo por la aplicación del Decreto por el que se fomenta la renovación del parque vehicular del autotransporte.**/
export interface RenovacionysustitucionvehiculosDecretoRenovVehicular extends XastElement {
	type: 'element';
	name: 'DecretoRenovVehicular';
	attributes: {
		/** Atributo requerido para expresar si el vehículo que el fabricante, ensamblador o distribuidor autorizado enajena al permisionario es nuevo o seminuevo, de acuerdo con el catálogo “2. Vehículo enajenado”.	**/
		VehEnaj: CVehiculoEnajenado;
	};
	children: (RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculoNuvoSemEnajenadoFabAlPerm | RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFab)[];
}

/** Nodo opcional para expresar los datos aplicables al estimulo por la aplicación del Decreto por el que se otorgan medidas para la sustitución de vehículos de autotransporte de pasaje y carga.**/
export interface RenovacionysustitucionvehiculosDecretoSustitVehicular extends XastElement {
	type: 'element';
	name: 'DecretoSustitVehicular';
	attributes: {
		/** Atributo requerido para expresar si el vehículo que el fabricante, ensamblador o distribuidor autorizado enajena al permisionario es nuevo o seminuevo, de acuerdo con el catálogo “2. Vehículo enajenado”.	**/
		VehEnaj: CVehiculoEnajenado;
	};
	children: (RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoNuvoSemEnajenadoFabAlPerm | RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFab)[];
}

/** Atributo opcional para expresar la fecha del pedimento en el que se regularizó la legal importación definitiva del vehículo usado, en su caso. Se expresa en la forma aaaa-mm-dd de acuerdo a especificación ISO 8601.**/
export interface FechaRegulVeh extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo opcional para expresar la fecha del pedimento en el que se regularizó la legal importación definitiva del vehículo usado, en su caso. Se expresa en la forma aaaa-mm-dd de acuerdo a especificación ISO 8601.**/
export type Date = string;

/** Atributo requerido para expresar el número de folio fiscal del CFDI expedido por el Centro de Destrucción Autorizado al que se ha incorporado el Complemento Certificado de Destrucción del vehículo usado que enajena el permisionario.
 * @minLength 1
 * @maxLength 36
 **/
export interface Foliofiscal extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 36
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de folio fiscal del CFDI expedido por el Centro de Destrucción Autorizado al que se ha incorporado el Complemento Certificado de Destrucción del vehículo usado que enajena el permisionario.
 * @minLength 1
 * @maxLength 36
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabFoliofiscal = string;

/** Atributo requerido para expresar el número de folio fiscal del CFDI expedido por el Centro de Destrucción Autorizado al que se ha incorporado el Complemento Certificado de Destrucción del vehículo usado que enajena el permisionario.
 * @minLength 1
 * @maxLength 36
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabFoliofiscal = string;

/** Atributo requerido para expresar la marca del vehículo usado que se enajena.
 * @minLength 1
 * @maxLength 50
 **/
export interface Marca extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 50
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar la marca del vehículo usado que se enajena.
 * @minLength 1
 * @maxLength 50
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabMarca = string;

/** Atributo requerido para expresar la marca del vehículo usado que se enajena.
 * @minLength 1
 * @maxLength 50
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabMarca = string;

/** Atributo opcional para expresar el modelo del vehículo nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.**/
export interface Modelo extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo opcional para expresar el modelo del vehículo nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.**/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculoNuvoSemEnajenadoFabAlPermModelo = string;

/** Atributo opcional para la expresión del modelo del vehículo usado que se enajena.**/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabModelo = string;

/** Atributo opcional para expresar  el modelo  del vehículo nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.**/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoNuvoSemEnajenadoFabAlPermModelo = string;

/** Atributo opcional para la expresión del modelo del vehículo usado que se enajena.**/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabModelo = string;

/** Atributo opcional para expresar el número de identificación vehicular del vehículo  usado que se enajena. (Cuando exista el NIV deberá incluirse este invariablemente).
 * @minLength 1
 * @maxLength 17
 **/
export interface NIV extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 17
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar el número de identificación vehicular del vehículo  usado que se enajena. (Cuando exista el NIV deberá incluirse este invariablemente).
 * @minLength 1
 * @maxLength 17
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabNIV = string;

/** Atributo opcional para expresar el número de identificación vehicular del vehículo  usado que se enajena. (Cuando exista el NIV deberá incluirse este invariablemente).
 * @minLength 1
 * @maxLength 17
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabNIV = string;

/** Atributo requerido para expresar el número de folio del acuse de recibo del Aviso de Intención para acceder al programa de destrucción.
 * @minLength 1
 * @maxLength 20
 **/
export interface NumFolAvisoint extends XastElement {
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
/** Atributo requerido para expresar el número de folio del acuse de recibo del Aviso de Intención para acceder al programa de destrucción.
 * @minLength 1
 * @maxLength 20
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabNumFolAvisoint = string;

/** Atributo requerido para expresar el número de folio de la tarjeta de circulación  del vehículo usado que se enajena.
 * @minLength 1
 * @maxLength 40
 **/
export interface NumFolTarjCir extends XastElement {
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
/** Atributo requerido para expresar el número de folio de la tarjeta de circulación  del vehículo usado que se enajena.
 * @minLength 1
 * @maxLength 40
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabNumFolTarjCir = string;

/** Atributo requerido para expresar el número de folio de la tarjeta de circulación  del vehículo usado que se enajena.
 * @minLength 1
 * @maxLength 40
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabNumFolTarjCir = string;

/** Atributo opcional para expresar el número de motor del vehículo usado que se enajena (En caso de contar con dicho número se deberá ingresar volviéndose requerido).
 * @minLength 1
 * @maxLength 17
 **/
export interface NumMotor extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 17
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar el número de motor del vehículo usado que se enajena (En caso de contar con dicho número se deberá ingresar volviéndose requerido).
 * @minLength 1
 * @maxLength 17
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabNumMotor = string;

/** Atributo opcional para expresar el número de motor del vehículo usado que se enajena (En caso de contar con dicho número se deberá ingresar volviéndose requerido).
 * @minLength 1
 * @maxLength 17
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabNumMotor = string;

/** Atributo opcional para expresar el número de documento aduanero con el cual se importó en definitiva el vehículo usado, en su caso.
 * @minLength 1
 * @maxLength 40
 **/
export interface NumPedIm extends XastElement {
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
/** Atributo opcional para expresar el número de documento aduanero con el cual se importó en definitiva el vehículo usado, en su caso.
 * @minLength 1
 * @maxLength 40
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabNumPedIm = string;

/** Atributo requerido para expresar el número de documento aduanero con el cual se importó en definitiva el vehículo usado.
 * @minLength 1
 * @maxLength 40
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabNumPedIm = string;

/** Atributo requerido para expresar el número de placa metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajeros urbano o suburbano del vehículo  nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.
 * @minLength 1
 * @maxLength 10
 **/
export interface NumPlacas extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 10
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el número de placa metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajeros urbano o suburbano del vehículo  nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.
 * @minLength 1
 * @maxLength 10
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculoNuvoSemEnajenadoFabAlPermNumPlacas = string;

/** Atributo requerido para expresar el número de placas metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajeros urbano o suburbano del vehículo  usado que se enajena.
 * @minLength 1
 * @maxLength 10
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabNumPlacas = string;

/** Atributo requerido para expresar el número de placa metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajeros urbano o suburbano del vehículo  nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.
 * @minLength 1
 * @maxLength 10
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoNuvoSemEnajenadoFabAlPermNumPlacas = string;

/** Atributo requerido para expresar el número de placas metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajeros urbano o suburbano del vehículo  usado que se enajena.
 * @minLength 1
 * @maxLength 10
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabNumPlacas = string;

/** Atributo opcional para expresar el número de serie de la carrocería del vehículo  usado que se enajena. (En caso de contar con dicho número se deberá ingresar convirtiéndose en requerido).
 * @minLength 1
 * @maxLength 17
 **/
export interface NumSerie extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 17
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar el número de serie de la carrocería del vehículo  usado que se enajena. (En caso de contar con dicho número se deberá ingresar convirtiéndose en requerido).
 * @minLength 1
 * @maxLength 17
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabNumSerie = string;

/** Atributo opcional para expresar el número de serie de la carrocería del vehículo  usado que se enajena. (En caso de contar con dicho número se deberá ingresar convirtiéndose en requerido).
 * @minLength 1
 * @maxLength 17
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabNumSerie = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface PrecioVehUsado extends XastElement {
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

/** Complemento para incorporar la información relativa a los estímulos por la renovación del parque vehicular del autotransporte y  por el que se otorgan medidas para la sustitución de vehículos de autotransporte de pasaje y carga.**/
export interface Renovacionysustitucionvehiculos extends XastElement {
	type: 'element';
	name: 'renovacionysustitucionvehiculos';
	attributes: {
		/** Atributo requerido que indica el Decreto de cuya aplicación se trate, de acuerdo con el catálogo “1. Tipo de Decreto”.	**/
		TipoDeDecreto: CTipoDecreto;
		/** Atributo requerido que indica la versión del complemento.	**/
		Version: string;
	};
	children: (RenovacionysustitucionvehiculosDecretoRenovVehicular | RenovacionysustitucionvehiculosDecretoSustitVehicular)[];
}

/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9][A-Z,0-9][0-9,A-Z]
 * @minLength 12
 * @maxLength 13
 **/
export interface RFC extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9][A-Z,0-9][0-9,A-Z]
			 * @minLength 12
			 * @maxLength 13
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9][A-Z,0-9][0-9,A-Z]
 * @minLength 12
 * @maxLength 13
 **/
export type TRFC = string;

/** Atributo requerido que indica el Decreto de cuya aplicación se trate, de acuerdo con el catálogo “1. Tipo de Decreto”.**/
export type CTipoDecreto = '01' | '02';

/** Atributo requerido para expresar el tipo o clase del vehículo usado que se enajena.
 * @minLength 1
 * @maxLength 50
 **/
export interface TipooClase extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 50
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el tipo o clase del vehículo usado que se enajena.
 * @minLength 1
 * @maxLength 50
 **/
export type RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFabTipooClase = string;

/** Atributo requerido para expresar el tipo o clase del vehículo usado que se enajena.
 * @minLength 1
 * @maxLength 50
 **/
export type RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFabTipooClase = string;

/** Atributo requerido para expresar, según el  Decreto, el tipo de vehículo usado que enajena el permisionario, de acuerdo con el catálogo “3. Tipo de Vehículo conforme al Decreto por el que se fomenta la renovación del parque vehicular del autotransporte”.**/
export type CTipoVehiculoR = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08';

/** Atributo requerido que expresar, según el Decreto, las características del vehículo usado  que el permisionario enajena al fabricante, ensamblador o distribuidor autorizado a cuenta del precio del vehículo nuevo o seminuevo, de acuerdo con el catálogo “4. Tipo de vehículo conforme al  Decreto por el que se otorgan medidas para la sustitución de vehículos de autotransporte de pasaje y carga”.**/
export type CTipoVehiculoS = '01' | '02' | '03' | '04' | '05' | '06';

/** Atributo requerido para expresar si el vehículo que el fabricante, ensamblador o distribuidor autorizado enajena al permisionario es nuevo o seminuevo, de acuerdo con el catálogo “2. Vehículo enajenado”.**/
export type CVehiculoEnajenado = '01' | '02';

/** Datos del vehículo nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado al permisionario.**/
export interface RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculoNuvoSemEnajenadoFabAlPerm extends XastElement {
	type: 'element';
	name: 'VehiculoNuvoSemEnajenadoFabAlPerm';
	attributes: {
		/** Atributo requerido para la expresión del año ó año modelo del vehículo nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.	**/
		Ao: string;
		/** Atributo opcional para expresar el modelo del vehículo nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.	**/
		Modelo?: string;
		/** Atributo requerido para expresar el número de placa metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajeros urbano o suburbano del vehículo  nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.	**/
		NumPlacas: string;
		/** Atributo opcional para la Clave del Registro Federal de Contribuyentes del arrendatario, en el caso de que el  adquiriente del vehículo nuevo o seminuevo  sea una arrendadora financiera.	**/
		RFC?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Datos del vehículo nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado al permisionario.**/
export interface RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoNuvoSemEnajenadoFabAlPerm extends XastElement {
	type: 'element';
	name: 'VehiculoNuvoSemEnajenadoFabAlPerm';
	attributes: {
		/** Atributo requerido para la expresión del año ó año modelo del vehículo nuevo o seminuevo  que enajena el fabricante, ensamblador o distribuidor autorizado.	**/
		Ao: string;
		/** Atributo opcional para expresar  el modelo  del vehículo nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.	**/
		Modelo?: string;
		/** Atributo requerido para expresar el número de placa metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajeros urbano o suburbano del vehículo  nuevo o seminuevo que enajena el fabricante, ensamblador o distribuidor autorizado.	**/
		NumPlacas: string;
		/** Atributo opcional para la Clave del Registro Federal de Contribuyentes del arrendatario en el caso de que el  adquiriente del vehículo nuevo o seminuevo  sea una arrendadora financiera.	**/
		RFC?: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Datos del vehículo o vehículos usados que enajena el permisionario a cuenta del precio del vehículo nuevo o seminuevo (pueden enajenarse 1 o más vehículos, por lo que de ser 2 o más se deberán llenar tantos elementos como vehículos usados se enajenen).**/
export interface RenovacionysustitucionvehiculosDecretoRenovVehicularVehiculosUsadosEnajenadoPermAlFab extends XastElement {
	type: 'element';
	name: 'VehiculosUsadosEnajenadoPermAlFab';
	attributes: {
		/** Atributo opcional para precisar la aduana por la que se efectuó la importación del vehículo usado, en su caso.	**/
		Aduana?: string;
		/** Atributo requerido para la expresión del año ó año modelo del vehículo usado que se enajena.	**/
		Ao: string;
		/** Atributo opcional para expresar la fecha del pedimento en el que se regularizó la legal importación definitiva del vehículo usado, en su caso. Se expresa en la forma aaaa-mm-dd de acuerdo a especificación ISO 8601.	**/
		/** A date, unknown format **/
		FechaRegulVeh?: string;
		/** Atributo requerido para expresar el número de folio fiscal del CFDI expedido por el Centro de Destrucción Autorizado al que se ha incorporado el Complemento Certificado de Destrucción del vehículo usado que enajena el permisionario.	**/
		Foliofiscal: string;
		/** Atributo requerido para expresar la marca del vehículo usado que se enajena.	**/
		Marca: string;
		/** Atributo opcional para la expresión del modelo del vehículo usado que se enajena.	**/
		Modelo?: string;
		/** Atributo opcional para expresar el número de identificación vehicular del vehículo  usado que se enajena. (Cuando exista el NIV deberá incluirse este invariablemente).	**/
		NIV?: string;
		/** Atributo requerido para expresar el número de folio de la tarjeta de circulación  del vehículo usado que se enajena.	**/
		NumFolTarjCir: string;
		/** Atributo opcional para expresar el número de motor del vehículo usado que se enajena (En caso de contar con dicho número se deberá ingresar volviéndose requerido).	**/
		NumMotor?: string;
		/** Atributo opcional para expresar el número de documento aduanero con el cual se importó en definitiva el vehículo usado, en su caso.	**/
		NumPedIm?: string;
		/** Atributo requerido para expresar el número de placas metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajeros urbano o suburbano del vehículo  usado que se enajena.	**/
		NumPlacas: string;
		/** Atributo opcional para expresar el número de serie de la carrocería del vehículo  usado que se enajena. (En caso de contar con dicho número se deberá ingresar convirtiéndose en requerido).	**/
		NumSerie?: string;
		/** Atributo requerido que expresa el precio del vehículo usado que el permisionario enajena al fabricante, ensamblador o distribuidor  autorizado  a cuenta del precio del vehículo nuevo o seminuevo.	**/
		PrecioVehUsado: string;
		/** Atributo requerido para expresar el tipo o clase del vehículo usado que se enajena.	**/
		TipooClase: string;
		/** Atributo requerido para expresar, según el  Decreto, el tipo de vehículo usado que enajena el permisionario, de acuerdo con el catálogo “3. Tipo de Vehículo conforme al Decreto por el que se fomenta la renovación del parque vehicular del autotransporte”.	**/
		TipoVeh: CTipoVehiculoR;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Datos del vehículo usado que enajena el permisionario a cuenta del precio del vehículo nuevo o seminuevo.**/
export interface RenovacionysustitucionvehiculosDecretoSustitVehicularVehiculoUsadoEnajenadoPermAlFab extends XastElement {
	type: 'element';
	name: 'VehiculoUsadoEnajenadoPermAlFab';
	attributes: {
		/** Atributo requerido para precisar la aduana por la que se efectuó la importación del vehículo usado.	**/
		Aduana: string;
		/** Atributo requerido para la expresión del año ó año modelo del vehículo usado que se enajena.	**/
		Ao: string;
		/** Atributo requerido para expresar la fecha del pedimento en el que se regularizó la legal importación definitiva del vehículo usado. Se expresa en la forma aaaa-mm-dd de acuerdo a a especificación ISO 8601	**/
		/** A date, unknown format **/
		FechaRegulVeh: string;
		/** Atributo requerido para expresar el número de folio fiscal del CFDI expedido por el Centro de Destrucción Autorizado al que se ha incorporado el Complemento Certificado de Destrucción del vehículo usado que enajena el permisionario.	**/
		Foliofiscal: string;
		/** Atributo requerido para expresar la marca del vehículo usado que se enajena.	**/
		Marca: string;
		/** Atributo opcional para la expresión del modelo del vehículo usado que se enajena.	**/
		Modelo?: string;
		/** Atributo opcional para expresar el número de identificación vehicular del vehículo  usado que se enajena. (Cuando exista el NIV deberá incluirse este invariablemente).	**/
		NIV?: string;
		/** Atributo requerido para expresar el número de folio del acuse de recibo del Aviso de Intención para acceder al programa de destrucción.	**/
		NumFolAvisoint: string;
		/** Atributo requerido para expresar el número de folio de la tarjeta de circulación  del vehículo usado que se enajena.	**/
		NumFolTarjCir: string;
		/** Atributo opcional para expresar el número de motor del vehículo usado que se enajena (En caso de contar con dicho número se deberá ingresar volviéndose requerido).	**/
		NumMotor?: string;
		/** Atributo requerido para expresar el número de documento aduanero con el cual se importó en definitiva el vehículo usado.	**/
		NumPedIm: string;
		/** Atributo requerido para expresar el número de placas metálicas de identificación del servicio público federal o, en su caso, del servicio público de autotransporte de pasajeros urbano o suburbano del vehículo  usado que se enajena.	**/
		NumPlacas: string;
		/** Atributo opcional para expresar el número de serie de la carrocería del vehículo  usado que se enajena. (En caso de contar con dicho número se deberá ingresar convirtiéndose en requerido).	**/
		NumSerie?: string;
		/** Atributo requerido que expresa el precio del vehículo usado que el permisionario enajena al  fabricante, ensamblador o distribuidor autorizado a cuenta del precio del vehículo nuevo o seminuevo.	**/
		PrecioVehUsado: string;
		/** Atributo requerido para expresar el tipo o clase del vehículo usado que se enajena.	**/
		TipooClase: string;
		/** Atributo requerido que expresar, según el Decreto, las características del vehículo usado  que el permisionario enajena al fabricante, ensamblador o distribuidor autorizado a cuenta del precio del vehículo nuevo o seminuevo, de acuerdo con el catálogo “4. Tipo de vehículo conforme al  Decreto por el que se otorgan medidas para la sustitución de vehículos de autotransporte de pasaje y carga”.	**/
		TipoVeh: CTipoVehiculoS;
	};
	/** XastElement is self-closing */
	children: [];
}

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
export type RenovacionysustitucionvehiculosVersion = string;
