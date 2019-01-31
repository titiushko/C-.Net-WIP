using System;
using System.Collections.Generic;
using System.Net;
using Titiushko.Utilities.Extensions;

namespace Titiushko.Utilities.Constants.Errors
{
    public class JsonError
    {
        private static Responses.ErrorResponse DEFAULT(string pMessage = null, TypeError pTypeError = TypeError.DEFAULT)
        {
            return new Responses.ErrorResponse()
            {
                error = true,
                type = pTypeError,
                message = new HashSet<string>() { BaseError.DEFAULT(pMessage) }
            };
        }

        public static Responses.JsonResponse EXCEPCION(Responses.ErrorResponse pError)
        {
            return new Responses.JsonResponse { Error = pError };
        }

        public static Responses.JsonResponse EXCEPCION(string pMessage)
        {
            return EXCEPCION(DEFAULT(pMessage, TypeError.EXCEPCION));
        }

        public static Responses.JsonResponse EXCEPCION(Exception pException)
        {
            return EXCEPCION(pException.GetExceptionMessage());
        }

        public static Responses.JsonResponse EXCEPCION(System.Data.Entity.Validation.DbEntityValidationException pEntityException)
        {
            return EXCEPCION(pEntityException.GetEntityExceptionMessage());
        }

        public static Responses.JsonResponse ACCESS_DENIED
        {
            get
            {
                return new Responses.JsonResponse
                {
                    Error = DEFAULT(Resources.Resource.PermissionErrorAccessDenied, TypeError.PERMISSION_ACCESS_DENIED)
                };
            }
        }

        public static Responses.JsonResponse ERROR_400
        {
            get
            {
                return new Responses.JsonResponse
                {
                    Error = DEFAULT(string.Format("{0}<br>{1}", Resources.Resource.TextError400Title, Resources.Resource.TextError400Message), (TypeError)HttpStatusCode.BadRequest)
                };
            }
        }

        public static Responses.JsonResponse ERROR_404
        {
            get
            {
                return new Responses.JsonResponse
                {
                    Error = DEFAULT(string.Format("{0}<br>{1}", Resources.Resource.TextError404Title, Resources.Resource.TextError404Message), (TypeError)HttpStatusCode.NotFound)
                };
            }
        }
    }
}