using WebshopProject.Backend.Models;
using WebshopProject.Backend.Repositories;

namespace WebshopProject.Backend.Services;

public class CartService : ICartService
{
    private readonly ICartRepository _cartRepository;

    public CartService(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public async Task<Cart?> GetCartByUserIdAsync(Guid userId)
    {
        var cart = await _cartRepository.GetAllCartsAsync();

        return cart.FirstOrDefault(c => c.UserId == userId);
    }

    public async Task AddItemToCartAsync(Guid cartId, AddToCartDTO dto)
    {
        var cart = await _cartRepository.GetCartById(cartId);
        if (cart == null)
            throw new Exception("Cart not found");

        var existingItem = cart.Items.FirstOrDefault(i => i.ItemId == dto.ItemId);
        if (existingItem != null)
        {
            existingItem.Quantity += dto.Quantity;
            await _cartRepository.UpdateCartAsync(cart);  
        }
        else
        {
            var newCartItem = new CartItem
            {
                Id = Guid.NewGuid(),
                CartId = dto.CartId,
                ItemId = dto.ItemId,
                Quantity = dto.Quantity
            };

            await _cartRepository.AddCartItemAsync(newCartItem);  
            cart.Items.Add(newCartItem);  
            await _cartRepository.UpdateCartAsync(cart);  
        }
    }
    

    public async Task RemoveItemFromCartAsync(Guid cartId, Guid itemId)
    {
        var cart = await _cartRepository.GetCartById(cartId);
        if (cart == null)
        {
            throw new Exception("The given cart is not found");
        }

        var itemExists = cart.Items.Any(i => i.ItemId == itemId);
        if (!itemExists)
        {
            throw new Exception("The given cart is not found");
        }

        await _cartRepository.RemoveCartItemAsync(cartId, itemId);
    }

    public async Task<Cart> CreateCartForUserAsync(Guid userId)
    {
        var cart = new Cart
        {
            UserId = userId
        };
        await _cartRepository.AddCartAsync(cart);
        return cart;
    }

    public async Task<Cart> UpdateCartAsync(Cart cart)
    {
        await _cartRepository.UpdateCartAsync(cart);
        return cart;
    }

    public async Task DeleteCartAsync(Guid cartId, Guid userId)
    {
        var cart = await _cartRepository.GetCartById(cartId);

        if (cart == null || cart.UserId != userId)
        {
            throw new InvalidOperationException("Cart is not found or the user cannot be found");
        }
        await _cartRepository.DeleteCartAsync(cartId);
    }
}