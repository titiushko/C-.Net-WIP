using log4net;
using System;
using System.Net;
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
        /// <summary>
        /// Muestra la vista de error pErrorCode personalizada
        /// </summary>
        /// <param name="pIsPartialView"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("error/base")]
        public ActionResult ErrorBase(HttpStatusCode pErrorCode = HttpStatusCode.ExpectationFailed, bool pIsPartialView = false)
        {
            if (pErrorCode.Equals(HttpStatusCode.ExpectationFailed)) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            string vViewTemplate = string.Format("~/Views/Errors/{0}.cshtml", (int)pErrorCode);
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

        /// <summary>
        /// Muestra la vista de error 400 personalizada
        /// </summary>
        /// <param name="pIsPartialView"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("error/400")]
        public ActionResult Error400(bool pIsPartialView = false)
        {
            return ErrorBase(HttpStatusCode.BadRequest, pIsPartialView);
        }

        /// <summary>
        /// Muestra la vista de error 404 personalizada
        /// </summary>
        /// <param name="pIsPartialView"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("error/404")]
        public ActionResult Error404(bool pIsPartialView = false)
        {
            return ErrorBase(HttpStatusCode.NotFound, pIsPartialView);
        }

        /// <summary>
        /// Muestra la vista de error 500 personalizada
        /// </summary>
        /// <param name="pIsPartialView"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("error/500")]
        public ActionResult Error500(bool pIsPartialView = false)
        {
            return ErrorBase(HttpStatusCode.InternalServerError, pIsPartialView);
        }
        #endregion
    }
}