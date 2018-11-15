using System.Data.Entity;
using Titiushko.MVC5.Models;

namespace Titiushko.MVC.Utils.Extensions
{
    public static class DbSetTitiushkoStatusExtension
    {
        public static StatusModel FindAndConvertToCustomModel(this DbSet<TitiushkoStatus> pDbSetTitiushkoStatus, int? pId)
        {
            if (pId == null) return null;
            TitiushkoStatus vTitiushkoStatus = pDbSetTitiushkoStatus.Find(pId);
            if (vTitiushkoStatus == null) return null;
            return new StatusModel()
            {
                Id = vTitiushkoStatus.Id,
                Name = vTitiushkoStatus.Name,
                Description = vTitiushkoStatus.Description
            };
        }
    }
}