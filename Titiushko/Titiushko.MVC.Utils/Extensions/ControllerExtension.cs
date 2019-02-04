using System;
using System.Data.Entity.Validation;
using System.IO;
using System.Web.Mvc;

namespace Titiushko.MVC.Utils.Extensions
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

        /// <summary>
        /// Establecer pTempDataMessage como mensaje de éxito a la variable TempData del controlador.
        /// TempData["SUCCESS"]="TRUE"
        /// TempData["SUCCESS_MESSAGE"]=pTempDataMessage.
        /// </summary>
        /// <param name="pController"></param>
        /// <param name="pTempDataMessage"></param>
        public static void SetTempDataSuccess(this Controller pController, string pTempDataMessage)
        {
            pController.TempData[Titiushko.MVC.Utils.Constants.Basic.TEMP_DATA_SUCCESS] = Titiushko.Utilities.Constants.Basic.TRUE;
            pController.TempData[Titiushko.MVC.Utils.Constants.Basic.TEMP_DATA_SUCCESS_MESSAGE] = pTempDataMessage;
        }

        /// <summary>
        /// Establecer pTempDataMessage como mensaje de error a la variable TempData del controlador.
        /// TempData["ERROR"]="TRUE"
        /// TempData["ERROR_MESSAGE"]=pTempDataMessage.
        /// </summary>
        /// <param name="pController"></param>
        /// <param name="pTempDataMessage"></param>
        public static void SetTempDataError(this Controller pController, string pTempDataMessage)
        {
            pController.TempData[Titiushko.MVC.Utils.Constants.Basic.TEMP_DATA_ERROR] = Titiushko.Utilities.Constants.Basic.TRUE;
            pController.TempData[Titiushko.MVC.Utils.Constants.Basic.TEMP_DATA_ERROR_MESSAGE] = pTempDataMessage;
        }

        /// <summary>
        /// Establecer pException como mensaje de error a la variable TempData del controlador.
        /// TempData["ERROR"]="TRUE"
        /// TempData["ERROR_MESSAGE"]=pException.GetExceptionMessage().
        /// </summary>
        /// <param name="pController"></param>
        /// <param name="pException"></param>
        public static void SetTempDataException(this Controller pController, Exception pException)
        {
            pController.TempData = pException.TempDataExceptionMessage();
        }

        /// <summary>
        /// Establecer pDbEntityValidationException como mensaje de error a la variable TempData del controlador.
        /// TempData["ERROR"]="TRUE"
        /// TempData["ERROR_MESSAGE"]=pDbEntityValidationException.GetEntityExceptionMessage().
        /// </summary>
        /// <param name="pController"></param>
        /// <param name="pDbEntityValidationException"></param>
        public static void SetTempDataEntityException(this Controller pController, DbEntityValidationException pDbEntityValidationException)
        {
            pController.TempData = pDbEntityValidationException.TempDataEntityExceptionMessage();
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