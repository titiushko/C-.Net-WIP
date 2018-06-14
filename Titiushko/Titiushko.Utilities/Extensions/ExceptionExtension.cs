using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Data.SqlClient;

namespace Titiushko.Utilities.Extensions
{
    public static class ExceptionExtension
    {
        /// <summary>
        /// Get exception messages list
        /// </summary>
        /// <param name="pException">Exception</param>
        /// <param name="pMessages">Messages list</param>
        /// <returns>Messages list</returns>
        private static ICollection<string> GetExceptionMessages(Exception pException, ICollection<string> pMessages)
        {
            pMessages.Add(pException.Message);
            if (pException.InnerException != null) pMessages = GetExceptionMessages(pException.InnerException, pMessages);
            return pMessages;
        }

        /// <summary>
        /// Get exception messages list
        /// </summary>
        /// <param name="pException">Exception</param>
        /// <returns>Messages list</returns>
        public static ICollection<string> GetExceptionMessages(this Exception pException)
        {
            return GetExceptionMessages(pException, new HashSet<string>());
        }

        /// <summary>
        /// Get exception messages
        /// </summary>
        /// <param name="pException">Exception</param>
        /// <returns>Messages</returns>
        public static string GetExceptionMessage(this Exception pException)
        {
            return string.Join("<br>", pException.GetExceptionMessages());
        }

        /// <summary>
        /// Get database entity validation exception messages
        /// </summary>
        /// <param name="pEntityException">DbEntityValidationException</param>
        /// <returns>Messages</returns>
        public static string GetEntityExceptionMessage(this DbEntityValidationException pEntityException)
        {
            ICollection<string> vMessages = new HashSet<string>();
            string vMessageAux = string.Empty;
            foreach (DbEntityValidationResult validationErrors in pEntityException.EntityValidationErrors)
            {
                foreach (DbValidationError validationError in validationErrors.ValidationErrors)
                {
                    if (!validationError.ErrorMessage.Equals(vMessageAux))
                    {
                        vMessageAux = validationError.ErrorMessage;
                        vMessages.Add(vMessageAux);
                    }
                }
            }
            return string.Join("<br>", vMessages);
        }

        /// <summary>
        /// Get SQL exception number
        /// Some more known:
        /// 2627: Unique constraint error
        /// 547: Constraint check violation
        /// 2601: Duplicated key row error
        /// </summary>
        /// <param name="pException">Exception</param>
        /// <returns>Int or null</returns>
        public static int? SqlExceptionNumber(this Exception pException)
        {
            DbUpdateConcurrencyException vConcurrencyException = pException as DbUpdateConcurrencyException;
            DbUpdateException vDbException = pException as DbUpdateException;
            if (vDbException != null && vDbException.InnerException != null && vDbException.InnerException.InnerException != null)
            {
                SqlException vSqlException = vDbException.InnerException.InnerException as SqlException;
                if (vSqlException != null) return vSqlException.Number;
            }
            return null;
        }
    }
}