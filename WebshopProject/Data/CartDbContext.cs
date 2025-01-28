using Microsoft.EntityFrameworkCore;
using WebshopProject.Backend.Models;

namespace WebshopProject.Data;

public class CartDbContext : DbContext
{
    public CartDbContext(DbContextOptions<CartDbContext> options) : base(options)
    {
    }
    
    public DbSet<Cart?> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    
    
}