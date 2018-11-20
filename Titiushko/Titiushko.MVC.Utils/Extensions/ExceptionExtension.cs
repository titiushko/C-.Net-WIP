using System;
using System.Data.Entity.Validation;
using System.Web.Mvc;
using Titiushko.Utilities.Extensions;

namespace Titiushko.MVC.Utils.Extensions
{
    public static class ExceptionExtension
    {
        /// <summary>
        /// Get TempDataDictionary with exception messages
        /// </summary>
        /// <param name="pException">Exception</param>
        /// <returns>TempDataDictionary</returns>
        public static TempDataDictionary TempDataExceptionMessage(this Exception pException)
        {
            TempDataDictionary vError = new TempDataDictionary();
            vError[Constants.Basic.TEMP_DATA_ERROR] = Titiushko.Utilities.Constants.Basic.TRUE;
            vError[Constants.Basic.TEMP_DATA_ERROR_MESSAGE] = Titiushko.Utilities.Constants.Errors.BaseError.DEFAULT(pException.GetExceptionMessage());
            return vError;
        }

        /// <summary>
        /// Get TempDataDictionary with database entity exception messages
        /// </summary>
        /// <param name="pDbEntityValidationException">DbEntityValidationException</param>
        /// <returns>TempDataDictionary</returns>
        public static TempDataDictionary TempDataEntityExceptionMessage(this DbEntityValidationException pDbEntityValidationException)
        {
            TempDataDictionary vError = new TempDataDictionary();
            vError[Constants.Basic.TEMP_DATA_ERROR] = Titiushko.Utilities.Constants.Basic.TRUE;
            vError[Constants.Basic.TEMP_DATA_ERROR_MESSAGE] = Titiushko.Utilities.Constants.Errors.BaseError.DEFAULT(pDbEntityValidationException.GetEntityExceptionMessage());
            return vError;
        }
    }
}