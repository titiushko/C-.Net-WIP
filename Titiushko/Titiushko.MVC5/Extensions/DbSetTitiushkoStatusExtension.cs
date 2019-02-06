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
            ICollection<StatusModel> vStatusModelList = new HashSet<StatusModel>();
            foreach (TitiushkoStatus vTitiushkoStatus in pDbSetTitiushkoStatus)
            {
                vStatusModelList.Add(new StatusModel()
                {
                    Id = vTitiushkoStatus.Id,
                    Name = vTitiushkoStatus.Name,
                    Description = vTitiushkoStatus.Description,
                    DateCreated = vTitiushkoStatus.DateCreated.ToShortDateString(),
                    UserCreated = vTitiushkoStatus.UserCreated,
                    DateModified = vTitiushkoStatus.DateModified.ToShortDateString(),
                    UserModified = vTitiushkoStatus.UserModified
                });
            }
            return vStatusModelList;
        }
    }
}