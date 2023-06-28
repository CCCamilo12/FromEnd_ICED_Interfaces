$(document).ready(function() {
    $('body').load('load', function(){
        let tablaBody = document.querySelector('#tabla2-body');
        tablaBody.innerHTML = ''; // Clear the table body before populating new data
        $.ajax({
            url: "http://localhost:8080/ListarUsuarios",
            type: "GET",
            dataType: "JSON",
            success: function(respuesta) {
                console.log(respuesta);
                for (let i = 0; i < respuesta.length; i++) {
                    tablaBody.innerHTML += '<tr>' +
                        '<td>' + respuesta[i].usu_Documento + '</td>' +
                        '<td>' + respuesta[i].usu_Nombre + '</td>' +
                        '<td>' + respuesta[i].usu_Apellido + '</td>' +
                        '<td>' + respuesta[i].usu_Tipo + '</td>' +
                        '<td>' + respuesta[i].usu_Celular + '</td>' +
                        '<td>' + respuesta[i].usu_Correo + '</td>' +
                        '<td>' + respuesta[i].usu_Ficha + '</td>' +
                        '</tr>';
                }
            }
        });
    });
});


$('#AgregarUsuario').on('click',function(){

    let datosUsario={
        usu_documento:$('#usu_documento').val(),
        usu_nombre:$('#usu_nombre').val(),
        usu_apellido:$('#usu_apellido').val(),
        usu_tipo:$('#usu_tipo').val(),
        usu_celular:$('#usu_celular').val(),    
        usu_correo:$('#usu_correo').val(),
        usu_ficha:$('#usu_ficha').val(),


    }
    let datosenvio=JSON.stringify(datosUsario)
    console.log(datosUsario)
    console.log(datosenvio)
    $.ajax({
        url: "http://localhost:8080/InsertarUsuario/",
        type: "POST",
        data: datosenvio,
        contentType: "application/JSON",
        datatype: JSON,
        success: function(respuesta){
            alert(respuesta)
        }
    })
})

