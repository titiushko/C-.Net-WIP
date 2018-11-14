using log4net;
using System;
using System.Web.Mvc;
using Titiushko.MVC5.Models;
using Titiushko.Utilities.Extensions;

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
        /// Get TempDataDictionary with exception messages
        /// </summary>
        /// <param name="pE">Exception</param>
        /// <returns>TempDataDictionary</returns>
        public TempDataDictionary TempDataExceptionMessage(Exception pE)
        {
            TempDataDictionary vError = new TempDataDictionary();
            vError["error"] = Titiushko.Utilities.Constants.Basic.TRUE;
            vError["error_message"] = Titiushko.Utilities.Constants.Errors.BaseError.DEFAULT(pE.GetExceptionMessage());
            return vError;
        }

        /// <summary>
        /// Get TempDataDictionary with database entity exception messages
        /// </summary>
        /// <param name="pE">DbEntityValidationException</param>
        /// <returns>TempDataDictionary</returns>
        public TempDataDictionary TempDataEntityExceptionMessage(System.Data.Entity.Validation.DbEntityValidationException pE)
        {
            TempDataDictionary vError = new TempDataDictionary();
            vError["error"] = Titiushko.Utilities.Constants.Basic.TRUE;
            vError["error_message"] = Titiushko.Utilities.Constants.Errors.BaseError.DEFAULT(pE.GetEntityExceptionMessage());
            return vError;
        }

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
                ViewBag.Layout = "~/Views/Shared/_Layout.cshtml";
                return View(vViewTemplate);
            }
        }
        #endregion
    }
}