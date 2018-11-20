using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Titiushko.Utilities.Extensions;

namespace Titiushko.HtmlHelpers
{
    public static class HtmlHelperExtension
    {
        /// <summary>
        /// Obtiene el identificador (id o name) de un elemento html string
        /// </summary>
        /// <param name="pText">Texto donde se busca el identificador</param>
        /// <returns>Identificador; Si algo da error, devuelve una cadena vacía</returns>
        public static string GetIdentifier(this string pText)
        {
            try
            {
                Match vMatch = Regex.Match(pText, HtmlHelperConstant.IDENTIFIER_PATTERN, RegexOptions.IgnoreCase);
                return vMatch.Success ? Regex.Replace(vMatch.Value, HtmlHelperConstant.IDENTIFIER_PATTERN_REPLACE, string.Empty, RegexOptions.IgnoreCase) : string.Empty;
            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Obtener los HEADERS de TABLE
        /// </summary>
        /// <param name="pTable">Tabla HTML en formato string</param>
        /// <returns>Resultado del regex para obtener los HEADERS</returns>
        public static MatchCollection GetHeaders(this string pTable)
        {
            try
            {
                MatchCollection vHeaders = null;
                Match vThead = Regex.Match(pTable, HtmlHelperConstant.THEAD_PATTERN, HtmlHelperConstant.ExpressionOptions);
                if (vThead.Success) // Si TABLE tiene THEAD
                {
                    vHeaders = Regex.Matches(vThead.Value, HtmlHelperConstant.TH_PATTERN, HtmlHelperConstant.ExpressionOptions);  // Obtener los TH de THEAD
                    vHeaders = vHeaders.Count > 0 ? vHeaders : Regex.Matches(vThead.Value, HtmlHelperConstant.TD_PATTERN, HtmlHelperConstant.ExpressionOptions);  // Si el THEAD no tiene TH, entonces se obtienen los TD
                }
                else if (Regex.IsMatch(pTable, HtmlHelperConstant.TH_PATTERN, HtmlHelperConstant.ExpressionOptions)) // Si TABLE no tiene THEAD, buscar si tiene TH
                {
                    vHeaders = Regex.Matches(pTable, HtmlHelperConstant.TH_PATTERN, HtmlHelperConstant.ExpressionOptions);  // Obtener los TH de TABLE
                }
                return vHeaders;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Obtener el primer TR de TABLE
        /// </summary>
        /// <param name="pTable">Tabla HTML en formato string</param>
        /// <returns>Resultado del regex para obtener el primer TR</returns>
        public static Match GetHeaderRow(this string pTable)
        {
            try
            {
                Match vThead = Regex.Match(pTable, HtmlHelperConstant.THEAD_PATTERN, HtmlHelperConstant.ExpressionOptions);
                MatchCollection vRowsForHeader = null;
                if (vThead.Success) // Si TABLE tiene THEAD
                {
                    vRowsForHeader = Regex.Matches(vThead.Value, HtmlHelperConstant.TR_PATTERN, HtmlHelperConstant.ExpressionOptions);  // Obtener los TR de THEAD
                }
                else // Si TABLE no tiene THEAD
                {
                    vRowsForHeader = pTable.GetRows();
                }
                return vRowsForHeader != null ? vRowsForHeader[0] : null;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Obtener los TR de TABLE
        /// </summary>
        /// <param name="pTable">Tabla HTML en formato string</param>
        /// <returns>Resultado del regex para obtener los TR</returns>
        public static MatchCollection GetRows(this string pTable)
        {
            try
            {
                Match vTbody = Regex.Match(pTable, HtmlHelperConstant.TBODY_PATTERN, HtmlHelperConstant.ExpressionOptions);
                MatchCollection vRows = null;
                if (vTbody.Success) // Si TABLE tiene TBODY
                {
                    vRows = Regex.Matches(vTbody.Value, HtmlHelperConstant.TR_PATTERN, HtmlHelperConstant.ExpressionOptions);  // Obtener los TR de TBODY
                }
                else // Si TABLE no tiene TBODY, buscar los TR
                {
                    vRows = Regex.Matches(pTable, HtmlHelperConstant.TR_PATTERN, HtmlHelperConstant.ExpressionOptions);  // Obtener los TR de TABLE
                }
                return vRows;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Agrega encabezado a DataTable a partir del resultado de expresión regular
        /// </summary>
        /// <param name="pDataTable">DataTable con los datos de la tabla HTML</param>
        /// <param name="pHeader">Resultado de expresión regular para obtener el nombre del encabezado</param>
        /// <param name="pDefaultHeaderName">Nombre de encabezado por defecto si no se pudo obtener de pHeader</param>
        /// <param name="pCorrelative">Correlativo para encabezado por defecto si no se pudo obtener de pHeader</param>
        /// <param name="pRemoveTildes">Bandera para determinar si quitar o no las tildes del nombre del encabezado</param>
        public static void AddHeader(this System.Data.DataTable pDataTable, Match pHeader, string pDefaultHeaderName, ref int pCorrelative, bool pRemoveTildes = false)
        {
            try
            {
                string vColumnName = pHeader.Groups[1].GetString().RemoveHtmlTags();
                if (pRemoveTildes) vColumnName = vColumnName.RemoveHtmlTags();
                vColumnName = !string.IsNullOrWhiteSpace(vColumnName) && vColumnName.ToInt() == -1  // El nombre de la columna no debe ser un número
                    ? vColumnName
                    : pDefaultHeaderName;
                pDataTable.Columns.Add(
                    pDataTable.Columns.Contains(vColumnName)
                    ? string.Format("{0}{1}", vColumnName, ++pCorrelative)
                    : vColumnName
                );
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Obtener string del objeto Group
        /// </summary>
        /// <param name="pGroup">Group proveniente de un objeto Match</param>
        /// <returns>String</returns>
        public static string GetString(this Group pGroup)
        {
            try
            {
                return pGroup.ToString().Trim().ReplaceMultiple(new Dictionary<string, string>()
                {
                    { "\r\n", string.Empty },
                    { "&nbsp;", string.Empty },
                    { "&NBSP;", string.Empty }
                });
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}