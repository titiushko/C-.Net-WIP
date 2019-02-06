ALLOW_DEBUGGER["SYSTEM"] = false;

Titiushko["Request"] = new function () {
    this.response = function (pResponse, pCallBack) {
        if (ALLOW_DEBUGGER.SYSTEM) debugger;
        if (!Titiushko.MyMessage.isDenied(pResponse)) {
            var vMessageSuccess = IsNullOrEmpty(pResponse.Message) ? Titiushko.Constants.Messages.Request.SUCCESS : pResponse.Message;
            if (vMessageSuccess !== Titiushko.Constants.Messages.NO_MESSAGE) Titiushko.MyMessage.success(vMessageSuccess);
        }
        if (pCallBack != null && typeof pCallBack == "function") pCallBack();
        else if (pCallBack != null && typeof pCallBack == "boolean" && pCallBack) setTimeout(function () { location.reload(true); }, 500);
    };
};

Titiushko["DeleteRecord"] = new function () {
    this.execute = function (pParams) {
        if (ALLOW_DEBUGGER.SYSTEM) debugger;
        if (pParams.asynchronous == undefined) pParams.asynchronous = false;
        if (pParams.typePetition == undefined) pParams.typePetition = "GET";
        if (pParams.data == undefined) pParams.data = {};
        if (pParams.successfulCallBackResponse == undefined) pParams.successfulCallBackResponse = true;
        if (pParams.titleName == undefined) pParams.titleName = "registro";
        pParams.titleName = pParams.titleName.capitalizeFirstLetter();
        Titiushko.MyAlertify.confirm({
            title: "<i class='fa fa-trash-o text-info'></i> Eliminar " + pParams.titleName,
            content: Titiushko.Constants.Messages.Error.DELETE,
            closable: true,
            maximizable: false,
            hideFooter: false,
            onOk: function () {
                if (ALLOW_DEBUGGER.SYSTEM) debugger;
                if (pParams.asynchronous) {
                    pParams.data["__RequestVerificationToken"] = $("input[name='__RequestVerificationToken']").val();
                    $.ajax({
                        url: BASE_URL + pParams.url,
                        type: pParams.typePetition,
                        dataType: "json",
                        data: pParams.data,
                        success: function (pResponse) {
                            if (ALLOW_DEBUGGER.SYSTEM) debugger;
                            Titiushko.Request.response(pResponse, pParams.successfulCallBackResponse);
                        },
                        error: function (pException) {
                            Titiushko.MyMessage.exception(pException, "eliminar " + pParams.titleName, pParams.url);
                        }
                    });
                }
                else {
                    if ($("form").find("input[name='__RequestVerificationToken']").size() == 0) $("form").append($("input[name='__RequestVerificationToken']"))
                    $("form").submit();
                }
            }
        });
    }
};

Titiushko["Redirect"] = new function () {
    this.back = function ($pElement) {
        if (ALLOW_DEBUGGER.SYSTEM) debugger;
        var vRedirect = undefined;
        if (!IsNullOrEmpty($pElement.data) && !IsNullOrEmpty($pElement.data("redireccionar-controlador")) && !IsNullOrEmpty($pElement.data("redireccionar-accion"))) {
            var vRedirection = sessionStorage.getItem($pElement.data("redireccionar-controlador") + "_" + $pElement.data("redireccionar-accion"));
            if (!IsNullOrEmpty(vRedirection)) vRedirect = vRedirection;
            else vRedirect = BASE_URL + $pElement.data("redireccionar-controlador") + "/" + $pElement.data("redireccionar-accion");
        }
        if (!IsNullOrEmpty(vRedirect)) location.href = vRedirect;
        else if (window.history.length > 2) window.history.back();
        else {
            Titiushko.MyAlertify.confirm({
                title: "<i class='fa fa-exclamation-triangle text-warning'></i> Volver",
                content: "<p>Lo sentimos, se perdió la referencia para volver a la pantalla anterior.</p>" +
                         "<p>" +
                            "Puede intentar realizar una de las siguientes acciones:" +
                            "<ul>" +
                                "<li>Hacer click al botón <b>Regresar</b> de su navegador web.</li>" +
                                "<li>Actualizar la página con F5 y luego presione nuevamente el botón <b>Volver</b>.</li>" +
                                "<li>Dar click al botón Aceptar de este mensaje para regresar a la página de inicio.</li>" +
                            "</ul>" +
                         "</p>",
                closable: true,
                maximizable: false,
                hideFooter: false,
                onOk: function () { location.href = BASE_URL; }
            });
        }
    }
};