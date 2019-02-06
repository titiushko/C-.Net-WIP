Titiushko["MyMessage"] = new function () {
    /**
     * Display message error response from an AJAX request
     */
    this.error = function (pMessage, pCloseModals) {
        if (pCloseModals != undefined && pCloseModals) alertify.closeAll();
        var vContent = undefined;
        if (pMessage != undefined) {
            if (Array.isArray(pMessage)) {
                if (pMessage.length > 3) {
                    vContent = "<ul>";
                    pMessage.forEach(function (pElement, index) {
                        console.warn(pElement);
                        vContent += "<li>" + pElement + "</li>";
                    });
                    vContent += "</ul>";
                }
                else {
                    pMessage.forEach(function (pElement, index) {
                        console.warn(pElement);
                        alertify.error(pElement);
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
     * Display message success response from an AJAX request
     */
    this.success = function (pMessage, pCloseModals) {
        if (pCloseModals != undefined && pCloseModals) alertify.closeAll();
        if (pMessage != undefined) {
            if (Array.isArray(pMessage)) {
                pMessage.forEach(function (pElement, pIndex) {
                    alertify.success(pElement);
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
    this.exception = function (pException, pMessage, pRequest) {
        alertify.closeAll();
        if (pRequest != undefined || pRequest != null) pRequest = pRequest.indexOf("://") == -1 ? BASE_URL + pRequest : pRequest; else pRequest = "";

        var vErrorMessage = Titiushko.Constants.Messages.Error.DEFAULT(null, "Mientras se intenta " + pMessage) + "<br>";
        var vErrorException = "";

        if (pException.status != undefined) {
            vErrorMessage += pException.status + " (" + pException.statusText + ").<br>";
            vErrorException = pException.responseText;

            var vServerErrorList = [400, 404, 500];
            var vServerErrorCode = parseInt(pException.responseText.match(/<h1>ERROR <span class="counter"> ([0-9]+)<\/span><\/h1>/)[1]) || 0;
            if (vServerErrorList.indexOf(pException.status) != -1 || vServerErrorList.indexOf(vServerErrorCode) != -1) {
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
            url: BASE_URL + "log-exception",
            success: function (pResponse) { if (pResponse.error) console.warn(pResponse.pMessage); },
            error: function (pException) { console.warn(pException); }
        });
    };

    /**
     * Do if response is error or denied
     */
    this.isDenied = function (pResponse) {
        var vIsDenied = false;
        if (pResponse != undefined && pResponse.Error != undefined && pResponse.Error.error) {
            if (pResponse.Error.type == Titiushko.Constants.TypeError.PERMISSION_ACCESS_DENIED || pResponse.Error.type == Titiushko.Constants.TypeError.AUTHENTICATED_DENIED) {
                vIsDenied = true;
                var vRedirectUrl = "";
                if (pResponse.Error.type == Titiushko.Constants.TypeError.AUTHENTICATED_DENIED) vRedirectUrl = BASE_URL + "account/login";
                else if (pResponse.Error.type == Titiushko.Constants.TypeError.PERMISSION_ACCESS_DENIED && pResponse.Content.returnUrl != undefined) vRedirectUrl = pResponse.Content.returnUrl;
                alertify.alert("<i class='fa fa-times-circle text-danger'></i> Acceso denegado", pResponse.Error.message == undefined ? "No tienes privilegios." : pResponse.Error.message, function () { location.href = vRedirectUrl; }).set("label", "Cerrar");
            }
            else if (pResponse.Error.message != undefined) {
                vIsDenied = true;
                this.error(pResponse.Error.message);
            }
        }
        return vIsDenied;
    };
};