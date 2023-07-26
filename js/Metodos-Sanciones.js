function listarSanciones() {
    $(document).ready(function() {
        $('body').load('load', function(){
            let tablaBody = document.querySelector('#tabla1-body');
            tablaBody.innerHTML = ''; // Clear the table body before populating new data
            $.ajax({
                url: "http://localhost:8080/listarSanciones",
                type: "GET",
                dataType: "JSON",
                success: function(respuesta) {
                    console.log(respuesta);
                    for (let i = 0; i < respuesta.length; i++) {
                        tablaBody.innerHTML += '<tr>' +
                            '<td>' + respuesta[i].pres_Id + '</td>' +
                            '<td>' + respuesta[i].san_Pres_Id + '</td>' +
                            '<td>' + respuesta[i].san_Hora + '</td>' +
                            '<td>' + respuesta[i].san_tiempo + '</td>' +
                            '<td>' + respuesta[i].san_Descripcion + '</td>' +
                            '<td>' + respuesta[i].san_Fecha + '</td>' +
                            '</tr>';
                    }
                }
            });
        });
    });
}
listarSanciones();

$('#AgregarSancion').on('click', function() {
    let pres_Id = $('#pres_Id').val(); // Obtener el ID del préstamo al que se asociará la sanción
    let san_Pres_Id = $('#san_Pres_Id').val();
    let san_Hora = $('#san_Hora').val();
    let san_tiempo = $('#san_tiempo').val();
    let san_Descripcion = $('#san_Descripcion').val();
    let san_Fecha = $('#san_Fecha').val();

    if (san_Hora === '' || san_tiempo === '' || san_Descripcion === '' || san_Fecha === '') {
        alert('Completa todos los campos')
        return;
    }

    let DatosSancion = {
        san_Pres_Id: parseInt(san_Pres_Id), // Convertir a número
        san_Hora: san_Hora,
        san_tiempo: parseInt(san_tiempo), // Convertir a número
        san_Descripcion: san_Descripcion,
        san_Fecha: san_Fecha,
    };
    

    let DatosEnvio = JSON.stringify(DatosSancion);
    console.log(DatosSancion);
    console.log(DatosEnvio);

    // Enviar la solicitud AJAX con los datos de la sanción y el ID del préstamo
    $.ajax({
        url: "http://localhost:8080/InsertarSanciones/",
        type: 'POST',
        data: DatosEnvio,
        contentType: "application/json",
        success: function (respuesta) {
            alert("Se agrego la Sancion correctamente");
            listarSanciones();
        }
    });
    
});



$(document).ready(function() {
    $('#ActualizarSancion').on('click', function () {
    let pres_Id = $('#pres_Id').val();
    let san_Pres_Id = $('#san_Pres_Id').val();
    let san_Hora = $('#san_Hora').val();
    let san_tiempo = $('#san_tiempo').val();
    let san_Descripcion = $('#san_Descripcion').val();
    let san_Fecha = $('#san_Fecha').val();

    let DatosPrestamo = {
        pres_Id: pres_Id,
        san_Pres_Id: san_Pres_Id,
        san_Hora: san_Hora,
        san_tiempo: san_tiempo,
        san_Descripcion: san_Descripcion,
        san_Fecha: san_Fecha,
    };

    let DatosEnvio = JSON.stringify(DatosPrestamo);
    console.log(DatosPrestamo);
    console.log(DatosEnvio);

    $.ajax({
        url: "http://localhost:8080/ActualizarSanciones/",
        type: 'POST',
        data: DatosEnvio,
        contentType: "application/json",
        dataType: "json", 
        success: function (respuesta) {
        alert(respuesta);
        listarSanciones();
        }
    });
    });
});


$('#EliminarSancion').on('click', function() {
    let codigo = $("#pres_Idd").val();

    if (codigo === '') {
        alert('Por favor, completa el campo');
        return; // Detener la ejecución si hay campos vacíos
    }

    $.ajax({
        url: "http://localhost:8080/EliminarSanciones/" + codigo,
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

//Buscar Sancion por ID  
$('#BuscarSancion').on('click', function(){
    let tablaEquipos = document.querySelector('#tabla1-body');
    tablaEquipos.innerHTML = ''; 
    let dato = $("#id_Sancioon").val();
    $.ajax({
        url: "http://localhost:8080/BuscarSanciones/" + dato,
        type: "GET",
        dataType: "json",
        success:function(respuesta){
            if (respuesta.hasOwnProperty('pres_Id')) {
                tablaEquipos.innerHTML += '<tr>' +
                '<td>' + respuesta.pres_Id + '</td>' +
                '<td>' + respuesta.san_Pres_Id + '</td>' +
                '<td>' + respuesta.san_Hora + '</td>' +
                '<td>' + respuesta.san_tiempo + '</td>' +
                '<td>' + respuesta.san_Descripcion + '</td>' +
                '<td>' + respuesta.san_Fecha + '</td>' +
                '</tr>'; 


            } else {
            alert("No se encontró la sancion en la base de datos");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 404) {
                alert("No se encontró la sancion en la base de datos");
            } else {
                alert("Ha ocurrido un error en la solicitud: " + errorThrown);
            }
        }
    });
});
