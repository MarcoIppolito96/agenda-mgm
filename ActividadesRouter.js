import express from 'express';
const router = express.Router();
import connection from './conexion';

// Obtener todas las actividades
router.get('/', (req, res) => {
  connection.query('SELECT * FROM actividades', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Agregar una nueva actividad
router.post('/', (req, res) => {
  const { titulo, descripcion, fecha } = req.body;
  connection.query('INSERT INTO actividades SET ?', { titulo, descripcion, fecha }, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Actualizar una actividad existente
router.put('/:id', (req, res) => {
  const { titulo, descripcion, fecha } = req.body;
  const { id } = req.params;
  connection.query('UPDATE actividades SET titulo = ?, descripcion = ?, fecha = ? WHERE id = ?', [titulo, descripcion, fecha, id], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Eliminar una actividad existente
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM actividades WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

export default router;