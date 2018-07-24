using log4net;
using System;
using System.Windows.Forms;
using WebBrowserLaboratory.Helpers;
using WebBrowserLaboratory.Helpers.Excel;

namespace WebBrowserLaboratory.Forms
{
    public partial class FlexCelAPI : Form
    {
        private const string DEFAULT_ATTACHMENTS_FOLDER = @"C:\ApptividadAttachments\";
        private static ILog logger;

        public FlexCelAPI()
        {
            Log4Net.Init();
            logger = LogManager.GetLogger(typeof(FlexCelAPI));
            InitializeComponent();
        }

        private void RunButton_Click(object sender, EventArgs e)
        {
            try
            {
                string vFilename = "1.Control Consecutivos de Cartas.xlsx";
                string vFilePath = DEFAULT_ATTACHMENTS_FOLDER + vFilename;
                XlsHelper XlsHelper = new XlsHelper(vFilePath);

                string SheetName = DateTime.Now.ToString("yyyy");
                string vNumeroCartaPromesaPago = string.Empty;
                string vClienteCartaPromesaPago = string.Empty;
                int vRowNumber = 0;

                do
                {
                    vRowNumber++;
                    vClienteCartaPromesaPago = XlsHelper.GetValueFromColAndRow(vRowNumber, 2, SheetName);
                }
                while (!string.IsNullOrWhiteSpace(vClienteCartaPromesaPago));

                vNumeroCartaPromesaPago = XlsHelper.GetValueFromColAndRow(vRowNumber, 1, SheetName);

                XlsHelper.SetValueFromColAndRow(vRowNumber, 2, "Tito Miguel", SheetName);
                XlsHelper.SetValueFromColAndRow(vRowNumber, 3, "Carta Promesa", SheetName);
                XlsHelper.SetValueFromColAndRow(vRowNumber, 4, "Principal", SheetName);
                XlsHelper.SetValueFromColAndRow(vRowNumber, 5, DateTime.Now.ToString("MM/dd/yyyy"), SheetName);
                XlsHelper.SetValueFromColAndRow(vRowNumber, 6, "Lian Ríos", SheetName);
                XlsHelper.SaveExcelFile(vFilePath);
                XlsHelper.CloseExcel();

                string vResultMessage = string.Format(
                    "Se guardaron los cambios en el archivo: {0}\n\r" +
                    "El contenido de la celda [{1}, 1] es: {2}",
                    vFilePath,
                    vRowNumber,
                    vNumeroCartaPromesaPago
                );
                MessageBox.Show(vResultMessage, "Resultado", MessageBoxButtons.OK);
            }
            catch (Exception vE)
            {
                logger.Error(vE);
                MessageBox.Show(vE.GetExceptionMessage(), "Error", MessageBoxButtons.OK);
            }
        }
    }
}