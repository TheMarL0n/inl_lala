export const menuI_tems = [
    {
        name: "Inicio",
        url: "/",
    },
    {
        name: "Resuelve tus dudas",
        url: "/paginas/dudas",
    },
    {
        name: "Come mejor. Vive mejor.",
        url: "/paginas/nutricion",
    },
    {
        name: "Etapas de vida",
        url: "/paginas/etapas",
    },
    {
        name: "Mitos y realidades",
        url: "/paginas/mitos-y-realidades",
    },
    {
        name: "Para profesionales",
        url: "/paginas/profesionales",
    },
    {
        name: "Sobre el Instituto",
        url: "/paginas/somos",
    },
    {
        name: "Sala de prensa",
        url: "/paginas/sala_prensa"
    },
]

export const paginas = [
    {
        slug: "dudas",
        titulo: "Resuelve tus",
        subtitulo: "Dudas",
        titulo_descripcion: "Empieza por lo esencial.",
        descripcion: "Encuentra respuestas claras para comprender mejor la alimentación, la nutrición y el papel de la leche y los productos lácteos en tu salud.",
        detalles: "",
        imagen_principal: "/images/dudas/dudas_bkg.png",

        imagen_footer: "/images/dudas/duda_footer_image.png"
    },
    {
        slug: "nutricion",
        titulo: "come mejor.",
        subtitulo: "vive mejor.",
        titulo_descripcion: "",
        descripcion: "Descubre cómo la alimentación y el papel de la leche y los lácteos pueden formar parte de una vida saludable.",
        detalles: "",
        imagen_principal: "/images/nutricion/nutricion_bkg.png",
    },
    {
        slug: "etapas",
        titulo: "etapas de la",
        subtitulo: "vida",
        titulo_descripcion: "",
        descripcion: "Explora contenidos sobre nutrición y leche y lácteos adaptados a cada etapa de la vida.",
        detalles: "",
        imagen_principal: "/images/etapas/etapas_bkg.png",
    },
    {
        slug: "profesionales",
        titulo: "para",
        subtitulo: "profesionales",
        titulo_descripcion: "",
        descripcion: "Lo último de la ciencia de la leche y lácteos,  validado por autoridades científicas, lo encontrarás en esta sección.",
        detalles: "",
        imagen_principal: "/images/profesionales/profesionales_bkg.png",

        imagen_tema_destacado: "/images/profesionales/destacado_bkg.png",
        imagen_footer: "/images/profesionales/footer_bkg.png",
        titulo_tema_destacado: "Lo más reciente en ",
        subtitulo_tema_destacado: "nutrición",
        descripcion_tema_destacado: "Mantente al día con los contenidos más recientes sobre la ciencia de los lácteos.",
        enlace_tema_destacado: "#",
    },
    {
        slug: "sala_prensa",
        titulo: "Sala de ",
        subtitulo: "Prensa",
        titulo_descripcion: "",
        descripcion: "Encuentra comunicados, materiales institucionales, recursos visuales e información oficial del Instituto de Nutrición Lala.",
        detalles: "",
        imagen_principal: "/images/sala_prensa/sala_prensa_bkg.png",

        imagen_footer: "/images/sala_prensa/footer_bkg.png",
    },
    {
        slug: "mitos_realidades",
        titulo: "más ciencia ",
        subtitulo: "menos mitos",
        titulo_descripcion: "",
        descripcion: "Los lácteos forman parte de la alimentación de millones de personas en todo el mundo. Pero alrededor de su consumo también existen muchas dudas, creencias y mitos.",
        detalles: "¿Es cierto que la leche provoca inflamación? ¿Los lácteos enteros siempre aumentan el colesterol? Si tengo intolerancia a la lactosa, ¿debo dejar de consumir lácteos? Aquí revisamos algunas de las dudas y mitos más comunes sobre los lácteos a partir de lo que dice la evidencia científica.",
        imagen_principal: "/images/mitos/mitos_bkg.png",
    }
]

export const categorias_dudas = [
    {
        id: 1,
        titulo: "Alimentación saludable",
        subtitulo: "Entiende las bases de una alimentación equilibrada para el día a día.",
        imagen_principal: "/images/dudas/dudas_categoria_1.png"
    },
    {
        id: 2,
        titulo: "Nutrientes que tu cuerpo necesita",
        subtitulo: "Identifica qué hace cada nutriente y por qué es importante para tu organismo.",
        imagen_principal: "/images/dudas/dudas_categoria_2.png"
    },
    {
        id: 3,
        titulo: "Leche y productos lácteos",
        subtitulo: "Comprende el papel de la leche y los lácteos dentro de una alimentación equilibrada.",
        imagen_principal: "/images/dudas/dudas_categoria_3.png"
    },
    {
        id: 4,
        titulo: "Lo que dice la ciencia",
        subtitulo: "",
        imagen_principal: "/images/dudas/dudas_categoria_4.png"
    },
]

export const dudas = [
    {
        categoria_id: 1,
        pregunta: "Cómo construir una alimentación equilibrada",
        respuesta: "Conoce los principios básicos para construir una alimentación equilibrada en tu día a día."
    },
    {
        categoria_id: 1,
        pregunta: "Grupos de alimentos",
        respuesta: "Descubre cómo se clasifican los alimentos y la función que cumplen en una dieta balanceada."
    },
    {
        categoria_id: 1,
        pregunta: "Hábitos saludables",
        respuesta: "Conoce los hábitos que pueden ayudarte a cuidar tu alimentación y bienestar todos los días."
    },
    {
        categoria_id: 1,
        pregunta: "El papel de los lácteos en una alimentación equilibrada",
        respuesta: "Entiende cómo la leche y los productos lácteos pueden formar parte de una alimentación equilibrada."
    }
]

export const categorias_nutricion = [
    {
        id: 1,
        titulo: "Controlar mi peso",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png"
    },
    {
        id: 2,
        titulo: "Cuidar mi salud metabólica",
        imagen_principal: "/images/nutricion/nutricion_categoria_2.png"
    },
    {
        id: 3,
        titulo: "Mejorar mi salud digestiva",
        imagen_principal: "/images/nutricion/nutricion_categoria_3.png"
    },
    {
        id: 4,
        titulo: "Ganar fuerza y masa muscular",
        imagen_principal: "/images/nutricion/nutricion_categoria_4.png"
    },
    {
        id: 5,
        titulo: "Cuidar mi corazón",
        imagen_principal: "/images/nutricion/nutricion_categoria_5.png"
    },
]

export const nutricion = [
    {
        categoria_id: 1,
        tema: "Alimentación para un peso saludable",
        contenido: "Descubre cómo construir hábitos de alimentación sostenibles."
    },
    {
        categoria_id: 1,
        tema: "Entendiendo el balance energético",
        contenido: "Descubre cómo influye en el mantenimiento de un peso saludable."
    },
    {
        categoria_id: 1,
        tema: "Lácteos y composición corporal",
        contenido: "Conoce qué dice la ciencia sobre su relación con la masa muscular y la grasa corporal."
    }
]

export const categorias_etapas = [
    {
        id: 1,
        titulo: "Embarazo y lactancia",
        imagen_principal: "/images/etapas/etapa_1.png"
    },
    {
        id: 2,
        titulo: "0-5 años",
        imagen_principal: "/images/etapas/etapa_1.png"
    },
    {
        id: 3,
        titulo: "6-12 años",
        imagen_principal: "/images/etapas/etapa_1.png"
    },
    {
        id: 4,
        titulo: "Adolescencia",
        imagen_principal: "/images/etapas/etapa_1.png"
    },
    {
        id: 5,
        titulo: "Adultez",
        imagen_principal: "/images/etapas/etapa_1.png"
    },
    {
        id: 5,
        titulo: "Adultos mayores",
        imagen_principal: "/images/etapas/etapa_1.png"
    },
]

export const etapas = [
    {
        categoria_id: 2,
        tema: "Nutrición desde los primeros años",
        contenido: "Conoce las bases de la alimentación durante los primeros años de vida."
    },
    {
        categoria_id: 2,
        tema: "Preguntas frecuentes sobre primera infancia",
        contenido: "Encuentra respuestas claras a las dudas más comunes sobre alimentación, nutrición y cuidados durante esta etapa."
    }
]

export const herramientas_materiales = [
    {
        id: 1,
        titulo: "Infografías",
        imagen_principal: "/images/profesionales/infografia.png"
    },
    {
        id: 2,
        titulo: "Materiales educativos",
        imagen_principal: "/images/profesionales/materiales.png"
    },
    {
        id: 3,
        titulo: "Guías para pacientes",
        imagen_principal: "/images/profesionales/guias.png"
    },
    {
        id: 4,
        titulo: "Recursos de consulta",
        imagen_principal: "/images/profesionales/recursos.png"
    }
]

export const colaboradores = [
    {
        nombre: "",
        logo: ""
    },
    {
        nombre: "",
        logo: ""
    },
    {
        nombre: "",
        logo: ""
    },
    {
        nombre: "",
        logo: ""
    },
    {
        nombre: "",
        logo: ""
    },
    {
        nombre: "",
        logo: ""
    },
    {
        nombre: "",
        logo: ""
    },
    {
        nombre: "",
        logo: ""
    },
    {
        nombre: "",
        logo: ""
    },
    {
        nombre: "",
        logo: ""
    },
]

export const noticias = [
    {
        id: "1",
        tipo: "nota",
        destacada: true,
        titulo: "Cómo construir una alimentación equilibrada",
        descripcion: "Conoce los principios básicos para construir una alimentación equilibrada en tu día a día.",
        fecha: "21/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "2",
        tipo: "nota",
        destacada: true,
        titulo: "Grupos de alimentos",
        descripcion: "Descubre cómo se clasifican los alimentos y la función que cumplen en una alimentación saludable.",
        fecha: "22/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "3",
        tipo: "nota",
        destacada: true,
        titulo: "Hábitos saludables",
        descripcion: "Conoce los hábitos que pueden ayudarte a cuidar tu alimentación y bienestar todos los días.",
        fecha: "23/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "4",
        tipo: "nota",
        destacada: true,
        titulo: "El papel de los lácteos en una alimentación equilibrada",
        descripcion: "Entiende cómo la leche y los lácteos pueden formar parte de una alimentación equilibrada.",
        fecha: "24/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "1",
        tipo: "nota",
        destacada: true,
        titulo: "Cómo construir una alimentación equilibrada",
        descripcion: "Conoce los principios básicos para construir una alimentación equilibrada en tu día a día.",
        fecha: "21/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "2",
        tipo: "nota",
        destacada: true,
        titulo: "Grupos de alimentos",
        descripcion: "Descubre cómo se clasifican los alimentos y la función que cumplen en una alimentación saludable.",
        fecha: "22/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "3",
        tipo: "nota",
        destacada: true,
        titulo: "Hábitos saludables",
        descripcion: "Conoce los hábitos que pueden ayudarte a cuidar tu alimentación y bienestar todos los días.",
        fecha: "23/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "4",
        tipo: "nota",
        destacada: true,
        titulo: "El papel de los lácteos en una alimentación equilibrada",
        descripcion: "Entiende cómo la leche y los lácteos pueden formar parte de una alimentación equilibrada.",
        fecha: "24/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "5",
        tipo: "recurso",
        destacada: true,
        titulo: "Grupos de alimentos",
        descripcion: "Descubre cómo se clasifican los alimentos y la función que cumplen en una alimentación saludable.",
        fecha: "22/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "6",
        tipo: "recurso",
        destacada: true,
        titulo: "Hábitos saludables",
        descripcion: "Conoce los hábitos que pueden ayudarte a cuidar tu alimentación y bienestar todos los días.",
        fecha: "23/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "7",
        tipo: "recurso",
        destacada: true,
        titulo: "El papel de los lácteos en una alimentación equilibrada",
        descripcion: "Entiende cómo la leche y los lácteos pueden formar parte de una alimentación equilibrada.",
        fecha: "24/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "8",
        tipo: "recurso",
        destacada: true,
        titulo: "El papel de los lácteos en una alimentación equilibrada",
        descripcion: "Entiende cómo la leche y los lácteos pueden formar parte de una alimentación equilibrada.",
        fecha: "24/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "9",
        tipo: "evento",
        destacada: true,
        titulo: "Grupos de alimentos",
        descripcion: "Descubre cómo se clasifican los alimentos y la función que cumplen en una alimentación saludable.",
        fecha: "22/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "10",
        tipo: "conferencia",
        destacada: true,
        titulo: "Hábitos saludables",
        descripcion: "Conoce los hábitos que pueden ayudarte a cuidar tu alimentación y bienestar todos los días.",
        fecha: "23/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "11",
        tipo: "evento",
        destacada: true,
        titulo: "El papel de los lácteos en una alimentación equilibrada",
        descripcion: "Entiende cómo la leche y los lácteos pueden formar parte de una alimentación equilibrada.",
        fecha: "24/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "12",
        tipo: "conferencia",
        destacada: true,
        titulo: "Hábitos saludables",
        descripcion: "Conoce los hábitos que pueden ayudarte a cuidar tu alimentación y bienestar todos los días.",
        fecha: "23/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    },
    {
        id: "13",
        tipo: "evento",
        destacada: true,
        titulo: "El papel de los lácteos en una alimentación equilibrada",
        descripcion: "Entiende cómo la leche y los lácteos pueden formar parte de una alimentación equilibrada.",
        fecha: "24/07/2026",
        imagen_principal: "/images/sala_prensa/noticia_foto.png",
    }
]

export const mitos = [
    {
        id: 1,
        titulo: "¿La leche aumenta el riesgo de cáncer?",
        realidad: "No existe evidencia científica que demuestre que el consumo de lácteos aumente el riesgo de cáncer. Por el contrario, estudios científicos muy grandes han encontrado una asociación entre el consumo de lácteos y un menor riesgo de desarrollar cáncer colorrectal.",
        imagen_principal: "/images/mitos/mito_1.png",
        slug: "leche-aumenta-riesgo-cancer"
    },
    {
        id: 2,
        titulo: "¿Los lácteos provocan inflamación?",
        realidad: "En personas sanas, el consumo de lácteos no aumenta los marcadores de inflamación. Además, alimentos fermentados como el yogurt y el kéfir pueden formar parte de una alimentación que favorezca la salud digestiva.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "lacteos-provocan-inflamacion"
    },
    {
        id: 3,
        titulo: "¿La leche entera provoca aumento de peso?",
        realidad: "La evidencia actual muestra que el consumo de lácteos, incluso enteros, no se asocia con un mayor peso corporal. La leche entera, yogurt y quesos pueden ser parte de un patrón de dieta y estilo de vida saludable para cuidar y mantener el peso.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "leche-entera-aumento-peso"
    },
    {
        id: 4,
        titulo: "¿Si tengo intolerancia a la lactosa, ya no puedo consumir lácteos?",
        realidad: `No necesariamente. Muchas personas con intolerancia a la lactosa pueden consumir pequeñas cantidades de lactosa sin presentar molestias.
        <br/>
        <br/>
        También existen alternativas como:
        <br/>
        
            <ul class="list-disc ml-8">
                <li>leche deslactosada;</li>
                <li>yogurt;</li>
                <li>quesos maduros, que contienen naturalmente menos lactosa.</li>
            </ul>
       
        `,
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "intolerancia-a-lactosa"
    },
    {
        id: 5,
        titulo: "¿Los lácteos causan acné?",
        realidad: "Hasta el momento no existe evidencia sólida que demuestre que los lácteos sean una causa directa del acné. Su aparición depende de múltiples factores y continúa siendo un tema de investigación.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "lacteos-causan-acne"
    },
    {
        id: 6,
        titulo: "¿Es fácil cubrir las necesidades de calcio sin consumir lácteos?",
        realidad: "Existen otros alimentos que contienen calcio, como algunos vegetales, leguminosas y tortillas de maíz. Sin embargo, el calcio presente en los lácteos se absorbe con mayor facilidad, por lo que pueden ser una fuente importante de este nutriente dentro de una alimentación equilibrada.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "calcio-sin-consumir-lacteos"
    },
    {
        id: 7,
        titulo: "¿Los lácteos aumentan el riesgo de enfermedades del corazón?",
        realidad: "La evidencia científica actual no muestra una relación directa entre el consumo de lácteos y un mayor riesgo de enfermedad cardiovascular (ECV). Por el contrario, el consumo de lácteos, se ha asociado con menor riesgo de ECV. Lo más importante es mantener una alimentación equilibrada y un estilo de vida saludable.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "lacteos-aumentan-riesgo-corazon"
    },
    {
        id: 8,
        titulo: "¿Si soy adulto, ya no necesito consumir leche?",
        realidad: "Los lácteos pueden seguir formando parte de una alimentación saludable durante la vida adulta. Aportan proteínas de alta calidad, calcio y otros nutrientes que contribuyen al mantenimiento de la masa muscular y la salud ósea.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "adulto-no-consumir-leche"
    },
    {
        id: 9,
        titulo: "¿Todo malestar después de tomar leche se debe a la lactosa?",
        realidad: "No siempre. Algunas molestias digestivas pueden tener otras causas, como alergia a la proteína de la leche de vaca u otras condiciones digestivas. Por ello, es importante identificar el origen de los síntomas antes de eliminar los lácteos de la alimentación.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: ""
    },
    {
        id: 10,
        titulo: "¿La alergia a la leche y la intolerancia a la lactosa son lo mismo?",
        realidad: "No. La intolerancia a la lactosa es un problema relacionado con la digestión de este azúcar natural de la leche, mientras que la alergia a la proteína de la leche es una respuesta del sistema inmunológico y requiere un manejo diferente.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "alergia-intolerancia-lo-mismo"
    },
    {
        id: 11,
        titulo: "¿El azúcar que aparece en la etiqueta de la leche es azúcar añadida?",
        realidad: "No. En la leche natural, el azúcar que aparece en la etiqueta corresponde a la lactosa, que es el azúcar presente de forma natural en este alimento.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "azucar-en-leche-es-anadida"
    },
    {
        id: 12,
        titulo: "¿Durante la lactancia materna es necesario consumir únicamente leche deslactosada?",
        realidad: "No existe una recomendación general para que las mujeres que amamantan eliminen la lactosa de su alimentación. Cualquier cambio debe realizarse únicamente bajo la orientación de un profesional de la salud y de acuerdo con cada caso particular.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "lactancia-materna-consumir-deslactosada"
    },
    {
        id: 13,
        titulo: "¿La leche aumenta el azúcar en sangre porque contiene lactosa?",
        realidad: "La lactosa es un carbohidrato natural de la leche. Sin embargo, gracias a su contenido de proteínas y grasas, la leche tiene un índice glucémico relativamente bajo y puede formar parte de una alimentación equilibrada,  también para las personas que cuidan los niveles de glucosa en sangre.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "leche-aumenta-azucar-en-sangre"
    },
    {
        id: 14,
        titulo: "¿Los lácteos provocan diabetes tipo 2?",
        realidad: "No. La evidencia científica actual no muestra una relación entre el consumo de leche o lácteos y un mayor riesgo de diabetes tipo 2. Incluso el yogurt y otros lácteos fermentados se ha asociado con un menor riesgo de desarrollar esta enfermedad.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "lacteos-provocan-diabetes"
    },
    {
        id: 15,
        titulo: "¿La leche aumenta la producción de moco durante un resfriado?",
        realidad: "No existe evidencia científica que demuestre que la leche aumente la producción de moco. Algunas personas pueden percibir una sensación temporal de mayor espesor en la boca, pero esto no significa que produce más mucosidad.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "leche-aumenta-moco"
    },
    {
        id: 16,
        titulo: "¿La leche no debe consumirse después del ejercicio?",
        realidad: "Por el contrario, la leche puede ser una buena opción para la recuperación después del ejercicio gracias a su contenido de agua, proteínas, carbohidratos y electrolitos.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "leche-no-consumir-despues-ejercicio"
    },
    {
        id: 17,
        titulo: "¿Los lácteos enteros siempre son malos porque contienen grasa saturada?",
        realidad: "La evidencia científica más reciente indica que el consumo moderado de lácteos enteros puede formar parte de una alimentación saludable para la mayoría de las personas  Lo más importante es considerar el patrón general de alimentación.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "lactos-enteros-malos"
    },
    {
        id: 18,
        titulo: "¿Los lácteos favorecen el desarrollo de la masa muscular?",
        realidad: "Sí. Los lácteos aportan proteínas de alta calidad, calcio y otros nutrientes que contribuyen al mantenimiento y desarrollo de la masa muscular, especialmente cuando se combinan con actividad física regular.",
        imagen_principal: "/images/nutricion/nutricion_categoria_1.png",
        slug: "lacteos-favorecen-masa-muscular"
    }

]

export const mitos_referencias = [
    { title: "Cámara Nacional de Industriales de la Leche (CANILEC). (2011). El Libro Blanco de la Leche y los Productos Lácteos (1a ed.). México." },
    { title: "Cancer Research UK. (2025). Milk, dairy and cancer risk. Recuperado de https://www.cancerresearchuk.org/about-cancer/causes-of-cancer/diet-and-cancer/dairy-and-cancer-risk." },
    { title: "Dai, R., et al. (2018). The effect of milk consumption on acne: a meta-analysis of observational studies. Journal of the European Academy of Dermatology and Venereology, 32, 2244–2253. de Oliveira Otto, M. C., Mozaffarian, D., Kromhout, D., Bertoni, A. G., Sibley, C. T., Jacobs Jr, D. R., & Nettleton, J. A. (2012). Dietary intake of saturated fat by food source and incident cardiovascular disease: the Multi-Ethnic Study of Atherosclerosis. The American Journal of Clinical Nutrition, 96(2), 397–404." },
    { title: "Mattar, R., de Campos Mazo, D. F., & Carrilho, F. J. (2012). Lactose intolerance: diagnosis, genetic, and clinical factors. Clinical and Experimental Gastroenterology, 5, 113-121." },
    { title: "Miller, G. D., et al. (2021). Food systems transformation for child health and well-being: The essential role of dairy. International Journal of Environmental Research and Public Health, 18(19), 1–14." },
    { title: "Misselwitz, B., et al. (2019). Update on lactose malabsorption and intolerance: pathogenesis, diagnosis and clinical management. Gut, 68(11), 2080–2091." },
    { title: "Montalto, M., et al. (2006). Management and treatment of lactose malabsorption. World Journal of Gastroenterology, 12(2), 187-191." },
    { title: "Rosado, J. L. (2016). Intolerancia a la lactosa. Gaceta Médica de México, 152(Suppl 1), 67-73." },
    { title: "Secretaría de Salud. (2011). Manejo de la alergia a la proteína de la leche de vaca. México." },
    { title: "Timon, C. M., O’Connor, A., Bhargava, N., Gibney, E. R., & Feeney, E. L. (2020). Dairy Consumption and Metabolic Health. Nutrients, 12(10), 3040." },
    { title: "Ulven, S. M., et al. (2019). Milk and dairy product consumption and inflammatory biomarkers: An updated systematic review of randomized clinical trials. Advances in Nutrition, 10(suppl. 2), S239-S250." },
    { title: "Volkert, D. (2011). The role of nutrition in the prevention of sarcopenia. Wiener Medizinische Wochenschrift, 161(15-16), 409–415." },
    { title: "Weaver, C. M., & Heaney, R. P. (Eds.). (2006). Calcium in Human Health. Humana Press." },
]