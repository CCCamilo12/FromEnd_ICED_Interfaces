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

//Agregar Sanciones
$('#AgregarSancion').on('click',function(){
    let pres_Id = $('#pres_Id').val();
    let san_Pres_Id = $('#san_Pres_Id').val();
    let san_Hora = $('#san_Hora').val();
    let san_tiempo = $('#san_tiempo').val();
    let san_Descripcion = $('#san_Descripcion').val();
    let san_Fecha = $('#san_Fecha').val();

    if(pres_Id=== ''|| san_Pres_Id ===''|| san_Hora ===''|| san_tiempo ===''|| san_Descripcion ===''|| san_Fecha ===''){
        alert('Completa todos los campos')
        return;// Detiene la ejecucion si hay error 
    }
    
    let DatosPrestamo = {
        pres_Id:pres_Id,
        san_Pres_Id:san_Pres_Id,
        san_Hora:san_Hora,
        san_tiempo:san_tiempo,
        san_Descripcion:san_Descripcion,
        san_Fecha:san_Fecha,
    };

    let DatosEnvio = JSON.stringify(DatosPrestamo);
    console.log(DatosPrestamo);
    console.log(DatosEnvio);

    $.ajax({
        url: "http://localhost:8080/InsertarSanciones/",
        type:'POST',
        data: DatosEnvio,
        contentType: "application/JSON",
        datatype: JSON,
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
        contentType: "application/json", // Corrección: contentType debe ser "application/json"
        dataType: "json", // Corrección: dataType debe ser "json"
        success: function (respuesta) {
        alert(respuesta);
        listarSanciones();
        }
    });
    });
});
