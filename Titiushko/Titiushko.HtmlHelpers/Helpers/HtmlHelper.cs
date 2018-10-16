using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using System.Xml.Linq;
using Titiushko.Utilities.Extensions;

namespace Titiushko.HtmlHelpers.Helpers
{
    public class HtmlHelper
    {
        #region DOM Element Helpers
        /// <summary>
        /// Obtener listado de frames de HtmlDocument.Window.Frames
        /// </summary>
        /// <param name="pHtmlDoc">HtmlDocument donde se va a buscar</param>
        /// <returns>HtmlWindowCollection listado de frames</returns>
        public static HtmlWindowCollection GetFramesFromDocument(HtmlDocument pHtmlDoc)
        {
            try
            {
                return pHtmlDoc != null && pHtmlDoc.Window != null && pHtmlDoc.Window.Frames != null && pHtmlDoc.Window.Frames.Count > 0
                    ? pHtmlDoc.Window.Frames
                    : null;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Evaluar si contiene HtmlDocument.Body.InnerHtml
        /// </summary>
        /// <param name="pHtmlDoc">HtmlDocument donde se va a buscar</param>
        /// <returns>Boolean</returns>
        public static bool BodyHasHtmlFromDocument(HtmlDocument pHtmlDoc)
        {
            try
            {
                return pHtmlDoc != null && pHtmlDoc.Body != null && !string.IsNullOrWhiteSpace(pHtmlDoc.Body.InnerHtml);
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Evaluar si el frame (objeto HtmlWindow) es distinto de núlo y contenga HtmlWindow.Document
        /// </summary>
        /// <param name="pFrame">Objeto HtmlWindow a evaluar</param>
        /// <returns>Boolean</returns>
        public static bool FrameIsNotNull(HtmlWindow pFrame)
        {
            try
            {
                return pFrame != null && pFrame.Document != null;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Obtener listado de HtmlElement de HtmlDocument.Window.Frames por nombre de etiqueta
        /// </summary>
        /// <param name="pHtmlDoc">HtmlDocument donde se va a buscar</param>
        /// <param name="pTag">Nombre de la etiqueta para hacer la búsqueda</param>
        /// <returns>HtmlElementCollection listado de HtmlElement</returns>
        public static HtmlElementCollection GetHtmlElementsFromFramesByTagName(HtmlDocument pHtmlDoc, string pTag)
        {
            try
            {
                HtmlElementCollection vHtmlElements = null;
                HtmlWindowCollection vParentFrames = GetFramesFromDocument(pHtmlDoc);
                if (vParentFrames != null)
                {
                    foreach (HtmlWindow vParentFrame in vParentFrames)
                    {
                        if (vHtmlElements == null)
                        {
                            try
                            {
                                if (FrameIsNotNull(vParentFrame))
                                {
                                    vHtmlElements = vParentFrame.Document.GetElementsByTagName(pTag).Count > 0
                                        ? vParentFrame.Document.GetElementsByTagName(pTag) : null;
                                    if (vHtmlElements == null)
                                    {
                                        if (GetFramesFromDocument(vParentFrame.Document) != null)
                                            vHtmlElements = GetHtmlElementsFromFramesByTagName(vParentFrame.Document, pTag);
                                    }
                                }
                            }
                            catch (Exception vE)
                            {
                                // Continuar si falla
                                continue;
                            }
                        }
                        else
                        {
                            break;
                        }
                    }
                }
                return vHtmlElements;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Obtener un HtmlElement de HtmlDocument.Window.Frames
        /// </summary>
        /// <param name="pHtmlDoc">HtmlDocument donde se va a buscar</param>
        /// <param name="pIdentifier">Identificador del elemento que se está buscando (id o name o attribute)</param>
        /// <returns>HtmlElement encontrado o nulo si no se encontró</returns>
        public static HtmlElement GetHtmlElementFromFrames(HtmlDocument pHtmlDoc, string pIdentifier)
        {
            try
            {
                if (pHtmlDoc == null) return null;
                HtmlElement vHtmlElement = null;
                HtmlWindowCollection vParentFrames = GetFramesFromDocument(pHtmlDoc);
                if (vParentFrames != null)
                {
                    foreach (HtmlWindow vParentFrame in vParentFrames)
                    {
                        if (vHtmlElement == null)
                        {
                            try
                            {
                                if (FrameIsNotNull(vParentFrame))
                                {
                                    vHtmlElement = vParentFrame.Document.GetElementById(pIdentifier) != null
                                    ? vParentFrame.Document.GetElementById(pIdentifier)
                                    : (vParentFrame.Document.All[pIdentifier] != null ? vParentFrame.Document.All[pIdentifier] : null);
                                    if (vHtmlElement == null)
                                    {
                                        if (GetFramesFromDocument(vParentFrame.Document) != null)
                                            vHtmlElement = GetHtmlElementFromFrames(vParentFrame.Document, pIdentifier);
                                    }
                                }
                            }
                            catch (Exception vE)
                            {
                                // Continuar si falla
                                continue;
                            }
                        }
                        else
                        {
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
                if (pHtmlDoc == null || string.IsNullOrWhiteSpace(pIdentifier)) return null;
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
                if (pHtmlDoc == null) return null;
                pTag = string.IsNullOrWhiteSpace(pTag) ? string.Empty : pTag;
                pAttribute = string.IsNullOrWhiteSpace(pAttribute) ? string.Empty : pAttribute;
                pValue = string.IsNullOrWhiteSpace(pValue) ? string.Empty : pValue;
                HtmlElement vHtmlElement = null;
                if (pHtmlDoc != null)
                {
                    foreach (HtmlElement element in pHtmlDoc.GetElementsByTagName(pTag))
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
        /// <param name="pHtmlDoc">HtmlDocument donde se va a buscar</param>
        /// <param name="pHtml">HTML string para evaluar pRegexExpression</param>
        /// <param name="pRegexExpression">Expersión regular para buscar el elemento</param>
        /// <param name="pTag">Opcional: nombre del tag HTML para buscar el elemento</param>
        /// <returns>Si se encuentra el elemento se retorna el objeto HtmlElement, de lo contrario se retorna null</returns>
        public static HtmlElement GetHtmlElementByRegexExpression(HtmlDocument pHtmlDoc, string pHtml, string pRegexExpression, string pTag = null)
        {
            try
            {
                if (pHtmlDoc == null || string.IsNullOrWhiteSpace(pHtml)) return null;
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
                    HtmlElementCollection vHtmlElements = pHtmlDoc.GetElementsByTagName(pTag);
                    if (vHtmlElements == null || vHtmlElements.Count == 0) vHtmlElements = GetHtmlElementsFromFramesByTagName(pHtmlDoc, pTag);
                    if (vHtmlElements != null && vHtmlElements.Count > 0)
                    {
                        foreach (HtmlElement vElement in vHtmlElements)
                        {
                            if (Regex.IsMatch(vElement.OuterHtml.RemoveTildes(), pRegexExpression, RegexOptions.IgnoreCase))  // Si elemento por tag es igual a la primera coincidencia
                            {
                                vHtmlElement = vElement;    // Obtener el elemento por tag
                                break;
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
        /// Obtener el string del HTML de un HtmlElement que se obtiene por identificador.
        /// Si no está definido el identificador para obtener el HtmlElement, entonces el string del HTML se toma de HtmlDocument.
        /// Si se encuentra un HtmlElement con el identificador definido y el HtmlElement es un IFRAME, entonces el string del HTML se toma de HtmlDocument del IFRAME.
        /// </summary>
        /// <param name="pHtmlDoc">HtmlDocument que proviene del WebBrowser actual. Se utiliza para obtener el string del HTML.</param>
        /// <param name="pElementIdentifier">Opcional: Identificador para buscar el HtmlElement.</param>
        /// <returns>String del HTML de un HtmlElement o de HtmlDocument del WebBrowser.</returns>
        public static string GetHtmlFromElementByIdentifier(HtmlDocument pHtmlDoc, string pElementIdentifier = null)
        {
            try
            {
                if (pHtmlDoc == null) return string.Empty;
                string vHtml = string.Empty;
                if (string.IsNullOrWhiteSpace(pElementIdentifier))
                {
                    // Si no está definido el identificador para obtener el HtmlElement, entonces el string del HTML se toma de HtmlDocument del WebBrowser
                    vHtml = BodyHasHtmlFromDocument(pHtmlDoc) ? pHtmlDoc.Body.InnerHtml : string.Empty;
                }
                else
                {
                    // Si está definido el identificador para obtener el HtmlElement, entonces se busca dentro de HtmlDocument del WebBrowser
                    HtmlElement vHtmlElement = GetHtmlElement(pHtmlDoc, pElementIdentifier);
                    if (vHtmlElement != null)
                    {
                        // Si se logró obtener el HtmlElement, entonces se toma el string del HTML
                        vHtml = vHtmlElement.TagName.Equals(ElementHelper.IFRAME_NAME_TAG)
                            ? GetHtmlFromFrameByIdentifier(pHtmlDoc, pElementIdentifier) // Si el HtmlElement es iframe, entonces se busca el HTML dentro del iframe
                            : (!string.IsNullOrWhiteSpace(vHtmlElement.InnerHtml) ? vHtmlElement.InnerHtml : string.Empty);
                    }
                    else
                    {
                        // Si no se logró obtener ningún HtmlElement, entonces se devuelve una cadena vacía para esperar hasta volver a intentar buscar un elemento
                        vHtml = string.Empty;
                    }
                }
                return vHtml;
            }
            catch (NullReferenceException vE)
            {
                // No se obtuvo ningún elemento, entonces se devuelve una cadena vacía
                return string.Empty;
            }
            catch (Exception vE)
            {
                // Error desconocido, se devuelve la excepción
                throw vE;
            }
        }

        /// <summary>
        /// Obtener el string HTML de un IFrame. Se busca recursivamente dentro de child frames o sub-frames
        /// </summary>
        /// <param name="pHtmlDoc">HtmlDocument donde se va a buscar</param>
        /// <param name="pFrameIdentifier">Identificador del IFrame HTML</param>
        /// <returns>String del HTML del IFrame, si no se encuentra se obtiene string.Empty</returns>
        public static string GetHtmlFromFrameByIdentifier(HtmlDocument pHtmlDoc, string pFrameIdentifier = null)
        {
            try
            {
                if (pHtmlDoc == null) return string.Empty;
                string vHtml = string.Empty;
                // Evaluar si el HtmlDocument tiene frames
                HtmlWindowCollection vParentFrames = GetFramesFromDocument(pHtmlDoc);
                if (vParentFrames != null)
                {
                    // Recorrer los frames del HtmlDocument
                    foreach (HtmlWindow vParentFrame in vParentFrames)
                    {
                        if (FrameIsNotNull(vParentFrame))
                        {
                            // Si se conoce el Id del frame, entonces se busca por Id, de lo contrario se busca para todos los frames
                            bool vByIdentifier = !string.IsNullOrWhiteSpace(pFrameIdentifier) ? vParentFrame.WindowFrameElement.Id.Equals(pFrameIdentifier) : true;
                            if (vByIdentifier)
                            {
                                // Obtener el HTML del frame
                                vHtml = BodyHasHtmlFromDocument(vParentFrame.Document) ? vParentFrame.Document.Body.InnerHtml : vHtml;
                                break;
                            }
                            // Evaluar si el HtmlDocument del frame tiene frames (child frames o sub-frames)
                            else if (GetFramesFromDocument(vParentFrame.Document) != null)
                            {
                                // Buscar recursivamente el HTML dentro de los child frames
                                vHtml = GetHtmlFromFrameByIdentifier(vParentFrame.Document, pFrameIdentifier);
                            }
                            else
                            {
                                vHtml = string.Empty;
                            }
                        }
                        else
                        {
                            vHtml = string.Empty;
                        }
                    }
                }
                else
                {
                    vHtml = string.Empty;
                }
                return vHtml;
            }
            catch (NullReferenceException vE)
            {
                return string.Empty;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }
        #endregion

        #region Table Helpers
        /// <summary>
        /// Devuelve un DataTable basado en una tabla HTML String
        /// <param name="pHtmlTable">Estructura de tabla HTML</param>
        /// <param name="pFirstRowAsColumnNames">True si la primera fila se tomará como la estructura del encabezado</param>
        /// <param name="pRemoveTildes">Si se establece en True si las tildes se deben eliminar del nombre de las columnas de encabezado, de lo contrario, el nombre permanece como está</param>
        /// <param name="pTableName">Nombre del objeto DataTable</param>
        /// <returns>DataTable con los datos de la tabla HTML</returns>
        public static DataTable ConvertHTMLTablesToDataTable(string pHtmlTable, bool pFirstRowAsColumnNames = true, bool pRemoveTildes = false, string pTableName = null, bool pUseRegexToEvaluateTable = true)
        {
            try
            {
                DataTable vDataTable = null;
                bool vHeadersExist = false; // Verifica si encontraron HEADERS en TABLE
                bool vHeadersFromFirstRow = false;  // Verifica se tomarón como HEADERS los TD del primer TR de TABLE

                MatchCollection vTables = Regex.Matches(pHtmlTable, ElementHelper.TABLE_PATTERN, ElementHelper.ExpressionOptions);  // Obtener una coincidencia para todas las tablas en el HTML
                vTables = vTables.Count > 0 ? vTables : Regex.Matches(string.Format(ElementHelper.TABLE_FORMAT, pHtmlTable), ElementHelper.TABLE_PATTERN, ElementHelper.ExpressionOptions);

                if (vTables.Count > 0)
                {
                    foreach (Match vTable in vTables)
                    {
                        vHeadersExist = false;
                        vHeadersFromFirstRow = false;
                        vDataTable = new DataTable();

                        #region Obtiene los encabezados si existe
                        MatchCollection vHeaders = null != vTable.Value.GetHeaders() ? vTable.Value.GetHeaders() : null;
                        vHeadersExist = vHeaders != null && vHeaders.Count > 0;   // Evaluar si se obtuvieron HEADERS
                        if (vHeadersExist)
                        {
                            int vColumnIndex = 0;
                            foreach (Match vHeader in vHeaders)
                            {
                                vDataTable.AddHeader(vHeader, ElementHelper.DEFAULT_COLUMN_NAME, ref vColumnIndex, pRemoveTildes);
                            }
                        }
                        else if (pFirstRowAsColumnNames)
                        {
                            Match vHeaderRow = null;
                            vHeaderRow = vTable.Value.GetHeaderRow();

                            if (null != vHeaderRow && vHeaderRow.Success)
                            {
                                MatchCollection vColumns = Regex.Matches(vHeaderRow.Value, ElementHelper.TD_PATTERN, ElementHelper.ExpressionOptions);
                                vHeadersExist = vHeadersFromFirstRow = vColumns.Count > 0; // Evaluar si se obtuvieron HEADERS
                                if (vHeadersExist)
                                {
                                    int vColumnIndex = 0;
                                    foreach (Match vColumn in vColumns)
                                    {
                                        vDataTable.AddHeader(vColumn, ElementHelper.DEFAULT_COLUMN_NAME, ref vColumnIndex, pRemoveTildes);
                                    }
                                }
                            }
                        }
                        else // No se obtuvieron HEADERS
                        {
                            vHeadersExist = vHeadersFromFirstRow = false;
                            MatchCollection vRowsFromTable = vTable.Value.GetRows();
                            if (vRowsFromTable != null && vRowsFromTable.Count > 0)
                            {
                                MatchCollection vColumnsFromTable = Regex.Matches(vRowsFromTable[0].Value, ElementHelper.TD_PATTERN, ElementHelper.ExpressionOptions);
                                if (vColumnsFromTable.Count > 0)
                                {
                                    for (int vColumnCount = 1; vColumnCount <= vColumnsFromTable.Count; vColumnCount++)
                                    {
                                        vDataTable.Columns.Add(string.Format("{0}{1}", ElementHelper.DEFAULT_COLUMN_NAME, vColumnCount));
                                    }
                                }
                            }
                        }
                        #endregion

                        #region Obtener una coincidencia para todas las filas en la tabla
                        if (pUseRegexToEvaluateTable)
                        {
                            MatchCollection vRows = vTable.Value.GetRows();
                            if (vRows != null && vRows.Count > 0)
                            {
                                int vCurrentRow = 0;
                                foreach (Match vRow in vRows)
                                {
                                    // Si vHeadersExist = true y vHeadersFromFirstRow = true, entonces no se encontraron HEADERS y se tomarón como HEADERS los TD del primer TR de TABLE
                                    // Por lo tanto no se agrega el primer TR al DataTable
                                    if (!(vCurrentRow == 0 && vHeadersExist && vHeadersFromFirstRow))
                                    {
                                        MatchCollection vColumns = Regex.Matches(vRow.Value, ElementHelper.TD_PATTERN, ElementHelper.ExpressionOptions);
                                        if (vColumns.Count > 0)
                                        {
                                            DataRow vDataRow = vDataTable.NewRow();
                                            int vCurrentColumn = 0;
                                            foreach (Match vColumn in vColumns)
                                            {
                                                vDataRow[vCurrentColumn++] = vColumn.Groups[1].GetString().RemoveHtmlTags();
                                            }
                                            vDataTable.Rows.Add(vDataRow);
                                        }
                                    }
                                    vCurrentRow++;
                                }
                            }
                        }
                        else
                        {
                            HtmlAgilityPack.HtmlDocument vDocument = new HtmlAgilityPack.HtmlDocument();
                            vDocument.LoadHtml(pHtmlTable);
                            List<List<string>> vParsedTable = vDocument.DocumentNode.SelectSingleNode("//table")
                            .Descendants("tr")
                            .Skip(1)
                            .Where(tr => tr.Elements("td").Count() > 1)
                            .Select(tr => tr.Elements("td").Select(td => td.InnerText.Trim()).ToList())
                            .ToList();
                            int vCurrentRow = 1;
                            foreach (List<string> vRow in vParsedTable)
                            {
                                DataRow vDataRow = vDataTable.NewRow();
                                int vCurrentColumn = 0;
                                foreach (string vValue in vRow)
                                {
                                    vDataRow[vCurrentColumn++] = vValue.RemoveHtmlTags();
                                }
                                vDataTable.Rows.Add(vDataRow);
                                vCurrentRow++;
                            }
                        }
                        #endregion
                    }
                }

                if (null != vDataTable && !string.IsNullOrWhiteSpace(pTableName)) vDataTable.TableName = pTableName;
                return vDataTable;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Devuelve listado de XElement de la lista DataRow de un DataTable
        /// </summary>
        /// <param name="pDataTable">DataTable con los datos de la tabla HTML</param>
        /// <returns>Lista de XElement con los datos de las filas</returns>
        public static ICollection<XElement> ConvertDataTableRowsToXElements(DataTable pDataTable)
        {
            ICollection<XElement> vRows = new HashSet<XElement>();
            if (null != pDataTable)
            {
                foreach (DataRow vRow in pDataTable.AsEnumerable())
                {
                    try
                    {
                        ICollection<XAttribute> vCols = new HashSet<XAttribute>();
                        foreach (DataColumn vCol in pDataTable.Columns)
                        {
                            try
                            {
                                string vAttributeValue = Regex.Replace(vCol.ColumnName, "[^A-Za-z0-9]", string.Empty);
                                XAttribute vXAttribute = new XAttribute(vAttributeValue, vRow[vCol]);
                                vCols.Add(vXAttribute);
                            }
                            catch (Exception vE)
                            {
                                throw vE;
                            }
                        }
                        XElement vXElement = new XElement("row", vCols);
                        vRows.Add(vXElement);
                    }
                    catch (Exception vE)
                    {
                        throw vE;
                    }
                }
            }
            return vRows;
        }
        #endregion
    }
}