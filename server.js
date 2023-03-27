import http from 'http';
import mysql from 'mysql';

// Crear conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'markito21nob',
  database: 'agenda',
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
  
  // Crear tabla de usuarios
  connection.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT(11) NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      contrasena VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    )
  `, (err, result) => {
    if (err) {
      console.error('Error al crear tabla de usuarios:', err);
      return;
    }
    console.log('Tabla de usuarios creada correctamente');
  });
  
  // Crear tabla de actividades
  connection.query(`
    CREATE TABLE IF NOT EXISTS actividades (
      id INT(11) NOT NULL AUTO_INCREMENT,
      usuario_id INT(11) NOT NULL,
      titulo VARCHAR(255) NOT NULL,
      descripcion TEXT NOT NULL,
      fecha DATE NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `, (err, result) => {
    if (err) {
      console.error('Error al crear tabla de actividades:', err);
      return;
    }
    console.log('Tabla de actividades creada correctamente');
  });
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo!');
});

server.listen(3000, () => {
  console.log('El servidor está corriendo en el puerto 3000');
});