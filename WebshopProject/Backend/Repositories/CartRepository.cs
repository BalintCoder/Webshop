using Microsoft.EntityFrameworkCore;
using WebshopProject.Backend.Models;
using WebshopProject.Data;

namespace WebshopProject.Backend.Repositories;

public class CartRepository : ICartRepository
{
    private CartDbContext _cartDbContext;

    public CartRepository(CartDbContext cartDbContext)
    {
        _cartDbContext = cartDbContext;
    }

    public async Task<Cart?> GetCartById(Guid cartId)
    {
        return await _cartDbContext.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Item)
            .FirstOrDefaultAsync(c => c.Id == cartId);
    }

    public async Task<IEnumerable<Cart>> GetAllCartsAsync()
    {
        return await _cartDbContext.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Item)
            .ToListAsync();
    }

    public async Task AddCartAsync(Cart cart)
    {
        await _cartDbContext.Carts.AddAsync(cart);
        await _cartDbContext.SaveChangesAsync();
    }

    public async Task UpdateCartAsync(Cart cart)
    {
         _cartDbContext.Carts.Update(cart);
        await _cartDbContext.SaveChangesAsync();
    }

    public async Task DeleteCartAsync(Guid cartId)
    {
        var cart = await _cartDbContext.Carts.FindAsync(cartId);
        if (cart != null)
        {
            _cartDbContext.Carts.Remove(cart);
            await _cartDbContext.SaveChangesAsync();
        }
    }

    public async Task AddCartItemAsync(CartItem cartItem)
    {
        await _cartDbContext.CartItems.AddAsync(cartItem);
        await _cartDbContext.SaveChangesAsync();
    }

    public async Task RemoveCartItemAsync(Guid cartId, Guid itemId)
    {
        var cartItem = await _cartDbContext.CartItems
            .FirstOrDefaultAsync(ci => ci.CartId == cartId && ci.ItemId == itemId);
        
        if (cartItem != null)
        {
            _cartDbContext.CartItems.Remove(cartItem);
            await _cartDbContext.SaveChangesAsync();
        }
    }
}