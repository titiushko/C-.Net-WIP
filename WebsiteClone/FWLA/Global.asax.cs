using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace FWLA
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();
            Response.Clear();
            HttpException httpException = exception as HttpException;
            int error = httpException != null ? httpException.GetHttpCode() : 0;
            Server.ClearError();
            if (error == 404)
            {
                Response.Redirect("~/eFWLA/error/404");
            }
            else if (error == 500)
            {
                Response.Redirect("~/eFWLA/error/500");
            }
        }
    }
}