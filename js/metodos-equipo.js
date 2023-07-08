//TABLA DONDE SE LISTAN LOS DATOS QUE AGREGAMOS
function listarequipo() {
    $(document).ready(function() {
        $('body').load('load', function(){
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
                            '</tr>';
                    }
                }
            });
        });
    });
}

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
$('#ActualizarEquipo').on('click', function() {
    let equipo = {
        equ_id: $('#equi_id_actualizar').val(),
        equi_tipo: $('#equi_tipo_actualizar').val(),
        equi_modelo: $('#equi_modelo_actualizar').val(),
        equi_color: $('#equi_color_actualizar').val(),
        equi_serial: $('#equi_serial_actualizar').val(),
        equi_estado: $('#equi_estado_actualizar').val(),
        equi_especialidad: $('#equi_especialidad_actualizar').val()
    };

    // Validar campos obligatorios antes de enviar la solicitud
    if (equipo.equ_id && equipo.equi_tipo && equipo.equi_modelo && equipo.equi_color && equipo.equi_serial && equipo.equi_estado && equipo.equi_especialidad) {
        let datosEnvio = JSON.stringify(equipo);
        $.ajax({
            url: "http://localhost:8080/ActualizarEquipo",
            type: "POST",
            data: datosEnvio,
            contentType: "application/json",
            dataType: "json",
            success: function(respuesta) {
                if (respuesta === "Actualización de datos exitosa") {
                    alert(respuesta);
                    listarequipo();
                } else {
                    alert("Ha ocurrido un error en la actualización de datos");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR); // Imprimir el objeto jqXHR en la consola del navegador
                if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                    alert("Ha ocurrido un error en la solicitud: " + jqXHR.responseJSON.message);
                } else {
                    alert("Ha ocurrido un error en la solicitud. Consulta la consola para más detalles.");
                }
            }
        });
    } else {
        alert("Por favor, complete todos los campos obligatorios");
    }
});
