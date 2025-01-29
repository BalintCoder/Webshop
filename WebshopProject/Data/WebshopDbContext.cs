using Microsoft.EntityFrameworkCore;
using WebshopProject.Backend.Models;

namespace WebshopProject.Data;

public class WebshopDbContext : DbContext
{
    public WebshopDbContext(DbContextOptions<WebshopDbContext> options) : base(options)
    {
    }

    public DbSet<ItemModel> ItemModels { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<CartItem>()
            .HasOne(ci => ci.Item)
            .WithMany()
            .HasForeignKey(ci => ci.ItemId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}