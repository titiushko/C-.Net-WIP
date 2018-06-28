using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Web;

namespace Titiushko.Utilities.Extensions
{
    public static class StringExtension
    {
        private const RegexOptions ExpressionOptions = RegexOptions.Singleline | RegexOptions.Multiline | RegexOptions.IgnoreCase;
        private const string CULTURE_INFO_NAME = "es-ES";
        private const string SPECIAL_CHARACTERS_PATTERN = @"[^\w\s]+";
        private const string WHITESPACE_PATTERN = @"[ ]{2,}";
        private const string SEPARATOR_SLUG = "-";
        private const string CDATA_TAG_PATTERN = @"//<!\[CDATA\[.*?\]\]>|\t";
        private const string HTML_TAGS_PATTERN = @"<[^>]+>";
        private const string HTML_START_TAGS_PATTERN = @"<\s*\w.*?>";
        private const string HTML_END_TAGS_PATTERN = @"<\s*\/\s*\w\s*.*?>|<\s*br\s*>";

        /// <summary>
        /// Evaluate if a string is equal to the constant TRUE; if so, the boolean value is returned true, otherwise the boolean value false is returned
        /// Evaluar si una cadena es igual a la constante TRUE; de ser así se devuelve el valor booleano true, de lo contrario se devuelve el valor booleano false
        /// </summary>
        /// <param name="pString"></param>
        /// <returns>Boolean</returns>
        public static bool IsTrue(this string pString)
        {
            return !string.IsNullOrWhiteSpace(pString) && pString.ToUpper().Equals(Constants.Basic.TRUE);
        }

        /// <summary>
        /// Evaluate if a string is equal to the constant FALSE; if so, the boolean value is returned true, otherwise the boolean value false is returned
        /// Evaluar si una cadena es igual a la constante FALSE; de ser así se devuelve el valor booleano true, de lo contrario se devuelve el valor booleano false
        /// </summary>
        /// <param name="pString"></param>
        /// <returns>Boolean</returns>
        public static bool IsFalse(this string pString)
        {
            return !string.IsNullOrWhiteSpace(pString) && pString.ToUpper().Equals(Constants.Basic.FALSE);
        }

        /// <summary>
        /// Convert a string to an integer, return -1 if it can not be converted or if an error occurs
        /// Convierte una cadena a entero, devolverá -1 si no se puede convertir o si se produce un error
        /// </summary>
        /// <param name="pNumber">String to convert</param>
        /// <returns>String to an integer</returns>
        public static int ToInt(this string pNumber)
        {
            try
            {
                int vInteger = 0;
                if (!string.IsNullOrWhiteSpace(pNumber) && int.TryParse(pNumber, out vInteger)) return vInteger;
                return -1;
            }
            catch
            {
                return -1;
            }
        }

        /// <summary>
        /// Convert a string to a long, return -1 if it can not be converted or if an error occurs
        /// Convierte una cadena a entero largo, devolverá -1 si no se puede convertir o si se produce un error
        /// </summary>
        /// <param name="pNumber">String to convert</param>
        /// <returns>String to a long</returns>
        public static long ToLong(this string pNumber)
        {
            try
            {
                long pLonger = 0;
                if (!string.IsNullOrWhiteSpace(pNumber) && long.TryParse(pNumber, out pLonger)) return pLonger;
                return -1;
            }
            catch
            {
                return -1;
            }
        }

        /// <summary>
        /// Returns a DateTime (in the specified format) from a date string, if it can not be converted or if an error occurs then it will return default DateTime
        /// Devuelve un DateTime (en el formato especificado) de una cadena de fecha, si no se puede convertir o si se produce un error, devolverá DateTime predeterminado
        /// </summary>
        /// <param name="pStringDateTime">String to convert; Example: "2018-01-29 19:00:00.000"</param>
        /// <param name="format">Format to be used for the conversion</param>
        /// <returns>String to a DateTime</returns>
        public static DateTime ToDateTime(this string pStringDateTime, string[] pFormats)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(pStringDateTime))
                {
                    return DateTime.ParseExact(pStringDateTime, pFormats, CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal);
                }
                return default(DateTime);
            }
            catch
            {
                return default(DateTime);
            }
        }

        /// <summary>
        /// Returns a DateTime from a date string, if it can not be converted or if an error occurs then it will return default DateTime
        /// Devuelve un DateTime de una cadena de fecha, si no se puede convertir o si se produce un error, devolverá DateTime predeterminado
        /// </summary>
        /// <param name="pStringDateTime">String to convert; Example: "2018-01-29 19:00:00.000"</param>
        /// <returns>String to a DateTime</returns>
        public static DateTime ToDateTime(this string pStringDateTime)
        {
            string[] vFormats = new string[] { Constants.Formats.DateTime.DATE, Constants.Formats.DateTime.DATE_TIME, Constants.Formats.DateTime.FULL_DATE };
            return ToDateTime(pStringDateTime, vFormats);
        }

        /// <summary>
        /// Get text in format Title
        /// Obtener texto en formato Título
        /// </summary>
        /// <param name="pText">Text to be transformed in title format</param>
        /// <param name="pCultureInfoName">Name of an existing System.Globalization.CultureInfo</param>
        /// <returns>Text in format Title</returns>
        public static string ToFormatTitle(this string pText, string pCultureInfoName = null)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pText)) return pText;
                TextInfo vTextInfo = new CultureInfo(string.IsNullOrWhiteSpace(pCultureInfoName) ? CULTURE_INFO_NAME : pCultureInfoName, false).TextInfo;
                return vTextInfo.ToTitleCase(vTextInfo.ToLower(pText));
            }
            catch
            {
                return pText;
            }
        }

        /// <summary>
        /// Transform string to slug string
        /// Transformar cadena en cadena slug
        /// </summary>
        /// <param name="pText">String to transform</param>
        /// <param name="pSeparator">Word separator character</param>
        /// <param name="pCultureInfoName">Name of an existing System.Globalization.CultureInfo</param>
        /// <returns>Slug string</returns>
        public static string ToSlug(this string pText, string pSeparator = null, string pCultureInfoName = null)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(pText))
                {
                    pSeparator = string.IsNullOrWhiteSpace(pSeparator) ? SEPARATOR_SLUG : pSeparator;
                    TextInfo vTextInfo = new CultureInfo(string.IsNullOrWhiteSpace(pCultureInfoName) ? CULTURE_INFO_NAME : pCultureInfoName, false).TextInfo;
                    pText = vTextInfo.ToLower(pText);                               // Convert to lowercase
                    pText = Regex.Replace(pText, SPECIAL_CHARACTERS_PATTERN, "");   // Remove special characters
                    pText = Regex.Replace(pText, WHITESPACE_PATTERN, " ").Trim();   // Removes excess whitespace
                    pText = Regex.Replace(pText, "_", pSeparator);                  // Replace underscore by separator
                    pText = Regex.Replace(pText, " ", pSeparator);                  // Replace spaces by separator
                }
                return pText;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Clean a text of HTML tags; if an exception occurs, returns text unchanged
        /// Limpie un texto de etiquetas HTML; si se produce una excepción, devuelve texto sin cambios
        /// </summary>
        /// <param name="pText">String to HTML tags</param>
        /// <param name="pDecode">Converts a string that has been HTML-encoded into a decoded string</param>
        /// <returns>Text without HTML tags</returns>
        public static string RemoveHtmlTags(this string pText, bool pDecode = true)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pText)) return string.Empty;
                string vStripped = Regex.Replace(pText, CDATA_TAG_PATTERN, "", ExpressionOptions);
                vStripped = Regex.Replace(vStripped, HTML_TAGS_PATTERN, "", ExpressionOptions);
                if (Regex.IsMatch(vStripped, HTML_START_TAGS_PATTERN, ExpressionOptions) || Regex.IsMatch(vStripped, HTML_END_TAGS_PATTERN, ExpressionOptions))
                {
                    vStripped = Regex.Replace(vStripped, HTML_START_TAGS_PATTERN, "", ExpressionOptions);
                    vStripped = Regex.Replace(vStripped, HTML_END_TAGS_PATTERN, "", ExpressionOptions);
                }
                return pDecode ? HttpUtility.HtmlDecode(vStripped) ?? vStripped : vStripped;
            }
            catch
            {
                return pText;
            }
        }

        /// <summary>
        /// Get the initial of each word; if an exception occurs, null is returned
        /// Obtenga la inicial de cada palabra; si se produce una excepción, se devuelve nulo
        /// </summary>
        /// <param name="pText">String to get initials</param>
        /// <returns>Initials</returns>
        public static string GetInitials(this string pText)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pText)) return null;
                if (pText.Length <= 3) return pText;    // If the text is less than or equal to 3 characters, then it is returned
                string vResult = string.Empty;
                foreach (string word in pText.Split(' ')) vResult += word.Substring(0, 1);
                return vResult;
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Replace multiple old values with new values; From the dictionary that receives, 'Key' (old value) is replaced by 'Value' (new value)
        /// Reemplazar multiples valores viejos por valores nuevos; Del dictionario que recibe, 'Key' (valor viejo) se reemplaza por 'Value' (valor nuevo)
        /// </summary>
        /// <param name="pText">Texto a remplazar valores</param>
        /// <param name="pReplaces">Listado de valores viejos y valores nuevos</param>
        /// <returns>Texto con valores remplazados; Si algo da error, devuelve el texto sin modificar</returns>
        public static string ReplaceMultiple(this string pText, Dictionary<string, string> pReplaces)
        {
            try
            {
                foreach (KeyValuePair<string, string> vReplace in pReplaces) pText = pText.Replace(vReplace.Key, vReplace.Value);
                return pText;
            }
            catch
            {
                return pText;
            }
        }

        /// <summary>
        /// Remove all tildes (accents) from a string
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

        /// <summary>
        /// Convierte un String a Enum de tipo T
        /// </summary>
        /// <typeparam name="T">Tipo de Enum de la conversión</typeparam>
        /// <param name="vValue">String a convertir</param>
        /// <param name="vDefaultValue">Valor predeterminado si "vValue" es null o no se pueda realizar la conversión</param>
        /// <returns>Enum de tipo T</returns>
        public static T ToEnum<T>(this string vValue, T vDefaultValue)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(vValue)) return vDefaultValue;
                return (T)Enum.Parse(typeof(T), vValue, true);
            }
            catch
            {
                return vDefaultValue;
            }
        }
    }
}