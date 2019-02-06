using System.Collections.Generic;

namespace Titiushko.Utilities.Responses
{
    public class JsonResponse : StandardResponse
    {
        public JsonResponse()
        {
            Message = new HashSet<string>();
        }

        public dynamic Content { get; set; }
        public ICollection<string> Message { get; set; }
    }
}