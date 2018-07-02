Titiushko["Messages"] = new function () {
    /**
     * Display message error response from an AJAX request
     */
    this.Error = function (message, closeModals) {
        if (closeModals != undefined && closeModals) alertify.closeAll();
        var content = undefined;
        if (message != undefined) {
            if (Array.isArray(message)) {
                if (message.length > 3) {
                    content = "<ul>";
                    message.forEach(function (element, index) {
                        console.warn(element);
                        content += "<li>" + element + "</li>";
                    });
                    content += "</ul>";
                }
                else {
                    message.forEach(function (element, index) {
                        console.warn(element);
                        alertify.error(element);
                    });
                }
            }
            else if (message.length <= 150) {
                console.warn(message);
                alertify.error(message);
            }
            else {
                console.warn(message);
                content =
                "<p><sup><small><i>" +
                    "Si el problema continúa, por favor envíe éste error al administrador de Titiushko (utilice el botón \"Copiar error al portapapeles\")." +
                "</i></small></sup></p>" +
                "<div id='ErrorPeticion'>" + message + "</div>";
            }
            if (content) {
                alertify.closeAll();
                Titiushko.MyAlertify.alert({
                    title: "<i class='fa fa-times-circle text-danger'></i> Error de Petición",
                    content: content,
                    closable: true,
                    onShow: function () {
                        $(".ajs-content")
                        .prepend("<span class='pull-right'><small id='boton-copiar'></small></span>").find("small#boton-copiar")
                        .append($("<a/>", {
                            "id": "CopiarError",
                            "class": "cursor-pointer",
                            "title": "Copiar error al portapapeles",
                            "data-toggle": "tooltip",
                            "data-clipboard-action": "copy",
                            "data-clipboard-target": "#ErrorPeticion",
                            "html": "<i class='fa fa-clipboard'></i>"
                        }).click(function (e) {
                            e.preventDefault();
                            var clipboard = new Clipboard("#CopiarError");
                            clipboard.on("success", function (event) {
                                event.clearSelection();
                                alertify.success("El error se copió a su portapapeles.");
                                clipboard.destroy();
                            });
                            clipboard.on("error", function (event) {
                                alertify.error("No se pudo copiar a su portapapeles.");
                                clipboard.destroy();
                            });
                        }));
                    }
                });
            }
        }
    };

    /**
     * Display message success response from an AJAX request
     */
    this.Success = function (message, closeModals) {
        if (closeModals != undefined && closeModals) alertify.closeAll();
        if (message != undefined) {
            if (Array.isArray(message)) {
                message.forEach(function (element, index) {
                    alertify.success(element);
                });
            }
            else {
                alertify.success(message);
            }
        }
    };

    /**
     * Display message exception from an AJAX request
     */
    this.Exception = function (exception, message, request) {
        alertify.closeAll();
        if (request != undefined || request != null) request = request.indexOf("://") == -1 ? BASE_URL + request : request; else request = "";

        var message_error = Titiushko.Constants.Errors.DEFAULT(null, "Mientras se intenta " + message) + "<br>";
        var exception_error = "";

        if (exception.status != undefined) {
            message_error += exception.status + " (" + exception.statusText + ").<br>";
            exception_error = exception.responseText;

            if ([400, 404, 500].indexOf(exception.status) != -1) {
                var error = exception.responseText.toHtml();
                var content =
                "<p>" +
                    "<sup><small><i>Si el problema continúa, por favor envíe éste error al administrador de Titiushko.</i></small></sup>" +
                    (error.indexOf("<code>") != -1 ? "<span class='label label-info pull-right' style='animation: bounce 1s infinite;' title='Minimizar | Cerra'><i class='fa fa-2x fa-arrow-up'></i></span>" : "") +
                "</p>" +
                "<div id='ErrorPeticion'>" + error + "</div>";
                Titiushko.MyAlertify.alert({
                    title: "<i class='fa fa-times-circle text-danger'></i> Error de Petición",
                    content: content,
                    closable: true,
                    startMaximized: error.indexOf("<code>") != -1
                });
            }
        }
        else {
            exception_error = JSON.stringify(exception);
            exception_error = exception_error === "{}" ? (exception.message === undefined ? exception : exception.message) : exception_error;
        }

        console.warn(message_error);
        console.warn(exception_error);
        alertify.error(message_error);

        $.ajax({
            data: { exception: JSON.stringify({ exception: exception_error, message: message, location: location.href, request: request }) },
            type: "POST",
            dataType: "json",
            url: BASE_URL + "log-exception",
            success: function (response) { if (response.error) console.warn(response.message); },
            error: function (exception) { console.warn(exception); }
        });
    };

    /**
     * Do if response is error or denied
     */
    this.IsDenied = function (response) {
        var isDenied = false;
        if (response != undefined && response.Error.error) {
            if (response.Error.type == Titiushko.Constants.Errors.Type.PERMISSION_ACCESS_DENIED || response.Error.type == Titiushko.Constants.Errors.Type.AUTHENTICATED_DENIED) {
                isDenied = true;
                if (response.Error.type == Titiushko.Constants.Errors.Type.AUTHENTICATED_DENIED) redirect_url = BASE_URL + "account/login";
                else if (response.Error.type == Titiushko.Constants.Errors.Type.PERMISSION_ACCESS_DENIED) redirect_url = response.Content.return_url;
                alertify.alert("<i class='fa fa-times-circle text-danger'></i> Acceso denegado", response.Error.message == undefined ? "No tienes privilegios." : response.Error.message, function () { location.href = redirect_url; }).set("label", "Cerrar");
            }
            else if (response.Error.message != undefined) {
                isDenied = true;
                this.Error(response.Error.message);
            }
        }
        return isDenied;
    };
};