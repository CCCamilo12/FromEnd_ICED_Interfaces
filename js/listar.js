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
