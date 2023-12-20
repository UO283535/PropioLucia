class Empleado{
    mostrarInformacion() {
        $.ajax({
            type: "POST",
            url: "libre.php", // Cambia esto al nombre de tu archivo PHP
            data: { action: "mostrarInformacion" },
            success: function (response) {
                $("article").html(response);
            },
            error: function () {
                alert("Error al cargar la información.");
            }
        });
    }
}
var empleado = new Empleado();