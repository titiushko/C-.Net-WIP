using System.Collections.Generic;

namespace Titiushko.Utilities.Responses
{
    public class ErrorResponse
    {
        public ErrorResponse()
        {
            error = false;
            type = Constants.Errors.TypeError.UNDEFINED;
            message = new HashSet<string>();
        }

        public bool error { get; set; }

        public Constants.Errors.TypeError type { get; set; }

        public ICollection<string> message { get; set; }
    }
}