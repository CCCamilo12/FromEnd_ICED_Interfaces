$(document).ready(function () {
    // Mostrar el modal cuando se haga clic en el botón "Actualizar"
    $('body').on('click', '.btnActualizar', function () {
        const id = $(this).data('id'); // Obtener el ID del registro a actualizar
        // Aquí puedes cargar los datos del registro en el modal
        // Por ejemplo:
        // const tipo = $(this).closest('tr').find('td:nth-child(2)').text();
        // const modelo = $(this).closest('tr').find('td:nth-child(3)').text();
        // ...

        // Abre el modal
        $('#myModal').show();

        // Aquí actualiza los campos del formulario con la información del registro seleccionado
        // Por ejemplo:
        // $('#updateTipo').val(tipo);
        // $('#updateModelo').val(modelo);

        // Manejar el evento de envío del formulario para actualizar el registro
        $('#updateForm').on('submit', function (e) {
            e.preventDefault();
            // Aquí obtén los valores actualizados del formulario y envíalos al servidor para actualizar el registro
            // Puedes hacer esto usando AJAX para enviar la solicitud de actualización
            // Por ejemplo:
            // const nuevoTipo = $('#updateTipo').val();
            // const nuevoModelo = $('#updateModelo').val();
            // ...

            // Luego, envía la solicitud de actualización al servidor con los datos actualizados y maneja la respuesta

            // Cierra el modal después de actualizar el registro
            $('#myModal').hide();
        });
    });

    // Cerrar el modal cuando se haga clic en la "X"
    $('.close').on('click', function () {
        $('#myModal').hide();
    });
});

$(document).ready(function () {
    // ... Your existing code for modal1

    // Handle the click event for the Insertar button
    $('body').on('click', '.btnInsertar', function () {
        // Open the second modal (modal2)
        $('#myModal2').show();

        // Add any additional logic or actions you need for the second modal
        // ...
    });

    // Handle the click event for closing modal2 (the "X" button)
    $('.close2').on('click', function () {
        $('#myModal2').hide();
    });
});



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
    $.ajax({
        url: "http://localhost:8080/Eliminar/" + equ_id,
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
    console.log(datos);
    console.log(datosenvio);
    
    $.ajax({
        url: "http://localhost:8080/InsertarEquipo/",
        type: "POST",
        data: datosenvio,
        contentType: "application/JSON",
        datatype: JSON,
        success: function(respuesta){
            alert("Se agregó el equipo con éxito");
            listarequipo();   
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

 //ELIMAR POR CODIGO
$('#EliminarEquipo').on('click', function() {
    let codigo = $("#codigo_equipo").val();

    if (codigo === '') {
        alert('Por favor, completa el campo');
        return; // Detener la ejecución si hay campos vacíos
    }

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

