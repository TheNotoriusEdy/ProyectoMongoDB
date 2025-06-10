//Script BD (Inserciones de datos asi como los comandos de creación)
//Creación de la base de datos

//use Conecta_Futuro_MongoDB

//Creación de colecciones
//1-Colección Usuarios
db.createCollection("Usuarios");
//2-Colección Suscripciones
db.createCollection("Suscripciones");
//3-Colección Suscripción
db.createCollection("Suscripción");
//4-Colección Preguntas
db.createCollection("Preguntas");
//5-Colección Lecciones
db.createCollection("Lecciones");
//6-Colección Inscripciones
db.createCollection("Inscripciones");
//7-Colección Evaluaciones
db.createCollection("Evaluaciones");
//8-Colección Cursos
db.createCollection("Cursos");
//9-Colección Comentarios
db.createCollection("Comentarios");
//10-Colección Certificados
db.createCollection("Certificados");

//Inserción de datos (100 registros en la BD).

//1-Inserción colección Usuarios
