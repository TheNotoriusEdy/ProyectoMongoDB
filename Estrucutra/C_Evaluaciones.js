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