ALLOW_DEBUGGER["SYSTEM"] = false;

Titiushko["Request"] = new function () {
    this.Response = function (resultado, ejecutarDespues) {
        if (ALLOW_DEBUGGER.SYSTEM) debugger;
        if (!Titiushko.Messages.IsDenied(resultado)) {
            var mensaje_exito = IsNullOrEmpty(resultado.Content.mensaje) ? "Petición realizada exitosamente." : resultado.Content.mensaje;
            if (mensaje_exito !== Titiushko.Constants.NO_MESSAGE) Titiushko.Messages.Success(mensaje_exito);
            if (ejecutarDespues != null && typeof ejecutarDespues == "function") ejecutarDespues();
            else if (ejecutarDespues != null && typeof ejecutarDespues == "boolean" && ejecutarDespues) setTimeout(function () { location.reload(true); }, 500);
        }
    };
};

Titiushko["DeleteRecord"] = new function () {
    this.Execute = function (parametros) {
        if (ALLOW_DEBUGGER.SYSTEM) debugger;
        if (parametros.asincrono == undefined) parametros.asincrono = false;
        if (parametros.tipoPeticion == undefined) parametros.tipoPeticion = "GET";
        if (parametros.datos == undefined) parametros.datos = {};
        if (parametros.respuestaExitosa == undefined) parametros.respuestaExitosa = function () { };
        if (parametros.nombre == undefined) parametros.nombre = "registro";
        parametros.nombre = parametros.nombre.capitalizeFirstLetter();
        Titiushko.MyAlertify.confirm({
            title: "<i class='fa fa-trash-o text-info'></i> Eliminar " + parametros.nombre,
            content: Titiushko.Constants.MENSAJE_ELIMINAR,
            closable: true,
            maximizable: false,
            hideFooter: false,
            onOk: function () {
                if (ALLOW_DEBUGGER.SYSTEM) debugger;
                if (parametros.asincrono) {
                    $.ajax({
                        url: BASE_URL + parametros.url,
                        type: parametros.tipoPeticion,
                        dataType: "json",
                        data: parametros.datos,
                        success: function (respuesta) {
                            Titiushko.Request.Response(respuesta, parametros.respuestaExitosa);
                        },
                        error: function (excepcion) {
                            Titiushko.Messages.Exception(excepcion, "eliminar " + parametros.nombre, parametros.url);
                        }
                    });
                }
                else {
                    $("form").submit();
                }
            }
        });
    }
};