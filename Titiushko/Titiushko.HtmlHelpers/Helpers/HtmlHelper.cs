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
                    foreach (HtmlWindow frame in pHtmlDoc.Window.Frames)
                    {
                        if (vHtmlElement == null)
                        {
                            vHtmlElement = frame.Document.GetElementById(pIdentifier) != null
                                ? frame.Document.GetElementById(pIdentifier)
                                : (frame.Document.All[pIdentifier] != null ? frame.Document.All[pIdentifier] : null);
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

        /// <summary>
        /// Devuelve un DataTable basado en una tabla HTML String
        /// </summary>
        /// <param name="pHtmlTable">Estructura de tabla HTML</param>
        /// <param name="pFirstRowAsColumnNames">True si la primera fila se tomará como la estructura del encabezado</param>
        /// <param name="pRemoveTildes">Si se establece en True si las tildes se deben eliminar del nombre de las columnas de encabezado, de lo contrario, el nombre permanece como está</param>
        /// <param name="pTableName">Nombre del objeto DataTable</param>
        /// <returns>DataTable con los datos de la tabla HTML</returns>
        public static DataTable ConvertHTMLTablesToDataTable(string pHtmlTable, bool pFirstRowAsColumnNames = true, bool pRemoveTildes = false, string pTableName = null)
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
                        MatchCollection vHeaders = vTable.Value.GetHeaders();
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
                            Match vHeaderRow = vTable.Value.GetHeaderRow();
                            if (vHeaderRow.Success)
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
            foreach (DataRow vRow in pDataTable.AsEnumerable())
            {
                try
                {
                    ICollection<XAttribute> vCols = new HashSet<XAttribute>();
                    foreach (DataColumn vCol in pDataTable.Columns.Cast<DataColumn>())
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
            return vRows;
        }
    }
}