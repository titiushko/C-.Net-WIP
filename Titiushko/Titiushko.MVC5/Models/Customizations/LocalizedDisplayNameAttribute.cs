using System.ComponentModel;

namespace Titiushko.MVC5.Models.Customizations
{
    /// <summary>
    /// Obtener el DisplayName de los Resources
    /// </summary>
    public class LocalizedDisplayNameAttribute : DisplayNameAttribute
    {
        public LocalizedDisplayNameAttribute(string pResource)
            : base(GetMessageFromResource(pResource))
        { }

        private static string GetMessageFromResource(string pResource)
        {
            return Resources.Functions.GetResource(pResource);
        }
    }
}