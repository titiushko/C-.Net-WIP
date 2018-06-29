using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FWLA.Startup))]
namespace FWLA
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
