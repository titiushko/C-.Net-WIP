using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text.RegularExpressions;
using System.Web;

namespace Titiushko.Utilities.Extensions
{
    public static class StringExtension
    {
        private const RegexOptions ExpressionOptions = RegexOptions.Singleline | RegexOptions.Multiline | RegexOptions.IgnoreCase;
        private const string CULTURE_INFO_NAME = "es-ES";
        private const string SPACES_PATTERN = @"\t|\n|\r";
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
            string[] vFormats = new string[] { Resources.Resource.FormatDate, Resources.Resource.FormatDateTime, Resources.Resource.FormatFullDate };
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
                    pText = Regex.Replace(pText, SPECIAL_CHARACTERS_PATTERN, string.Empty);   // Remove special characters
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
                string vStripped = Regex.Replace(pText, CDATA_TAG_PATTERN, string.Empty, ExpressionOptions);
                vStripped = Regex.Replace(vStripped, HTML_TAGS_PATTERN, string.Empty, ExpressionOptions);
                if (Regex.IsMatch(vStripped, HTML_START_TAGS_PATTERN, ExpressionOptions) || Regex.IsMatch(vStripped, HTML_END_TAGS_PATTERN, ExpressionOptions))
                {
                    vStripped = Regex.Replace(vStripped, HTML_START_TAGS_PATTERN, string.Empty, ExpressionOptions);
                    vStripped = Regex.Replace(vStripped, HTML_END_TAGS_PATTERN, string.Empty, ExpressionOptions);
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
        /// <param name="pValue">String a convertir</param>
        /// <param name="pDefaultValue">Valor predeterminado si "vValue" es null o no se pueda realizar la conversión</param>
        /// <returns>Enum de tipo T</returns>
        public static T ToEnum<T>(this string pValue, T pDefaultValue)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pValue)) return pDefaultValue;
                return (T)Enum.Parse(typeof(T), pValue, true);
            }
            catch
            {
                return pDefaultValue;
            }
        }

        /// <summary>
        /// Obtener texto sin etiquetas HTML y sin extras de espacios en blancos;
        /// Si ocurre un error, se obtiene el texto que se recibe
        /// </summary>
        /// <param name="pText"></param>
        /// <returns>Texto limpio de etiquetas HTML y de extras de espacios en blancos</returns>
        public static string CleanText(this string pText)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pText)) return string.Empty;
                pText = pText.RemoveHtmlTags(); // Remove HTML tags
                pText = Regex.Replace(pText, SPACES_PATTERN, string.Empty); // Remove tabs, newlines and lines breaks
                pText = Regex.Replace(pText, WHITESPACE_PATTERN, " ").Trim(); // Remove extra white spaces
                return pText;
            }
            catch
            {
                return pText;
            }
        }

        /// <summary>
        /// Cuenta las veces que pPattern está en pText
        /// </summary>
        /// <param name="pText">String donde se va a buscar pPattern</param>
        /// <param name="pPattern">String que se va a buscar en pText</param>
        /// <returns>Cantidad de ocurrencias</returns>
        public static int CountOccurrences(this string pText, string pPattern)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pText) || string.IsNullOrWhiteSpace(pPattern)) return 0;
                int vCountResult = 0;
                int vStartIndex = 0;
                while ((vStartIndex = pText.IndexOf(pPattern, vStartIndex)) != -1)
                {
                    vStartIndex += pPattern.Length;
                    vCountResult++;
                }
                return vCountResult;
            }
            catch
            {
                return 0;
            }
        }

        /// <summary>
        /// Crea el folder de la ruta pPath.
        /// Si no se puede crear el folder de la ruta pPath, entonces se intenta crear el folder de la ruta predeterminada pDefaultPath.
        /// </summary>
        /// <param name="pPath">Ruta del folder a crear</param>
        /// <param name="pDefaultPath">Opcional: Ruta predeterminada del folder a crear</param>
        /// <returns>Ruta del folder (y archivo) creado</returns>
        public static string CreateFolder(this string pPath, string pDefaultPath = null)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pPath))
                {
                    if (string.IsNullOrWhiteSpace(pDefaultPath)) return string.Empty;
                    else pPath = pDefaultPath;
                }
                FileInfo vFolder = new FileInfo(pPath);
                // Se toma la ruta del directorio; si tiene extensión, entonces es un archivo
                string vPathFolder = string.IsNullOrWhiteSpace(vFolder.Extension) ? vFolder.FullName : vFolder.DirectoryName;
                // Si el folder no existe pero existe el directorio raíz, entonces se crea el folder
                if (!Directory.Exists(vPathFolder) && Directory.Exists(vFolder.Directory.Root.Name)) Directory.CreateDirectory(vPathFolder);
                // Si no se pudo crear el folder pero se tiene una ruta predeterminada, entonces se intenta crea el folder
                if (!Directory.Exists(vPathFolder) && !string.IsNullOrWhiteSpace(pDefaultPath)) return CreateFolder(pDefaultPath);
                // Si se pudo crear el folder, entonces devuelve la ruta completa si tiene extensión
                return Directory.Exists(vPathFolder) ? (string.IsNullOrWhiteSpace(vFolder.Extension) ? vFolder.DirectoryName : vFolder.FullName) : string.Empty;
            }
            catch (Exception vException)
            {
                throw vException;
            }
        }
    }
}