using System.Text.RegularExpressions;

namespace Titiushko.HtmlHelpers
{
    public class HtmlHelperConstant
    {
        public const RegexOptions ExpressionOptions = RegexOptions.Singleline | RegexOptions.Multiline | RegexOptions.IgnoreCase;

        #region HTML

        #region Regular Expressions
        public const string IDENTIFIER_PATTERN = "(id|name)=\"([^\"]*)\"";
        public const string IDENTIFIER_PATTERN_REPLACE = "((id|name)=\"|\")";
        public const string TABLE_PATTERN = "<table[^>]*>(.*?)</table>";
        public const string THEAD_PATTERN = "<thead[^>]*>(.*?)</thead>";
        public const string TBODY_PATTERN = "<tbody[^>]*>(.*?)</tbody>";
        public const string TR_PATTERN = "<tr[^>]*>(.*?)</tr>";
        public const string TH_PATTERN = "<th[^>]*>(.*?)</th>";
        public const string TD_PATTERN = "<td[^>]*>(.*?)</td>";
        #endregion

        public const string TABLE_FORMAT = "<TABLE>{0}</TABLE>";
        public const string THEAD_TAG = "<thead";
        public const string TH_TAG = "<th";
        public const string IFRAME_NAME_TAG = "IFRAME";
        public const string DEFAULT_COLUMN_NAME = "COLUMN";

        #endregion

        #region IdentifierParams Params Keys
        public const string IDENTIFIER_PARAM_KEY_TYPE_NAME = "IDENTIFIER_TYPE";
        public const string IDENTIFIER_PARAM_KEY_TYPE_VALUE_ID = "ID";
        public const string IDENTIFIER_PARAM_KEY_TYPE_VALUE_ATTRIBUTE = "ATTRIBUTE";
        public const string IDENTIFIER_PARAM_KEY_TYPE_VALUE_REGEX = "REGEX";
        public const string IDENTIFIER_PARAM_KEY_TYPE_VALUE_ALL = "ALL";
        public const string IDENTIFIER_PARAM_KEY_VALUE = "IDENTIFIER_VALUE";
        public const string IDENTIFIER_PARAM_KEY_VALUE_FOR_HTML_BASE = "IDENTIFIER_VALUE_FOR_HTML_BASE";
        public const string IDENTIFIER_PARAM_KEY_ATTRIBUTE_TAG = "ATTRIBUTE_TAG";
        public const string IDENTIFIER_PARAM_KEY_ATTRIBUTE_VALUE = "ATTRIBUTE_VALUE";
        public const string IDENTIFIER_PARAM_KEY_REGEX_TAG = "REGEX_TAG";
        #endregion
    }
}