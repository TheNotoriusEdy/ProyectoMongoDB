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