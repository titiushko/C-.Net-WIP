using System.ComponentModel.DataAnnotations;
using Titiushko.MVC5.CustomDataAnnotations;

namespace Titiushko.MVC5.Models
{
    public class StatusModel
    {
        public int Id { get; set; }

        [Required]
        [LocalizedDisplayName("TextName")]
        public string Name { get; set; }

        [LocalizedDisplayName("TextDescription")]
        public string Description { get; set; }

        [LocalizedDisplayName("TextDateCreated")]
        public System.DateTime DateCreated { get; set; }

        [LocalizedDisplayName("TextUserCreated")]
        public string UserCreated { get; set; }

        [LocalizedDisplayName("TextDateModified")]
        public System.DateTime DateModified { get; set; }

        [LocalizedDisplayName("TextUserModified")]
        public string UserModified { get; set; }
    }
}