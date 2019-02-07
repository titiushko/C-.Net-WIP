ALLOW_DEBUGGER["MODULE_STATUS"] = false;

(function (d, w, $) {
    w.ModuleStatus = new function () {
        this.setEvents = function () {
            $("#StatusTable").on("click", ".DeleteStatus", function (event) {
                event.preventDefault();
                var $vElement = $(this);
                Titiushko.DeleteRecord.execute({
                    titleName: $vElement.data("title-name"),
                    data: { id: $vElement.data("id") },
                    asynchronous: true,
                    url: "TitiushkoStatus/delete",
                    typePetition: "POST",
                    beforeSuccessDelete: function () {
                        $("#StatusTable").bootstrapTable("removeByUniqueId", $vElement.data("id"));
                    }
                });
            });

            $("#StatusList").on("click", "#CreateStatus, .EditStatus", function (event) {
                event.preventDefault();
                var $vElement = $(this);
                Titiushko.MyAlertify.alert({
                    title: $(this).attr("title"),
                    url: BASE_URL + "TitiushkoStatus/" + $(this).data("action") + "/" + ($(this).data("action") == "edit" ? $(this).data("id") : ""),
                    hideFooter: true,
                    closable: true,
                    onShow: function () {
                        $(".CloseMyAlertify").click(function () {
                            alertify.closeAll();
                        });
                    }
                });
            });
        };

        this.responseHandler = function (pResponse) {
            if (ALLOW_DEBUGGER.MODULE_STATUS) debugger;
            Titiushko.Request.response(pResponse, { showMessageSuccess: false });
            var vEditTitle = Titiushko.Request.getResource("TextEdit");
            var vModuleName = Titiushko.Request.getResource("ModuleStatusName");
            $.map(pResponse.Content.rows, function (pElement, pIndex) {
                if (ALLOW_DEBUGGER.MODULE_STATUS) debugger;
                pElement["Options"] =
                    '<div class="btn-group">' +
	                    '<button data-id="' + pElement.Id + '" class="btn btn-sm btn-primary EditStatus" data-action="edit" title="' + vEditTitle + '"><i class="fa fa-pencil"></i></button>' +
	                    '<button data-id="' + pElement.Id + '" class="btn btn-sm btn-danger DeleteStatus" data-title-name="' + vModuleName + '"><i class="fa fa-trash"></i></button>' +
                    '</div>';
                return pElement;
            });
            return pResponse.Content;
        };
    };
})(document, window, jQuery);

ModuleStatus.setEvents();