namespace Titiushko.MVC5.Models.BootstrapDataTable
{
    public class Request
    {
        public int offset { get; set; }
        public int limit { get; set; }
        public string sort { get; set; }
        public string order { get; set; }
        public string search { get; set; }
    }
}