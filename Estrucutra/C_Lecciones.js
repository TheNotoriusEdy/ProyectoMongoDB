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