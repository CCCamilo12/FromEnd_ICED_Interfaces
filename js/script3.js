$(document).ready(function () {
    // Mostrar el modal cuando se haga clic en el botón "Actualizar"
    $('body').on('click', '.btnActualizar', function () {
        const id = $(this).data('id'); // Obtener el ID del registro a actualizar
        // Aquí puedes cargar los datos del registro en el modal
        // Por ejemplo:
        // const tipo = $(this).closest('tr').find('td:nth-child(2)').text();
        // const modelo = $(this).closest('tr').find('td:nth-child(3)').text();
        // ...

        // Abre el modal
        $('#myModal').show();

        // Aquí actualiza los campos del formulario con la información del registro seleccionado
        // Por ejemplo:
        // $('#updateTipo').val(tipo);
        // $('#updateModelo').val(modelo);

        // Manejar el evento de envío del formulario para actualizar el registro
        $('#updateForm').on('submit', function (e) {
            e.preventDefault();
            // Aquí obtén los valores actualizados del formulario y envíalos al servidor para actualizar el registro
            // Puedes hacer esto usando AJAX para enviar la solicitud de actualización
            // Por ejemplo:
            // const nuevoTipo = $('#updateTipo').val();
            // const nuevoModelo = $('#updateModelo').val();
            // ...

            // Luego, envía la solicitud de actualización al servidor con los datos actualizados y maneja la respuesta

            // Cierra el modal después de actualizar el registro
            $('#myModal').hide();
        });
    });

    // Cerrar el modal cuando se haga clic en la "X"
    $('.close').on('click', function () {
        $('#myModal').hide();
    });
});

$(document).ready(function () {
    // ... Your existing code for modal1

    // Handle the click event for the Insertar button
    $('body').on('click', '.btnInsertar', function () {
        // Open the second modal (modal2)
        $('#myModal2').show();

        // Add any additional logic or actions you need for the second modal
        // ...
    });

    // Handle the click event for closing modal2 (the "X" button)
    $('.close2').on('click', function () {
        $('#myModal2').hide();
    });
});
