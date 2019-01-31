using System;
using System.Collections.Generic;

namespace Titiushko.Utilities.Helpers
{
    public class GlobalHelper
    {
        public static string GetTypeErrorToJson()
        {
            try
            {
                ICollection<string> vEnumList = new HashSet<string>();
                foreach (object vEnumItem in Enum.GetValues(typeof(Constants.Errors.TypeError)))
                {
                    vEnumList.Add(string.Format("\"{0}\": {1}", vEnumItem.ToString(), (int)vEnumItem));
                }
                return string.Format("{{ {0} }}", string.Join(",", vEnumList));
            }
            catch
            {
                return "{}";
            }
        }
    }
}