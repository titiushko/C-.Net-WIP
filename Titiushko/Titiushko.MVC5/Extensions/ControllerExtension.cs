using System;
using System.IO;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using Titiushko.MVC5.Models;
using Titiushko.MVC5.Constants.Names;

namespace Titiushko.MVC5.Extensions
{
    public static class ControllerExtension
    {
        /// <summary>
        /// Obtiene el objeto HtmlHelper del Action que se ha invocado.
        /// Para utilizar éste método, se requeire que sea desde el Action de un Controller.
        /// </summary>
        /// <param name="pController">Instancia implicita del Controller</param>
        /// <returns>HtmlHelper</returns>
        public static HtmlHelper GetHtmlHelper(this Controller pController)
        {
            ViewContext vViewContext = new ViewContext(pController.ControllerContext, new FakeView(), pController.ViewData, pController.TempData, TextWriter.Null);
            return new HtmlHelper(vViewContext, new ViewPage());
        }

        public static BreadcomeArea GetBreadcomeAreaUpToLevel2(this Controller pController, HtmlHelper pHtmlHelper, string pCurrentActionName, string pCurrentControllerName)
        {
            string vModuleName = pCurrentControllerName.GetResourceModuleName();
            BreadcomeArea vBreadcomeArea = new BreadcomeArea();
            vBreadcomeArea.Title = string.Format(pCurrentActionName.GetResourceViewName(), vModuleName);
            vBreadcomeArea.Level1 = pHtmlHelper.ActionLink(string.Format(Resources.Resource.TextListOf, vModuleName), ActionName.INDEX, pCurrentControllerName);
            vBreadcomeArea.Level2 = new MvcHtmlString(vBreadcomeArea.Title);
            return vBreadcomeArea;
        }
    }

    public class FakeView : IView
    {
        public void Render(ViewContext pViewContext, TextWriter pTextWriter)
        {
            throw new InvalidOperationException();
        }
    }
}