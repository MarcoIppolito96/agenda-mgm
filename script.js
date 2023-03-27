$(document).ready(() => {
  const urlBase = 'http://localhost:3000/api/actividades';

  // Obtener todas las actividades
  const obtenerActividades = () => {
    $.ajax({
      url: urlBase,
      method: 'GET',
      success: (data) => {
        $('#tabla-actividades tbody').html('');
        data.forEach((actividad) => {
          const row = `
            <tr>
              <td>${actividad.titulo}</td>
              <td>${actividad.descripcion}</td>
              <td>${actividad.fecha}</td>
              <td>
                <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editarModal"
                  data-id="${actividad.id}" data-titulo="${actividad.titulo}" data-descripcion="${actividad.descripcion}"
                  data-fecha="${actividad.fecha}">
                  Editar
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#eliminarModal"
                  data-id="${actividad.id}" data-titulo="${actividad.titulo}">
                  Eliminar
                </button>
              </td>
            </tr>
          `;
          $('#tabla-actividades tbody').append(row);
        });
      },
    });
  };

  obtenerActividades();

  // Agregar una nueva actividad
  $('#form-agregar-actividad').submit((event) => {
    event.preventDefault();

    const actividad = {
      titulo: $('#titulo').val(),
      descripcion: $('#descripcion').val(),
      fecha: $('#fecha').val(),
    };

    $.ajax({
      url: urlBase,
      method: 'POST',
      data: actividad,
      success: (data) => {
        $('#agregarModal').modal('hide');
        obtenerActividades();
        $('#form-agregar-actividad').trigger('reset');
      },
    });
  });

  // Actualizar una actividad existente
  $('#form-editar-actividad').submit((event) => {
    event.preventDefault();

    const actividad = {
      titulo: $('#editar-titulo').val(),
      descripcion: $('#editar-descripcion').val(),
      fecha: $('#editar-fecha').val(),
    };

    const id = $('#editar-id').val();

    $.ajax({
      url: `${urlBase}/${id}`,
      method: 'PUT',
      data: actividad,
      success: (data) => {
        $('#editarModal').modal('hide');
        obtenerActividades();
      },
    });
  });

  // Eliminar una actividad existente
  $('#form-eliminar-actividad').submit((event) => {
    event.preventDefault();

    const id = $('#eliminar-id').val();

    $.ajax({
      url: `${urlBase}/${id}`,
      method: 'DELETE',
      success: (data) => {
        $('#eliminarModal').modal('hide');
        obtenerActividades();
      },
    });
  });
});