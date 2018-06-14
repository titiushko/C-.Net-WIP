using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Titiushko.Utilities.Extensions;

namespace Titiushko.MVC5.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController()
        {
            logger = LogManager.GetLogger(typeof(HomeController));
        }

        public ActionResult Index()
        {
            logger.Info("Página de inicio.".ToFormatTitle());
            ViewBag.CurrentDate = DateTime.Now.ToString(Titiushko.Utilities.Constants.Formats.DateTime.DATE);
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