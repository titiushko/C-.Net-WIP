using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace WebBrowserLaboratory.Helpers
{
    public static class ElementHelper
    {
        private const string IDENTIFIER_PATTERN = "(id|name)=\"([^\"]*)\"";
        private const string IDENTIFIER_PATTERN_REPLACE = "((id|name)=\"|\")";
        private const string GOOGLEKEY_PATTERN = @"[^A-Za-z\d][A-Za-z\d\-_]{40}[^A-Za-z\d]";

        /// <summary>
        /// Obtiene el identificador (id o name) de un elemento html string
        /// </summary>
        /// <param name="pText">Texto donde se busca el identificador</param>
        /// <returns>Identificador; Si algo da error, devuelve una cadena vacía</returns>
        public static string GetIdentifier(this string pText)
        {
            try
            {
                Match vMatch = Regex.Match(pText, IDENTIFIER_PATTERN, RegexOptions.IgnoreCase);
                return vMatch.Success ? Regex.Replace(vMatch.Value, IDENTIFIER_PATTERN_REPLACE, "", RegexOptions.IgnoreCase) : string.Empty;
            }
            catch
            {
                return string.Empty;
            }
        }

        public static string GetGoogleKey(this string pHtml)
        {
            try
            {
                Match vMatch = Regex.Match(pHtml, GOOGLEKEY_PATTERN, RegexOptions.IgnoreCase);
                if (!vMatch.Success) return null;
                return vMatch.Groups[0].Value.Replace("\"", "");  // Primera coincidencia
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Reemplazo multiple del listado de valores viejos por los valores nuevos
        /// Del dictionario que recibe, 'Key' (valor viejo) lo reemplaza por 'Value' (valor nuevo)
        /// </summary>
        /// <param name="pText">Texto a remplazar valores</param>
        /// <param name="pReplaces">Listado de valores viejos y valores nuevos</param>
        /// <returns>Texto con valores remplazados; Si algo da error, devuelve el texto sin modificar</returns>
        public static string ReplaceMultiple(this string pText, Dictionary<string, string> pReplaces)
        {
            try
            {
                foreach (KeyValuePair<string, string> vReplace in pReplaces)
                {
                    pText = pText.Replace(vReplace.Key, vReplace.Value);
                }
                return pText;
            }
            catch
            {
                return pText;
            }
        }

        /// <summary>
        /// Elimina las tildes de una cadena
        /// </summary>
        /// <param name="pText">Texto a eliminar las tildes</param>
        /// <returns>Texto sin tildes; Si algo da error, devuelve el texto sin modificar</returns>
        public static string RemoveTildes(this string pText)
        {
            return pText.ReplaceMultiple(new Dictionary<string, string>() {
                { "&aacute;", "a" },
                { "&eacute;", "e" },
                { "&iacute;", "i" },
                { "&oacute;", "o" },
                { "&uacute;", "u" },
                { "&Aacute;", "A" },
                { "&Eacute;", "E" },
                { "&Iacute;", "I" },
                { "&Oacute;", "O" },
                { "&Uacute;", "U" },
                { "&Ntilde;", "N" },
                { "á", "a" },
                { "é", "e" },
                { "í", "i" },
                { "ó", "o" },
                { "ú", "u" },
                { "ñ", "n" },
                { "Á", "A" },
                { "É", "E" },
                { "Í", "I" },
                { "Ó", "O" },
                { "Ú", "U" },
                { "Ñ", "N" }
            });
        }
    }
}