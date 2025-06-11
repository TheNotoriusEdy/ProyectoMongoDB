//Estructura de BD no relacional proyecto MONGODB

//Estructura de los registros

//1- Usuarios colección
db.Usuarios.insertMany([{
    _id:"objectID",
    nombre:"string",
    apellido:"string",
    email:"string",
    contrasena:"string",
    fechaRegistro:"ISODatetime",
    rol:['Estudiante','instructor','administrador'],
    estado:['activo','inactivo','pendiente'],
    informacionPerfil:{
        fotoPerfil:"IMG.jpg.png",
        correo:"string",
        pais:"string",
        actividadPerfil:{
            primerAcceso:"string",
            ultimoAcceso:"string",
        }
    },
    cusosInscritos:"objectID",
    cursosCompletados:{
        progreso:"float",
        leccionActual:"string",
        porcentajeCompletado:"float",
    },
    certificadosObtenidos:"objetID",
    historialActividad:["ObjectArray"],
    preferencias:"object"
}])
//2- Cursos colección
db.Cursos.InsertMany([{
    _id:"ObjectID",
    titulo:"string",
    descripcion:"string",
    instructor:"ObjectID"/*Referencia a la coleción Usuarios con rol 'instructor' */,
    categoria:"string",
    tags:["string"],
    nivel:['Básico','Intermedio','Avanzado'],
    idioma:"string",
    fechaCreacion:"ISODate",
    fechaActualizacion:"ISODate",
    precio:"Number" /*Puede ser 0*/,
    imagenPortada:"string"/*URL o ruta del archivo */,
    duracionEstimada:"string",
    lecciones:["ObjectID"]/*Orden de las lecciones referencia a la colección Lecciones */,
    evaluaciones:["ObjectID"]/*Referencias a la colección Evaluaciones */,
    recursosAdicionales:["Object"]/*Array con información sobre archivos adjuntos, enlaces, etc */,
    estudiantesInscritos:"Number"/*Estadisticas rápidas se puede obtener contando en la colección Usuarios */,
    calificacionPromedio:"Number"
}])
//3- Lecciones colección
db.Lecciones.insertMany([{
    _id:"objectID",
    cursosID:"ObjectID"/*Referencia a la colección Cursos */,
    titulo:"string",
    descripcion:"string",
    tipo:['video','texto','quiz','tarea','enlace externo'],
    contenido:"mixed"/* Depende del tipo: URL,texto,ID del quiz, etc*/,
    duracionEstimada:"string"/*Si es video */,
    orden:"number"/*Para definir la secuencia dentro del curso */,
    recursosAdicionales:["Object"]
}])
//4- Evaluaciones colección
db.Evaluaciones.InsertMany([{
    _id:"ObjectID",
    cursoID:"ObjectID"/*Referencia a la colección Cursos */,
    titulo:"string",
    tipo:['Quiz','Tarea','Examen Final'],
    descripcion:"string",
    fechaCreacion:"ISODate",
    preguntas:["ObjectID"]/*Referencias a la colección Preguntas si son quizzes */,
    criteriosCalificacion:"string"/*Para tareas y exámenes */,
    puntajeMaximo:"Number"
}])
//5- Preguntas colección
db.Preguntas.insertMany([{
    _id:"objectID",
    evaluacionID:"ObjectID"/*Referencia a la colección Evaluaciones */,
    textoPregunta:"string",
    tipo:{
        opcionMultiple:['SeleccionarUna','SeleccionarVarias'],
        verdaderoFalso:"booleano",
        respuestaDescriptiva:"string"
    },
    puntaje:"number"
}])
/*6- Inscripciones colección
(optar por esto en lugar de cursosInscritos en Usuarios para mayor flexibilidad y datos adicionales sobre la inscripción)
*/
db.Inscripciones.insertMany([{
    _id:"ObjectID",
    usuarioID:"ObjectID"/*Referencia a la colección Uusarios */,
    cursoID:"ObjectID"/* Referencia a la colección Cursos*/,
    fechaInscripcion:"ISODate",
    progreso:"Object",
    calificacionFinal:"Number",
    estado:['activo','completado','abandonado',],
}])
//7- Certificados colección
db.Certificados.insertMany([{
    _id:"ObjectID",
    usuarioID:"ObjectID"/*Referencia a la colección Usuarios */,
    cursoID:"ObjectID"/*Referencia a la colección Cursos*/,
    fechaEmision:"ISODate",
    codigoVerificacion:"string",
    plantilla:"string"/*Referencia a la plantilla del certificado*/,
    datosPersonalizados:{objeto},
}])
//8- Comentarios (Foros) colección
db.Comentarios.insertMany([{
    _id:"ObjectID",
    usuarioID:"ObjectID"/*Referencia a la colección Usuarios */,
    cursoID:"ObjectID"/*Referencia a la colección Cursos*/,
    leccionID:"ObjectID"/*Opcional hacer una referencia a la una lección especifica*/,
    texto:"string",
    fechaCreacion:"ISODate",
    respuestasA:"ObjectID",/*Referencia al comentarios padre, para crear Hilos*/
}])
//9- Suscripciones (Pagos) colección
db.Suscripciones.InsertMany([{
    _id:"ObjectID",
    usuarioID:"ObjectID"/*Referencia a la colección Usuarios*/,
    tipo:['compra_curso_completo','suscripción_mensual'],
    cursoID:"ObjectID"/*Opcional, si es compra de cursos*/,
    planSuscripciónID:"ObjectId"/*Opcional, referencia a la colección (PlanesSuscripción)*/,
    monto:"Number",
    fechaPago:"ISODate",
    metodoPago:['TarjetaDebito','TarjetaCredito'],
    estado:['Completo','Pendiente','Fallido'],
    detallesTransaccion:{
        _id:"ObjectID",
        transaccionID:"ObjectID",
        tipo:['Compra_Curso','SuscripciónMensual'],
        estado:['Completado','Pendiente','Cancelada'],
        fechaCreacion:"ISODate",
        fechaCompletacion:"ISODate",
        montoTotal:"float",
        moneda:"string",
        usuarioID:"ObjectID"/*Objeto referenciado a la colección usuarios*/,
        detallesUsuario:{
            usuarioID:"ObjectID",
            nombre:"string",
            correo:"string"
        }
    },
    cursoId: "ObjectID",
    nombreCurso: "Introducción a JavaScript",
    precioCurso: "float",
    metodoPago: ['TarjetaCredito','TarjetaDebito'],
    detallesPago: {
    tipoTarjeta: ['Visa','Mastercard','JCB','American Express'],
    ultimosCuatroDigitos: "INT",
    estadoPago: ['Pendiente','Aprobado','Denegado'],
    "fechaPago": "ISODate",
    "idTransaccionProveedor": "String"
    }
}])
//10- Planes de suscripción colección
db.Suscripcion.insertMany([{
    _id:"ObjectID",
    nombre:"string",
    descripcion:"string",
    precio:"number",
    beneficios:"string",
    cursosIncluidos:"ObjectID"
}])