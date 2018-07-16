using System.Windows.Forms;
using System;
using mshtml;

namespace WebBrowserLaboratory.Forms
{
    public class BaseForm : Form
    {
        bool _PageLoaded = false;
        bool _OnLoadEventSet = false;

        protected void RunActionAndWaitUntilPageLoaded(WebBrowser pBrowser, Action pActionToRun = null)
        {
            try
            {
                string vCurrentHtml = pBrowser.DocumentText;
                _PageLoaded = false;
                _OnLoadEventSet = false;
                pBrowser.DocumentCompleted += BrowserDocumentCompleted;
                //AddOnLoadEventToIFrames(pBrowser);
                if (pActionToRun != null) pActionToRun.Invoke();
                while (!_PageLoaded)
                {
                    Application.DoEvents();
                    _PageLoaded = (pBrowser.ReadyState.Equals(WebBrowserReadyState.Complete) && !vCurrentHtml.Equals(pBrowser.DocumentText));
                }
                pBrowser.DocumentCompleted -= BrowserDocumentCompleted;
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        public void AddOnLoadEventToIFrames(WebBrowser pBrowser)
        {
            try
            {
                // Los frames no son visibles en el texto del documento, importante para ver si algo cambia allí también
                if (pBrowser.Document.Window != null && pBrowser.Document.Window.Frames != null && pBrowser.Document.Window.Frames.Count > 0)
                {
                    for (int vCounter = 0; vCounter < pBrowser.Document.Window.Frames.Count; vCounter++)
                    {
                        try
                        {
                            pBrowser.Document.Window.Frames[vCounter].WindowFrameElement.AttachEventHandler("onload", delegate
                            {
                                // Aplazar esto para asegurarse de que todos los controladores de eventos de carga posibles sean despedidos
                                System.Threading.SynchronizationContext.Current.Post(delegate
                                {
                                    _PageLoaded = true;
                                }, null);
                            });
                        }
                        catch (Exception vE)
                        {
                            continue;
                        }
                    }
                }
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        private void BrowserDocumentCompleted(object pSender, WebBrowserDocumentCompletedEventArgs pEvent)
        {
            try
            {
                var vBrowser = pSender as WebBrowser;
                if (_OnLoadEventSet) return;
                _OnLoadEventSet = true;
                // DocumentCompleted se activa antes de window.onload y body.onload
                vBrowser.Document.Window.AttachEventHandler("onload", delegate
                {
                    // Aplazar esto para asegurarse de que todos los controladores de eventos de carga posibles sean despedidos
                    System.Threading.SynchronizationContext.Current.Post(delegate
                    {
                        _PageLoaded = true;
                    }, null);
                });
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        protected void ImportJavaScriptLibraries(WebBrowser pBrowser, string[] pJavaScriptLibraries = null)
        {
            try
            {
                if (pBrowser != null && pJavaScriptLibraries != null && pJavaScriptLibraries.Length > 0)
                {
                    HtmlElement vHead = pBrowser.Document.GetElementsByTagName("head")[0];
                    foreach (string vJavaScriptLibrary in pJavaScriptLibraries)
                    {
                        HtmlElement vNewScriptTag = pBrowser.Document.CreateElement("script");
                        vNewScriptTag.SetAttribute("type", "text/javascript");
                        vNewScriptTag.SetAttribute("src", vJavaScriptLibrary);
                        vHead.AppendChild(vNewScriptTag);
                    }
                    //pBrowser.Refresh();
                    //this.RunActionAndWaitUntilPageLoaded(pBrowser);
                }
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }

        public void JavaScriptAlertMessage(WebBrowser pBrowser, string pMessage)
        {
            HtmlElement vHead = pBrowser.Document.GetElementsByTagName("head")[0];
            HtmlElement vNewScriptTag = pBrowser.Document.CreateElement("script");
            IHTMLScriptElement vScriptElement = (IHTMLScriptElement)vNewScriptTag.DomElement;
            vScriptElement.text = "function AlertMessage() { alert('" + pMessage + "'); }";
            vHead.AppendChild(vNewScriptTag);
            pBrowser.Document.InvokeScript("AlertMessage");
        }

        protected void ExecuteJavaScript(WebBrowser pBrowser, string pJavaScriptToExecute)
        {
            try
            {
                if (pBrowser != null && pBrowser != null && !string.IsNullOrWhiteSpace(pJavaScriptToExecute))
                {
                    HtmlElement vScriptTag = pBrowser.Document.CreateElement("script");
                    IHTMLScriptElement vScriptElement = (IHTMLScriptElement)vScriptTag.DomElement;
                    vScriptElement.text = "function ExecuteJavaScript() {" + pJavaScriptToExecute + "}";
                    pBrowser.Document.GetElementsByTagName("head")[0].AppendChild(vScriptTag);
                    pBrowser.Document.InvokeScript("ExecuteJavaScript");
                }
            }
            catch (Exception vE)
            {
                throw vE;
            }
        }
    }
}