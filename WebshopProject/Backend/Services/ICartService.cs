using WebshopProject.Backend.Models;

namespace WebshopProject.Backend.Services;

public interface ICartService
{
    Task<Cart?> GetCartByUserIdAsync(Guid userId);
    Task AddItemToCartAsync(Guid cartId, AddToCartDTO dto);
    Task RemoveItemFromCartAsync(Guid cartId, Guid itemId);
    Task<Cart> CreateCartForUserAsync(Guid userId);
    Task<Cart> UpdateCartAsync(Cart cart);
}