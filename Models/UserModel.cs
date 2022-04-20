using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseAspReact.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public byte[] PasswordHash { get; set; }


        [Column(TypeName = "nvarchar(50)")]
        public string FirstName { get; set; } = string.Empty;


        [Column(TypeName = "nvarchar(50)")]
        public string LastName { get; set; } = string.Empty;

        public List<Storage> Storages { get; set; } = new List<Storage>();

        public List<WhItem> Items { get; set; } = new List<WhItem>();

    }
}
   