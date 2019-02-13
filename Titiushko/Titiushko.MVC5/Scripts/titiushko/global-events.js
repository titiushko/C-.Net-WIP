/**
 * Evento que se ejecuta cada vez que se hace un request ajax
 * Si es un request tipo POST, entonces se agrega el token __RequestVerificationToken al data del request
 */
$(document).ajaxSend(function (event, jqXHR, ajaxOptions) {
    if (ajaxOptions.type.toUpperCase() == "POST") {
        if (!IsNullOrEmpty(ajaxOptions.data)) {
            if (TypeOf(ajaxOptions.data) == "Object" && IsNullOrEmpty(ajaxOptions.data["__RequestVerificationToken"])) {
                ajaxOptions.data["__RequestVerificationToken"] = $("input[name='__RequestVerificationToken']").val();
            }
            else if (TypeOf(ajaxOptions.data) == "String" && ajaxOptions.data.indexOf("__RequestVerificationToken") == -1) {
                ajaxOptions.data += "&__RequestVerificationToken=" + $("input[name='__RequestVerificationToken']").val();
            }
        }
    }
});

/**
 * Evento para regresar a la página anterior
 */
$("#BackPreviousPage").click(function (event) {
    event.preventDefault();
    Titiushko.Redirect.back(this);
});