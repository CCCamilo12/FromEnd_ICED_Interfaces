//Listar datos de Usuarios
function ListarUsuario() {
    $(document).ready(function() {
        $('body').load('load', function(){
            let tablaBody = document.querySelector('#tabla2-body');
            tablaBody.innerHTML = '';
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
}
ListarUsuario();

//Agregar Usuario
$('#AgregarUsuario').on('click',function(){
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
            ListarUsuario();
        }
    })
})

//BUSCAR USUARIO
$('#BuscarUsuario').on('click',function(){
    let tablaUsuario = document.querySelector('#tabla2-body');
    tablaUsuario.innerHTML = ''; 
    let dato = $("#id_usuarioo").val();
        $.ajax({
            url: "http://localhost:8080/BuscarUsuario/" + dato,
            type: "GET",
            dataType: "json",
            success: function(respuesta) {
                if (respuesta.hasOwnProperty('usu_Documento')){
                    tablaUsuario.innerHTML += '<tr>' +
                        '<td>' + respuesta.usu_Documento + '</td>' +
                        '<td>' + respuesta.usu_Nombre + '</td>' +
                        '<td>' + respuesta.usu_Apellido + '</td>' +
                        '<td>' + respuesta.usu_Tipo + '</td>' +
                        '<td>' + respuesta.usu_Celular + '</td>' +
                        '<td>' + respuesta.usu_Correo + '</td>' +
                        '<td>' + respuesta.usu_Ficha + '</td>' +
                        '</tr>';
                }else{
                    alert("No se encontró el usuario en la base de datos");
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

// Eliminar Usuario
$('#EliminarUsuario').on('click',function(){
    let documento = $('#documento_usuario').val();
    $.ajax({
        url: "http://localhost:8080/EliminarUsuario/" + documento,
        type: "DELETE",
        success: function(respuesta){
            alert(respuesta);
            ListarUsuario();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 404) {
                alert("No se encontró el usuario en la base de datos");
            } else {
                alert("Ha ocurrido un error en la solicitud: " + errorThrown);
            }
        }
    });
});

//ACTUALIZAR USUARIO
$('#ActualizarUsuario').on('click',function(){
    let datosUsario={
        usu_Documento:$('#usu_Documento_id_actualizar').val(),
        usu_Nombre:$('#usu_Nombre_id_actualizar').val(),
        usu_Apellido:$('#usu_Apellido_id_actualizar').val(),
        usu_Tipo:$('#usu_Tipo_id_actualizar').val(),
        usu_Celular:$('#usu_Celular_id_actualizar').val(),    
        usu_Correo:$('#usu_Correo_id_actualizar').val(),
        usu_Ficha:$('#usu_Ficha_id_actualizar').val(),
    }
    let datosenvio=JSON.stringify(datosUsario)
    console.log(datosUsario)
    console.log(datosenvio)
    $.ajax({
        url: "http://localhost:8080/ActualizarUsuario",
        type: "POST",
        data: datosenvio,
        contentType: "application/JSON",
        datatype: JSON,
        success: function(respuesta){
            alert(respuesta)
            ListarUsuario();
        }
    })
})

