namespace Titiushko.MVC5.Constants.Users
{
    public class Role
    {
        public const string ADMIN = "Admin";
        public const string MANAGER = "Manager";
        public const string PRJOECT_MANAGER = "Prjoect Manager";
        public const string DEVELOPER = "Developer";
        public const string TESTER = "Tester";
        public const string USER = "User";

        public static string[] ROLES = {
            ADMIN,
            MANAGER,
            PRJOECT_MANAGER,
            DEVELOPER,
            TESTER,
            USER
        };
    }
}