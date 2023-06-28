$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/ListarPrestamos",
        type: "GET",
        dataType: "json",
        success: function(respuesta) {
            console.log(respuesta);
            let tablaBody = $("#tabla2-body");
            tablaBody.empty(); // Limpiar el contenido anterior de la tabla

            respuesta.forEach(function(prestamo) {
                tablaBody.append(`<tr>
                    <td>${prestamo.pres_Id}</td>
                    <td>${prestamo.pres_Fec_Entrega}</td>
                    <td>${prestamo.pres_Fec_Devolucion}</td>
                    <td>${prestamo.pres_Hora_Entrega}</td>
                    <td>${prestamo.pres_Hora_Devolucion}</td>
                    <td>${prestamo.pres_Tiempo_Limite}</td>
                    <td>${prestamo.pres_Observaciones_entrega}</td>
                    <td>${prestamo.pres_Observaciones_recibido}</td>
                </tr>`);
            });
        },
        error: function() {
            console.log("Error al obtener la lista de préstamos");
        }
    });
});
