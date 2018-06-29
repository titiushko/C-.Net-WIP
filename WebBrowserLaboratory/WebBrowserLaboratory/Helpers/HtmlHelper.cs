using System;
using System.Text.RegularExpressions;
using System.Windows.Forms;

namespace WebBrowserLaboratory.Helpers
{
    public class HtmlHelper
    {
        private const string GOOGLEKEY_PATTERN = @"[^A-Za-z\d][A-Za-z\d\-_]{40}[^A-Za-z\d]";

        private static HtmlElement GetHtmlElement(HtmlDocument pHtmlDoc, string pIdentifier, string pTag = null, string pAttributeValue = null)
        {
            HtmlElement vHtmlElement = null;
            if (string.IsNullOrWhiteSpace(pTag) && string.IsNullOrWhiteSpace(pAttributeValue)) vHtmlElement = Titiushko.HtmlHelpers.Helpers.HtmlHelper.GetHtmlElement(pHtmlDoc, pIdentifier);
            else vHtmlElement = Titiushko.HtmlHelpers.Helpers.HtmlHelper.GetHtmlElementByAttribute(pHtmlDoc, pTag, pIdentifier, pAttributeValue);
            return vHtmlElement;
        }

        public static void SetValueToElement(HtmlDocument pHtmlDoc, string pIdentifier, string pValue, string pTag = null, string pAttributeValue = null)
        {
            try
            {
                HtmlElement vHtmlElement = GetHtmlElement(pHtmlDoc, pIdentifier, pTag, pAttributeValue);
                if (vHtmlElement != null) vHtmlElement.SetAttribute("Value", pValue);
                else throw new Exception(string.Format("No se encontró el elemento [pIdentifier={0}] para establecer el valor [pValue={1}].", pIdentifier, pValue));
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        public static Action ClickElement(HtmlDocument pHtmlDoc, string pIdentifier, string pTag = null, string pAttributeValue = null)
        {
            try
            {
                HtmlElement vHtmlElement = GetHtmlElement(pHtmlDoc, pIdentifier, pTag, pAttributeValue);
                if (vHtmlElement != null) return new Action(() => vHtmlElement.InvokeMember("Click"));
                else throw new Exception(string.Format("No se encontró el elemento [pIdentifier={0}] para darle click.", pIdentifier));
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        public static string GetGoogleKey(string pHtml)
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
    }
}