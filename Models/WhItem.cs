using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseAspReact.Models
{
    public class WhItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string? Title { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string? Description { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? ImageName { get; set; }

        public int SerialNumber { get; set; }

        public DateTime TimeCreated { get; set; } = DateTime.Now;

        public DateTime TimeUpdated { get; set; } = DateTime.Now;

        [NotMapped]
        public string ImageSrc { get; set; } = string.Empty;

        [Required]
        public int OwnerId { get; set; }

        public int Quantity { get; set; } = 0;

        public int Weight { get; set; } = 0;


    }
}
