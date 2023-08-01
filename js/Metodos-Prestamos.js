$(document).ready(function() {
    // listar
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
                        <td>${prestamo.horaEntrega}</td>
                        <td>${prestamo.tiempoLimite}</td>
                        <td>${prestamo.observacionesEntrega}</td>
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
    
// Agregar un préstamo
$('#AgregarPrestamo').on('click', function(event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    
    // Obtener los valores del formulario
    let fechaEntrega = $("#fechaEntrega").val();
    let horaEntrega = $("#horaEntrega").val();
    let tiempoLimite = $("#tiempoLimite").val();
    let observacionesEntrega = $("#observacionesEntrega").val();
    let equipoId = $("#equipoId").val();
    let usuarioDocumento = $("#usuarioDocumento").val();

    if (fechaEntrega === '' || horaEntrega === '' || tiempoLimite === '' || observacionesEntrega === '' || equipoId === '' || usuarioDocumento === '') {
        alert("Por favor completa todos los campos");
        return;
    }
    
    // Crear el objeto de datos del préstamo
    let nuevoPrestamo = {
        fechaEntrega: fechaEntrega,
        horaEntrega: horaEntrega,
        tiempoLimite: tiempoLimite,
        observacionesEntrega: observacionesEntrega,
        equipo: {
            equ_id: equipoId
        },
        usuario: {
            usu_Documento: usuarioDocumento
        }
    };
        let datosenvio = JSON.stringify(nuevoPrestamo);
        console.log(nuevoPrestamo);
        console.log(datosenvio);

        // Enviar la solicitud AJAX para agregar el préstamo
        $.ajax({
            url: "http://localhost:8080/InsertarPrestamo/",
            type: "POST",
            dataType: "json", // Corrección aquí
            contentType: "application/JSON",
            data: datosenvio,
            success: function(respuesta) {
                console.log(respuesta);
                // Actualizar la lista de préstamos después de agregar uno nuevo
                obtenerListaPrestamos();
                // Restablecer los valores del formulario
                $("#agregarPrestamoForm")[0].reset();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error al agregar el préstamo - Código de estado: " + jqXHR.status);
                obtenerListaPrestamos();
            }
        });
        
    });
    // Llamar a la función para obtener la lista de préstamos al cargar la página
    obtenerListaPrestamos();
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
                    <td>${prestamo.horaEntrega}</td>
                    <td>${prestamo.tiempoLimite}</td>
                    <td>${prestamo.observacionesEntrega}</td>
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



// ACTUALIZAR EQUIPO
$('#ActualizarPrestamo').on('click',function(){
    let presId = $('#presId').val();
    
    // Realizar una solicitud al servidor para obtener los datos actuales del equipo
    $.ajax({
        url: "http://localhost:8080/BuscarEquipo/" + presId,
        type: "GET",
        success: function(respuesta){
            // Aquí obtienes los datos actuales del equipo desde la respuesta del servidor
            
            // Obtener los nuevos valores del formulario
            let fechaEntrega = $('#fechaEntrega_actualizar').val();
            let fechaDevolucion = $('#fechaDevolucion_actualizar').val();
            let horaEntrega = $('#horaEntrega_actualizar').val();
            let tiempoLimite = $('#tiempoLimite_actualizar').val();
            let observacionesEntrega = $('#observacionesEntrega_actualizar').val();
            let observacionesRecibido = $('#observacionesRecibido_actualizar').val();
            
            
            // Combinar los datos actuales con los nuevos valores
            let datosActualizados = {
                presId: presId,
                equi_tipo: equi_tipo || respuesta.equi_tipo, // Usar el valor actual si no se proporciona uno nuevo
                equi_modelo: equi_modelo || respuesta.equi_modelo,
                equi_color: equi_color || respuesta.equi_color,
                equi_serial: equi_serial || respuesta.equi_serial,
                equi_estado: equi_estado || respuesta.equi_estado,
                equi_especialidad: equi_especialidad || respuesta.equi_especialidad
            };

            let datosenvio = JSON.stringify(datosActualizados);
            
            $.ajax({
                url: "http://localhost:8080/ActualizarEquipo/",
                type: "POST",
                data: datosenvio,
                contentType: "application/JSON",
                success: function(respuesta){
                    alert(respuesta);
                    listarequipo();   
                }
            });
        },
        error: function(error){
            console.log(error);
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

