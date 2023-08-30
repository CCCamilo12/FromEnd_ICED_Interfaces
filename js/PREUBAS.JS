$(document).ready(function(){
    $("#listar").on('click',function(){
        let tabla = document.querySelector('#tabla1');
        $.ajax({
            url:"http://localhost:8080/lista",
            type: "GET", 
            dataType: "JSON",
            success:function(respuesta){
                console.log(respuesta)
                for (i = 0; i<= respuesta.length; i++) {
                    tabla.innerHTML += '<tr><td>' + respuesta [i].cedula + '</td></tr>' +
                    '<tr><td>' + respuesta [i].nombre + '</td></tr>' +
                    '<tr><td>' + respuesta [i].apellido + '</td></tr>'+
                    '<tr><td>' + respuesta [i].edad + '</td></tr>'+
                    '<tr><td>' + respuesta [i].correo + '</td></tr>'+
                    '<tr><td>' + respuesta [i].telefono + '</td></tr>'
                }
            }
        })
    })
    $('#enviar').on('click',function(){

        let datos={
            cedula:$('#cedula').val(),
            nombre:$('#nombre').val(),
            apellido:$('#apellido').val(),
            edad: parseInt($('#edad').val()),
            correo:$('#correo').val(),
            telefono:parseInt($('#telefono').val()),

        }
        let datosenvio=JSON.stringify(datos)
        console.log(datos)
        console.log(datosenvio)
        $.ajax({
            url: "http://localhost:8080/agregarPersonas/",
            type: "POST",
            data: datosenvio,
            contentType: "application/JSON",
            datatype: JSON,
            success: function(respuesta){
                alert(respuesta)
            }
        })
    })
   /* $('#Buscar').on('click', function(){
        let dato = "camilo  "
        $.ajax({
            url: "http://localhost:8080/buscarPersona/" + dato,
            type: "GET",
            datatype: JSON,
            success:function(respuesta){
                if (respuesta) 
                    console.log(respuesta)
                else
                console.log("no esta en el sistema")

            }
        })

    })*/

    $('#Buscar').on('click', function(){
        let dato = $("#nom").val();
        $.ajax({
            url: "http://localhost:8080/buscarPersona/" + dato,
            type: "GET",
            datatype: JSON,
            success:function(respuesta){
                if (respuesta) 
                    alert(respuesta)
                else
                console.log("no esta en el sistema")

            }
        })

    });


    $('#Eliminar').on('click', function(){
        let dato = $("#nombrepersona").val();
        $.ajax({
            url: "http://localhost:8080/eliminarPersona/" + dato,
            type: "GET",
            datatype: JSON,
            success:function(respuesta){
                if (respuesta) 
                    console.log(respuesta)
                else
                console.log("no esta en el sistema")
            }
       })
    })


})
/*

400 error de ajax

402 no hay respuesta correcta

500 error en el servidor
*/



// AGREGAR EQUIPO
$('#Agregar').on('click', function() {
    let datos = {
        equ_id: $('#equ_id').val(),
        equi_tipo: $('#equi_tipo').val(),
        equi_modelo: $('#equi_modelo').val(),
        equi_color: $('#equi_color').val(),
        equi_serial: $('#equi_serial').val(),
        equi_estado: $('#equi_estado').val(),
        equi_especialidad: $('#equi_especialidad').val(),
    };

    // Validar campos obligatorios antes de enviar la solicitud
    if (datos.equi_tipo && datos.equi_modelo && datos.equi_color && datos.equi_serial && datos.equi_estado && datos.equi_especialidad) {
        let datosenvio = JSON.stringify(datos);
        console.log(datos);
        console.log(datosenvio);
        $.ajax({
            url: "http://localhost:8080/InsertarEquipo/",
            type: "POST",
            data: datosenvio,
            contentType: "application/JSON",
            dataType: "json",
            success: function(respuesta) {
                alert(respuesta);
                listarequipo();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Ha ocurrido un error en la solicitud: " + errorThrown);
            }
        });
    } else {
        alert("Por favor, complete todos los campos obligatorios");
    }
});



 //ELIMAR POR CODIGO
 $('#EliminarEquipo').on('click', function() {
    let codigo = $("#codigo_equipo").val();
    $.ajax({
        url: "http://localhost:8080/Eliminar/" + codigo,
        type: "DELETE",
        success: function(respuesta) {
            alert(respuesta);
            listarequipo();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 404) {
                alert("No se encontró el equipo en la base de datos");
            } else {
                alert("Ha ocurrido un error en la solicitud: " + errorThrown);
            }
        }
    });
});



$(document).on('click', '#ActualizarEquipo', function() {
    let equ_id = $('#equi_id_actualizar').val();
    let equi_tipo = $('#equi_tipo_actualizar').val();
    let equi_modelo = $('#equi_modelo_actualizar').val();
    let equi_color = $('#equi_color_actualizar').val();
    let equi_serial = $('#equi_serial_actualizar').val();
    let equi_estado = $('#equi_estado_actualizar').val();
    let equi_especialidad = $('#equi_especialidad_actualizar').val();

    let datosActualizados = {
        equ_id: equ_id,
        equi_tipo: equi_tipo,
        equi_modelo: equi_modelo,
        equi_color: equi_color,
        equi_serial: equi_serial,
        equi_estado: equi_estado,
        equi_especialidad: equi_especialidad,
    };

    let datosenvio = JSON.stringify(datosActualizados);

    $.ajax({
        url: "http://localhost:8080/ActualizarEquipo/",
        type: "POST",
        data: datosenvio,
        contentType: "application/JSON",
        success: function(respuesta) {
            alert(respuesta);
            listarequipo();
            $('#formularioActualizar').hide(); // Hide the update form after updating
        }
    });
});


function actualizarEquipo(equ_id) {
    $.ajax({
        url: "http://localhost:8080/obtenerEquipo/" + equ_id, // Endpoint para obtener los detalles del equipo
        type: "GET",
        dataType: "json",
        success: function(respuesta) {
            // Llenar el formulario con los detalles del equipo
            $('#equi_tipo_actualizar').val(respuesta.equi_tipo);
            $('#equi_modelo_actualizar').val(respuesta.equi_modelo);
            $('#equi_color_actualizar').val(respuesta.equi_color);
            $('#equi_serial_actualizar').val(respuesta.equi_serial);
            $('#equi_estado_actualizar').val(respuesta.equi_estado);
            $('#equi_especialidad_actualizar').val(respuesta.equi_especialidad);
            
            // Agregar un evento click al botón ActualizarEquipo para enviar la solicitud de actualización
            $('#ActualizarEquipo').on('click', function() {
                let datos = {
                    equi_tipo: $('#equi_tipo_actualizar').val(),
                    equi_modelo: $('#equi_modelo_actualizar').val(),
                    equi_color: $('#equi_color_actualizar').val(),
                    equi_serial: $('#equi_serial_actualizar').val(),
                    equi_estado: $('#equi_estado_actualizar').val(),
                    equi_especialidad: $('#equi_especialidad_actualizar').val(),
                };

                let datosenvio = JSON.stringify(datos);

                $.ajax({
                    url: "http://localhost:8080/actualizarEquipo/" + equ_id, // Endpoint para actualizar el equipo
                    type: "PUT",
                    data: datosenvio,
                    contentType: "application/JSON",
                    dataType: "json",
                    success: function(respuesta) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: 'Se actualizó el equipo con éxito',
                        }).then(function() {
                            // Limpiar el formulario
                            $('#updateForm')[0].reset();

                            // Volver a listar los equipos y actualizar el contador
                            listarequipo();
                            obtenerCantidadEquipos();
                        });
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        Swal.fire('Error', 'Ha ocurrido un error en la solicitud: ' + errorThrown, 'error');
                    }
                });
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 404) {
                alert("No se encontró el equipo en la base de datos");
            } else {
                alert("Ha ocurrido un error en la solicitud: " + errorThrown);
            }
        }
    });
}


// ACTUALIZAR EQUIPO
$('#ActualizarEquipo').on('click',function(){
    let equ_id = $('#equi_id_actualizar').val();
    
    // Realizar una solicitud al servidor para obtener los datos actuales del equipo
    $.ajax({
        url: "http://localhost:8080/BuscarEquipo/" + equ_id,
        type: "GET",
        success: function(respuesta){
            // Aquí obtienes los datos actuales del equipo desde la respuesta del servidor
            
            // Obtener los nuevos valores del formulario
            $('#equi_id_actualizar').val(respuesta.equi_id);
            $('#equi_tipo_actualizar').val(respuesta.equi_tipo);
            $('#equi_modelo_actualizar').val(respuesta.equi_modelo);
            $('#equi_color_actualizar').val(respuesta.equi_color);
            $('#equi_serial_actualizar').val(respuesta.equi_serial);
            $('#equi_estado_actualizar').val(respuesta.equi_estado);
            $('#equi_especialidad_actualizar').val(respuesta.equi_especialidad);
            
            // Combinar los datos actuales con los nuevos valores
            let datosActualizados = {
                equ_id: equ_id,
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

º
// ACTUALIZAR EQUIPO funcon real
function actualizarEquipo(equ_id) {
    // Make an AJAX call to get the data of the selected record
    $.ajax({
        url: "http://localhost:8080/BuscarEquipo/" + equ_id,
        type: "GET",
        dataType: "JSON",
        success: function(respuesta) {
            // Populate the update form with the retrieved data, including ID
            $('#equi_id_actualizar').val(respuesta.equ_id);
            $('#equi_tipo_actualizar').val(respuesta.equi_tipo);
            $('#equi_modelo_actualizar').val(respuesta.equi_modelo);
            $('#equi_color_actualizar').val(respuesta.equi_color);
            $('#equi_serial_actualizar').val(respuesta.equi_serial);
            $('#equi_estado_actualizar').val(respuesta.equi_estado);
            $('#equi_especialidad_actualizar').val(respuesta.equi_especialidad);
    
        },
        error: function(error) {
            // Handle error if needed
        }
    });
}




function actualización(equ_id) {
    let equ_id = $('#equi_id_actualizar').val();
    
    // Realizar una solicitud al servidor para obtener los datos actuales del equipo
    $.ajax({
        url: "http://localhost:8080/BuscarEquipo/" + equ_id,
        type: "GET",
        success: function(respuesta){
            // Aquí obtienes los datos actuales del equipo desde la respuesta del servidor
            
            // Obtener los nuevos valores del formulario
            let equi_tipo = $('#equi_tipo_actualizar').val();
            let equi_modelo = $('#equi_modelo_actualizar').val();
            let equi_color = $('#equi_color_actualizar').val();
            let equi_serial = $('#equi_serial_actualizar').val();
            let equi_estado = $('#equi_estado_actualizar').val();
            let equi_especialidad = $('#equi_especialidad_actualizar').val();
            
            // Combinar los datos actuales con los nuevos valores
            let datosActualizados = {
                equ_id: equ_id,
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
}

$('#ActualizarEquipo').on('click',function(){
    let equ_id = $('#equi_id_actualizar').val();
    
    // Realizar una solicitud al servidor para obtener los datos actuales del equipo
    $.ajax({
        url: "http://localhost:8080/BuscarEquipo/" + equ_id,
        type: "GET",
        success: function(respuesta){
            // Aquí obtienes los datos actuales del equipo desde la respuesta del servidor
            
            // Obtener los nuevos valores del formulario
            let equi_tipo = $('#equi_tipo_actualizar').val();
            let equi_modelo = $('#equi_modelo_actualizar').val();
            let equi_color = $('#equi_color_actualizar').val();
            let equi_serial = $('#equi_serial_actualizar').val();
            let equi_estado = $('#equi_estado_actualizar').val();
            let equi_especialidad = $('#equi_especialidad_actualizar').val();
            
            // Combinar los datos actuales con los nuevos valores
            let datosActualizados = {
                equ_id: equ_id,
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