import { conexion } from './conexion.js';

// Función para obtener todas las actividades
export function obtenerActividades(callback) {
  conexion.query('SELECT * FROM actividades', (error, resultados) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(resultados);
  });
}

// Función para agregar una nueva actividad
export function agregarActividad(actividad, callback) {
  conexion.query('INSERT INTO actividades SET ?', actividad, (error, resultado) => {
    if (error) {
      console.error(error);
      return;
    }
    actividad.id = resultado.insertId;
    callback(actividad);
  });
}

// Función para actualizar una actividad existente
export function actualizarActividad(id, actividad, callback) {
  conexion.query('UPDATE actividades SET ? WHERE id = ?', [actividad, id], (error, resultado) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(actividad);
  });
}

// Función para eliminar una actividad
export function eliminarActividad(id, callback) {
  conexion.query('DELETE FROM actividades WHERE id = ?', id, (error, resultado) => {
    if (error) {
      console.error(error);
      return;
    }
    callback({ message: 'Actividad eliminada correctamente.' });
  });
}

// Función para obtener una actividad por su ID
export function obtenerActividadPorId(id, callback) {
  conexion.query('SELECT * FROM actividades WHERE id = ?', id, (error, resultados) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(resultados[0]);
  });
}