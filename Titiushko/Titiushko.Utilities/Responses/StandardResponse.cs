namespace Titiushko.Utilities.Responses
{
    public class StandardResponse
    {
        public StandardResponse()
        {
            Error = new ErrorResponse();
        }

        public ErrorResponse Error { get; set; }
    }
}