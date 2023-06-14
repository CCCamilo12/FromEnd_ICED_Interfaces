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