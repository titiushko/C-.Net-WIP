namespace Titiushko.MVC5.Models.Constants
{
    public class Constant
    {
        public class User
        {
            public class Role
            {
                public const string ADMIN = "Admin";
                public const string MANAGER = "Manager";
                public const string PRJOECT_MANAGER = "Prjoect Manager";
                public const string DEVELOPER = "Developer";
                public const string TESTER = "Tester";
                public const string USER = "User";
            }

            public static string[] ROLES = {
                Role.ADMIN,
                Role.MANAGER,
                Role.PRJOECT_MANAGER,
                Role.DEVELOPER,
                Role.TESTER,
                Role.USER
            };

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
    }
}