using System;
using log4net;
using System.Linq;
using log4net.Appender;
using System.Runtime.CompilerServices;

namespace Titiushko.Logging
{
    /// <summary>
    /// Clase Logger con métodos para registrar en un archivo *.log
    /// </summary>
    public static class Logger
    {
        private static ILog LogProperty { get; set; }

        static Logger()
        {
            log4net.Config.XmlConfigurator.Configure();
            LogProperty = LogManager.GetLogger("TitiushkoLogging");
        }

        /// <summary>
        /// Registra un mensaje de tipo LogType.ERROR
        /// </summary>
        /// <param name="pMessage">Mensaje a registrar</param>
        public static void Error(object pMessage, bool pIncludeCaller = true,
            [CallerMemberName] string pMemberName = null, [CallerFilePath] string pFilePath = null, [CallerLineNumber] int pLineNumber = 0)
        {
            LogProperty.Error(pIncludeCaller ? GetFormattedMessage(pMessage, pMemberName, pFilePath, pLineNumber) : pMessage);
        }

        /// <summary>
        /// Registra el mensaje de tipo LogType.ERROR del objeto Exception
        /// </summary>
        /// <param name="pException">Objeto Exception donde se obtiene el mensaje a registrar</param>
        public static void Error(Exception pException, bool pIncludeCaller = true,
            [CallerMemberName] string pMemberName = null, [CallerFilePath] string pFilePath = null, [CallerLineNumber] int pLineNumber = 0)
        {
            object vMessage = pException.ToString();
            LogProperty.Error(pIncludeCaller ? GetFormattedMessage(vMessage, pMemberName, pFilePath, pLineNumber) : vMessage, pException);
        }

        /// <summary>
        /// Registra un mensaje de tipo LogType.ERROR y el objeto Exception
        /// </summary>
        /// <param name="pMessage">Mensaje a registrar</param>
        /// <param name="pException">Objeto Exception a registrar</param>
        public static void Error(object pMessage, Exception pException, bool pIncludeCaller = true,
            [CallerMemberName] string pMemberName = null, [CallerFilePath] string pFilePath = null, [CallerLineNumber] int pLineNumber = 0)
        {
            LogProperty.Error(pIncludeCaller ? GetFormattedMessage(pMessage, pMemberName, pFilePath, pLineNumber) : pMessage, pException);
        }

        /// <summary>
        /// Registra un mensaje de tipo LogType.INFO
        /// </summary>
        /// <param name="pMessage">Mensaje a registrar</param>
        public static void Info(object pMessage, bool pIncludeCaller = true,
            [CallerMemberName] string pMemberName = null, [CallerFilePath] string pFilePath = null, [CallerLineNumber] int pLineNumber = 0)
        {
            LogProperty.Info(pIncludeCaller ? GetFormattedMessage(pMessage, pMemberName, pFilePath, pLineNumber) : pMessage);
        }

        /// <summary>
        /// Registra un mensaje de tipo LogType.DEBUG
        /// </summary>
        /// <param name="pMessage">Mensaje a registrar</param>
        public static void Debug(object pMessage, bool pIncludeCaller = true,
            [CallerMemberName] string pMemberName = null, [CallerFilePath] string pFilePath = null, [CallerLineNumber] int pLineNumber = 0)
        {
            LogProperty.Debug(pIncludeCaller ? GetFormattedMessage(pMessage, pMemberName, pFilePath, pLineNumber) : pMessage);
        }

        /// <summary>
        /// Genera un nuevo registro en el archivo log
        /// </summary>
        /// <param name="pMessage">Mensaje a registrar</param>
        /// <param name="pLogType">Tipo de log</param>
        public static void Log(string pMessage, LogType pLogType,
            [CallerMemberName] string pMemberName = null, [CallerFilePath] string pFilePath = null, [CallerLineNumber] int pLineNumber = 0)
        {
            object vMessage = GetFormattedMessage(pMessage, pMemberName, pFilePath, pLineNumber);
            switch (pLogType)
            {
                case LogType.INFO:
                    Info(vMessage, false);
                    break;
                case LogType.DEBUG:
                    Debug(vMessage, false);
                    break;
                case LogType.ERROR:
                    Error(vMessage, false);
                    break;
            }
        }

        private static object GetFormattedMessage(object pMessage, string pMemberName, string pFilePath, int pLineNumber)
        {
            if (string.IsNullOrWhiteSpace(pMemberName) && string.IsNullOrWhiteSpace(pFilePath) && pLineNumber == 0) return pMessage;
            return string.Format(
                "{1}{0}at {2} in{0}{3}:line {4}{0}",
                Environment.NewLine,
                pMessage,
                pMemberName,
                pFilePath,
                pLineNumber
            );
        }

        public static string GetLoggerPath()
        {
            RollingFileAppender vAppender = LogProperty.Logger.Repository.GetAppenders().OfType<RollingFileAppender>().FirstOrDefault();
            return vAppender.File;
        }

        public static void ForceFlushBuffers()
        {
            foreach (IAppender vAppender in LogProperty.Logger.Repository.GetAppenders())
            {
                BufferingAppenderSkeleton vBuffered = vAppender as BufferingAppenderSkeleton;
                if (vBuffered != null)
                {
                    vBuffered.Flush();
                }
            }
        }
    }
}