using System.Web.Optimization;

namespace Titiushko.MVC5
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region ScriptBundle
            bundles
            .Add(new ScriptBundle("~/Scripts/main")
            .Include("~/Scripts/resources/main.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/plugins")
            .Include("~/Scripts/resources/plugins.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/jquery")
            .Include("~/Scripts/resources/jquery/jquery-1.11.3.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/jquery.validate")
            .Include("~/Scripts/resources/jquery/jquery.validate.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/modernizr")
            .Include("~/Scripts/resources/modernizr/modernizr-2.8.3.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/wow")
            .Include("~/Scripts/resources/wow.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/jquery.price.slider")
            .Include("~/Scripts/resources/jquery/jquery-price-slider.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/meanmenu")
            .Include("~/Scripts/resources/jquery/jquery.meanmenu.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/owl.carousel")
            .Include("~/Scripts/resources/owl.carousel.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/bootstrap")
            .Include("~/Scripts/resources/bootstrap.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/jquery.sticky")
            .Include("~/Scripts/resources/jquery/jquery.sticky.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/jquery.scrollUp")
            .Include("~/Scripts/resources/jquery/jquery.scrollUp.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/mCustomScrollbar")
            .Include("~/Scripts/resources/scrollbar/jquery.mCustomScrollbar.concat.min.js",
                     "~/Scripts/resources/scrollbar/mCustomScrollbar-active.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/metisMenu")
            .Include("~/Scripts/resources/metisMenu/metisMenu.min.js",
                     "~/Scripts/resources/metisMenu/metisMenu-active.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/morris")
            .Include("~/Scripts/resources/morrisjs/raphael-min.js",
                     "~/Scripts/resources/morrisjs/morris.js",
                     "~/Scripts/resources/morrisjs/morris-active.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/sparkline")
            .Include("~/Scripts/resources/sparkline/jquery.sparkline.min.js",
                     "~/Scripts/resources/sparkline/jquery.charts-sparkline.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/fullcalendar")
            .Include("~/Scripts/resources/calendar/moment.min.js",
                     "~/Scripts/resources/calendar/fullcalendar.min.js",
                     "~/Scripts/resources/calendar/fullcalendar-active.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/counterup")
            .Include("~/Scripts/resources/counterup/jquery.counterup.min.js",
                     "~/Scripts/resources/counterup/waypoints.min.js",
                     "~/Scripts/resources/counterup/counterup-active.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/tab")
            .Include("~/Scripts/resources/tab.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/jquery.browser")
            .Include("~/Scripts/resources/jquery/jquery.browser.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/alertify")
            .Include("~/Scripts/resources/alertifyjs/alertify.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/bootstrap-data-table")
            .Include("~/Scripts/resources/data-table/bootstrap-table.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/titiushko")
            .Include("~/Scripts/titiushko/constants/*.js",
                     "~/Scripts/titiushko/*.js"));
            #endregion

            #region StyleBundle
            bundles
            .Add(new StyleBundle("~/Content/bootstrap")
            .Include("~/Content/resources/bootstrap.min.css"));

            bundles
            .Add(new StyleBundle("~/Content/font-awesome")
            .Include("~/Content/resources/font-awesome.min.css"));

            bundles
            .Add(new StyleBundle("~/Content/owl")
            .Include("~/Content/resources/owl.carousel.css",
                     "~/Content/resources/owl.theme.css",
                     "~/Content/resources/owl.transitions.css"));

            bundles
            .Add(new StyleBundle("~/Content/animate")
            .Include("~/Content/resources/animate.css"));

            bundles
            .Add(new StyleBundle("~/Content/normalize")
            .Include("~/Content/resources/normalize.css"));

            bundles
            .Add(new StyleBundle("~/Content/meanmenu")
            .Include("~/Content/resources/meanmenu.min.css"));

            bundles
            .Add(new StyleBundle("~/Content/main")
            .Include("~/Content/resources/main.css"));

            bundles
            .Add(new StyleBundle("~/Content/morris")
            .Include("~/Content/resources/morrisjs/morris.css"));

            bundles
            .Add(new StyleBundle("~/Content/mCustomScrollbar")
            .Include("~/Content/resources/scrollbar/jquery.mCustomScrollbar.min.css"));

            bundles
            .Add(new StyleBundle("~/Content/metisMenu")
            .Include("~/Content/resources/metisMenu/metisMenu.min.css",
                     "~/Content/resources/metisMenu/metisMenu-vertical.css"));

            bundles
            .Add(new StyleBundle("~/Content/fullcalendar")
            .Include("~/Content/resources/calendar/fullcalendar.min.css",
                     "~/Content/resources/calendar/fullcalendar.print.min.css"));

            bundles
            .Add(new StyleBundle("~/Content/style")
            .Include("~/Content/resources/style.css"));

            bundles
            .Add(new StyleBundle("~/Content/responsive")
            .Include("~/Content/resources/responsive.css"));

            bundles
            .Add(new StyleBundle("~/Content/alertify")
            .Include("~/Content/resources/alertifyjs/alertify.css",
                     "~/Content/resources/alertifyjs/alertify.bootstrap.min.css"));

            bundles
            .Add(new StyleBundle("~/Content/bootstrap-data-table")
            .Include("~/Content/data-table/bootstrap-table.css"));

            bundles
            .Add(new StyleBundle("~/Content/titiushko")
            .Include("~/Content/titiushko/text.css"));
            #endregion
        }
    }
}