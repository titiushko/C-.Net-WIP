namespace Titiushko.Utilities.Constants.Errors
{
    public class PermissionError
    {
        public const string DENIED = "No tienes permiso para realizar esta acción.";

        public const string PRIVILEGE = "No tienes privilegios";

        public static string PRIVILEGE_DENIED(string pContent = null)
        {
            return string.Format(
                "<p>{0}{1}</p>",
                PRIVILEGE,
                string.IsNullOrWhiteSpace(pContent) ? "." : string.Format(" para ver <b>{0}</b>.", pContent)
            );
        }

        public const string ACCESS_DENIED = "Inicie sesión en el sistema para acceder al contenido.";
    }
}