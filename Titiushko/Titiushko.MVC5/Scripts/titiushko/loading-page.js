var NotUnBlockUI = false;

/**
 * Block modal
 */
function BlockUI() {
    $("body").addClass("modal-open");
    $("#fade").show();
}

/**
 * Unblock modal
 */
function UnBlockUI() {
    setTimeout(function () {
        $("body").removeClass("modal-open");
        $("#fade").hide();
    }, 500);
}

$("body * .content-wrapper").prepend(
    "<div id='fade'>" +
        "<div class='modal fade-loading-page'>" +
            "<div class='content'>" +
                "<div class='sk-folding-cube'>" +
                  "<div class='sk-cube1 sk-cube'></div>" +
                  "<div class='sk-cube2 sk-cube'></div>" +
                  "<div class='sk-cube4 sk-cube'></div>" +
                  "<div class='sk-cube3 sk-cube'></div>" +
                "</div>" +
                "<h5 class='loading-text'><strong>Cargando <span class='one'>.</span><span class='two'>.</span><span class='three'>.</span></strong></h5>" +
            "</div>" +
        "</div>" +
    "</div>"
);

$(window).bind("beforeunload", function (event) {
    BlockUI();
}).load(function () {
    UnBlockUI();
});

$(document).ready(function () {
    if (typeof afterAjaxInit === "function") afterAjaxInit();
    if ($.browser.msie) $.ajaxSetup({ cache: false });
}).ajaxSend(function (event) {
    BlockUI();
}).ajaxComplete(function (event) {
    if (!NotUnBlockUI) UnBlockUI();
});