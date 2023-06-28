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

    })


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