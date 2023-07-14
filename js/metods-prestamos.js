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
            <td>${prestamo.pres_Id}</td>
            <td>${prestamo.pres_Fec_Entrega}</td>
            <td>${prestamo.pres_Fec_Devolucion}</td>
            <td>${prestamo.pres_Hora_Entrega}</td>
            <td>${prestamo.pres_Hora_Devolucion}</td>
            <td>${prestamo.pres_Tiempo_Limite}</td>
            <td>${prestamo.pres_Observaciones_entrega}</td>
            <td>${prestamo.pres_Observaciones_recibido}</td>
            <td>${prestamo.pres_equipos_id}</td>
            <td>${prestamo.pres_usuarios_documento}</td>
        </tr>`);
        });
    },
    error: function() {
        console.log("Error al obtener la lista de préstamos");
    }
    });
});

    // Buscar un préstamo por ID
    $('#BuscarPrestamo').on('click', function(){
        let tablaEquipos = document.querySelector('#tabla1-body');
        tablaEquipos.innerHTML = ''; 
        let dato = $("#pres_idddd").val();
        $.ajax({
            url: "http://localhost:8080/BuscarPrestamo/" + dato,
            type: "GET",
            dataType: "json",
            success:function(respuesta){
                if (respuesta.hasOwnProperty('pres_id')) {
                    tablaEquipos.innerHTML += '<tr>' +
                    '<td>' + respuesta.pres_id + '</td>' +
                    '<td>' + respuesta.pres_fec_entrega + '</td>' +
                    '<td>' + respuesta.pres_fec_devolucion + '</td>' +
                    '<td>' + respuesta.pres_hora_entrega + '</td>' +
                    '<td>' + respuesta.pres_hora_devolucion + '</td>' +
                    '<td>' + respuesta.pres_tiempo_limite + '</td>' +
                    '<td>' + respuesta.pres_equipos_id + '</td>' +
                    '<td>' + respuesta.pres_usuarios_documento + '</td>' +
                    '<td>' + respuesta.pres_observaciones_entrega + '</td>' +
                    '<td>' + respuesta.pres_observaciones_recibido + '</td>' +
                    '</tr>'; 
                } else {
                alert("No se encontró el Prestamo en la base de datos");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 404) {
                    alert("No se encontró el Prestamo en la base de datos");
                } else {
                    alert("Ha ocurrido un error en la solicitud: " + errorThrown);
                }
            }
        });
    });


/////////////////////////////////////////////ELIMINAR/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#EliminarPrestamo').on('click', function() {
    let prestamoId = $("#pres_idEliminar").val();

    $.ajax({
        url: "http://localhost:8080/EliminarPrestamo/" + prestamoId,
        type: "DELETE",
        success: function(respuesta) {
            alert(respuesta);
            // Realizar alguna acción adicional después de eliminar el préstamo, como recargar la lista de préstamos.
            // Por ejemplo, puedes volver a realizar la llamada AJAX para listar todos los préstamos aquí mismo.
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
      
});
  