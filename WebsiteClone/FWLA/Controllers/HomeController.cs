using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FWLA.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return RedirectToAction("login", "eFWLA");
        }

        [Route("eFWLA/error/404")]
        public ActionResult Error404()
        {
            return View("~/Views/Errors/404.cshtml");
        }

        [Route("eFWLA/error/500")]
        public ActionResult Error500()
        {
            return View("~/Views/Errors/404.cshtml");
        }

        [Route("eFWLA/index")]
        public ActionResult Inicio()
        {
            return View();
        }

        [Route("eFWLA/create_contract")]
        public ActionResult CreateContract()
        {
            return View();
        }
    }
}