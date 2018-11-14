namespace Titiushko.Resources
{
    public class Functions
    {
        /// <summary>
        /// Obtener un resource específico
        /// </summary>
        /// <param name="pResource"></param>
        /// <returns></returns>
        public static string GetResource(string pResource)
        {
            string vResource = Resource.ResourceManager.GetString(pResource);
            if (string.IsNullOrWhiteSpace(vResource)) return pResource;
            else return vResource;
        }
    }
}
