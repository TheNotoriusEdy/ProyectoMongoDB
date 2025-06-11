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