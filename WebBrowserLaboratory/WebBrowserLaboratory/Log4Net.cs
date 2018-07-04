namespace WebBrowserLaboratory
{
    class Log4Net
    {
        public static void Init()
        {
            log4net.Config.XmlConfigurator.ConfigureAndWatch(new System.IO.FileInfo(System.AppDomain.CurrentDomain.BaseDirectory + "\\log4net.config"));
        }
    }
}