using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web;

namespace WebBrowserLaboratory.Helpers
{
    public static class ElementHelper
    {
        public const RegexOptions ExpressionOptions = RegexOptions.Singleline | RegexOptions.Multiline | RegexOptions.IgnoreCase;
        public const string IDENTIFIER_PATTERN = "(id|name)=\"([^\"]*)\"";
        public const string IDENTIFIER_PATTERN_REPLACE = "((id|name)=\"|\")";
        private const string CDATA_TAG_PATTERN = @"//<!\[CDATA\[.*?\]\]>|\t";
        private const string HTML_TAGS_PATTERN = @"<[^>]+>";
        private const string HTML_START_TAGS_PATTERN = @"<\s*\w.*?>";
        private const string HTML_END_TAGS_PATTERN = @"<\s*\/\s*\w\s*.*?>|<\s*br\s*>";

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

        private static ICollection<string> GetExceptionMessages(Exception pException, ICollection<string> pMessages)
        {
            pMessages.Add(pException.Message);
            if (pException.InnerException != null) pMessages = GetExceptionMessages(pException.InnerException, pMessages);
            return pMessages;
        }

        public static ICollection<string> GetExceptionMessages(this Exception pException)
        {
            return GetExceptionMessages(pException, new HashSet<string>());
        }

        public static string GetExceptionMessage(this Exception pException)
        {
            return string.Join("<br>", pException.GetExceptionMessages());
        }
    }
}