$(document).ready(function(){
    $("#listar").on('click',function(){
        let tabla = document.querySelector('#tabla1');
        $.ajax({
            url:"http://localhost:8080/lista",
            type: "GET", 
            dataType: "JSON",
            success:function(respuesta){
                console.log(respuesta)
                for (i = 0; i<= respuesta.length; i++) {
                    tabla.innerHTML += '<tr><td>' + respuesta [i].cedula + '</td></tr>' +
                    '<tr><td>' + respuesta [i].nombre + '</td></tr>' +
                    '<tr><td>' + respuesta [i].apellido + '</td></tr>'+
                    '<tr><td>' + respuesta [i].edad + '</td></tr>'+
                    '<tr><td>' + respuesta [i].correo + '</td></tr>'+
                    '<tr><td>' + respuesta [i].telefono + '</td></tr>'
                }
            }
        })
    })
    $('#enviar').on('click',function(){

        let datos={
            cedula:$('#cedula').val(),
            nombre:$('#nombre').val(),
            apellido:$('#apellido').val(),
            edad: parseInt($('#edad').val()),
            correo:$('#correo').val(),
            telefono:parseInt($('#telefono').val()),

        }
        let datosenvio=JSON.stringify(datos)
        console.log(datos)
        console.log(datosenvio)
        $.ajax({
            url: "http://localhost:8080/agregarPersonas/",
            type: "POST",
            data: datosenvio,
            contentType: "application/JSON",
            datatype: JSON,
            success: function(respuesta){
                alert(respuesta)
            }
        })
    })
   /* $('#Buscar').on('click', function(){
        let dato = "camilo  "
        $.ajax({
            url: "http://localhost:8080/buscarPersona/" + dato,
            type: "GET",
            datatype: JSON,
            success:function(respuesta){
                if (respuesta) 
                    console.log(respuesta)
                else
                console.log("no esta en el sistema")

            }
        })

    })*/

    $('#Buscar').on('click', function(){
        let dato = $("#nom").val();
        $.ajax({
            url: "http://localhost:8080/buscarPersona/" + dato,
            type: "GET",
            datatype: JSON,
            success:function(respuesta){
                if (respuesta) 
                    alert(respuesta)
                else
                console.log("no esta en el sistema")

            }
        })

    });


    $('#Eliminar').on('click', function(){
        let dato = $("#nombrepersona").val();
        $.ajax({
            url: "http://localhost:8080/eliminarPersona/" + dato,
            type: "GET",
            datatype: JSON,
            success:function(respuesta){
                if (respuesta) 
                    console.log(respuesta)
                else
                console.log("no esta en el sistema")
            }
       })
    })


})
/*

400 error de ajax

402 no hay respuesta correcta

500 error en el servidor
*/



// AGREGAR EQUIPO
$('#Agregar').on('click', function() {
    let datos = {
        equ_id: $('#equ_id').val(),
        equi_tipo: $('#equi_tipo').val(),
        equi_modelo: $('#equi_modelo').val(),
        equi_color: $('#equi_color').val(),
        equi_serial: $('#equi_serial').val(),
        equi_estado: $('#equi_estado').val(),
        equi_especialidad: $('#equi_especialidad').val(),
    };

    // Validar campos obligatorios antes de enviar la solicitud
    if (datos.equi_tipo && datos.equi_modelo && datos.equi_color && datos.equi_serial && datos.equi_estado && datos.equi_especialidad) {
        let datosenvio = JSON.stringify(datos);
        console.log(datos);
        console.log(datosenvio);
        $.ajax({
            url: "http://localhost:8080/InsertarEquipo/",
            type: "POST",
            data: datosenvio,
            contentType: "application/JSON",
            dataType: "json",
            success: function(respuesta) {
                alert(respuesta);
                listarequipo();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Ha ocurrido un error en la solicitud: " + errorThrown);
            }
        });
    } else {
        alert("Por favor, complete todos los campos obligatorios");
    }
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



