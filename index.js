import express from 'express';
import app from express();
import path from 'path';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import conexion from './conexion.js';
import actividades from './actividades.js';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas para peticiones AJAX
app.get('/api/actividades', (req, res) => {
  actividades.obtenerActividades((resultados) => {
    res.json(resultados);
  });
});

app.post('/api/actividades', (req, res) => {
  const actividad = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
  };

  actividades.agregarActividad(actividad, (insertId) => {
    actividad.id = insertId;
    res.json(actividad);
  });
});

app.put('/api/actividades/:id', (req, res) => {
  const actividad = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
  };

  actividades.actualizarActividad(req.params.id, actividad, (affectedRows) => {
    res.json(actividad);
  });
});

app.delete('/api/actividades/:id', (req, res) => {
  actividades.eliminarActividad(req.params.id, (affectedRows) => {
    res.json({ affectedRows });
  });
});

conexion.connect((error) => {
  if (error) {
    throw error;
  }
  console.log('Conexión a la base de datos establecida.');

  app.listen(3000, () => {
    console.log('Servidor iniciado en puerto 3000.');
  });
});