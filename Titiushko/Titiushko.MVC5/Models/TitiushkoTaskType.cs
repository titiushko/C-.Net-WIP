//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Titiushko.MVC5.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TitiushkoTaskType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TitiushkoTaskType()
        {
            this.TitiushkoTask = new HashSet<TitiushkoTask>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public System.DateTime DateCreated { get; set; }
        public string UserCreated { get; set; }
        public System.DateTime DateModified { get; set; }
        public string UserModified { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TitiushkoTask> TitiushkoTask { get; set; }
    }
}
