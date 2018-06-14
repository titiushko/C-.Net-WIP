using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Titiushko.MVC5.Startup))]
namespace Titiushko.MVC5
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
