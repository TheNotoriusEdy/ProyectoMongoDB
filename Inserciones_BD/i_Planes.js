db.PlanesSuscripcion.insertMany([
  {
    _id: "PLAN001",
    nombre: "Acceso Básico Mensual",
    descripcion: "Sumérgete en los fundamentos con acceso a nuestro catálogo de cursos esenciales. Perfecto para principiantes.",
    precio: 19.99, // Un precio atractivo para la entrada.
    beneficios: [
      "Acceso ilimitado a más de 50 cursos (categorías: Introducción, Fundamentos)",
      "Certificados de finalización descargables",
      "Soporte básico por correo electrónico",
      "Participación en foros de la comunidad",
    ],
    // Aquí incluiría los _ids de cursos que son considerados "básicos" o "introductorios"
    cursosIncluidos: [
      "C001", // Introducción a MongoDB
      "C002", // JavaScript Moderno
      "C003", // Diseño Gráfico Photoshop
      "C005", // Python para Ciencia de Datos
      "C007", // Ciberseguridad Principiantes
      "C008", // Blockchain Introducción
      "C010", // Introducción a IA
    ],
  },
  {
    _id: "PLAN002",
    nombre: "Acceso Premium Anual",
    descripcion: "La experiencia completa. Acceso ilimitado a todo nuestro catálogo de cursos, contenido avanzado y soporte prioritario.",
    precio: 199.99, // Un descuento significativo por pago anual (aprox. $16.67/mes)
    beneficios: [
      "Acceso ilimitado a TODO el catálogo de cursos (más de 200)",
      "Certificados de finalización premium con verificación",
      "Soporte prioritario 24/7 por chat y correo",
      "Tutorías grupales mensuales con instructores expertos",
      "Acceso anticipado a nuevos cursos y características (Beta)",
      "Descargas de recursos exclusivos y plantillas de proyecto",
    ],
    cursosIncluidos: null, // 'null' o un array vacío si significa "todos los cursos"
  },
  {
    _id: "PLAN003",
    nombre: "Desarrollo Full-Stack (Trimestral)",
    descripcion: "Un camino estructurado para dominar el desarrollo web full-stack. Ideal para quienes buscan una carrera en tecnología.",
    precio: 89.99, // Precio por 3 meses, enfocándose en una ruta específica
    beneficios: [
      "Acceso a todos los cursos de Desarrollo Frontend y Backend (ruta Full-Stack)",
      "Proyectos prácticos guiados con feedback de instructores",
      "Certificados de especialización por módulo y un certificado final de ruta",
      "Sesiones de Q&A en vivo semanales",
      "Simulacros de entrevistas técnicas",
    ],
    // Aquí se listan los cursos que forman parte de la ruta Full-Stack
    cursosIncluidos: [
      "C001", // MongoDB
      "C002", // JavaScript Moderno
      "C004", // React y Redux
      "C009", // Flutter (si la ruta incluye móvil multiplataforma, sino se ajustaría)
      // Se añadirían más cursos de backend (Node.js, Express, etc. si existieran)
      // Por ejemplo, "C0XX_NodeJS", "C0YY_Express"
    ],
  },
  {
    _id: "PLAN004",
    nombre: "Empresarial Pequeño (Mensual)",
    descripcion: "Solución de aprendizaje para equipos pequeños, con seguimiento de progreso y administración de usuarios.",
    precio: 250.00, // Precio para un equipo base, por ejemplo, hasta 5 usuarios
    beneficios: [
      "Acceso ilimitado para hasta 5 usuarios",
      "Panel de administración de equipo",
      "Informes de progreso y rendimiento de usuarios",
      "Certificados de finalización empresariales",
      "Soporte técnico dedicado",
      "Integración básica con LMS existentes (opcional)",
    ],
    cursosIncluidos: null, // Generalmente, planes empresariales dan acceso a todo o a un subconjunto personalizable
  },
  {
    _id: "PLAN005",
    nombre: "Acceso Gratuito (Limitado)",
    descripcion: "Explora una selección de lecciones introductorias y recursos gratuitos para empezar tu aprendizaje.",
    precio: 0.00, // Precio cero para el acceso gratuito
    beneficios: [
      "Acceso a las primeras lecciones de cada curso (previas)",
      "Materiales descargables de muestra",
      "Participación limitada en foros comunitarios",
    ],
    cursosIncluidos: [
      // Podrías listar IDs de lecciones específicas, o cursos donde solo las primeras lecciones son gratuitas
      // o incluso un conjunto muy reducido de cursos completamente gratuitos.
      // Para simplificar, aquí podemos indicar que la primera lección de todos los cursos es accesible.
      "L001", "L006", "L012", "L016", "L023", "L028", "L032", "L037", "L040", "L047"
    ],
  },
]);