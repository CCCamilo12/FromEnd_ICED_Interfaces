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

//Agregar Usuario
$('#AgregarUsuario').on('click',function(){
    alert("holaa")
    let datosUsario={
        usu_Documento:$('#usu_Documento').val(),
        usu_Nombre:$('#usu_Nombre').val(),
        usu_Apellido:$('#usu_Apellido').val(),
        usu_Tipo:$('#usu_Tipo').val(),
        usu_Celular:$('#usu_Celular').val(),    
        usu_Correo:$('#usu_Correo').val(),
        usu_Ficha:$('#usu_Ficha').val(),


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

