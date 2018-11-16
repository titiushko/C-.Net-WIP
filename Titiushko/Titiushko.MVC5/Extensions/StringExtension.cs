using Titiushko.MVC5.Constants.Names;

namespace Titiushko.MVC5.Extensions
{
    public static class StringExtension
    {
        public static string GetResourceViewName(this string pActionName)
        {
            if (string.IsNullOrWhiteSpace(pActionName)) return string.Empty;
            string vResourceTextFor = string.Empty;
            switch (pActionName)
            {
                case ActionName.CREATE:
                    vResourceTextFor = Resources.Resource.TextCreateNewFor;
                    break;
                case ActionName.DETAILS:
                    vResourceTextFor = Resources.Resource.TextDetailsFor;
                    break;
                case ActionName.EDIT:
                    vResourceTextFor = Resources.Resource.TextEditFor;
                    break;
                case ActionName.DELETE:
                    vResourceTextFor = Resources.Resource.TextDeleteFor;
                    break;
            }
            return vResourceTextFor;
        }

        public static string GetResourceModuleName(this string pControllerName)
        {
            if (string.IsNullOrWhiteSpace(pControllerName)) return string.Empty;
            string vResourceModuleName = string.Empty;
            switch (pControllerName)
            {
                case ControllerName.PROJECT:
                    vResourceModuleName = Resources.Resource.ModuleProjectName;
                    break;
                case ControllerName.STATUS:
                    vResourceModuleName = Resources.Resource.ModuleStatusName;
                    break;
                case ControllerName.SPRINT:
                    vResourceModuleName = Resources.Resource.ModuleSprintName;
                    break;
                case ControllerName.TASK_TYPE:
                    vResourceModuleName = Resources.Resource.ModuleTaskTypeName;
                    break;
                case ControllerName.TASK:
                    vResourceModuleName = Resources.Resource.ModuleTaskName;
                    break;
                case ControllerName.USER:
                    vResourceModuleName = Resources.Resource.ModuleUserName;
                    break;
            }
            return vResourceModuleName;
        }
    }
}