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
