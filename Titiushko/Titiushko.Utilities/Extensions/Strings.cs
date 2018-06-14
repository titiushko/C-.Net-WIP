using System;
using System.Globalization;

namespace Titiushko.Utilities.Extensions
{
    public static class Strings
    {
        /// <summary>
        /// Evaluate if a string is equal to the constant TRUE; if so, the boolean value is returned true, otherwise the boolean value false is returned
        /// Evaluar si una cadena es igual a la constante TRUE; de ser así se devuelve el valor booleano true, de lo contrario se devuelve el valor booleano false
        /// </summary>
        /// <param name="pString"></param>
        /// <returns>Boolean</returns>
        public static bool IsTrue(this string pString)
        {
            return !string.IsNullOrEmpty(pString) && pString.ToUpper().Equals(Constants.Basic.TRUE);
        }

        /// <summary>
        /// Evaluate if a string is equal to the constant FALSE; if so, the boolean value is returned true, otherwise the boolean value false is returned
        /// Evaluar si una cadena es igual a la constante FALSE; de ser así se devuelve el valor booleano true, de lo contrario se devuelve el valor booleano false
        /// </summary>
        /// <param name="pString"></param>
        /// <returns>Boolean</returns>
        public static bool IsFalse(this string pString)
        {
            return !string.IsNullOrEmpty(pString) && pString.ToUpper().Equals(Constants.Basic.FALSE);
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
                if (!string.IsNullOrEmpty(pNumber) && int.TryParse(pNumber, out vInteger)) return vInteger;
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
                if (!string.IsNullOrEmpty(pNumber) && long.TryParse(pNumber, out pLonger)) return pLonger;
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
                if (!string.IsNullOrEmpty(pStringDateTime))
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
        /// <returns>Text in format Title</returns>
        public static string ToFormatTitle(this string pText)
        {
            try
            {
                if (string.IsNullOrEmpty(pText)) return pText;
                TextInfo vTextInfo = new CultureInfo("es-ES", false).TextInfo;
                return vTextInfo.ToTitleCase(vTextInfo.ToLower(pText));
            }
            catch
            {
                return pText;
            }
        }
    }
}