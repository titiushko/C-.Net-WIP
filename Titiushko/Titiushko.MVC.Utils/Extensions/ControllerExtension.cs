using System;
using System.IO;
using System.Web.Mvc;

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
    }

    public class FakeView : IView
    {
        public void Render(ViewContext pViewContext, TextWriter pTextWriter)
        {
            throw new InvalidOperationException();
        }
    }
}