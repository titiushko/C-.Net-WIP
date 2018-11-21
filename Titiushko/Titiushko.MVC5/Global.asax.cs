using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Titiushko.MVC5
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            log4net.Config.XmlConfigurator.Configure();
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception vException = Server.GetLastError();
            Response.Clear();
            HttpException vHttpException = vException as HttpException;
            Server.ClearError();
            Logging.Logger.Error(vException);
            Response.Redirect(string.Format("~/error/{0}", vHttpException != null ? vHttpException.GetHttpCode() : 500));
        }
    }
}