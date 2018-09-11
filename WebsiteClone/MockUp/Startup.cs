using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MockUp.Startup))]
namespace MockUp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
