import * as Primitive from '../xml-primitives';

// Source files:
// http://localhost:56607/sitio_internet/cfd/notariospublicos/notariospublicos.xsd

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

/** Atributo opcional que expresa el señalamiento del notario a la plaza a la que se encuentra adscrito
 * @minLength 1
 * @maxLength 255
 **/
export interface Adscripcion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 255
			 **/
			value: string;
		},
	];
}
/** Atributo opcional que expresa el señalamiento del notario a la plaza a la que se encuentra adscrito
 * @minLength 1
 * @maxLength 255
 **/
export type NotariosPublicosDatosNotarioAdscripcion = string;

/** Atributo opcional para expresar el apellido materno de cada adquirientes o de cada propietario o poseedor en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 200
 **/
export interface ApellidoMaterno extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 200
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar el apellido materno de cada adquirientes o de cada propietario o poseedor en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 200
 **/
export type NotariosPublicosDatosAdquirienteDatosAdquirientesCopSCDatosAdquirienteCopSCApellidoMaterno = string;

/** Atributo opcional para expresar el apellido materno del adquiriente o del propietario o poseedor del bien dominante o del pagador de la indemnización o contraprestación en el caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 200
 **/
export type NotariosPublicosDatosAdquirienteDatosUnAdquirienteApellidoMaterno = string;

/** Atributo opcional para expresar el apellido materno de cada enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 200
 **/
export type NotariosPublicosDatosEnajenanteDatosEnajenantesCopSCDatosEnajenanteCopSCApellidoMaterno = string;

/** Atributo opcional para expresar el apellido materno del enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 200
 **/
export type NotariosPublicosDatosEnajenanteDatosUnEnajenanteApellidoMaterno = string;

/** Atributo opcional para expresar el apellido paterno de cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 200
 **/
export interface ApellidoPaterno extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 200
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar el apellido paterno de cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 200
 **/
export type NotariosPublicosDatosAdquirienteDatosAdquirientesCopSCDatosAdquirienteCopSCApellidoPaterno = string;

/** Atributo opcional para expresar el apellido paterno del adquiriente o del propietario o poseedor del bien dominante o del pagador de la indemnización o contraprestación en el caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 200
 **/
export type NotariosPublicosDatosAdquirienteDatosUnAdquirienteApellidoPaterno = string;

/** Atributo opcional para expresar el apellido paterno de cada enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 200
 **/
export type NotariosPublicosDatosEnajenanteDatosEnajenantesCopSCDatosEnajenanteCopSCApellidoPaterno = string;

/** Atributo requerido  para expresar el apellido paterno del enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 200
 **/
export type NotariosPublicosDatosEnajenanteDatosUnEnajenanteApellidoPaterno = string;

/** Este atributo requerido sirve para precisar la avenida, calle, camino o carretera donde se ubica el inmueble
 * @minLength 1
 * @maxLength 150
 **/
export interface Calle extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 150
			 **/
			value: string;
		},
	];
}
/** Este atributo requerido sirve para precisar la avenida, calle, camino o carretera donde se ubica el inmueble
 * @minLength 1
 * @maxLength 150
 **/
export type NotariosPublicosDescInmueblesDescInmuebleCalle = string;

/** Atributo requerido que sirve para asentar el código postal en donde se da la ubicación del inmueble.
 * @pattern [0-9]{5}
 **/
export interface CodigoPostal extends XastElement {
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
/** Atributo requerido que sirve para asentar el código postal en donde se da la ubicación del inmueble.
 * @pattern [0-9]{5}
 **/
export type NotariosPublicosDescInmueblesDescInmuebleCodigoPostal = string;

/** Este atributo opcional sirve para precisar la colonia en donde se da la ubicación del inmueble cuando se desea ser más específico en casos de ubicaciones urbanas.
 * @minLength 1
 * @maxLength 100
 **/
export interface Colonia extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Este atributo opcional sirve para precisar la colonia en donde se da la ubicación del inmueble cuando se desea ser más específico en casos de ubicaciones urbanas.
 * @minLength 1
 * @maxLength 100
 **/
export type NotariosPublicosDescInmueblesDescInmuebleColonia = string;

/** Atributo requerido que expresa si  es copropiedad o sociedad conyugal**/
export type NotariosPublicosDatosAdquirienteCoproSocConyugalE = 'Si' | 'No';

/** Atributo requerido que expresa si  es copropiedad o sociedad conyugal**/
export type NotariosPublicosDatosEnajenanteCoproSocConyugalE = 'Si' | 'No';

/** Tipo definido para la expresión de una CURP
 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H,X][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
 **/
export interface CURP extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H,X][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
			 **/
			value: string;
		},
	];
}
/** Tipo definido para la expresión de una CURP
 * @pattern [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H,X][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]
 **/
export type TCURP = string;

/** Nodo para capturar los datos del adquiriente, adquirientes o propietario, o propietarios o poseedores, en caso de servidumbres de paso.**/
export interface NotariosPublicosDatosAdquiriente extends XastElement {
	type: 'element';
	name: 'DatosAdquiriente';
	attributes: {
		/** Atributo requerido que expresa si  es copropiedad o sociedad conyugal	**/
		CoproSocConyugalE: NotariosPublicosDatosAdquirienteCoproSocConyugalE;
	};
	children: (NotariosPublicosDatosAdquirienteDatosAdquirientesCopSC | NotariosPublicosDatosAdquirienteDatosUnAdquiriente)[];
}

/** Nodo para capturar los datos de un adquiriente o de un propietario o poseedor en caso de Copropiedad o Sociedad Conyugal**/
export interface NotariosPublicosDatosAdquirienteDatosAdquirientesCopSCDatosAdquirienteCopSC extends XastElement {
	type: 'element';
	name: 'DatosAdquirienteCopSC';
	attributes: {
		/** Atributo opcional para expresar el apellido materno de cada adquirientes o de cada propietario o poseedor en caso de servidumbres de paso.	**/
		ApellidoMaterno?: string;
		/** Atributo opcional para expresar el apellido paterno de cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.	**/
		ApellidoPaterno?: string;
		/** Atributo opcional para expresar la CURP de cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.	**/
		CURP?: string;
		/** Atributo requerido para expresar el nombre, denominación o razón social de cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.	**/
		Nombre: string;
		/** Porcentaje que le corresponde en la copropiedad a cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.	**/
		Porcentaje: string;
		/** Atributo requerido para la Clave del Registro Federal de Contribuyentes sin guiones o espacios, correspondiente a cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.	**/
		RFC: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo para capturar los datos de los adquirientes o propietarios o poseedores del bien dominante en caso de Copropiedad o Sociedad Conyugal**/
export interface NotariosPublicosDatosAdquirienteDatosAdquirientesCopSC extends XastElement {
	type: 'element';
	name: 'DatosAdquirientesCopSC';
	children: NotariosPublicosDatosAdquirienteDatosAdquirientesCopSCDatosAdquirienteCopSC[];
}

/** Nodo para capturar los datos del enajenante o enajenantes, o en el caso de servidumbres de paso del propietario o poseedores o propietarios o poseedores del predio sirviente.**/
export interface NotariosPublicosDatosEnajenante extends XastElement {
	type: 'element';
	name: 'DatosEnajenante';
	attributes: {
		/** Atributo requerido que expresa si  es copropiedad o sociedad conyugal	**/
		CoproSocConyugalE: NotariosPublicosDatosEnajenanteCoproSocConyugalE;
	};
	children: (NotariosPublicosDatosEnajenanteDatosEnajenantesCopSC | NotariosPublicosDatosEnajenanteDatosUnEnajenante)[];
}

/** Nodo para capturar los datos de un enajenante o de los propietarios o poseedores tratándose de servidumbres de paso, en caso de Copropiedad o Sociedad Conyugal**/
export interface NotariosPublicosDatosEnajenanteDatosEnajenantesCopSCDatosEnajenanteCopSC extends XastElement {
	type: 'element';
	name: 'DatosEnajenanteCopSC';
	attributes: {
		/** Atributo opcional para expresar el apellido materno de cada enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		ApellidoMaterno?: string;
		/** Atributo opcional para expresar el apellido paterno de cada enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		ApellidoPaterno?: string;
		/** Atributo opcional para expresar la CURP de cada enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		CURP?: string;
		/** Atributo requerido para expresar el nombre (s) de cada enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		Nombre: string;
		/** Porcentaje que le corresponde en la copropiedad a cada enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		Porcentaje: string;
		/** Atributo requerido para la Clave del Registro Federal de Contribuyentes sin guiones o espacios, correspondiente a cada enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		RFC: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo para capturar los datos de los enajenantes o de los propietarios o poseedores tratándose de servidumbres de paso, en caso de Copropiedad o Sociedad Conyugal**/
export interface NotariosPublicosDatosEnajenanteDatosEnajenantesCopSC extends XastElement {
	type: 'element';
	name: 'DatosEnajenantesCopSC';
	children: NotariosPublicosDatosEnajenanteDatosEnajenantesCopSCDatosEnajenanteCopSC[];
}

export interface NotariosPublicosDatosNotario extends XastElement {
	type: 'element';
	name: 'DatosNotario';
	attributes: {
		/** Atributo opcional que expresa el señalamiento del notario a la plaza a la que se encuentra adscrito	**/
		Adscripcion?: string;
		/** Atributo requerido para expresar la CURP del notario	**/
		CURP: string;
		/** Entidad Federativa donde se ubica la Notaria conforme al catálogo publicado en el portal del SAT en internet.	**/
		EntidadFederativa: TEntidadFederativa;
		/** Atributo requerido para indicar el número de la Notaria que realizar la operación.	**/
		NumNotaria: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo para definir los detalles de la operación.**/
export interface NotariosPublicosDatosOperacion extends XastElement {
	type: 'element';
	name: 'DatosOperacion';
	attributes: {
		/** Atributo requerido  que indica la fecha de firma del instrumento Notarial	**/
		/** A date, unknown format **/
		FechaInstNotarial: string;
		/** Atributo requerido para expresar el IVA de la contraprestación, indemnización o su valor en la operación	**/
		IVA: string;
		/** Atributo requerido para expresar el monto de la contraprestación, indemnización o valor de la operación.	**/
		MontoOperacion: string;
		/** Atributo requerido que indica el número del instrumento Notarial donde consta la operación	**/
		NumInstrumentoNotarial: string;
		/** Atributo requerido para expresar el subtotal de la contraprestación, indemnización o su valor en la operación	**/
		Subtotal: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo para capturar los datos del adquiriente o del propietario o poseedor en caso de ser solo uno.**/
export interface NotariosPublicosDatosAdquirienteDatosUnAdquiriente extends XastElement {
	type: 'element';
	name: 'DatosUnAdquiriente';
	attributes: {
		/** Atributo opcional para expresar el apellido materno del adquiriente o del propietario o poseedor del bien dominante o del pagador de la indemnización o contraprestación en el caso de servidumbres de paso.	**/
		ApellidoMaterno?: string;
		/** Atributo opcional para expresar el apellido paterno del adquiriente o del propietario o poseedor del bien dominante o del pagador de la indemnización o contraprestación en el caso de servidumbres de paso.	**/
		ApellidoPaterno?: string;
		/** Atributo opcional para expresar la CURP del adquiriente o del propietario o poseedor del bien dominante o del pagador de la indemnización o contraprestación en el caso de servidumbres de paso.	**/
		CURP?: string;
		/** Atributo requerido para expresar el nombre, denominación o razón social del adquiriente o del propietario o poseedor del bien dominante o del pagador de la indemnización o contraprestación en el caso de servidumbres de paso.	**/
		Nombre: string;
		/** Atributo requerido para la Clave del Registro Federal de Contribuyentes sin guiones o espacios, del adquiriente o del propietario o poseedor del bien dominante o del pagador de la indemnización o contraprestación en el caso de servidumbres de paso.	**/
		RFC: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo para capturar los datos del enajenante o del propietario o poseedor del predio sirviente en caso de ser solo uno.**/
export interface NotariosPublicosDatosEnajenanteDatosUnEnajenante extends XastElement {
	type: 'element';
	name: 'DatosUnEnajenante';
	attributes: {
		/** Atributo opcional para expresar el apellido materno del enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		ApellidoMaterno?: string;
		/** Atributo requerido  para expresar el apellido paterno del enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		ApellidoPaterno: string;
		/** Atributo requerido para expresar la CURP del enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		CURP: string;
		/** Atributo requerido para expresar el nombre del enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		Nombre: string;
		/** Atributo requerido para la Clave del Registro Federal de Contribuyentes sin guiones o espacios, del enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.	**/
		RFC: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo para describir el inmueble o inmuebles objeto del acto otorgado.**/
export interface NotariosPublicosDescInmueblesDescInmueble extends XastElement {
	type: 'element';
	name: 'DescInmueble';
	attributes: {
		/** Este atributo requerido sirve para precisar la avenida, calle, camino o carretera donde se ubica el inmueble	**/
		Calle: string;
		/** Atributo requerido que sirve para asentar el código postal en donde se da la ubicación del inmueble.	**/
		CodigoPostal: string;
		/** Este atributo opcional sirve para precisar la colonia en donde se da la ubicación del inmueble cuando se desea ser más específico en casos de ubicaciones urbanas.	**/
		Colonia?: string;
		/** Entidad Federativa donde se ubica el inmueble conforme al catálogo publicado en el portal del SAT en internet.	**/
		Estado: TEntidadFederativa;
		/** Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación del inmueble	**/
		Localidad?: string;
		/** Atributo requerido que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación del inmueble	**/
		Municipio: string;
		/** Este atributo opcional sirve para expresar el número particular en donde se da la ubicación del inmueble en una calle dada.	**/
		NoExterior?: string;
		/** Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación precisa del inmueble.	**/
		NoInterior?: string;
		/** Atributo requerido que sirve para precisar el país donde se da la ubicación, conforme al catálogo publicado en el portal del SAT en internet. En caso de servidumbres de paso, siempre será México.	**/
		Pais: string;
		/** Atributo opcional para expresar una referencia adicional de ubicación del inmueble.	**/
		Referencia?: string;
		/** Atributo requerido para la expresión del tipo de inmueble enajenado o sujeto a servidumbre (sirviente) conforme al catálogo publicado en el portal del SAT en internet.	**/
		TipoInmueble: string;
	};
	/** XastElement is self-closing */
	children: [];
}

/** Nodo que contiene las descripciones  del inmueble o inmuebles objeto del acto otorgado.**/
export interface NotariosPublicosDescInmuebles extends XastElement {
	type: 'element';
	name: 'DescInmuebles';
	children: NotariosPublicosDescInmueblesDescInmueble[];
}

/** Entidad Federativa donde se ubica la Notaria conforme al catálogo publicado en el portal del SAT en internet.**/
export type TEntidadFederativa = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32';

/** Atributo requerido  que indica la fecha de firma del instrumento Notarial**/
export interface FechaInstNotarial extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
/** Atributo requerido  que indica la fecha de firma del instrumento Notarial**/
export type Date = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface IVA extends XastElement {
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

/** Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación del inmueble
 * @minLength 1
 * @maxLength 100
 **/
export interface Localidad extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación del inmueble
 * @minLength 1
 * @maxLength 100
 **/
export type NotariosPublicosDescInmueblesDescInmuebleLocalidad = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface MontoOperacion extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo requerido que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación del inmueble
 * @minLength 1
 * @maxLength 100
 **/
export interface Municipio extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo requerido que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación del inmueble
 * @minLength 1
 * @maxLength 100
 **/
export type NotariosPublicosDescInmueblesDescInmuebleMunicipio = string;

/** Este atributo opcional sirve para expresar el número particular en donde se da la ubicación del inmueble en una calle dada.
 * @minLength 1
 * @maxLength 55
 **/
export interface NoExterior extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 55
			 **/
			value: string;
		},
	];
}
/** Este atributo opcional sirve para expresar el número particular en donde se da la ubicación del inmueble en una calle dada.
 * @minLength 1
 * @maxLength 55
 **/
export type NotariosPublicosDescInmueblesDescInmuebleNoExterior = string;

/** Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación precisa del inmueble.
 * @minLength 1
 * @maxLength 30
 **/
export interface NoInterior extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 30
			 **/
			value: string;
		},
	];
}
/** Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación precisa del inmueble.
 * @minLength 1
 * @maxLength 30
 **/
export type NotariosPublicosDescInmueblesDescInmuebleNoInterior = string;

/** Atributo requerido para expresar el nombre, denominación o razón social de cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 254
 **/
export interface Nombre extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 254
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para expresar el nombre, denominación o razón social de cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 254
 **/
export type NotariosPublicosDatosAdquirienteDatosAdquirientesCopSCDatosAdquirienteCopSCNombre = string;

/** Atributo requerido para expresar el nombre, denominación o razón social del adquiriente o del propietario o poseedor del bien dominante o del pagador de la indemnización o contraprestación en el caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 254
 **/
export type NotariosPublicosDatosAdquirienteDatosUnAdquirienteNombre = string;

/** Atributo requerido para expresar el nombre (s) de cada enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 254
 **/
export type NotariosPublicosDatosEnajenanteDatosEnajenantesCopSCDatosEnajenanteCopSCNombre = string;

/** Atributo requerido para expresar el nombre del enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.
 * @minLength 1
 * @maxLength 254
 **/
export type NotariosPublicosDatosEnajenanteDatosUnEnajenanteNombre = string;

/** Complemento al Comprobante Fiscal Digital a través de Internet (CFDI) para el manejo de la enajenación de bienes inmuebles o servidumbres de paso con indemnización o contraprestación en una sola exhibición.**/
export interface NotariosPublicos extends XastElement {
	type: 'element';
	name: 'NotariosPublicos';
	attributes: {
		/** Atributo requerido para la expresión de la versión del complemento	**/
		Version: string;
	};
	children: (NotariosPublicosDatosAdquiriente | NotariosPublicosDatosEnajenante | NotariosPublicosDatosNotario | NotariosPublicosDatosOperacion | NotariosPublicosDescInmuebles)[];
}

/** Atributo requerido que indica el número del instrumento Notarial donde consta la operación
 * @maxInclusive 1
 **/
export interface NumInstrumentoNotarial extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido que indica el número del instrumento Notarial donde consta la operación
 * @maxInclusive 1
 **/
export type NotariosPublicosDatosOperacionNumInstrumentoNotarial = string;

/** Atributo requerido para indicar el número de la Notaria que realizar la operación.
 * @maxInclusive 1
 **/
export interface NumNotaria extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 1
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para indicar el número de la Notaria que realizar la operación.
 * @maxInclusive 1
 **/
export type NotariosPublicosDatosNotarioNumNotaria = string;

/** Atributo requerido que sirve para precisar el país donde se da la ubicación, conforme al catálogo publicado en el portal del SAT en internet. En caso de servidumbres de paso, siempre será México.
 * @pattern [A-Z,Ñ]{3}
 **/
export interface Pais extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z,Ñ]{3}
			 **/
			value: string;
		},
	];
}
/** Atributo requerido que sirve para precisar el país donde se da la ubicación, conforme al catálogo publicado en el portal del SAT en internet. En caso de servidumbres de paso, siempre será México.
 * @pattern [A-Z,Ñ]{3}
 **/
export type NotariosPublicosDescInmueblesDescInmueblePais = string;

/** Porcentaje que le corresponde en la copropiedad a cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.
 * @maxInclusive 0.00
 **/
export interface Porcentaje extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @maxInclusive 0.00
			 **/
			value: string;
		},
	];
}
/** Porcentaje que le corresponde en la copropiedad a cada adquiriente o de cada propietario o poseedor en caso de servidumbres de paso.
 * @maxInclusive 0.00
 **/
export type NotariosPublicosDatosAdquirienteDatosAdquirientesCopSCDatosAdquirienteCopSCPorcentaje = string;

/** Porcentaje que le corresponde en la copropiedad a cada enajenante o del propietario o poseedor del predio sirviente, en caso de servidumbres de paso.
 * @maxInclusive 0.00
 **/
export type NotariosPublicosDatosEnajenanteDatosEnajenantesCopSCDatosEnajenanteCopSCPorcentaje = string;

/** Atributo opcional para expresar una referencia adicional de ubicación del inmueble.
 * @minLength 1
 * @maxLength 100
 **/
export interface Referencia extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @minLength 1
			 * @maxLength 100
			 **/
			value: string;
		},
	];
}
/** Atributo opcional para expresar una referencia adicional de ubicación del inmueble.
 * @minLength 1
 * @maxLength 100
 **/
export type NotariosPublicosDescInmueblesDescInmuebleReferencia = string;

/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?
 * @minLength 12
 * @maxLength 13
 **/
export interface RFC extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?
			 * @minLength 12
			 * @maxLength 13
			 **/
			value: string;
		},
	];
}
/** Tipo definido para expresar claves del Registro Federal de Contribuyentes
 * @pattern [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?
 * @minLength 12
 * @maxLength 13
 **/
export type TRFC = string;

/** Tipo definido para expresar importes numéricos con fracción hasta seis decimales**/
export interface Subtotal extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}

/** Atributo requerido para la expresión del tipo de inmueble enajenado o sujeto a servidumbre (sirviente) conforme al catálogo publicado en el portal del SAT en internet.
 * @pattern [0-9]{2}
 **/
export interface TipoInmueble extends XastElement {
	name: string;
	children: [
		{
			type: 'text';
			/**
			 * @pattern [0-9]{2}
			 **/
			value: string;
		},
	];
}
/** Atributo requerido para la expresión del tipo de inmueble enajenado o sujeto a servidumbre (sirviente) conforme al catálogo publicado en el portal del SAT en internet.
 * @pattern [0-9]{2}
 **/
export type NotariosPublicosDescInmueblesDescInmuebleTipoInmueble = string;

/** Atributo requerido para la expresión de la versión del complemento**/
export interface Version extends XastElement {
	name: 'Version';
	children: [
		{
			type: 'text';
			value: string;
		},
	];
}
