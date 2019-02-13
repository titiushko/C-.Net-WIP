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
        /// Asigna lista de mensajes
        /// </summary>
        /// <param name="pMessage"></param>
        public void SetMessage(ICollection<string> pMessage)
        {
            message = pMessage;
        }

        /// <summary>
        /// Agregar mensaje a la lista de mensajes
        /// </summary>
        /// <param name="pMessage"></param>
        public void AddMessage(string pMessage)
        {
            message.Add(pMessage);
        }
    }
}