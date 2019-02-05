using System.Collections.Generic;

namespace Titiushko.MVC5.Models
{
    public class BootstrapDataTable
    {
        public BootstrapDataTable()
        {
            total = 0;
            rows = new HashSet<dynamic>();
        }

        public int total { get; set; }
        public IEnumerable<dynamic> rows { get; set; }
    }
}