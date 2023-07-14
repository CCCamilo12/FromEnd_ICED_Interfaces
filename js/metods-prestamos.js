/////////////////////////////////////////////Listar/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // Listar todos los préstamos
    $.ajax({
    url: "http://localhost:8080/ListarPrestamos",
    type: "GET",
    dataType: "json",
    success: function(respuesta) {
        console.log(respuesta);
        let tablaBody = $("#tabla1-body");
        tablaBody.empty(); // Limpiar el contenido anterior de la tabla

        respuesta.forEach(function(prestamo) {
        tablaBody.append(`<tr>
            <td>${prestamo.presId}</td>
            <td>${prestamo.fechaEntrega}</td>
            <td>${prestamo.fechaDevolucion}</td>
            <td>${prestamo.horaEntrega}</td>
            <td>${prestamo.horaDevolucion}</td>
            <td>${prestamo.tiempoLimite}</td>
            <td>${prestamo.observacionesEntrega}</td>
            <td>${prestamo.observacionesRecibido}</td>
            <td>${prestamo.equipo.equ_id }</td>
            <td>${prestamo.usuario.usu_Documento}</td>
        </tr>`);
        });
    },
    error: function() {
        console.log("Error al obtener la lista de préstamos");
    }
    });

/////////////////////////////////////////////BUSCAR/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#BuscarPrestamo').on('click', function() {
    let tablaEquipos = $("#tabla1-body");
    tablaEquipos.empty(); // Limpiar el contenido anterior de la tabla
    let dato = $("#pres_idddd").val();
    $.ajax({
        url: "http://localhost:8080/BuscarPrestamo/" + dato,
        type: "GET",
        dataType: "json",
        success: function(respuesta) {
            if (respuesta && respuesta.presId) {
                tablaEquipos.append(`<tr>
                    <td>${respuesta.presId}</td>
                    <td>${respuesta.fechaEntrega}</td>
                    <td>${respuesta.fechaDevolucion}</td>
                    <td>${respuesta.horaEntrega}</td>
                    <td>${respuesta.horaDevolucion}</td>
                    <td>${respuesta.tiempoLimite}</td>
                    <td>${respuesta.observacionesEntrega}</td>
                    <td>${respuesta.observacionesRecibido}</td>
                    <td>${respuesta.equipo.equ_id}</td>
                    <td>${respuesta.usuario.usu_Documento}</td>
                </tr>`);
            } else {
                alert("No se encontró el préstamo en la base de datos");
            }
        },
        error: function(jqXHR, errorThrown) {
            if (jqXHR.status === 404) {
                alert("No se encontró el préstamo en la base de datos");
            } else {
                alert("Ha ocurrido un error en la solicitud: " + errorThrown);
            }
        }
    });
});


/////////////////////////////////////////////ELIMINAR/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      
});
  