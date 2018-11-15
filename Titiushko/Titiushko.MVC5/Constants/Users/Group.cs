namespace Titiushko.MVC5.Constants.Users
{
    public class Group
    {
        public static string[] ADMINISTRATOR = {
            Role.ADMIN,
            Role.MANAGER
        };

        public static string[] LEADER = {
            Role.PRJOECT_MANAGER
        };

        public static string[] SOFTWARE_ENGINEER = {
            Role.DEVELOPER,
            Role.TESTER
        };

        public static string[] END_USER = {
            Role.USER
        };
    }
}