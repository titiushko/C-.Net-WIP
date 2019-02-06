using System;
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
    }
}