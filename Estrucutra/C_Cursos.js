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