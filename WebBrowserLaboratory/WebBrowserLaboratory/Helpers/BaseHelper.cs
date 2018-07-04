using System;
using System.Text.RegularExpressions;
using System.Windows.Forms;

namespace WebBrowserLaboratory.Helpers
{
    class BaseHelper
    {
        /// <summary>
        /// Obtener un HtmlElement de HtmlDocument.Window.Frames
        /// </summary>
        /// <param name="pHtmlDoc">HtmlDoc donde se va a buscar</param>
        /// <param name="pIdentifier">Identificador del elemento que se está buscando (id o name o attribute)</param>
        /// <returns>HtmlElement encontrado o nulo si no se encontró</returns>
        private static HtmlElement GetHtmlElementFromFrames(HtmlDocument pHtmlDoc, string pIdentifier)
        {
            try
            {
                HtmlElement vHtmlElement = null;
                if (pHtmlDoc != null && pHtmlDoc.Window != null && pHtmlDoc.Window.Frames != null && pHtmlDoc.Window.Frames.Count > 0)
                {
                    for (int i = 0; i < pHtmlDoc.Window.Frames.Count; i++)
                    {
                        if (vHtmlElement == null)
                        {
                            try
                            {
                                vHtmlElement = pHtmlDoc.Window.Frames[i].Document.GetElementById(pIdentifier) != null
                                ? pHtmlDoc.Window.Frames[i].Document.GetElementById(pIdentifier)
                                : (pHtmlDoc.Window.Frames[i].Document.All[pIdentifier] != null ? pHtmlDoc.Window.Frames[i].Document.All[pIdentifier] : null);
                            }
                            catch (Exception vE)
                            {
                                continue;
                            }
                        }
                    }
                }
                return vHtmlElement;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Obtener un HtmlElement de HtmlDocument, buscando primero por 'id', luego por 'name'
        /// </summary>
        /// <param name="pHtmlDoc">HtmlDoc donde se va a buscar</param>
        /// <param name="pIdentifier">Identificador del elemento que se está buscando</param>
        /// <returns>HtmlElement encontrado o nulo si no se encontró</returns>
        public static HtmlElement GetHtmlElement(HtmlDocument pHtmlDoc, string pIdentifier)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pIdentifier)) return null;
                HtmlElement vHtmlElement = pHtmlDoc.GetElementById(pIdentifier) != null
                    ? pHtmlDoc.GetElementById(pIdentifier)
                    : (pHtmlDoc.All[pIdentifier] != null ? pHtmlDoc.All[pIdentifier] : null);
                if (vHtmlElement == null) vHtmlElement = GetHtmlElementFromFrames(pHtmlDoc, pIdentifier); // Si no se encuentra el elemento, se intenta buscar en los iframes (si tiene)
                return vHtmlElement;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Obtener un HtmlElement de HtmlDocument, buscando por 'tag', 'attribute' y 'value'
        /// </summary>
        /// <param name="pHtmlDoc">HtmlDoc donde se va a buscar</param>
        /// <param name="pTag">Nombre del tag que se está buscando</param>
        /// <param name="pAttribute">Nombre del attribute que se está buscando</param>
        /// <param name="pValue">Nombre del value que se está buscando</param>
        /// <returns>HtmlElement encontrado o nulo si no se encontró</returns>
        public static HtmlElement GetHtmlElementByAttribute(HtmlDocument pHtmlDoc, string pTag, string pAttribute, string pValue)
        {
            try
            {
                pTag = string.IsNullOrWhiteSpace(pTag) ? string.Empty : pTag;
                pAttribute = string.IsNullOrWhiteSpace(pAttribute) ? string.Empty : pAttribute;
                pValue = string.IsNullOrWhiteSpace(pValue) ? string.Empty : pValue;
                HtmlElement vHtmlElement = null;
                if (pHtmlDoc != null)
                {
                    foreach (HtmlElement element in pHtmlDoc.Body.GetElementsByTagName(pTag))
                    {
                        if (element.GetAttribute(pAttribute) != null && element.GetAttribute(pAttribute).Length != 0 && element.GetAttribute(pAttribute) == pValue)
                        {
                            vHtmlElement = element;
                            break;
                        }
                    }
                }
                if (vHtmlElement == null) vHtmlElement = GetHtmlElementFromFrames(pHtmlDoc, pAttribute); // Si no se encuentra el elemento, se intenta buscar en los iframes (si tiene)
                return vHtmlElement;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Obtiene el primer elemento que coincida con la expresión regular
        /// Si no se puede obtener el elemento por identificador de la primera coincidencia, se busca el elemento por tag de la primera coincidencia
        /// </summary>
        /// <param name="pHtmlDoc"></param>
        /// <param name="pHtml"></param>
        /// <param name="pRegexExpression"></param>
        /// <param name="pTag"></param>
        /// <returns>Si se encuentra el elemento se retorna el objeto HtmlElement, de lo contrario se retorna null</returns>
        public static HtmlElement GetHtmlElementByRegexExpression(HtmlDocument pHtmlDoc, string pHtml, string pRegexExpression, string pTag = null)
        {
            try
            {
                pRegexExpression = string.IsNullOrWhiteSpace(pRegexExpression) ? string.Empty : pRegexExpression;
                Match vMatch = Regex.Match(pHtml.RemoveTildes(), pRegexExpression, RegexOptions.IgnoreCase);
                if (!vMatch.Success) return null;
                string vFirstCoincidence = vMatch.Groups[0].Value;  // Primera coincidencia
                string vIdentifier = vFirstCoincidence.GetIdentifier(); // Busca el identificador de la primera coincidencia
                HtmlElement vHtmlElement = null;
                if (!string.IsNullOrEmpty(vIdentifier)) // Si se obtuvo el identificador
                {
                    vHtmlElement = GetHtmlElement(pHtmlDoc, vIdentifier);   // Obtener el elemento por identificador
                }
                else if (!string.IsNullOrEmpty(pTag))   // Si no se obtuvo el identificador, pero se conoce el tag del elemento
                {
                    foreach (HtmlElement vElement in pHtmlDoc.Body.GetElementsByTagName(pTag))
                    {
                        if (Regex.IsMatch(vElement.OuterHtml.RemoveTildes(), pRegexExpression, RegexOptions.IgnoreCase))  // Si elemento por tag es igual a la primera coincidencia
                        {
                            vHtmlElement = vElement;    // Obtener el elemento por tag
                            break;
                        }
                    }
                }
                return vHtmlElement;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }
    }
}