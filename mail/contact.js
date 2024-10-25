$(function () {
    $("#contactForm").on("submit", function (event) {
        event.preventDefault(); // Prevenir el envío normal del formulario

        var name = $("input#name").val();
        var email = $("input#email").val();
        var subject = $("input#subject").val();
        var message = $("textarea#message").val();

        var $this = $("#sendMessageButton");
        $this.prop("disabled", true); // Desactivar el botón para evitar múltiples envíos

        var formData = new FormData(this);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
        .then(function (response) {
            if (response.ok) {
                // Mensaje de éxito
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                $('#success > .alert-success').append("<strong>Your message has been sent successfully.</strong>");
                $('#success > .alert-success').append('</div>');
                $('#contactForm').trigger("reset"); // Limpiar el formulario
            } else {
                // Mensaje de error
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", something went wrong. Please try again later."));
                $('#success > .alert-danger').append('</div>');
            }
        })
        .catch(function (error) {
            // Mensaje de error
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
            $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", something went wrong. Please try again later."));
            $('#success > .alert-danger').append('</div>');
        })
        .finally(function () {
            setTimeout(function () {
                $this.prop("disabled", false); // Rehabilitar el botón de enviar
            }, 1000);
        });
    });

    $('#name').focus(function () {
        $('#success').html(''); // Limpiar mensajes de éxito o error al comenzar a escribir
    });
});
