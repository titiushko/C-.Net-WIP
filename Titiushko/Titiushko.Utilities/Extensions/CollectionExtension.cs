using System;
using System.Collections.Generic;
using System.Linq;

namespace Titiushko.Utilities.Extensions
{
    public static class CollectionExtension
    {
        /// <summary>
        /// Evalua si el dictionary tiene contenido
        /// </summary>
        /// <param name="pDictionary">Dictionary a evaluar</param>
        /// <returns>Devuelve True si el dictionary tiene contenido, de lo contrario devuelve False</returns>
        public static bool DictionaryHasContent(this Dictionary<string, string> pDictionary)
        {
            return pDictionary != null && pDictionary.Any();
        }

        /// <summary>
        /// Crea una excepción de diccionario sin contenido
        /// </summary>
        public static Exception DictionaryHasNoContentException
        {
            get
            {
                return new Exception(Resources.Resource.ExceptionDictionaryHasNoContent);
            }
        }

        /// <summary>
        /// Obtiene el valor del parámetro pParameterName del dictionary pDictionary.
        /// Se obtiene el valor predeterminado pDefaultValue si no se encuentra ningún valor para el parámetro pParameterName.
        /// </summary>
        /// <param name="pRPAMessage">Objeto que comparten todos los RPA</param>
        /// <param name="pDictionary">Dictionary de parámetros</param>
        /// <param name="pParameterName">Parámetro a buscar</param>
        /// <param name="pDefaultValue">Variable opcional; Valor predeterminado en caso que no se encuentre valor para pParameterName</param>
        /// <param name="pIgnoreError">
        /// Variable opcional;
        /// Si es true, entonces no muestra error de parámetro no encontrado, de lo contrario si se muestra el error.
        /// Valor predeterminado es false.
        /// Establecer en true el valor de pIgnoreError SÓLO si es opcional el valor que se busca para pParameterName y/o si se conoce la causa del posible error.
        /// </param>
        /// <returns>Valor del parámetro</returns>
        public static string GetValueFromDictionary(this Dictionary<string, string> pDictionary, string pParameterName, string pDefaultValue = null, bool pIgnoreError = false)
        {
            try
            {
                string vParameterNotFoundError = string.Format(Resources.Resource.DictionaryHasNoParameter, pParameterName);
                string vValue = string.Empty;
                if (DictionaryHasContent(pDictionary) && !string.IsNullOrWhiteSpace(pParameterName) && !pDictionary.TryGetValue(pParameterName, out vValue))
                {
                    if (string.IsNullOrWhiteSpace(pDefaultValue))
                    {
                        if (!pIgnoreError) Logging.Logger.Log(string.Format(Resources.Resource.DictionaryParameterDefaultValueIsNull, vParameterNotFoundError), Logging.LogType.ERROR);
                    }
                    else
                    {
                        if (!pIgnoreError) Logging.Logger.Log(string.Format(Resources.Resource.DictionaryParameterDefaultValueIsNotNull, vParameterNotFoundError, pDefaultValue), Logging.LogType.ERROR);
                        vValue = pDefaultValue;
                    }
                }
                return string.IsNullOrWhiteSpace(vValue) ? pDefaultValue : vValue;
            }
            catch (Exception vException)
            {
                Logging.Logger.Error(Resources.Resource.ExceptionGetValueFromDictionary, vException);
                return pDefaultValue;
            }
        }
    }
}