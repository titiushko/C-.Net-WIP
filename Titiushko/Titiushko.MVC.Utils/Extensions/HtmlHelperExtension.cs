using System.Web.Caching;
using System.Web.Mvc;
using System.Web;
using System;

namespace Titiushko.MVC.Utils.Extensions
{
    public static class HtmlHelperExtension
    {
        public static MvcHtmlString LoadVersionedScript(this HtmlHelper pHtmlHelper, string pFilename)
        {
            return MvcHtmlString.Create(string.Format("<script type='text/javascript' src='{0}'></script>", GetUrl(pHtmlHelper, pFilename)));
        }

        public static MvcHtmlString LoadVersionedStyle(this HtmlHelper pHtmlHelper, string pFilename)
        {
            return MvcHtmlString.Create(string.Format("<link type='text/css' href='{0}' rel='stylesheet' />", GetUrl(pHtmlHelper, pFilename)));
        }

        private static string GetUrl(this HtmlHelper pHtmlHelper, string pFilename)
        {
            return UrlHelper.GenerateContentUrl(pFilename + GetVersion(pHtmlHelper, pFilename), pHtmlHelper.ViewContext.RequestContext.HttpContext);
        }

        private static string GetVersion(this HtmlHelper pHtmlHelper, string pFilename)
        {
            HttpContextBase vHttpContext = pHtmlHelper.ViewContext.RequestContext.HttpContext;
            string vPhysicalPath = vHttpContext.Server.MapPath(pFilename);
            string vVersion = string.Format("?v={0}", new System.IO.FileInfo(vPhysicalPath).LastWriteTime.ToString("yyyyMMddHHmmss"));
            if (vHttpContext.Cache[pFilename] == null || (vHttpContext.Cache[pFilename].ToString() != vVersion))
            {
                vHttpContext.Cache.Add(
                    vPhysicalPath,
                    vVersion,
                    null,
                    DateTime.Now.AddMinutes(1),
                    TimeSpan.Zero,
                    CacheItemPriority.Normal,
                    null
                );
                vHttpContext.Cache[pFilename] = vVersion;
                return vVersion;
            }
            else
            {
                return vHttpContext.Cache[pFilename] as string;
            }
        }
    }
}