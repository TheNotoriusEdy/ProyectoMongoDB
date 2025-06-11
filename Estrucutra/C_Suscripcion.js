//10- Planes de suscripción colección
db.Suscripcion.insertMany([{
    _id:"ObjectID",
    nombre:"string",
    descripcion:"string",
    precio:"number",
    beneficios:"string",
    cursosIncluidos:"ObjectID"
}])