using System.Linq;
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

        /// <summary>
        /// Agregar nueva lista de mensajes a la lista de mensajes
        /// </summary>
        /// <param name="pMessage"></param>
        public void AddMessage(ICollection<string> pMessage)
        {
            message = message.Concat(pMessage).ToList();
        }

        /// <summary>
        /// Agregar nuevo mensaje a la lista de mensajes
        /// </summary>
        /// <param name="pMessage"></param>
        public void AddMessage(string pMessage)
        {
            message.Add(pMessage);
        }
    }
}