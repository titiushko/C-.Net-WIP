$(".DeleteStatus").click(function (event) {
    event.preventDefault();
    var $vElement = $(this);
    Titiushko.DeleteRecord.Execute({
        titleName: $vElement.data("title-name"),
        data: { id: $vElement.data("id") },
        asynchronous: true,
        url: "TitiushkoStatus/delete",
        typePetition: "POST"
    });
});

$("#CreateStatus, .EditStatus").click(function (event) {
    event.preventDefault();
    var $vElement = $(this);
    Titiushko.MyAlertify.alert({
        title: $vElement.text().trim(),
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