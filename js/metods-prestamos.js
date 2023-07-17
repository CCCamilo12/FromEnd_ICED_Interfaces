$(document).ready(function() {
    // Agregar un préstamo
    $("#agregarPrestamoForm").submit(function(event) {
        event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
        
        // Obtener los valores del formulario
        let fechaEntrega = $("#fechaEntrega").val();
        let fechaDevolucion = $("#fechaDevolucion").val();
        let horaEntrega = $("#horaEntrega").val();
        let horaDevolucion = $("#horaDevolucion").val();
        let tiempoLimite = $("#tiempoLimite").val();
        let observacionesEntrega = $("#observacionesEntrega").val();
        let observacionesRecibido = $("#observacionesRecibido").val();
        let equipoId = $("#equipoId").val();
        let usuarioDocumento = $("#usuarioDocumento").val();

        // Crear el objeto de datos del préstamo
        let nuevoPrestamo = {
            fechaEntrega: fechaEntrega,
            fechaDevolucion: fechaDevolucion,
            horaEntrega: horaEntrega,
            horaDevolucion: horaDevolucion,
            tiempoLimite: tiempoLimite,
            observacionesEntrega: observacionesEntrega,
            observacionesRecibido: observacionesRecibido,
            equipo: {
                equ_id: equipoId
            },
            usuario: {
                usu_Documento: usuarioDocumento
            }
        };

        // Enviar la solicitud AJAX para agregar el préstamo
        $.ajax({
            url: "http://localhost:8080/InsertarPrestamo/",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(nuevoPrestamo),
            success: function(respuesta) {
                console.log(respuesta);
                // Actualizar la lista de préstamos después de agregar uno nuevo
                obtenerListaPrestamos();
                // Restablecer los valores del formulario
                $("#agregarPrestamoForm")[0].reset();
            },
            error: function() {
                console.log("Error al agregar el préstamo");
            }
        });
    });

// Función para obtener la lista de préstamos
    function obtenerListaPrestamos() {
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
                        <td>${prestamo.equipo.equ_id}</td>
                        <td>${prestamo.usuario.usu_Documento}</td>
                    </tr>`);
                });
            },
            error: function() {
                console.log("Error al obtener la lista de préstamos");
            }
        });
    }

    // Llamar a la función para obtener la lista de préstamos al cargar la página
    obtenerListaPrestamos();
});


//Buscar Prestamo
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

//Eliminar prestamo
$('#EliminarPrestamo').on('click', function() {
    let codigo = $("#id_prestamoo").val();

    if (codigo === '') {
        alert('Por favor, completa el campo');
        return; // Detener la ejecución si hay campos vacíos
    }

    $.ajax({
        url: "http://localhost:8080/EliminarPrestamo/" + codigo,
        type: "DELETE",
        success: function(respuesta) {
            alert(respuesta);
            obtenerListaPrestamos();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 404) {
                alert("No se encontró el prestamo en la base de datos");
            } else {
                alert("Ha ocurrido un error en la solicitud: " + errorThrown);
            }
        }
    });
});


//no borrar estas funciones  cargarEquipos(); , cargarUsuarios(); son para que aparezca la informacion  de los select en el formulario html

function cargarEquipos() {
    $.ajax({
        url: "http://localhost:8080/listarEquipos",
        type: "GET",
        dataType: "JSON",
        success: function(respuesta) {
            let selectEquipos = $("#equipoId");
            selectEquipos.empty();
            
            for (let i = 0; i < respuesta.length; i++) {
                let option = $("<option></option>").attr("value", respuesta[i].equ_id).text(respuesta[i].equi_tipo);
                selectEquipos.append(option);
            }
        }
    });
}

function cargarUsuarios() {
    $.ajax({
        url: "http://localhost:8080/ListarUsuarios",
        type: "GET",
        dataType: "JSON",
        success: function(respuesta) {
            let selectUsuarios = $("#usuarioId");
            selectUsuarios.empty();
            for (let i = 0; i < respuesta.length; i++) {
                let option = $("<option></option>").attr("value", respuesta[i].usu_Documento).text(respuesta[i].usu_Nombre + " " + respuesta[i].usu_Apellido);
                selectUsuarios.append(option);
            }
        }
    });
}

// carga los datos de los selec que hay en el formulario
$(document).ready(function() {
    cargarEquipos();
    cargarUsuarios();
});

