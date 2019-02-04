using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Titiushko.MVC5.Models;

namespace Titiushko.MVC5.Extensions
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

        public static IEnumerable<StatusModel> ToCustomModelList(this DbSet<TitiushkoStatus> pDbSetTitiushkoStatus)
        {
            return pDbSetTitiushkoStatus.Select(m => new StatusModel()
            {
                Id = m.Id,
                Name = m.Name,
                Description = m.Description,
                DateCreated = m.DateCreated,
                UserCreated = m.UserCreated,
                DateModified = m.DateModified,
                UserModified = m.UserModified
            })
            .ToList();
        }
    }
}