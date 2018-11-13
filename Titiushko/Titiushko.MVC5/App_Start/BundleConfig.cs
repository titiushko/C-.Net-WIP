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
            .Include("~/Scripts/main.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/plugins")
            .Include("~/Scripts/plugins.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/jquery")
            .Include("~/Scripts/vendor/jquery-1.11.3.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/modernizr")
            .Include("~/Scripts/vendor/modernizr-2.8.3.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/wow")
            .Include("~/Scripts/wow.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/jquery.price.slider")
            .Include("~/Scripts/jquery-price-slider.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/meanmenu")
            .Include("~/Scripts/jquery.meanmenu.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/owl.carousel")
            .Include("~/Scripts/owl.carousel.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/bootstrap")
            .Include("~/Scripts/bootstrap.min.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/jquery.sticky")
            .Include("~/Scripts/jquery.sticky.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/jquery.scrollUp")
            .Include("~/Scripts/jquery.scrollUp.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/mCustomScrollbar")
            .Include("~/Scripts/scrollbar/jquery.mCustomScrollbar.concat.min.js",
                     "~/Scripts/scrollbar/mCustomScrollbar-active.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/metisMenu")
            .Include("~/Scripts/metisMenu/metisMenu.min.js",
                     "~/Scripts/metisMenu/metisMenu-active.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/morris")
            .Include("~/Scripts/morrisjs/raphael-min.js",
                     "~/Scripts/morrisjs/morris.js",
                     "~/Scripts/morrisjs/morris-active.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/sparkline")
            .Include("~/Scripts/sparkline/jquery.sparkline.min.js",
                     "~/Scripts/sparkline/jquery.charts-sparkline.js"));

            bundles
            .Add(new ScriptBundle("~/Scripts/fullcalendar")
            .Include("~/Scripts/calendar/moment.min.js",
                     "~/Scripts/calendar/fullcalendar.min.js",
                     "~/Scripts/calendar/fullcalendar-active.js"));
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
            #endregion
        }
    }
}