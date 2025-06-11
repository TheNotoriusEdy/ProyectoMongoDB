//5-Inserción Colección Preguntas
db.Preguntas.insertMany([
  {
    _id: "Q001",
    evaluacionID: "E001",
    textoPregunta: "¿Cuál es la principal diferencia entre una base de datos SQL y una NoSQL?",
    tipo: {
      opcionMultiple: "SeleccionarUna",
      opciones: [
        "Las bases de datos SQL son relacionales y las NoSQL no.",
        "Las bases de datos NoSQL siempre son más rápidas que las SQL.",
        "SQL usa JSON y NoSQL usa XML.",
        "No hay diferencias significativas, solo diferentes nombres.",
      ],
      respuestaCorrecta: "Las bases de datos SQL son relacionales y las NoSQL no.",
    },
    puntaje: 5,
  },
  {
    _id: "Q002",
    evaluacionID: "E001",
    textoPregunta: "¿Qué tipo de dato de MongoDB se utiliza para almacenar un identificador único?",
    tipo: {
      opcionMultiple: "SeleccionarUna",
      opciones: ["String", "Number", "ObjectID", "Boolean"],
      respuestaCorrecta: "ObjectID",
    },
    puntaje: 3,
  },
  {
    _id: "Q003",
    evaluacionID: "E001",
    textoPregunta: "Verdadero o Falso: MongoDB es un sistema de gestión de bases de datos relacionales.",
    tipo: {
      verdaderoFalso: false,
    },
    puntaje: 2,
  },
  {
    _id: "Q006",
    evaluacionID: "E005",
    textoPregunta: "¿Qué librería de Python es fundamental para la manipulación y análisis de datos en tablas?",
    tipo: {
      opcionMultiple: "SeleccionarUna",
      opciones: ["NumPy", "Matplotlib", "Pandas", "Scikit-learn"],
      respuestaCorrecta: "Pandas",
    },
    puntaje: 5,
  },
  {
    _id: "Q007",
    evaluacionID: "E005",
    textoPregunta: "¿Cuáles de los siguientes son usos comunes de la librería NumPy en Ciencia de Datos? (Selecciona todas las que apliquen)",
    tipo: {
      opcionMultiple: "SeleccionarVarias",
      opciones: [
        "Cálculos numéricos eficientes con arrays.",
        "Manipulación de series de tiempo.",
        "Generación de números aleatorios.",
        "Creación de interfaces gráficas de usuario.",
      ],
      respuestaCorrecta: ["Cálculos numéricos eficientes con arrays.", "Generación de números aleatorios."],
    },
    puntaje: 5,
  },
  {
    _id: "Q008",
    evaluacionID: "E005",
    textoPregunta: "Describe brevemente la función de un DataFrame en Pandas.",
    tipo: {
      respuestaDescriptiva: "string",
    },
    puntaje: 10,
  },
  {
    _id: "Q011",
    evaluacionID: "E007",
    textoPregunta: "¿Qué significa la 'C' en el acrónimo CIA (Confidencialidad, Integridad, Disponibilidad) en ciberseguridad?",
    tipo: {
      opcionMultiple: "SeleccionarUna",
      opciones: ["Cifrado", "Confidencialidad", "Conectividad", "Control"],
      respuestaCorrecta: "Confidencialidad",
    },
    puntaje: 4,
  },
  {
    _id: "Q012",
    evaluacionID: "E007",
    textoPregunta: "Verdadero o Falso: Un firewall es una medida de seguridad que previene todo tipo de ataques cibernéticos.",
    tipo: {
      verdaderoFalso: false,
    },
    puntaje: 3,
  },
  {
    _id: "Q016",
    evaluacionID: "E010",
    textoPregunta: "¿Cuál de las siguientes es una subdisciplina de la Inteligencia Artificial que permite a los sistemas aprender de los datos sin ser programados explícitamente?",
    tipo: {
      opcionMultiple: "SeleccionarUna",
      opciones: ["Robótica", "Visión por Computadora", "Procesamiento del Lenguaje Natural", "Machine Learning"],
      respuestaCorrecta: "Machine Learning",
    },
    puntaje: 5,
  },
  {
    _id: "Q017",
    evaluacionID: "E010",
    textoPregunta: "Nombra dos aplicaciones prácticas de la Inteligencia Artificial en la vida cotidiana.",
    tipo: {
      respuestaDescriptiva: "string",
    },
    puntaje: 8,
  },
]);