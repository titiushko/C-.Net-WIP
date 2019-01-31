using System.Collections.Generic;

namespace Titiushko.Utilities.Responses
{
    public class JsonResponse : StandardResponse
    {
        public dynamic Content { get; set; }
        public ICollection<string> Message { get; set; }
    }
}