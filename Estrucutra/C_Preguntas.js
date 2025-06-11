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