using System.Collections;
using System;
using WebBrowserLaboratory.Helpers;
using System.Configuration;
using Titiushko.Utilities.Extensions;

namespace WebBrowserLaboratory
{
    public partial class MyWebBrowser : BaseForm
    {
        private string SystemWebsite_Url = ConfigurationManager.AppSettings["SystemWebsite.Url"];
        private string SystemWebsite_UserName = ConfigurationManager.AppSettings["SystemWebsite.UserName"];
        private string SystemWebsite_Password = ConfigurationManager.AppSettings["SystemWebsite.Password"];
        private string DeathByCaptchaService_UserName = ConfigurationManager.AppSettings["DeathByCaptchaService.UserName"];
        private string DeathByCaptchaService_Password = ConfigurationManager.AppSettings["DeathByCaptchaService.Password"];

        public MyWebBrowser()
        {
            InitializeComponent();
            this.urlTextBox.Text = SystemWebsite_Url;
            this.webBrowser.Navigate(this.urlTextBox.Text);
        }

        private void GoButton_Click(object pSender, EventArgs pEvent)
        {
            try
            {
                Fwla();
            }
            catch (Exception vE)
            {
                this.JavaScriptAlertMessage(this.webBrowser, vE.GetExceptionMessage());
            }
        }

        private void NavigateButton_Click(object pSender, EventArgs pEvent)
        {
            this.webBrowser.Navigate(this.urlTextBox.Text);
        }

        private void Login()
        {
            try
            {
                HtmlHelper.SetValueToElement(this.webBrowser.Document, "UserName", SystemWebsite_UserName);
                HtmlHelper.SetValueToElement(this.webBrowser.Document, "Password", SystemWebsite_Password);

                DeathByCaptcha.Client client = (DeathByCaptcha.Client)new DeathByCaptcha.HttpClient(DeathByCaptchaService_UserName, DeathByCaptchaService_Password);
                DeathByCaptcha.Captcha captcha = client.Decode(
                    DeathByCaptcha.Client.DefaultTokenTimeout,
                    new Hashtable() {
                    { "type", 4 },
                    { "token_params", "{ \"googlekey\": \"" + HtmlHelper.GetGoogleKey(this.webBrowser.DocumentText) + "\", \"pageurl\": \"" + SystemWebsite_Url + "\" }" }
                    }
                );

                HtmlHelper.SetValueToElement(this.webBrowser.Document, "g-recaptcha-response", captcha.Text);
                this.RunActionAndWaitUntilPageLoaded(this.webBrowser, HtmlHelper.ClickElement(this.webBrowser.Document, "action:DoLogin"));
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        private void Fwla()
        {
            try
            {
                #region login
                HtmlHelper.SetValueToElement(this.webBrowser.Document, "UserName", SystemWebsite_UserName);
                HtmlHelper.SetValueToElement(this.webBrowser.Document, "Password", SystemWebsite_Password);
                HtmlHelper.SetValueToElement(this.webBrowser.Document, "captcha", "4vwrs");
                this.RunActionAndWaitUntilPageLoaded(this.webBrowser, HtmlHelper.ClickElement(this.webBrowser.Document, "button_validate"));
                #endregion

                if (this.webBrowser.Url.ToString().Equals("http://localhost:17720/eFWLA/index"))
                {
                    #region inscribir
                    this.RunActionAndWaitUntilPageLoaded(this.webBrowser, HtmlHelper.ClickElement(this.webBrowser.Document, "href", false, "a", "http://localhost:17720/eFWLA/create_contract"));

                    string[] vJavaScriptLibraries = new string[] {
                        "http://localhost:17720/Sources/jquery-2.0.3.min.js",
                        "http://localhost:17720/Sources/jquery.mb.browser.min.js",
                        "http://localhost:17720/Sources/jquery-ui.min.js",
                        "http://localhost:17720/Sources/jquery.ui.datepicker-es.min.js",
                        "http://localhost:17720/Sources/jquery-fluid16.js",
                        "http://localhost:17720/Sources/pqselect.min.js",
                        "http://localhost:17720/Sources/multiselect.min.js",
                        "http://localhost:17720/Sources/jquery.formatCurrency-1.4.0.js",
                        "http://localhost:17720/Sources/jquery.epiclock.min.js",
                        "http://localhost:17720/Sources/jquery.validate.js",
                        "http://localhost:17720/Sources/additional-methods.js",
                        "http://localhost:17720/Sources/jquery.maskedinput.js",
                        "http://localhost:17720/Sources/fwla_validation.js",
                        "http://localhost:17720/Sources/jquery.prettyPhoto.js",
                        "http://localhost:17720/Sources/jquery.form.js",
                        "http://localhost:17720/Sources/jquery.prettyLoader.js",
                        "http://localhost:17720/Sources/jquery.blockUI.js",
                        "http://localhost:17720/Sources/swfobject.js",
                        "http://localhost:17720/Sources/passwordStrengthMeter.js",
                        "http://localhost:17720/Sources/custom.js",
                        "http://localhost:17720/Sources/plupload.full.min.js",
                        "http://localhost:17720/Sources/jquery.plupload.queue.js",
                        "http://localhost:17720/Sources/jquery.ui.plupload.min.js",
                        "http://localhost:17720/Sources/es.js",
                        "http://localhost:17720/Sources/datatables.min.js",
                        "http://localhost:17720/Sources/dataTables.jqueryui.min.js",
                        "http://localhost:17720/Sources/dataTables.colReorder.min.js"
                    };
                    this.ImportJavaScriptLibraries(this.webBrowser, vJavaScriptLibraries);

                    HtmlHelper.SetValueToElement(this.webBrowser.Document, "CBond", "SJNFBA11Z2200602");
                    HtmlHelper.SetValueToElement(this.webBrowser.Document, "CBondValue", "25,000.00");
                    HtmlHelper.SetValueToElement(this.webBrowser.Document, "TContractID", "01");
                    HtmlHelper.SetValueToElement(this.webBrowser.Document, "WarrantyID", "0101");
                    HtmlHelper.SetValueToElement(this.webBrowser.Document, "CDateStart", "2018-06-04");
                    HtmlHelper.SetValueToElement(this.webBrowser.Document, "CDateEnd", "2025-06-04");
                    HtmlHelper.SetValueToElement(this.webBrowser.Document, "CPayStart", "2018-07-10");
                    HtmlHelper.SetValueToElement(this.webBrowser.Document, "CDisbursementDate", "2018-06-20");
                    HtmlHelper.SetValueToElement(this.webBrowser.Document, "CPayDay", "10");
                    HtmlHelper.SetValueToElement(this.webBrowser.Document, "CContractType", "P");
                    HtmlHelper.ClickElement(this.webBrowser.Document, "className", true, "input", "open1 nextbutton");
                    #endregion
                }
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }
    }
}