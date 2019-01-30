Titiushko["MyMessage"] = new function () {
    /**
     * Display message error pResponse from an AJAX pRequest
     */
    this.Error = function (pMessage, pCloseModals) {
        if (pCloseModals != undefined && pCloseModals) alertify.closeAll();
        var vContent = undefined;
        if (pMessage != undefined) {
            if (Array.isArray(pMessage)) {
                if (pMessage.length > 3) {
                    vContent = "<ul>";
                    pMessage.forEach(function (element, index) {
                        console.warn(element);
                        vContent += "<li>" + element + "</li>";
                    });
                    vContent += "</ul>";
                }
                else {
                    pMessage.forEach(function (element, index) {
                        console.warn(element);
                        alertify.error(element);
                    });
                }
            }
            else if (pMessage.length <= 150) {
                console.warn(pMessage);
                alertify.error(pMessage);
            }
            else {
                console.warn(pMessage);
                vContent =
                "<p><sup><small><i>" +
                    "Si el problema continúa, por favor envíe éste error al administrador de Titiushko (utilice el botón \"Copiar error al portapapeles\")." +
                "</i></small></sup></p>" +
                "<div id='ErrorPeticion'>" + pMessage + "</div>";
            }
            if (vContent) {
                alertify.closeAll();
                Titiushko.MyAlertify.alert({
                    title: "<i class='fa fa-times-circle text-danger'></i> Error de Petición",
                    content: vContent,
                    closable: true,
                    onShow: function () {
                        $(".ajs-vContent")
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
     * Display message success pResponse from an AJAX pRequest
     */
    this.Success = function (pMessage, pCloseModals) {
        if (pCloseModals != undefined && pCloseModals) alertify.closeAll();
        if (pMessage != undefined) {
            if (Array.isArray(pMessage)) {
                pMessage.forEach(function (element, index) {
                    alertify.success(element);
                });
            }
            else {
                alertify.success(pMessage);
            }
        }
    };

    /**
     * Display message exception from an AJAX request
     */
    this.Exception = function (pException, pMessage, pRequest) {
        alertify.closeAll();
        if (pRequest != undefined || pRequest != null) pRequest = pRequest.indexOf("://") == -1 ? BASE_URL + pRequest : pRequest; else pRequest = "";

        var vErrorMessage = Titiushko.Constants.Errors.DEFAULT(null, "Mientras se intenta " + pMessage) + "<br>";
        var vErrorException = "";

        if (pException.status != undefined) {
            vErrorMessage += pException.status + " (" + pException.statusText + ").<br>";
            vErrorException = pException.responseText;

            if ([400, 404, 500].indexOf(pException.status) != -1) {
                var error = pException.responseText.toHtml();
                var vContent =
                "<p>" +
                    "<sup><small><i>Si el problema continúa, por favor envíe éste error al administrador de Titiushko.</i></small></sup>" +
                    (error.indexOf("<code>") != -1 ? "<span class='label label-info pull-right' style='animation: bounce 1s infinite;' title='Minimizar | Cerra'><i class='fa fa-2x fa-arrow-up'></i></span>" : "") +
                "</p>" +
                "<div id='ErrorPeticion'>" + error + "</div>";
                Titiushko.MyAlertify.alert({
                    title: "<i class='fa fa-times-circle text-danger'></i> Error de Petición",
                    content: vContent,
                    closable: true,
                    startMaximized: error.indexOf("<code>") != -1
                });
            }
        }
        else {
            vErrorException = JSON.stringify(pException);
            vErrorException = vErrorException === "{}" ? (pException.pMessage === undefined ? pException : pException.pMessage) : vErrorException;
        }

        console.warn(vErrorMessage);
        console.warn(vErrorException);
        alertify.error(vErrorMessage);

        $.ajax({
            data: { pException: JSON.stringify({ pException: vErrorException, pMessage: pMessage, location: location.href, pRequest: pRequest }) },
            type: "POST",
            dataType: "json",
            url: BASE_URL + "log-pException",
            success: function (pResponse) { if (pResponse.error) console.warn(pResponse.pMessage); },
            error: function (pException) { console.warn(pException); }
        });
    };

    /**
     * Do if pResponse is error or denied
     */
    this.IsDenied = function (pResponse) {
        var isDenied = false;
        if (pResponse != undefined && pResponse.Error.error) {
            if (pResponse.Error.type == Titiushko.Constants.Errors.Type.PERMISSION_ACCESS_DENIED || pResponse.Error.type == Titiushko.Constants.Errors.Type.AUTHENTICATED_DENIED) {
                isDenied = true;
                if (pResponse.Error.type == Titiushko.Constants.Errors.Type.AUTHENTICATED_DENIED) redirect_url = BASE_URL + "account/login";
                else if (pResponse.Error.type == Titiushko.Constants.Errors.Type.PERMISSION_ACCESS_DENIED) redirect_url = pResponse.Content.return_url;
                alertify.alert("<i class='fa fa-times-circle text-danger'></i> Acceso denegado", pResponse.Error.pMessage == undefined ? "No tienes privilegios." : pResponse.Error.pMessage, function () { location.href = redirect_url; }).set("label", "Cerrar");
            }
            else if (pResponse.Error.pMessage != undefined) {
                isDenied = true;
                this.Error(pResponse.Error.pMessage);
            }
        }
        return isDenied;
    };
};