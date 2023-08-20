
//TABLA DONDE SE LISTAN LOS DATOS QUE AGREGAMOS
function listarequipo() {
    $(document).ready(function() {
        $('body').load('load', function() {
            let tablaBody = document.querySelector('#tabla1-body');
            tablaBody.innerHTML = ''; // Clear the table body before populating new data
            $.ajax({
                url: "http://localhost:8080/listarEquipos",
                type: "GET",
                dataType: "JSON",
                success: function(respuesta) {
                    console.log(respuesta);
                    for (let i = 0; i < respuesta.length; i++) {
                        tablaBody.innerHTML += '<tr>' +
                            '<td>' + respuesta[i].equ_id + '</td>' +
                            '<td>' + respuesta[i].equi_tipo + '</td>' +
                            '<td>' + respuesta[i].equi_modelo + '</td>' +
                            '<td>' + respuesta[i].equi_color + '</td>' +
                            '<td>' + respuesta[i].equi_serial + '</td>' +
                            '<td>' + respuesta[i].equi_estado + '</td>' +
                            '<td>' + respuesta[i].equi_especialidad + '</td>' +
                            '<td><button class="btnEliminar" onclick="eliminarEquipo(' + respuesta[i].equ_id + ')">Eliminar</button></td>' +
                            '</tr>';
                    }
                }
            });
        });
    });
}

// Nueva función para eliminar equipos
function eliminarEquipo(equ_id) {
    // Mostrar un SweetAlert2 de confirmación antes de realizar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, realizar la solicitud de eliminación
            $.ajax({
                url: "http://localhost:8080/Eliminar/" + equ_id,
                type: "DELETE",
                success: function(respuesta) {
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'El equipo ha sido eliminado.',
                        icon: 'success'
                    });
                    listarequipo();
                    obtenerCantidadEquipos(); // Actualizar el contador después de eliminar
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 404) {
                        Swal.fire('Error', 'No se encontró el equipo en la base de datos', 'error');
                    } else {
                        Swal.fire('Error', 'Ha ocurrido un error en la solicitud: ' + errorThrown, 'error');
                    }
                }
            });
        }
    });
}

//funcion para listar
listarequipo(); 


//AGREGAR EQUIPO
$('#Agregar').on('click',function(){

    let equ_id = $('#equ_id').val();
    let equi_tipo = $('#equi_tipo').val();
    let equi_modelo = $('#equi_modelo').val();
    let equi_color = $('#equi_color').val();
    let equi_serial = $('#equi_serial').val();
    let equi_estado = $('#equi_estado').val();
    let equi_especialidad = $('#equi_especialidad').val();

    if (equ_id === '' || equi_tipo === '' || equi_modelo === '' || equi_color === '' || equi_serial === '' || equi_estado === '' || equi_especialidad === '') {
        alert('Por favor, completa todos los campos.');
        return; // Detener la ejecución si hay campos vacíos
    }

    let datos = {
        equ_id: equ_id,
        equi_tipo: equi_tipo,
        equi_modelo: equi_modelo,
        equi_color: equi_color,
        equi_serial: equi_serial,    
        equi_estado: equi_estado,
        equi_especialidad: equi_especialidad,
    };

    let datosenvio = JSON.stringify(datos);
    
    $.ajax({
        url: "http://localhost:8080/insertarEquipo",
        type: "POST",
        data: datosenvio,
        contentType: "application/JSON",
        datatype: JSON,
        success: function(respuesta){
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Se agregó el equipo con éxito',
            }).then(function() {
                listarequipo();
                obtenerCantidadEquipos(); // Actualizar el contador después de eliminar
            });
        },
        
    });
});


//BUSCAR EQUIPO
$('#BuscarEquipo').on('click', function(){
    let tablaEquipos = document.querySelector('#tabla1-body');
    tablaEquipos.innerHTML = ''; 
    let dato = $("#id_equipoo").val();
    $.ajax({
        url: "http://localhost:8080/BuscarEquipo/" + dato,
        type: "GET",
        dataType: "json",
        success:function(respuesta){
            if (respuesta.hasOwnProperty('equ_id')) {
                tablaEquipos.innerHTML += '<tr>' +
                '<td>' + respuesta.equ_id + '</td>' +
                '<td>' + respuesta.equi_tipo + '</td>' +
                '<td>' + respuesta.equi_modelo + '</td>' +
                '<td>' + respuesta.equi_color + '</td>' +
                '<td>' + respuesta.equi_serial + '</td>' +
                '<td>' + respuesta.equi_estado + '</td>' +
                '<td>' + respuesta.equi_especialidad + '</td>' +
                '<td><button class="btnEliminar" onclick="eliminarEquipo(' + respuesta.equ_id + ')">Eliminar</button></td>' +
                '</tr>'; 
            } else {
               alert("No se encontró el equipo en la base de datos");
            }
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


//funciones adicionales para los contadores

//Funcion para contar equipos
function obtenerCantidadEquipos() {
    $.ajax({
        url: "http://localhost:8080/count",
        type: "GET",
        dataType: "text",
        success: function(respuesta) {
            $('.cantidad').text(respuesta); // Actualiza el contenido del contador1 con la cantidad obtenida
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error al obtener la cantidad de equipos:", errorThrown);
        }
    });
}

$(document).ready(function() {
    obtenerCantidadEquipos();
});
