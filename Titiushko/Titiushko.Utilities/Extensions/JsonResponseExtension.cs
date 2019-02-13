using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Titiushko.Utilities.Responses;

namespace Titiushko.Utilities.Extensions
{
    public static class JsonResponseExtension
    {
        /// <summary>
        /// Método para establecer el contenido del atributo Content del objeto JsonResponse
        /// </summary>
        /// <param name="pJsonResponse"></param>
        /// <param name="pContent"></param>
        /// <returns>Devuelve el objeto JsonResponse con el contenido actualizado del atributo Content</returns>
        public static JsonResponse SetContent(this JsonResponse pJsonResponse, dynamic pContent)
        {
            try
            {
                pJsonResponse.Content = pContent;
                return pJsonResponse;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Al atributo Error se agrega el listado de mensajes de error del modelo y se agrega el listado de mensajes adicionales
        /// Si se agregaron los mensajes se hace Error.error=TRUE
        /// </summary>
        /// <param name="pJsonResponse"></param>
        /// <param name="pModelStateDictionary">Mensajes de error del modelo</param>
        /// <param name="pAditionalMessage">Listado de mensajes adicionales</param>
        /// <returns></returns>
        public static JsonResponse SetErrorMessage(this JsonResponse pJsonResponse, ModelStateDictionary pModelStateDictionary, ICollection<string> pAditionalMessage)
        {
            try
            {
                if (pModelStateDictionary != null && pModelStateDictionary.Any())
                    pJsonResponse.Error.AddMessage(pModelStateDictionary.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList());
                if (pAditionalMessage != null && pAditionalMessage.Any()) pJsonResponse.Error.AddMessage(pAditionalMessage);
                pJsonResponse.Error.error = pJsonResponse.Error.message.Count > 0;
                return pJsonResponse;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Al atributo Error se agrega el listado de mensajes de error del modelo y se agrega un mensaje adicional
        /// </summary>
        /// <param name="pJsonResponse"></param>
        /// <param name="pModelStateDictionary">Mensajes de error del modelo</param>
        /// <param name="pAditionalMessage">Mensaje adicional</param>
        /// <returns></returns>
        public static JsonResponse SetErrorMessage(this JsonResponse pJsonResponse, ModelStateDictionary pModelStateDictionary, string pAditionalMessage)
        {
            try
            {
                return pJsonResponse.SetErrorMessage(pModelStateDictionary,
                    !string.IsNullOrWhiteSpace(pAditionalMessage) ? new HashSet<string>() { pAditionalMessage } : null);
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Al atributo Error se agrega el listado de mensajes de error del modelo
        /// </summary>
        /// <param name="pJsonResponse"></param>
        /// <param name="pModelStateDictionary">Mensajes de error del modelo</param>
        /// <returns></returns>
        public static JsonResponse SetErrorMessage(this JsonResponse pJsonResponse, ModelStateDictionary pModelStateDictionary)
        {
            try
            {
                return pJsonResponse.SetErrorMessage(pModelStateDictionary, string.Empty);
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }
    }
}