//TABLA DONDE SE LISTAN LOS DATOS QUE AGREGAMOS
    $(document).ready(function() {
        $('body').load('load', function(){
            let tablaBody = document.querySelector('#tabla1-body');
            tablaBody.innerHTML = '';
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

