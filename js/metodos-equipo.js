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

    let datos={
        equ_id:$('#equ_id').val(),
        equi_tipo:$('#equi_tipo').val(),
        equi_modelo:$('#equi_modelo').val(),
        equi_color:$('#equi_color').val(),
        equi_serial:$('#equi_serial').val(),    
        equi_estado:$('#equi_estado').val(),
        equi_especialidad:$('#equi_especialidad').val(),

    }
    let datosenvio=JSON.stringify(datos)
    console.log(datos)
    console.log(datosenvio)
    $.ajax({
        url: "http://localhost:8080/InsertarEquipo/",
        type: "POST",
        data: datosenvio,
        contentType: "application/JSON",
        datatype: JSON,
        success: function(respuesta){
            alert(respuesta)
            listarequipo();
            
            
        }
    })
})

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

//actualizar equipo
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
    let datosEnvio = JSON.stringify(equipo);
    $.ajax({
        url: "http://localhost:8080/ActualizarEquipo",
        type: "POST",
        data: datosEnvio,
        contentType: "application/json",
        dataType: "json",
        success: function(respuesta) {
            alert("Actualización de datos exitosa");
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


