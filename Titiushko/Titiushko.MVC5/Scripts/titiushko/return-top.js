/**
 * RETURN TOP OF THE PAGE
 */
$(document).ready(function () {
    $("section.content").after(
        "<button class='btn btn-sm btn-default' " +
            "type='button' id='scroll-top' style='display: none;' title='Regresar arriba' data-toggle='tooltip'>" +
            "<i class='fa fa-angle-up'></i>" +
        "</button>"
    );

    displayScrollTop();
    $(window).on({
        "scroll": displayScrollTop,
        "resize": displayScrollTop
    });

    $("#scroll-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        return false;
    });
});

/**
 * Event that is invoked each time you scroll on a page
 */
var displayScrollTop = function () {
    if ($(window).scrollTop() > 100) {
        $("#scroll-top").slideDown(300, function () {
            $(this).css({
                position: "fixed",
                left: $("section.content").width() + 200,
                top: $(window).height() - (IS_ALLOWABLE_RESOLUTION ? 70 : 110)
            });
        });
    }
    else {
        $("#scroll-top").slideUp(300);
    }
};