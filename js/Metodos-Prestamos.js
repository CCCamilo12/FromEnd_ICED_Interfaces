$(document).ready(function() {

let listaEqui = document.querySelector('#Eq')
listaEqui.innerHTML = ''
        $.ajax({
            url: "http://localhost:8080/listarEquipos",
            type: "GET",
            success: function(respuesta) {
                console.log(respuesta)
               Object.values(respuesta).forEach(Equipo =>  {
                listaEqui.innerHTML += '<option value="' + Equipo["equ_id"] +'">'
                + Equipo["equ_id"]+' '+ Equipo ["equi_modelo"]+'</option>'
            });
    }
});

//Carga Select Usuarios

let listaUsu = document.querySelector('#Us')
        listaUsu.innerHTML = ''
        $.ajax({
            url: "http://localhost:8080/ListarUsuarios",
            type: "GET",
            datatype: "JSON",
            success: function(respuesta) {
                console.log(respuesta)
                Object.values(respuesta).forEach(usuario => {
                    listaUsu.innerHTML += '<option value="' +usuario["usu_Documento"] +'">'
                    + usuario["usu_Nombre"] +' '+ usuario["usu_Apellido"]+'</option>';
                });
            }

        });

 


        $(document).ready(function() {
            // Manejador del botón AgregarPrestamo
            $('#AgregarPrestamo').on('click', function(event) {
                let Equipo = $('#Eq option:selected').val();
                let Usuario = $('#Us option:selected').val();
        
                // Objeto de datos que enviarás al servidor (en este caso, no es necesario especificar contentType)
                let data = {
                    Eq: Equipo,
                    Us: Usuario
                };
                console.log(data)
                $.ajax({
                    url: "http://localhost:8080/insertarPrestamo/" + Equipo + "/" + Usuario,
                    type: "POST",
                    data: data, // Enviar datos como objeto JSON
                    success: function(respuesta) {
                        console.log(respuesta);
                        alert(respuesta);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error("Error en la solicitud:", textStatus, errorThrown);
                        alert("Error en la solicitud. Consulta la consola para obtener más detalles.");
                    }
                });
            });
        
            // Llamar a la función para obtener la lista de préstamos al cargar la página
        });
        
});


//////////////////////////////Buscar Prestamo//////////////////////////////////////////////////////////////////////////////////////
$('#BuscarPrestamo').on('click', function() {
    let tablaEquipos = $("#tabla1-body");
    tablaEquipos.empty(); // Limpiar el contenido anterior de la tabla
    let dato = $("#id_equipoo").val();
    $.ajax({
        url: "http://localhost:8080/BuscarPrestamo/" + dato,
        type: "GET",
        dataType: "json",
        success: function(respuesta) {
            if (respuesta && respuesta.presId) {
                let equipoInfo = respuesta.equipo ? respuesta.equipo : {}; // Verificar si existe el campo 'equipo'
                let usuarioInfo = respuesta.usuario ? respuesta.usuario : {}; // Verificar si existe el campo 'usuario'
                tablaEquipos.append(`<tr>
                    <td>${respuesta.presId}</td>
                    <td>${respuesta.pres_Fec_Entrega}</td>
                    <td>${respuesta.pres_Hora_Entrega}</td>
                    <td>${respuesta.pres_Tiempo_Limite}</td>
                    <td>${respuesta.pres_Observaciones_Entrega}</td>
                    <td>${respuesta.equ_id_equipos.equ_id|| ''}</td> // Acceder al subcampo 'equ_id' o mostrar cadena vacía
                    <td>${respuesta.usu_Documento_usurios.usu_Documento || ''}</td> // Acceder al subcampo 'usu_Documento' o mostrar cadena vacía
                </tr>`);
            } else {
                alert("No se encontró el préstamo en la base de datos");
            }
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 404) {
                alert("No se encontró el préstamo en la base de datos");
            } else {
                alert("Ha ocurrido un error en la solicitud: " + errorThrown);
            }
        }
    });
});
///////////////////////// final Buscar Prestamo/////////////////////////////////////////////////////////////////////////////////////////////////

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
                let equipo = respuesta[i];
                let optionText = equipo.equ_id + " - " + equipo.equi_serial;
                let option = $("<option></option>").attr("value", equipo.equi_serial).text(optionText);
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
            let selectUsuarios = $("#usuarioDocumento");
            selectUsuarios.empty();
            
            for (let i = 0; i < respuesta.length; i++) {
                let usuario = respuesta[i];
                let optionText = usuario.usu_Documento + " - " + usuario.usu_Nombre + " " + usuario.usu_Apellido;
                let option = $("<option></option>").attr("value", usuario.usu_Documento).text(optionText);
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


