using Microsoft.EntityFrameworkCore;
using WebshopProject.Backend.Models;

namespace WebshopProject.Data;

public class ItemDbContext : DbContext
{
    public ItemDbContext(DbContextOptions<ItemDbContext> options) : base(options)
    {
    }

    public DbSet<ItemModel> ItemModels { get; set; }
}