using System.Collections;
using System;
using WebBrowserLaboratory.Helpers;
using System.Configuration;

namespace WebBrowserLaboratory
{
    public partial class Form1 : BaseForm
    {
        private const string URL = "http://54.173.64.156/";

        public Form1()
        {
            InitializeComponent();
            this.urlTextBox.Text = URL;
            this.webBrowser.Navigate(this.urlTextBox.Text);
        }

        private void GoButton_Click(object pSender, EventArgs pEvent)
        {
            try
            {
                this.Login();
            }
            catch (System.Exception vE)
            {

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
                HtmlHelper.SetValueToElement(this.webBrowser.Document, "UserName", ConfigurationManager.AppSettings["SystemLogin.UserName"]);
                HtmlHelper.SetValueToElement(this.webBrowser.Document, "Password", ConfigurationManager.AppSettings["SystemLogin.Password"]);

                DeathByCaptcha.Client client = (DeathByCaptcha.Client)new DeathByCaptcha.HttpClient(ConfigurationManager.AppSettings["DeathByCaptchaService.UserName"], ConfigurationManager.AppSettings["DeathByCaptchaService.Password"]);
                DeathByCaptcha.Captcha captcha = client.Decode(
                    DeathByCaptcha.Client.DefaultTokenTimeout,
                    new Hashtable() {
                    { "type", 4 },
                    { "token_params", "{ \"googlekey\": \"" + this.webBrowser.DocumentText.GetGoogleKey() + "\", \"pageurl\": \"" + URL + "\" }" }
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
    }
}