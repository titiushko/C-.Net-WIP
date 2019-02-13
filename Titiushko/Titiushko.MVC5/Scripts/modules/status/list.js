ALLOW_DEBUGGER["MODULE_STATUS"] = false;

(function (d, w, $) {
    w.ModuleStatus = new function () {
        var EditTitle = Titiushko.Request.getResource("TextEdit");
        var ModuleName = Titiushko.Request.getResource("ModuleStatusName");

        this.setEvents = function () {
            $("#StatusTable").on("click", ".DeleteStatus", function (event) {
                event.preventDefault();
                var $vElement = $(this);
                Titiushko.Request.deleteRecord({
                    titleName: $vElement.data("title-name"),
                    data: { id: $vElement.data("id") },
                    asynchronous: true,
                    url: "status/delete",
                    typePetition: "POST",
                    beforeSuccessDelete: function () {
                        //$("#StatusTable").bootstrapTable("removeByUniqueId", $vElement.data("id"));
                        $("#StatusTable").bootstrapTable("refresh");
                    }
                });
            });

            $("#StatusList").on("click", "#CreateStatus, .EditStatus", function (event) {
                event.preventDefault();
                var $vElement = $(this);
                Titiushko.MyAlertify.alert({
                    title: $vElement.attr("title"),
                    url: BASE_URL + "status/" + $vElement.data("action") + "/" + ($vElement.data("action") == "edit" ? $vElement.data("id") : ""),
                    hideFooter: true,
                    closable: true,
                    onShow: function () {
                        $(".CloseMyAlertify").click(function (event) {
                            event.preventDefault();
                            alertify.closeAll();
                        });

                        $("#StatusForm").submit(function (event) {
                            if (ALLOW_DEBUGGER.MODULE_STATUS) debugger;
                            event.preventDefault();
                            var $vForm = $(this);
                            $.ajax({
                                url: BASE_URL + $vForm.attr("action"),
                                type: $vForm.attr("method"),
                                dataType: "json",
                                data: $vForm.toData(),
                                success: function (pResponse) {
                                    if (ALLOW_DEBUGGER.MODULE_STATUS) debugger;
                                    Titiushko.Request.response(pResponse, {
                                        successCallBack: function () {
                                            alertify.closeAll();
                                            $("#StatusTable").bootstrapTable("refresh");
                                        }
                                    });
                                },
                                error: function (pException) {
                                    Titiushko.MyMessage.exception(pException, $vElement.attr("title"), $vForm.attr("action"));
                                }
                            });
                        });
                    }
                });
            });
        };

        this.responseHandler = function (pResponse) {
            if (ALLOW_DEBUGGER.MODULE_STATUS) debugger;
            Titiushko.Request.response(pResponse, { showMessageSuccess: false });
            $.map(pResponse.Content.rows, function (pElement, pIndex) {
                if (ALLOW_DEBUGGER.MODULE_STATUS) debugger;
                pElement["Options"] =
                    '<div class="btn-group">' +
	                    '<button data-id="' + pElement.Id + '" class="btn btn-sm btn-primary EditStatus" data-action="edit" title="' + EditTitle + '"><i class="fa fa-pencil"></i></button>' +
	                    '<button data-id="' + pElement.Id + '" class="btn btn-sm btn-danger DeleteStatus" data-title-name="' + ModuleName + '"><i class="fa fa-trash"></i></button>' +
                    '</div>';
                return pElement;
            });
            return pResponse.Content;
        };
    };
})(document, window, jQuery);

ModuleStatus.setEvents();