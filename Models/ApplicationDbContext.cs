using Microsoft.EntityFrameworkCore;

namespace WarehouseAspReact.Models
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<WhItem> WhItems { get; set; }
        public DbSet<Storage> Storages { get; set; }

    }
}
