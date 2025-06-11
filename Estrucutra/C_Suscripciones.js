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