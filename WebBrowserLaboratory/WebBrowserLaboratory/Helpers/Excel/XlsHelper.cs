using FlexCel.XlsAdapter;
using System;

namespace WebBrowserLaboratory.Helpers.Excel
{
    /// <summary>
    /// http://www.tmssoftware.biz/flexcel/doc/vcl/guides/api-developer-guide.html
    /// </summary>
    public class XlsHelper
    {
        XlsFile XlsFile;

        public XlsHelper(string pFilePath = null)
        {
            try
            {
                InitializeExcel(pFilePath);
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Abre el archivo; Si no se a definido pFilePath, entonces se crea y abre un nuevo archivo
        /// </summary>
        /// <param name="pFilePath">Directorio, nombre y extensión del archivo</param>
        public void InitializeExcel(string pFilePath = null)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pFilePath))
                {
                    XlsFile = new XlsFile(); // Inicializar el atributo de la clase con una nueva instancia
                    XlsFile.NewFile(1); // Crear y abre un nuevo archivo con una sola hoja de trabajo
                    XlsFile.SheetName = DateTime.Now.ToString("yyyy"); // Cambiarle el nombre a la hoja de trabajo predeterminada
                }
                else
                {
                    XlsFile vXlsFile = new XlsFile(pFilePath); // Crear una nueva instancia y abre el archivo que se recibe por parámetro
                    if (vXlsFile == null)
                    {
                        throw new NullReferenceException(string.Format("Cant open the excel file in the path: {0}.", pFilePath));
                    }
                    else
                    {
                        vXlsFile.AllowOverwritingFiles = true; // Permitir sobreescribir el archivo
                        XlsFile = vXlsFile; // Inicializar el atributo de la clase con la nueva instancia
                    }
                }
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Obtener el contenido de una celda
        /// </summary>
        /// <param name="pRowNumber"></param>
        /// <param name="pColumnNumber"></param>
        /// <param name="pSheetName"></param>
        /// <returns></returns>
        public string GetValueFromColAndRow(int pRowNumber, int pColumnNumber, string pSheetName = null)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(pSheetName)) XlsFile.ActiveSheetByName = pSheetName; // Seleccionar la hoja de trabajo
                object vValue = XlsFile.GetCellValue(pRowNumber, pColumnNumber); // Obtener el contenido de la celda
                return vValue != null ? vValue.ToString() : string.Empty; // Si se obtuvo el contenido de la celda, se devuelve en formato string
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Establecer el contenido de una celda
        /// </summary>
        /// <param name="pRowNumber"></param>
        /// <param name="pColumnNumber"></param>
        /// <param name="pNewValue"></param>
        /// <param name="pSheetName"></param>
        public void SetValueFromColAndRow(int pRowNumber, int pColumnNumber, string pNewValue, string pSheetName = null)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(pSheetName)) XlsFile.ActiveSheetByName = pSheetName; // Seleccionar la hoja de trabajo
                XlsFile.SetCellValue(pRowNumber, pColumnNumber, pNewValue); // Establecer el contenido de la celda
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        /// <summary>
        /// Guarda los cambios del archivo
        /// </summary>
        /// <param name="pFilePath">Directorio, nombre y extensión del archivo</param>
        public void SaveExcelFile(string pFilePath)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pFilePath))
                {
                    throw new NullReferenceException(string.Format("Cant save the excel file in the path: {0}.", pFilePath));
                }
                else
                {
                    XlsFile.Save(pFilePath); // Guardar los cambios del archivo en el directorio que se recibe por parámetro
                }
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        public void CloseExcel()
        {
            XlsFile = null;
        }
    }
}
