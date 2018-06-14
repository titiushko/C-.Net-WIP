using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Titiushko.MVC5.Controllers
{
    public class BaseController : Controller
    {
        public static ILog logger = null;

        public BaseController()
        {
            logger = LogManager.GetLogger(typeof(BaseController));
        }
    }
}