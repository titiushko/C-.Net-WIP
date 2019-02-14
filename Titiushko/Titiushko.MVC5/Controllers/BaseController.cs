using log4net;
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

        public string BASE_URL
        {
            get
            {
                return Request.Url.Scheme + "://" + Request.Url.Authority + Request.ApplicationPath.TrimEnd('/') + "/";
            }
        }

        #region HTTP Errors
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

        public ActionResult RedirectToAuthenticatedDenied(string ReturnUrl = null)
        {
            return RedirectToAction("login", "account", new { returnUrl = string.IsNullOrWhiteSpace(ReturnUrl) ? (Request.Url == null ? BASE_URL : Request.Url.AbsolutePath) : ReturnUrl });
        }
    }
}