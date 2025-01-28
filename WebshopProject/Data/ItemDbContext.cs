using Microsoft.EntityFrameworkCore;
using WebshopProject.Backend.Models;

namespace WebshopProject.Data;

public class ItemDbContext : DbContext
{
    public ItemDbContext(DbContextOptions<ItemDbContext> options) : base(options)
    {
    }

    public DbSet<ItemModel> ItemModels { get; set; }
    
    
    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        
        modelBuilder.Entity<ItemModel>()
            .ToTable("ItemModels"); 
    }
}