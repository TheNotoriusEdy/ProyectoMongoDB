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