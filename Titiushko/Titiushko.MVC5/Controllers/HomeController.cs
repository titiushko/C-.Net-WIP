using System;
using System.Web.Mvc;

namespace Titiushko.MVC5.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            ViewBag.CurrentDate = DateTime.Now.ToString(Resources.Resource.FormatDate);
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}