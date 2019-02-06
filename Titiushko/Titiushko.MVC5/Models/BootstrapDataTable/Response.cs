using System.Collections.Generic;

namespace Titiushko.MVC5.Models.BootstrapDataTable
{
    public class Response
    {
        public Response()
        {
            total = 0;
            rows = new HashSet<dynamic>();
        }

        public int total { get; set; }
        public IEnumerable<dynamic> rows { get; set; }
    }
}