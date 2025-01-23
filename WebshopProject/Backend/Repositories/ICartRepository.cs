using WebshopProject.Backend.Models;

namespace WebshopProject.Backend.Repositories;

public interface ICartRepository
{
    Task<Cart?> GetCartById(Guid cartId);
    Task<IEnumerable<Cart>> GetAllCartsAsync();
    Task AddCartAsync(Cart cart);
    Task UpdateCartAsync(Cart cart);
    Task DeleteCartAsync(Guid cartId);
    Task AddCartItemAsync(CartItem cartItem);
    Task RemoveCartItemAsync(Guid cartId, Guid itemId);
}