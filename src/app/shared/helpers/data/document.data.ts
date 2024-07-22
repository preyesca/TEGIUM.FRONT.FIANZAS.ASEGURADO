export class DocumentData {
  static hashTable: any = {
    "IDENTIFICACION_APODERADO_LEGAL": {
      images: ["Identificacion_apoderado_legal.png", "Identificacion_oficial2.png", "Identificacion_oficial3.png"],
      listDocumentsAllowed: ["INE", "Pasaporte", "Cartilla militar", "Cédula profesional", "FM2", "FM3"],
      description: "Documento oficial emitido por una autoridad de gobierno que hace prueba plena sobre los datos de identidad que contiene en relación con su titular."
    },
    "IDENTIFICACION_PROPIETARIO_REAL": {
      images: ["Identificacion_oficial2.png", "Identificacion_oficial3.png"],
      listDocumentsAllowed: ["INE", "Pasaporte", "Cartilla militar", "Cédula profesional", "FM2", "FM3"],
      description: "Documento oficial emitido por una autoridad de gobierno que hace prueba plena sobre los datos de identidad que contiene en relación con su titular."
    },
    "CONSTANCIA_SITUACION_FISCAL": {
      images: ["Constancia_situacion_fiscal.png"],
      listDocumentsAllowed: ["Constancia de situación fiscal"],
      description: `Documento por el cual la persona física o moral puede conocer el estatus que tienen ante el SAT, con esta constancia se puede ver información valiosa cómo:
      - Obligaciones fiscales
      - Fecha de alta en hacienda
      - Datos generales del contribuyente
      - Datos de ubicación entre otros`
    },
    "CONSTANCIA_FIRMA_ELECTRONICA": {
      images: ["Firma_electronica(FIEL).png"],
      listDocumentsAllowed: ["FIEL"],
      description: "La e. firma es el conjunto de datos y caracteres que te identifica al realizar trámites y servicios por internet en el SAT, así como en otras dependencias, entidades federativas, municipios e iniciativas privadas, tu e. firma es única, es un archivo seguro y cifrado, que tiene la validez de una firma autógrafa."
    },
    "COMPROBANTE_DOMICILIO_CLIENTE": {
      images: ["Domicilio1.png", "Domicilio2.png"],
      listDocumentsAllowed: ["Boleta de agua","Boleta de luz","Estado de cuenta de teléfono","Estados de cuenta bancarios"],
      description: "Documento que se utiliza para comprobar el lugar de residencia o domicilio de una persona física o moral, es un requisito indispensable para realizar trámites ante empresas de prestación de servicios así como gestiones relacionadas con autoridades administrativas."
    },
    "COMPROBANTE_DOMICILIO_PROPIETARIO_REAL": {
      images: ["Domicilio1.png", "Domicilio2.png"],
      listDocumentsAllowed: ["Boleta de agua","Boleta de luz","Estado de cuenta de teléfono","Estados de cuenta bancarios"],
      description: "Documento que se utiliza para comprobar el lugar de residencia o domicilio de una persona física o moral, es un requisito indispensable para realizar trámites ante empresas de prestación de servicios así como gestiones relacionadas con autoridades administrativas."
    },
    "PODER_NOTARIAL": {
      images: ["Poder_notarial.png"],
      listDocumentsAllowed: ["Poder notarial"],
      description: "Un poder notarial es un documento a través del cual usted autoriza a una persona de su confianza para que en su nombre y representación realice diversos trámites administrativos y legales en el país, tales como: comprar, vender, escriturar o administrar propiedades."
    },
    "ACTA_CONSTITUTIVA": {
      images: ["Acta_constitutiva.png"],
      listDocumentsAllowed: ["Acta constitutiva"],
      description: "Documento obligatorio que da constancia y legalidad a la constitución de una sociedad al momento de crear una empresa, en ella se asienta información sobre quiénes la conforman, los intereses de la sociedad, los estatutos fundamentales de su operación, las aportaciones de sus miembros, entre otros aspectos."
    },
    "CURP": {
      images: ["Identificacion_oficial3.png"],
      listDocumentsAllowed: ["Curp"],
      description: "La Clave Única de Registro de Población, es un instrumento que sirve para registrar en forma individual a todos los habitantes de México, nacionales y extranjeros, así como a las mexicanas y mexicanos que radican en otros países."
    },
    "ESTADO_CUENTA": {
      images: ["Estado-de-cuenta-01.jpg","Estado-de-cuenta-02.jpg"],
      listDocumentsAllowed: ["Estado de cuenta bancario"],
      description: "Documento que cuenta con la información del nombre del titular (persona física) o la razón social (persona moral), número de la tarjeta y número de cuenta CLABE."
    },
    "ACTA_CAMBIO": {
      images: ["ACTA_CAMBIO001.png"],
      listDocumentsAllowed: ["Acta cambio"],
      description: "Es el documento notarial mediante el cual una sociedad modifica el nombre que la identifica y presenta al mercado, dicho cambio debe publicitarse a través de su correspondiente inscripción el Registro Mercantil."
    },
    "ACTA_ASAMBLEA": {
      images: ["Acta_asamblea_01.jpg", "Acta_asamblea_02.jpg"],
      listDocumentsAllowed: ["Acta de asamblea"],
      description: "Es el documento donde se plasman las decisiones que toman los socios sobre la empresa, modifica el funcionamiento o condiciones plasmadas en el Acta Constitutiva acordes a nuevas condiciones de la empresa."
    },
    "ACTA_ACCIONISTAS": {
      images: ["ActaAccionistas.jpg"],
      listDocumentsAllowed: ["Acta de consejo de administración de accionistas"],
      description: "Además de ser un requisito legal para la conformación de toda sociedad mercantil que cotiza en la Bolsa de Valores, estos órganos funcionan como un eslabón entre los dueños de las organizaciones y los equipos directivos de las mismas."
    },
    "CONTRATO_FIDEICOMISO": {
      images: ["Contrato_fideicomiso.png"],
      listDocumentsAllowed: ["Contrato fideicomiso"],
      description: "Documento dónde una persona le entrega la titularidad de activos a otra persona para que los administre."
    },
    "CONTRATO_MODIFICATORIO": {
      images: ["Contrato_modificatorio.png"],
      listDocumentsAllowed: ["Contrato modificatorio"],
      description: "Documento por el cual se formaliza cualquier modificación a un contrato o pedido celebrado con anterioridad de acuerdo con la Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público.."
    },
    "COMPROBANTE_DOMICILIO ": {
      images: ["Domicilio1.png", "Domicilio2.png"],
      listDocumentsAllowed: ["Boleta de agua","Boleta de luz","Estado de cuenta de teléfono","Estados de cuenta bancarios"],
      description: "Documento que se utiliza para comprobar el lugar de residencia o domicilio de una persona física o moral, es un requisito indispensable para realizar trámites ante empresas de prestación de servicios así como gestiones relacionadas con autoridades administrativas."
    },
    "ORGANIGRAMA": {
      images: ["Organigrama.png"],
      listDocumentsAllowed: ["Organigrama"],
      description: "Nombre completo y cargo de director general y jerarquía inmediata inferior, así como el nombre completo y posición correspondiente de los miembros de sus consejo de administración o equivalente."
    },

    //documentacion faltante
    "DECLARACION_ANUAL": {
      images: ["DECLARACION_ANUAL01.png", "DECLARACION_ANUAL02.png", "DECLARACION_ANUAL03.png", "DECLARACION_ANUAL04.png", "DECLARACION_ANUAL05.png"],
      listDocumentsAllowed: ["Declaración Anual con acuse del ejercicio fiscal del año inmediato anterior"],
      description: " Documento presentado por el contribuyente ante el SAT, reportando los movimientos financieros y fiscales ocurridos en el año anterior"
    },

    "ESTADOS_FINANCIEROS_DICTAMINADOS": {
      images: ["ESTADOS_FINANCIEROS_DICTAMINADOS01.png","ESTADOS_FINANCIEROS_DICTAMINADOS02.png","ESTADOS_FINANCIEROS_DICTAMINADOS03.png","ESTADOS_FINANCIEROS_DICTAMINADOS04.png","ESTADOS_FINANCIEROS_DICTAMINADOS05.png"],
      listDocumentsAllowed: ["Estados Financieros dictaminados cierre último ejercicio fiscal"],
      description: "Son dictaminados aquellos estados financieros certificados que se acompañen de la opinión profesional del revisor fiscal"
    },

    "ESTADOS_FINANCIEROS_INTERNOS": {
      images: ["ESTADOS_FINANCIEROS_INTERNOS01.png","ESTADOS_FINANCIEROS_INTERNOS02.png", "ESTADOS_FINANCIEROS_INTERNOS03.png", "ESTADOS_FINANCIEROS_INTERNOS04.png"],
      listDocumentsAllowed: ["Estados financieros internos parciales con antigüedad no mayor de 3 meses"],
      description: "Documentos en los que se plasma la situación financiera de un negocio y recoge información, tanto económica como patrimonial, de las empresas"
    },

    "ACTA_PROTOCOLIZACIONES": {
      images: ["ACTA_PROTOCOLIZACIONES01.png","ACTA_PROTOCOLIZACIONES02.png","ACTA_PROTOCOLIZACIONES03.png","ACTA_PROTOCOLIZACIONES04.png","ACTA_PROTOCOLIZACIONES05.png"],
      listDocumentsAllowed: ["Actas de protocolizaciones"],
      description: "Acto por el cual un notario o corredor incorpora los documentos y actas que autoriza a un \"protocolo notarial\""
    },

    "CONTRATO_MULTIPLE": {
      images: ["CONTRATO_MULTIPLE01.png", "CONTRATO_MULTIPLE02.png","CONTRATO_MULTIPLE03.png","CONTRATO_MULTIPLE04.png"],
      listDocumentsAllowed: ["Contrato múltiple"],
      description: "La concatenación de contratos no es más que el encadenamiento de contratos temporales para un mismo trabajador"
    },

    "CUESTIONARIO_DE_IDENTIFICACION": {
      images: ["CUESTIONARIO_AUTORIZACION_INVESTIGACION_BURO1.png","CUESTIONARIO_AUTORIZACION_INVESTIGACION_BURO2.png"],
      listDocumentsAllowed: ["Cuestionario de identificación y autorización de investigación en buró de crédito"],
      description: "Certifica que brindas consentimiento para que revisen tu historial crediticio"
    },

    "CARTA_DE_CREDITO": {
      images: ["CARTA_DE_CREDITO01.png", "CARTA_DE_CREDITO02.png", "CARTA_DE_CREDITO03.png", "CARTA_DE_CREDITO04.png", "CARTA_DE_CREDITO05.png"],
      listDocumentsAllowed: ["Carta de crédito"],
      description: "Es una orden condicionada de pago que recibe un banco de pagar a un beneficiario"
    },

    "CONTRATO_DE_PRENDA": {
      images: ["CONTRATO_DE_PRENDA01.png","CONTRATO_DE_PRENDA02.png","CONTRATO_DE_PRENDA03.png"],
      listDocumentsAllowed: ["Contrato de prenda (depósito en efectivo)"],
      description: "La función del contrato de prenda es garantizar el cumplimiento de una obligación, es decir, un acreedor podrá mantener en su poder un bien hasta que el deudor pague el dinero que le debe."
    },

    "CONTRATO_INDEMNIDAD": {
      images: ["CONTRATO_INDEMNIDAD01.png","CONTRATO_INDEMNIDAD02.png", "CONTRATO_INDEMNIDAD03.png","CONTRATO_INDEMNIDAD04.png"],
      listDocumentsAllowed: ["Contrato de Indemnidad (Indemnity Agreement)"],
      description: "Refieren al reembolso de los gastos y la reparación del daño causado por el evento que gatilla la aplicación de la cláusula."
    },

    "CURRICULUM_PRESENTACION_EJECUTIVA": {
      images: ["CURRICULUM01.png","CURRICULUM02.png","CURRICULUM03.png","CURRICULUM04.png","CURRICULUM05.png"],
      listDocumentsAllowed: ["Curriculum o presentación ejecutiva"],
      description: "Un Curriculum o presentación ejecutiva es un documento en el que se informa dan detalles de una empresa y los productos y servicios que ofrece"
    },

    "IDENTIFICACION_OFICIAL_FOTO_FIRMA": {
      images: ["Identificacion_oficial2.png", "Identificacion_oficial3.png"],
      listDocumentsAllowed: ["Identificación oficial con foto y firma."],
      description: "Documento oficial emitido por una autoridad de gobierno que hace prueba plena sobre los datos de identidad que contiene en relación con su titular."
    },

    "DECLARACION_ANUAL_DEL_ANIO": {
      images: ["DECLARACION_ANUAL_DEL_ANIO.png"],
      listDocumentsAllowed: ["Declaración anual del año inmediato anterior."],
      description: "Reporte de impuestos que los contribuyentes presentan a las autoridades fiscales al finalizar el año fiscal anterior."
    },

    "CONTRATO_SOLICITUD_MULTIPLE_FIANZAS": {
      images: ["CONTRATO_MULTIPLE01.png", "CONTRATO_MULTIPLE02.png","CONTRATO_MULTIPLE03.png","CONTRATO_MULTIPLE04.png"],
      listDocumentsAllowed: ["Contrato solicitud múltiple de fianzas"],
      description: "Acuerdo entre una parte y una compañía de seguros de fianzas."
    },

    "ESCRITURA_DE_UN_BIEN_INMUEBLE": {
      images: ["ESCRITURA_DE_UN_BIEN_INMUEBLE01.png","ESCRITURA_DE_UN_BIEN_INMUEBLE02.png","ESCRITURA_DE_UN_BIEN_INMUEBLE03.png","ESCRITURA_DE_UN_BIEN_INMUEBLE04.png","ESCRITURA_DE_UN_BIEN_INMUEBLE05.png"],
      listDocumentsAllowed: ["Escrituras de un bien inmueble"],
      description: "Documento físico y legal que muestra la transferencia de la propiedad de un vendedor al comprador fina"
    },

    "IDENTIFICACION_OFICIAL_FOTO_FIRMA_PROPIETARIO": {
      images: ["Identificacion_oficial2.png", "Identificacion_oficial3.png"],
      listDocumentsAllowed: ["Identificación oficial con foto y firma del propietario (s)"],
      description: "Documento oficial emitido por una autoridad de gobierno que hace prueba plena sobre los datos de identidad que contiene en relación con su titular."
    },

    "CONTANCIA_OBLIGADO_SOLIDARIO": {
      images: ["CONTANCIA_OBLIGADO_SOLIDARIO.png"],
      listDocumentsAllowed: ["Constancia del obligado solidario"],
      description: "Es la persona física o moral que tiene participación en un crédito como responsable de cumplir con las obligaciones del acreditado"
    },

    "CURP_OBLIGADO_SOLIDARIO": {
      images: ["Identificacion_oficial3.png"],
      listDocumentsAllowed: ["CURP del obligado solidario"],
      description: "La Clave Única de Registro de Población de la persona que tiene participacion en el credito"
    },

    "COMPROBANTE_ULTIMO_PAGO_PREDIAL_OBLIGADO_SOLIDARIO": {
      images: ["COMPROBANTE_ULTIMO_PAGO_PREDIAL_OBLIGADO_SOLIDARIO.png"],
      listDocumentsAllowed: ["Comprobante del último pago predial del obligado solidario"],
      description: "Comprobante de pago de la persona que tiene participacion en el credito"
    },

    "CARTA_RELACION_PATRIMONIAL": {
      images: ["CARTA_RELACION_PATRIMONIAL.png"],
      listDocumentsAllowed: ["Carta de relación patrimonial/valor del bien inmueble"],
      description: "La Declaración Patrimonial es la manifestación del patrimonio de la persona fisica que tiene participacion en el credito"
    },

    "ACTA_MATRIMONIO": {
      images: ["Acta_matrimonio.png"],
      listDocumentsAllowed: ["Acta de matrimonio"],
      description: "Certificado que acredita que dos individuos han establecido una relacion matrimonial entre ambos."
    },

    "CUESTIONARIO_AUTORIZACION_INVESTIGACION_BURO": {
      images: ["CUESTIONARIO_AUTORIZACION_INVESTIGACION_BURO1.png","CUESTIONARIO_AUTORIZACION_INVESTIGACION_BURO2.png"],
      listDocumentsAllowed: ["Cuestionario y autorización de investigación en buró de crédito olbigado solidario"],
      description: "La autorización de consulta de Buró certifica que brindas consentimiento para que revisen tu historial crediticio"
    },

    "CONTRATO_SOLICITUD_MULTIPLE_DE_FIANZAS_OBLIGADO_SOLIDARIO": {
      images: ["CONTRATO_SOLICITUD_MULTIPLE_DE_FIANZAS_OBLIGADO_SOLIDARIO.jpg"],
      listDocumentsAllowed: ["Contrato Solicitud Múltiple de Fianzas obligado solidario"],
      description: "Comprobante de pago de la persona que tiene participacion en el credito"
    },

    "OTROS": {
      images: ["OTROS.png"],
      listDocumentsAllowed: ["Otros"],
      description: "Otros"
    },

    "INVESTIGACION_DE_LIBERTAD": {
      images: ["INVESTIGACION_DE_LIBERTAD.png"],
      listDocumentsAllowed: ["Investigación de libertad"],
      description: "Este documento se refiere a la libertad de investigar en un sentido amplio y sin trabas actividades determinadas."
    },

    "COMPROBANTE_DE_INGRESOS": {
      images: ["COMPROBANTE_DE_INGRESOS.png"],
      listDocumentsAllowed: ["Comprobante de ingresos."],
      description: "Es un documento que acredita que cuentas con ingresos mensuales, quincenales, o incluso temporales, el cual es emitido por un tercero"
    },
  };
}
