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

    $(document).ready(function() {
        // Insertar un préstamo
        $('#InsertarPrestamo').on('click', function() {
        let datos = {
            pres_Id: $('#pres_id').val(),
            pres_Fec_Entrega: $('#pres_fec_entrega').val(),
            pres_Fec_Devolucion: $('#pres_fec_devolucion').val(),
            pres_Hora_Entrega: $('#pres_hora_entrega').val(),
            pres_Hora_Devolucion: $('#pres_hora_devolucion').val(),
            pres_Tiempo_Limite: $('#pres_tiempo_limite').val(),
            pres_Observaciones_entrega: $('#pres_observaciones_entrega').val(),
            pres_Observaciones_recibido: $('#pres_observaciones_recibido').val()
        };
    
        let datosenvio = JSON.stringify(datos);
        console.log(datosenvio);
    
        $.ajax({
            url: "http://localhost:8080/InsertarPrestamo",
            type: "POST",
            data: datosenvio,
            contentType: "application/json",
            dataType: "json",
            success: function(respuesta) {
            alert("Préstamo insertado correctamente");
            // Limpiar los campos después de la inserción
            $('#pres_id').val('');
            $('#pres_fec_entrega').val('');
            $('#pres_fec_devolucion').val('');
            $('#pres_hora_entrega').val('');
            $('#pres_hora_devolucion').val('');
            $('#pres_tiempo_limite').val('');
            $('#pres_observaciones_entrega').val('');
            $('#pres_observaciones_recibido').val('');
            },
            error: function(jqXHR, textStatus, errorThrown) {
            alert("Error al insertar el préstamo: " + errorThrown);
            }
        });
        });
    });
    