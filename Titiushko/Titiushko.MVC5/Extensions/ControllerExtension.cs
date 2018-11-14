using System;
using System.IO;
using System.Web.Mvc;

namespace Titiushko.MVC5.Extensions
{
    public static class ControllerExtension
    {
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