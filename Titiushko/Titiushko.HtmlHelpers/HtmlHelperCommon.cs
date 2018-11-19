using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using System.Xml.Linq;
using Titiushko.Utilities.Extensions;

namespace Titiushko.HtmlHelpers
{
    public class HtmlHelperCommon
    {
        /// <summary>
        /// Obtener el objeto HtmlElement del elemento HTML buscando por cualquiera de las 3 formas: GetHtmlElement, GetHtmlElementByAttribute o GetHtmlElementByRegexExpression
        /// Utilizando los parámetros del dictionary pIdentifierParams
        ///     - KeyValuePair.Key<string>: Nombre del parámetro, ver (*) para consultar los nombres de los parámetros
        ///     - KeyValuePair.Value<string>: Valor del parámetro, ver (*) para consultar los posibles valores de los parámetros
        /// (*) Nombres y valores de los parámetros:
        /// Nombre (es una constante)   |   Valor                   |   Descripción
        /// -----------------------------------------------------------------------
        /// IDENTIFIER_TYPE             |   ID (constante)          |   Para obtener HtmlElement usando HtmlHelper.GetHtmlElement
        ///                             |                           |   * No será requerido el uso de los parámetros con el prefijo ATTRIBUTE_ y REGEX_
        /// -----------------------------------------------------------------------
        /// IDENTIFIER_TYPE             |   ATTRIBUTE (constante)   |   Para obtener HtmlElement usando HtmlHelper.GetHtmlElementByAttribute
        ///                             |                           |   * Será requerido el uso de los parámetros con el prefijo ATTRIBUTE_
        ///                             |                           |   * No será requerido el uso de los parámetros con el prefijo REGEX_
        /// -----------------------------------------------------------------------
        /// IDENTIFIER_TYPE             |   REGEX (constante)       |   Para obtener HtmlElement usando HtmlHelper.GetHtmlElementByRegexExpression
        ///                             |                           |   * Será requerido el uso de los parámetros con el prefijo REGEX_
        ///                             |                           |   * No será requerido el uso de los parámetros con el prefijo ATTRIBUTE_
        /// -----------------------------------------------------------------------
        /// IDENTIFIER_TYPE             |   ALL (constante)         |   Para obtener HtmlElement usando
        ///                             |                           |   HtmlHelper.GetHtmlElement o HtmlHelper.GetHtmlElementByAttribute o HtmlHelper.GetHtmlElementByRegexExpression
        ///                             |                           |   * Será requerido el uso de los parámetros con el prefijo ATTRIBUTE_ y REGEX_
        /// -----------------------------------------------------------------------
        /// IDENTIFIER_VALUE            |   id o name               |   Si IDENTIFIER_TYPE es ID: entonces IDENTIFIER_VALUE será el id o name del elemento HTML para establecer
        ///                             |                           |   el valor de HtmlHelper.GetHtmlElement.pIdentifier
        /// -----------------------------------------------------------------------
        /// IDENTIFIER_VALUE            |   attribute name          |   Si IDENTIFIER_TYPE es ATTRIBUTE: entonces IDENTIFIER_VALUE será el nombre del atributo del elemento HTML para establecer
        ///                             |                           |   el valor de HtmlHelper.GetHtmlElementByAttribute.pAttribute
        /// -----------------------------------------------------------------------
        /// IDENTIFIER_VALUE            |   regular expression      |   Si IDENTIFIER_TYPE es REGEX: entonces IDENTIFIER_VALUE será una expresión regular para establecer
        ///                             |                           |   el valor de HtmlHelper.GetHtmlElementByRegexExpression.pRegexExpression
        /// -----------------------------------------------------------------------
        /// IDENTIFIER_VALUE            |   id o name               |   Si IDENTIFIER_TYPE es ALL: para obtener HtmlElement entonces IDENTIFIER_VALUE será:
        ///                             |   o attribute name        |   id o name del elemento HTML para establecer el valor de HtmlHelper.GetHtmlElement.pIdentifier
        ///                             |                           |   o nombre del atributo del elemento HTML para establecer el valor de HtmlHelper.GetHtmlElementByAttribute.pAttribute
        ///                             |   o regular expression    |   o una expresión regular para establecer el valor de HtmlHelper.GetHtmlElementByRegexExpression.pRegexExpression
        /// -----------------------------------------------------------------------
        /// ATTRIBUTE_TAG               |   tag name                |   Nombre de la etiqueta para el atributo del elemento HTML para establecer el valor de HtmlHelper.GetHtmlElementByAttribute.pTag
        /// -----------------------------------------------------------------------
        /// ATTRIBUTE_VALUE             |   attribute value         |   Valor del atributo de la etiqueta del elemento HTML para establecer el valor de HtmlHelper.GetHtmlElementByAttribute.pValue
        /// -----------------------------------------------------------------------
        /// REGEX_TAG                   |   tag name                |   Nombre de la etiqueta del elemento HTML para establecer el valor de HtmlHelper.GetHtmlElementByRegexExpression.pTag
        /// </summary>
        /// <param name="pWebBrowser">Objeto WebBrowser</param>
        /// <param name="pIdentifierParams">Parámetros de configuración del elemento a buscar</param>
        /// <returns>HtmlElement</returns>
        public static HtmlElement GetAnyHtmlElement(WebBrowser pWebBrowser, Dictionary<string, string> pIdentifierParams)
        {
            try
            {
                if (!pIdentifierParams.DictionaryHasContent()) throw CollectionExtension.DictionaryHasNoContentException;
                string vIdentifierType =
                    pIdentifierParams.GetValueFromDictionary(HtmlHelperConstant.IDENTIFIER_PARAM_KEY_TYPE_NAME, HtmlHelperConstant.IDENTIFIER_PARAM_KEY_TYPE_VALUE_ALL);
                string vIdentifierValue = pIdentifierParams.GetValueFromDictionary(HtmlHelperConstant.IDENTIFIER_PARAM_KEY_VALUE);
                HtmlElement vHtmlElement = null;
                string vHtmlBase = HtmlHelper.GetHtmlFromElementByIdentifier(pWebBrowser.Document,
                    pIdentifierParams.GetValueFromDictionary(HtmlHelperConstant.IDENTIFIER_PARAM_KEY_VALUE_FOR_HTML_BASE, pIgnoreError: true));

                switch (vIdentifierType)
                {
                    case HtmlHelperConstant.IDENTIFIER_PARAM_KEY_TYPE_VALUE_ID:
                        vHtmlElement = HtmlHelper.GetHtmlElement(pHtmlDoc: pWebBrowser.Document, pIdentifier: vIdentifierValue);
                        break;
                    case HtmlHelperConstant.IDENTIFIER_PARAM_KEY_TYPE_VALUE_ATTRIBUTE:
                        vHtmlElement = HtmlHelper.GetHtmlElementByAttribute(
                            pHtmlDoc: pWebBrowser.Document,
                            pTag: pIdentifierParams.GetValueFromDictionary(HtmlHelperConstant.IDENTIFIER_PARAM_KEY_ATTRIBUTE_TAG),
                            pAttribute: vIdentifierValue,
                            pValue: pIdentifierParams.GetValueFromDictionary(HtmlHelperConstant.IDENTIFIER_PARAM_KEY_ATTRIBUTE_VALUE)
                        );
                        break;
                    case HtmlHelperConstant.IDENTIFIER_PARAM_KEY_TYPE_VALUE_REGEX:
                        vHtmlElement = HtmlHelper.GetHtmlElementByRegexExpression(
                            pHtmlDoc: pWebBrowser.Document,
                            pHtml: vHtmlBase,
                            pRegexExpression: vIdentifierValue,
                            pTag: pIdentifierParams.GetValueFromDictionary(HtmlHelperConstant.IDENTIFIER_PARAM_KEY_REGEX_TAG)
                        );
                        break;
                    case HtmlHelperConstant.IDENTIFIER_PARAM_KEY_TYPE_VALUE_ALL:
                    default:
                        vHtmlElement = HtmlHelper.GetHtmlElement(pHtmlDoc: pWebBrowser.Document, pIdentifier: vIdentifierValue);
                        if (vHtmlElement == null) vHtmlElement = HtmlHelper.GetHtmlElementByAttribute(
                            pHtmlDoc: pWebBrowser.Document,
                            pTag: pIdentifierParams.GetValueFromDictionary(HtmlHelperConstant.IDENTIFIER_PARAM_KEY_ATTRIBUTE_TAG),
                            pAttribute: vIdentifierValue,
                            pValue: pIdentifierParams.GetValueFromDictionary(HtmlHelperConstant.IDENTIFIER_PARAM_KEY_ATTRIBUTE_VALUE)
                        );
                        if (vHtmlElement == null) vHtmlElement = HtmlHelper.GetHtmlElementByRegexExpression(
                            pHtmlDoc: pWebBrowser.Document,
                            pHtml: vHtmlBase,
                            pRegexExpression: vIdentifierValue,
                            pTag: pIdentifierParams.GetValueFromDictionary(HtmlHelperConstant.IDENTIFIER_PARAM_KEY_REGEX_TAG)
                        );
                        break;
                }

                return vHtmlElement;
            }
            catch (Exception vException)
            {
                Logging.Logger.Error(vException);
                throw vException;
            }
        }
    }
}