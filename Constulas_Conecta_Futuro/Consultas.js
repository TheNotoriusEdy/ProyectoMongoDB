//Contar el total de documentos en todas las colecciones de la base de datos actual
/*Esta consulta esta hecha para saber de manera sencilla y rápida cuantos recursos tenemos
repartidos por toda la BD.
*/
let totalDocumentos = 0;
const colecciones = db.getCollectionNames(); // Obtener los nombres de todas las colecciones

print("--- Conteo de Documentos por Colección ---");
for (let i = 0; i < colecciones.length; i++) {
  const nombreColeccion = colecciones[i];
  // Excluir colecciones del sistema si no deseas contarlas
  if (nombreColeccion.startsWith("system.")) {
    continue;
  }
  const conteo = db[nombreColeccion].countDocuments({}); // Contar documentos en la colección actual
  print(`Colección: ${nombreColeccion} - Documentos: ${conteo}`);
  totalDocumentos += conteo;
}

print("---------------------------------------");
print(`Total de documentos en la BD: ${totalDocumentos}`);

// 1. Contar el número total de usuarios por rol
db.Usuarios.aggregate([
  {
    $group: {
      _id: "$rol",
      totalUsuarios: { $sum: 1 }
    }
  }
])

// 2. Obtener el promedio de calificación de los cursos por categoría
db.Cursos.aggregate([
  {
    $group: {
      _id: "$categoria",
      calificacionPromedio: { $avg: "$calificacionPromedio" }
    }
  },
  {
    $sort: { calificacionPromedio: -1 } // Ordenar de mayor a menor calificación
  }
])

// 3. Encontrar los cursos con más estudiantes inscritos y su instructor
db.Cursos.aggregate([
  {
    $sort: { estudiantesInscritos: -1 } // Ordenar cursos por el número de estudiantes inscritos de forma descendente
  },
  {
    $limit: 5 // Limitar a los 5 cursos con más estudiantes
  },
  {
    $lookup: {
      from: "Usuarios", // La colección con la que queremos unir
      localField: "instructor", // El campo del documento de Cursos
      foreignField: "_id", // El campo del documento de Usuarios
      as: "datosInstructor" // El nombre del array donde se almacenarán los documentos unidos
    }
  },
  {
    $unwind: "$datosInstructor" // Desenvolver el array de instructor para tener un objeto directo
  },
  {
    $project: {
      _id: 0, // Excluir el _id del curso
      titulo: 1,
      estudiantesInscritos: 1,
      instructorNombre: "$datosInstructor.nombreCompleto",
      instructorCorreo: "$datosInstructor.correo"
    }
  }
])

// 4. Calcular el total de dinero recaudado por compras de cursos
db.Suscripciones.aggregate([
  {
    $match: {
      tipo: "compra_curso_completo", // Solo considerar las compras de cursos individuales
      estado: "Completo" // Solo transacciones completadas
    }
  },
  {
    $group: {
      _id: null, // Agrupar todos los documentos juntos
      totalRecaudado: { $sum: "$monto" }
    }
  },
  {
    $project: {
      _id: 0, // Excluir el _id generado por el grupo
      totalRecaudado: { $round: ["$totalRecaudado", 2] } // Redondear a 2 decimales
    }
  }
])

// 5. Listar el progreso de cada estudiante en un curso específico (ej: C001)
db.Inscripciones.aggregate([
  {
    $match: {
      cursoID: "C001" // Filtra por un curso específico
    }
  },
  {
    $lookup: {
      from: "Usuarios",
      localField: "usuarioID",
      foreignField: "_id",
      as: "estudianteInfo"
    }
  },
  {
    $unwind: "$estudianteInfo"
  },
  {
    $project: {
      _id: 0,
      nombreEstudiante: "$estudianteInfo.nombreCompleto",
      correoEstudiante: "$estudianteInfo.correo",
      progresoCurso: "$progreso.porcentajeCompletado",
      leccionActual: "$progreso.leccionActual",
      estadoInscripcion: "$estado"
    }
  },
  {
    $sort: { progresoCurso: -1 } // Ordenar por progreso descendente
  }
])

// 6. Contar cuántos comentarios tiene cada curso
db.Comentarios.aggregate([
  {
    $group: {
      _id: "$cursoID", // Agrupar por el ID del curso
      totalComentarios: { $sum: 1 } // Contar cada comentario
    }
  },
  {
    $lookup: {
      from: "Cursos",
      localField: "_id",
      foreignField: "_id",
      as: "cursoInfo"
    }
  },
  {
    $unwind: "$cursoInfo"
  },
  {
    $project: {
      _id: 0,
      nombreCurso: "$cursoInfo.titulo",
      totalComentarios: 1
    }
  },
  {
    $sort: { totalComentarios: -1 }
  }
])

// 7. Obtener los detalles de los certificados emitidos en el último mes
db.Certificados.aggregate([
  {
    $match: {
      fechaEmision: { $gte: new ISODate("2025-05-11T00:00:00-06:00") } // Ajusta la fecha para el último mes
    }
  },
  {
    $lookup: {
      from: "Usuarios",
      localField: "usuarioID",
      foreignField: "_id",
      as: "datosUsuario"
    }
  },
  {
    $unwind: "$datosUsuario"
  },
  {
    $lookup: {
      from: "Cursos",
      localField: "cursoID",
      foreignField: "_id",
      as: "datosCurso"
    }
  },
  {
    $unwind: "$datosCurso"
  },
  {
    $project: {
      _id: 0,
      codigoVerificacion: 1,
      fechaEmision: 1,
      estudiante: "$datosUsuario.nombreCompleto",
      cursoCertificado: "$datosCurso.titulo",
      instructorCurso: "$datosCurso.instructor", // Podrías hacer otro lookup si quieres el nombre del instructor
    }
  }
])

// 8. Encontrar el número de lecciones por tipo en un curso dado (ej: C002)
db.Lecciones.aggregate([
  {
    $match: {
      cursosID: "C002" // Filtra por un curso específico
    }
  },
  {
    $group: {
      _id: "$tipo", // Agrupa por el tipo de lección
      totalLecciones: { $sum: 1 } // Cuenta cada lección
    }
  }
])

// 10. Listar los planes de suscripción y los títulos de los cursos que incluyen (si aplica)
db.PlanesSuscripcion.aggregate([
  {
    $unwind: {
      path: "$cursosIncluidos",
      preserveNullAndEmptyArrays: true // Mantiene los documentos incluso si cursosIncluidos es null o vacío
    }
  },
  {
    $lookup: {
      from: "Cursos",
      localField: "cursosIncluidos",
      foreignField: "_id",
      as: "cursoInfo"
    }
  },
  {
    $unwind: {
      path: "$cursoInfo",
      preserveNullAndEmptyArrays: true // Mantiene los documentos incluso si no hay cursoInfo (ej. si cursosIncluidos era null)
    }
  },
  {
    $group: {
      _id: "$_id",
      nombrePlan: { $first: "$nombre" },
      precioPlan: { $first: "$precio" },
      beneficiosPlan: { $first: "$beneficios" },
      titulosCursosIncluidos: {
        $push: { $ifNull: ["$cursoInfo.titulo", "Todos los cursos"] } // Agrega los títulos de los cursos, o "Todos los cursos" si es plan completo
      }
    }
  },
  {
    $project: {
      _id: 0,
      nombrePlan: 1,
      precioPlan: 1,
      beneficiosPlan: 1,
      titulosCursosIncluidos: {
        $cond: {
          if: { $in: ["Todos los cursos", "$titulosCursosIncluidos"] },
          then: ["Todos los cursos"], // Si "Todos los cursos" está presente, solo muestra eso
          else: "$titulosCursosIncluidos" // De lo contrario, muestra los títulos específicos
        }
      }
    }
  }
])

//11. Contar estudiantes reales inscritos en cada curso
db.Inscripciones.aggregate([
  {
    $match: { estado: "activo" } // Opcional: filtrar por inscripciones activas
  },
  {
    $group: {
      _id: "$cursoID", // Agrupar por curso
      totalEstudiantesReales: { $sum: 1 } // Contar las inscripciones
    }
  },
  {
    $lookup: {
      from: "Cursos",
      localField: "_id",
      foreignField: "_id",
      as: "cursoInfo"
    }
  },
  {
    $unwind: "$cursoInfo"
  },
  {
    $project: {
      _id: 0,
      tituloCurso: "$cursoInfo.titulo",
      totalEstudiantesReales: 1
    }
  },
  {
    $sort: { totalEstudiantesReales: -1 }
  }
])

// 12. Encontrar los instructores con la calificación promedio más alta en sus cursos (solo instructores con cursos)
db.Cursos.aggregate([
  {
    $match: {
      calificacionPromedio: { $exists: true, $ne: null, $gt: 0 } // Asegurar que el curso tiene una calificación válida
    }
  },
  {
    $group: {
      _id: "$instructor", // Agrupar por el ID del instructor
      cursosImpartidos: { $sum: 1 }, // Contar cuántos cursos imparte
      calificacionPromedioInstructor: { $avg: "$calificacionPromedio" } // Promedio de calificaciones de sus cursos
    }
  },
  {
    $lookup: {
      from: "Usuarios", // Unir con la colección de Usuarios
      localField: "_id",
      foreignField: "_id",
      as: "datosInstructor"
    }
  },
  {
    $unwind: "$datosInstructor" // Desenvuelve el array de instructor
  },
  {
    $project: {
      _id: 0,
      nombreInstructor: "$datosInstructor.nombreCompleto",
      correoInstructor: "$datosInstructor.correo",
      cursosImpartidos: 1,
      calificacionPromedioInstructor: { $round: ["$calificacionPromedioInstructor", 2] } // Redondear a 2 decimales
    }
  },
  {
    $sort: { calificacionPromedioInstructor: -1 } // Ordenar por la calificación promedio del instructor
  },
  {
    $limit: 5 // Mostrar los 5 mejores instructores
  }
])

// 13. Obtener el total de pagos (Suscripciones) por método de pago
db.Suscripciones.aggregate([
  {
    $match: {
      estado: "Completo" // Solo pagos completados
    }
  },
  {
    $group: {
      _id: "$metodoPago", // Agrupar por el método de pago
      totalPagos: { $sum: "$monto" }, // Sumar el monto pagado
      cantidadTransacciones: { $sum: 1 } // Contar cuántas transacciones hay por método
    }
  },
  {
    $project: {
      _id: 0,
      metodoPago: "$_id",
      totalPagos: { $round: ["$totalPagos", 2] },
      cantidadTransacciones: 1
    }
  },
  {
    $sort: { totalPagos: -1 } // Ordenar por el total recaudado
  }
])

// 14. Encontrar las lecciones que no tienen recursos adicionales
db.Lecciones.aggregate([
  {
    $match: {
      $or: [
        { recursosAdicionales: { $exists: false } }, // No existe el campo
        { recursosAdicionales: { $size: 0 } } // El array está vacío
      ]
    }
  },
  {
    $lookup: {
      from: "Cursos",
      localField: "cursosID",
      foreignField: "_id",
      as: "cursoInfo"
    }
  },
  {
    $unwind: "$cursoInfo"
  },
  {
    $project: {
      _id: 1,
      tituloLeccion: "$titulo",
      cursoAsociado: "$cursoInfo.titulo",
      tipoLeccion: "$tipo",
    }
  }
])

// 15. Contar cuántas preguntas de cada tipo hay por evaluación (ej: E001)
db.Preguntas.aggregate([
  {
    $match: {
      evaluacionID: "E001" // Filtra por una evaluación específica
    }
  },
  {
    $project: {
      _id: 0,
      tipoPregunta: {
        $cond: {
          if: { $ne: ["$tipo.opcionMultiple", null] }, // Si es opción múltiple
          then: {
            $concat: ["opcionMultiple_", "$tipo.opcionMultiple"]
          },
          else: {
            $cond: {
              if: { $ne: ["$tipo.verdaderoFalso", null] }, // Si es verdadero/falso
              then: "verdaderoFalso",
              else: "respuestaDescriptiva" // Si no es ninguno de los anteriores
            }
          }
        }
      }
    }
  },
  {
    $group: {
      _id: "$tipoPregunta", // Agrupar por el tipo de pregunta normalizado
      cantidad: { $sum: 1 }
    }
  }
])

// 16. Encontrar los usuarios que han comprado al menos un curso o tienen una suscripción activa
db.Suscripciones.aggregate([
  {
    $match: {
      estado: "Completo" // Solo suscripciones completadas
    }
  },
  {
    $group: {
      _id: "$usuarioID", // Agrupar por usuario
      totalPagado: { $sum: "$monto" },
      cantidadCompras: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "Usuarios",
      localField: "_id",
      foreignField: "_id",
      as: "datosUsuario"
    }
  },
  {
    $unwind: "$datosUsuario"
  },
  {
    $project: {
      _id: 0,
      nombreUsuario: "$datosUsuario.nombreCompleto",
      correoUsuario: "$datosUsuario.correo",
      totalPagado: { $round: ["$totalPagado", 2] },
      cantidadCompras: 1
    }
  },
  {
    $sort: { totalPagado: -1 }
  }
])

// 17. Obtener el número de certificados emitidos por curso
db.Certificados.aggregate([
  {
    $group: {
      _id: "$cursoID", // Agrupar por ID de curso
      totalCertificadosEmitidos: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "Cursos",
      localField: "_id",
      foreignField: "_id",
      as: "cursoInfo"
    }
  },
  {
    $unwind: "$cursoInfo"
  },
  {
    $project: {
      _id: 0,
      tituloCurso: "$cursoInfo.titulo",
      totalCertificadosEmitidos: 1
    }
  },
  {
    $sort: { totalCertificadosEmitidos: -1 }
  }
])

// 18. Resumen de progreso de todos los estudiantes inscritos (por estado)
db.Inscripciones.aggregate([
  {
    $group: {
      _id: "$estado", // Agrupar por el estado de la inscripción
      totalInscripciones: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      estadoInscripcion: "$_id",
      cantidad: "$totalInscripciones"
    }
  }
])

// 19. Analizar el valor promedio y la cantidad de pagos por tipo de plan de suscripción
db.Suscripciones.aggregate([
  {
    $match: {
      planSuscripcionID: { $ne: null }, 
      estado: "Completo" 
    }
  },
  {
    $lookup: {
      from: "PlanesSuscripcion",
      localField: "planSuscripcionID",
      foreignField: "_id",
      as: "planDetalles"
    }
  },
  {
    $unwind: "$planDetalles"
  },
  {
    $group: {
      _id: "$planDetalles.nombre", 
      montoPromedioPorPago: { $avg: "$monto" }, 
      totalRecaudadoPorPlan: { $sum: "$monto" }, 
      cantidadPagos: { $sum: 1 } 
    }
  },
  {
    $project: {
      _id: 0,
      nombrePlan: "$_id",
      montoPromedioPorPago: { $round: ["$montoPromedioPorPago", 2] },
      totalRecaudadoPorPlan: { $round: ["$totalRecaudadoPorPlan", 2] },
      cantidadPagos: 1
    }
  },
  {
    $sort: { totalRecaudadoPorPlan: -1 } 
  }
])

// 20. Encontrar las categorías de cursos más populares a través de los planes de suscripción.
// Esta consulta identifica qué categorías de cursos están incluidas en los planes de suscripción
// y cuántas veces aparecen, lo que puede indicar su popularidad en el contexto de los planes.
db.PlanesSuscripcion.aggregate([
  {
    $match: {
      cursosIncluidos: { $ne: null, $ne: [] } // Solo planes que tienen cursos específicos incluidos
    }
  },
  {
    $unwind: "$cursosIncluidos" // Desenvuelve el array de IDs de cursos incluidos
  },
  {
    $lookup: {
      from: "Cursos", // Unir con la colección de Cursos
      localField: "cursosIncluidos",
      foreignField: "_id",
      as: "cursoDetalles"
    }
  },
  {
    $unwind: "$cursoDetalles" // Desenvuelve los detalles del curso
  },
  {
    $group: {
      _id: "$cursoDetalles.categoria", // Agrupar por la categoría del curso
      vecesIncluidaEnPlanes: { $sum: 1 }, // Contar cuántas veces aparece esta categoría en los cursos de los planes
      cursosUnicosIncluidos: { $addToSet: "$cursoDetalles.titulo" } // Listar los títulos de cursos únicos de esa categoría en planes
    }
  },
  {
    $project: {
      _id: 0,
      categoria: "$_id",
      vecesIncluidaEnPlanes: 1,
      cursosUnicosIncluidos: 1
    }
  },
  {
    $sort: { vecesIncluidaEnPlanes: -1 } // Ordenar para ver las categorías más populares primero
  }
])