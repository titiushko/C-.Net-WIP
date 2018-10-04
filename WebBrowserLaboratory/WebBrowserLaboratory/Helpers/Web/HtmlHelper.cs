using System;
using System.Text.RegularExpressions;
using System.Windows.Forms;

namespace WebBrowserLaboratory.Helpers.Web
{
    public class HtmlHelper
    {
        private const string GOOGLEKEY_PATTERN = @"[^A-Za-z\d][A-Za-z\d\-_]{40}[^A-Za-z\d]";

        private static HtmlElement GetHtmlElement(HtmlDocument pHtmlDoc, string pIdentifier, string pTag = null, string pAttributeValue = null)
        {
            HtmlElement vHtmlElement = null;
            if (string.IsNullOrWhiteSpace(pTag) && string.IsNullOrWhiteSpace(pAttributeValue)) vHtmlElement = BaseHtmlHelper.GetHtmlElement(pHtmlDoc, pIdentifier);
            else vHtmlElement = BaseHtmlHelper.GetHtmlElementByAttribute(pHtmlDoc, pTag, pIdentifier, pAttributeValue);
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

        public static Action ClickElement(HtmlDocument pHtmlDoc, string pIdentifier, bool pDoInvoke = false, string pTag = null, string pAttributeValue = null)
        {
            try
            {
                HtmlElement vHtmlElement = GetHtmlElement(pHtmlDoc, pIdentifier, pTag, pAttributeValue);
                if (vHtmlElement != null)
                {
                    Action vActionToRun = new Action(() => vHtmlElement.InvokeMember("Click"));
                    if (pDoInvoke)
                    {
                        vActionToRun.Invoke();
                        return null;
                    }
                    else
                    {
                        return vActionToRun;
                    }
                }
                else
                {
                    throw new Exception(string.Format("No se encontró el elemento [pIdentifier={0}] para dar click.", pIdentifier));
                }
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