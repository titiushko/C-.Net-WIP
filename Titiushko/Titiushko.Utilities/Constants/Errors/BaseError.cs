using Titiushko.Utilities.Extensions;

namespace Titiushko.Utilities.Constants.Errors
{
    public class BaseError
    {
        public static string DEFAULT(string pMessage = null)
        {
            return string.Format(
                "<p>Algo malo pasó{0}</p><br><p><b>Por favor, inténtalo de nuevo más tarde.</b></p>",
                string.IsNullOrWhiteSpace(pMessage) ? "." : string.Format(":<br>{0}", pMessage)
            );
        }

        public static string CONTENT_NOT_FOUND(string pContent)
        {
            return string.Format("{0} no encontrado.", pContent.ToFormatTitle());
        }
    }
}