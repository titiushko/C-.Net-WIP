using log4net;
using System;
using System.Web.Mvc;
using Titiushko.Utilities.Constants.Errors;
using Titiushko.Utilities.Responses;

namespace Titiushko.MVC5.Controllers
{
    [RoutePrefix("ajax")]
    public class AjaxController : BaseController
    {
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

        [HttpGet]
        [Route("get-resource")]
        public JsonResult GetResource(string pResource)
        {
            if (!Request.IsAjaxRequest()) return Json(JsonError.AJAX_DENIED, JsonRequestBehavior.AllowGet);
            try
            {
                return Json(new JsonResponse() { Content = Resources.Functions.GetResource(pResource) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception vException)
            {
                Logging.Logger.Error(vException);
                return Json(JsonError.EXCEPCION(vException), JsonRequestBehavior.AllowGet);
            }
        }
    }
}