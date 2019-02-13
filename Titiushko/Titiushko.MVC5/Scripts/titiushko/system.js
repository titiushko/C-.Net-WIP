ALLOW_DEBUGGER["SYSTEM"] = false;

Titiushko["Request"] = new function () {
    this.response = function (pResponse, pParams) {
        if (ALLOW_DEBUGGER.SYSTEM) debugger;
        if (pParams == undefined) pParams = new Object();
        if (pParams.showMessageSuccess == undefined) pParams.showMessageSuccess = true;
        if (!Titiushko.MyMessage.isDenied(pResponse)) {
            var vMessageSuccess = IsNullOrEmpty(pResponse.Message) ? Titiushko.Constants.Messages.Request.SUCCESS : pResponse.Message;
            if (pParams.showMessageSuccess != null && typeof pParams.showMessageSuccess == "boolean" && pParams.showMessageSuccess) Titiushko.MyMessage.success(vMessageSuccess);
            if (pParams.successCallBack != null && typeof pParams.successCallBack == "function") pParams.successCallBack(pResponse);
        }
        else {
            if (pParams.errorCallBack != null && typeof pParams.errorCallBack == "function") pParams.errorCallBack(pResponse);
        }
        if (pParams.reload != null && typeof pParams.reload == "boolean" && pParams.reload) setTimeout(function () { location.reload(true); }, 500);
    };

    this.getResource = function (pResourceName) {
        if (ALLOW_DEBUGGER.SYSTEM) debugger;
        var vResourceResult = "";
        $.ajax({
            url: BASE_URL + "ajax/get-resource",
            type: "GET",
            dataType: "json",
            data: { pResource: pResourceName },
            async: false,
            success: function (pResponse) {
                if (ALLOW_DEBUGGER.SYSTEM) debugger;
                Titiushko.Request.response(pResponse, {
                    showMessageSuccess: false,
                    successCallBack: function (pResult) {
                        if (ALLOW_DEBUGGER.SYSTEM) debugger;
                        vResourceResult = pResult.Content;
                    }
                });
            },
            error: function (pException) {
                Titiushko.MyMessage.exception(pException, "obtener el resource " + pResourceName, "ajax/get-resource");
            }
        });
        return vResourceResult;
    };

    this.deleteRecord = function (pParams) {
        if (ALLOW_DEBUGGER.SYSTEM) debugger;
        if (pParams.asynchronous == undefined) pParams.asynchronous = false;
        if (pParams.typePetition == undefined) pParams.typePetition = "GET";
        if (pParams.data == undefined) pParams.data = {};
        if (pParams.beforeSuccessDelete == undefined) pParams.beforeSuccessDelete = function () { };
        if (pParams.reload == undefined) pParams.reload = false;
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
                    $.ajax({
                        url: BASE_URL + pParams.url,
                        type: pParams.typePetition,
                        dataType: "json",
                        data: pParams.data,
                        success: function (pResponse) {
                            if (ALLOW_DEBUGGER.SYSTEM) debugger;
                            Titiushko.Request.response(pResponse, { successCallBack: pParams.beforeSuccessDelete, reload: pParams.reload });
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
    };
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