using FlexCel.XlsAdapter;
using log4net;
using System;
using System.Windows.Forms;

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
                XlsFile vXlsFile = new XlsFile();
                string vFilename = "1.Control Consecutivos de Cartas.xlsx";
                vXlsFile.Open(DEFAULT_ATTACHMENTS_FOLDER + vFilename);
                vXlsFile.ActiveSheetByName = DateTime.Now.ToString("yyyy");

                string vClienteCartaPromesaPago = string.Empty;
                int vRowNumber = 0;

                do
                {
                    vRowNumber++;
                    object vValue = vXlsFile.GetCellValue(vRowNumber, 2);
                    if (vValue != null)
                    {
                        vClienteCartaPromesaPago = vValue.ToString();
                    }
                }
                while (!string.IsNullOrWhiteSpace(vClienteCartaPromesaPago));

                MessageBox.Show(vXlsFile.GetCellValue(vRowNumber, 1).ToString(), string.Format("Contents of Cell {0}, 1", vRowNumber), MessageBoxButtons.OK);
            }
            catch (Exception vE)
            {
                logger.Error(vE);
            }
        }
    }
}