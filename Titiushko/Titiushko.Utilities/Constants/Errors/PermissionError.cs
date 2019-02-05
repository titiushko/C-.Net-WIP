namespace Titiushko.Utilities.Constants.Errors
{
    public class PermissionError
    {
        public static string PRIVILEGE_DENIED(string pContent = null)
        {
            return string.Format(
                "<p>{0}{1}</p>",
                Resources.Resource.ErrorPermissionPrivilege,
                string.IsNullOrWhiteSpace(pContent) ? "." : string.Format(Resources.Resource.ErrorPermissionPrivilegeDenied, pContent)
            );
        }
    }
}