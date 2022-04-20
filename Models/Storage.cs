using System.ComponentModel.DataAnnotations;

namespace WarehouseAspReact.Models
{
    public class Storage
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Title { get; set; } = string.Empty;

        public List<Storage> ChildStorages { get; set; } = new List<Storage>();

    }
}
