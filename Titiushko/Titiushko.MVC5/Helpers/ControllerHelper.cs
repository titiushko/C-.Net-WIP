using System;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using Titiushko.MVC5.Constants.Names;
using Titiushko.MVC5.Extensions;
using Titiushko.MVC5.Models;

namespace Titiushko.MVC5.Helpers
{
    public static class ControllerHelper
    {
        public static BreadcomeArea GetBreadcomeAreaUpToLevel2(this HtmlHelper pHtmlHelper, string pCurrentActionName, string pCurrentControllerName)
        {
            string vModuleName = pCurrentControllerName.GetResourceModuleName();
            BreadcomeArea vBreadcomeArea = new BreadcomeArea();
            vBreadcomeArea.Title = string.Format(pCurrentActionName.GetResourceViewName(), vModuleName);
            vBreadcomeArea.Level1 = pHtmlHelper.ActionLink(string.Format(Resources.Resource.TextListOf, vModuleName), ActionName.INDEX, pCurrentControllerName);
            vBreadcomeArea.Level2 = new MvcHtmlString(vBreadcomeArea.Title);
            return vBreadcomeArea;
        }
    }
}