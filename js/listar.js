$(document).ready(function() {
    $('body').load('load', function(){
        let tablaBody = document.querySelector('#tabla1-body');
        tablaBody.innerHTML = ''; // Clear the table body before populating new data
        $.ajax({
            url: "http://localhost:8080/listarequipos",
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
