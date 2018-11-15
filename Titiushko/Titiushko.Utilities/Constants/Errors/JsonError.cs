using System;
using System.Collections.Generic;
using Titiushko.Utilities.Extensions;

namespace Titiushko.Utilities.Constants.Errors
{
    public class JsonError
    {
        private static Responses.ErrorResponse DEFAULT(string pMessage = null)
        {
            return new Responses.ErrorResponse()
            {
                error = true,
                type = TypeError.DEFAULT,
                message = new HashSet<string>() { BaseError.DEFAULT(pMessage) }
            };
        }

        public static Responses.JsonResponse EXCEPCION(Responses.ErrorResponse pError)
        {
            return new Responses.JsonResponse { Error = pError };
        }

        public static Responses.JsonResponse EXCEPCION(string pMessage)
        {
            return EXCEPCION(DEFAULT(pMessage));
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
                    Error = new Responses.ErrorResponse()
                    {
                        error = true,
                        type = TypeError.PERMISSION_ACCESS_DENIED,
                        message = new HashSet<string>() { Resources.Resource.PermissionErrorAccessDenied }
                    }
                };
            }
        }
    }
}