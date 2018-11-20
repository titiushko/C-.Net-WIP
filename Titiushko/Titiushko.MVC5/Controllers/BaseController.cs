using log4net;
using System;
using System.Web.Mvc;
using Titiushko.MVC5.Models;

namespace Titiushko.MVC5.Controllers
{
    public class BaseController : Controller
    {
        public static ILog logger = null;

        public BaseController()
        {
            logger = LogManager.GetLogger(typeof(BaseController));

            ViewBag.BreadcomeArea = new BreadcomeArea()
            {
                Title = Resources.Resource.ModuleHomeName
            };
        }

        #region Exceptions
        /// <summary>
        /// Process the request to register in the log the exception occurred in JS from the frontend
        /// </summary>
        /// <param name="pException"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        [Route("log-exception")]
        public JsonResult LogExceptionFromJavaScript(string pException)
        {
            try
            {
                LogManager.GetLogger("BaseController.LogExceptionFromJavaScript").Error(new Exception(pException));
                return Json(new Titiushko.Utilities.Responses.JsonResponse());
            }
            catch (Exception vE)
            {
                return Json(Titiushko.Utilities.Constants.Errors.JsonError.EXCEPCION(vE));
            }
        }
        #endregion

        #region Errors
        [HttpGet]
        [Route("error/404")]
        public ActionResult Error404(bool pIsPartialView = false)
        {
            string vViewTemplate = "~/Views/Errors/404.cshtml";
            if (pIsPartialView)
            {
                ViewBag.Layout = null;
                return PartialView(vViewTemplate);
            }
            else
            {
                ViewBag.Layout = "~/Views/Shared/_ShortLayout.cshtml";
                return View(vViewTemplate);
            }
        }

        [HttpGet]
        [Route("error/500")]
        public ActionResult Error500(bool pIsPartialView = false)
        {
            string vViewTemplate = "~/Views/Errors/500.cshtml";
            if (pIsPartialView)
            {
                ViewBag.Layout = null;
                return PartialView(vViewTemplate);
            }
            else
            {
                ViewBag.Layout = "~/Views/Shared/_ShortLayout.cshtml";
                return View(vViewTemplate);
            }
        }
        #endregion
    }
}