using Titiushko.Utilities.Extensions;

namespace Titiushko.Utilities.Constants.Errors
{
    public class BaseError
    {
        public static string DEFAULT(string pMessage = null)
        {
            return string.Format(
                Resources.Resource.BaseErrorDefault,
                string.IsNullOrWhiteSpace(pMessage) ? "." : string.Format(":<br>{0}", pMessage)
            );
        }

        public static string CONTENT_NOT_FOUND(string pContent)
        {
            return string.Format(Resources.Resource.BaseErrorContentNotFound, pContent.ToFormatTitle());
        }
    }
}