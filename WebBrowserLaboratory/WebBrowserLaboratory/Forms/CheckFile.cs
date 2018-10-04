using log4net;
using Microsoft.Win32.SafeHandles;
using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Security.AccessControl;
using System.Windows.Forms;
using WebBrowserLaboratory.Helpers;

namespace WebBrowserLaboratory.Forms
{
    public partial class CheckFile : Form
    {
        private const string DEFAULT_ATTACHMENTS_FOLDER = @"C:\ApptividadAttachments\";
        private static ILog logger;

        public CheckFile()
        {
            Log4Net.Init();
            logger = LogManager.GetLogger(typeof(CheckFile));
            InitializeComponent();
        }

        private void RunButton_Click(object sender, EventArgs e)
        {
            try
            {
                string vFilename = "Resumen-Submit-208.pdf";
                //string vFilename = "27sep2018_135137_COPIA_CEDULA_654987321.pdf";
                string vFilePath = DEFAULT_ATTACHMENTS_FOLDER + vFilename;

                if (File.Exists(vFilePath))
                {
                    using (StreamReader vStreamReader = new StreamReader(vFilePath))
                    {
                        Console.WriteLine(vStreamReader.ReadToEnd());
                    }
                    MessageBox.Show(IsFileLocked(new FileInfo(vFilePath)) ? "Is FileInfo Locked" : "Not Is FileInfo Locked", "Result", MessageBoxButtons.OK);
                    MessageBox.Show(IsFileLocked(vFilePath) ? "Is File Locked" : "Not Is File Locked", "Result", MessageBoxButtons.OK);
                    MessageBox.Show(IsFileInUse(vFilePath) ? "Is File In Use" : "Not Is File In Use", "Result", MessageBoxButtons.OK);
                    Process vProcess = Process.Start(vFilePath);
                }

                MessageBox.Show("Ending", "Result", MessageBoxButtons.OK);
            }
            catch (Exception vE)
            {
                logger.Error(vE);
                MessageBox.Show(vE.GetExceptionMessage(), "Error", MessageBoxButtons.OK);
            }
            finally
            {
                this.Close();
            }
        }

        private bool IsFileLocked(FileInfo pFileInfo)
        {
            FileStream vFileStream = null;
            try
            {
                vFileStream = pFileInfo.Open(FileMode.Open, FileAccess.Read, FileShare.None);
            }
            catch (IOException)
            {
                //The file is unavailable because it is:
                // * still being written to
                // * or being processed by another thread
                // * or does not exist (has already been processed)
                return true;
            }
            finally
            {
                if (vFileStream != null) vFileStream.Close();
            }
            return false; //file is not locked
        }

        private bool IsFileLocked(string pFileName)
        {
            bool vLocked = false;
            try
            {
                FileStream vFileStream = File.Open(pFileName, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None);
                vFileStream.Close();
            }
            catch (IOException vEx)
            {
                vLocked = true;
            }
            return vLocked;
        }

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern SafeFileHandle CreateFile(
            string lpFileName,
            FileSystemRights dwDesiredAccess,
            FileShare dwShareMode,
            IntPtr securityAttrs,
            FileMode dwCreationDisposition,
            FileOptions dwFlagsAndAttributes,
            IntPtr hTemplateFile
        );

        private const int ERROR_SHARING_VIOLATION = 32;

        private bool IsFileInUse(string pFileName)
        {
            bool vInUse = false;
            SafeFileHandle vSafeFileHandle =
                CreateFile(pFileName, FileSystemRights.Modify, FileShare.Write, IntPtr.Zero, FileMode.OpenOrCreate, FileOptions.None, IntPtr.Zero);
            vInUse = vSafeFileHandle.IsInvalid && Marshal.GetLastWin32Error().Equals(ERROR_SHARING_VIOLATION);
            vSafeFileHandle.Close();
            return vInUse;
        }
    }
}