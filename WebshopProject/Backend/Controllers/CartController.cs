using K4os.Compression.LZ4.Engine;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebshopProject.Backend.Models;
using WebshopProject.Backend.Services;

namespace WebshopProject.Backend.Controllers;
[ApiController]
[Route("[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpPost("create"), Authorize(Roles = "User, Admin")]
    
        public async Task<IActionResult> CreateCart(Guid userId)
        {

            var cart = await _cartService.CreateCartForUserAsync(userId);
            return Ok(cart);
        }

    [HttpPost("add-item"), Authorize(Roles = "User, Admin")]
    public async Task<IActionResult> AddItemToCart([FromQuery] Guid userId, [FromBody] AddToCartDTO addToCartDTO)
    {
        var cart = await _cartService.GetCartByUserIdAsync(userId);
        if (cart == null) return NotFound("No cart was found for this user");

        await _cartService.AddItemToCartAsync(cart.Id, addToCartDTO);

        return Ok("Item successfully added to the cart");
    }

    [HttpDelete("remove-item"), Authorize(Roles = "User, Admin")]
    public async Task<IActionResult> RemoveItemFromCart([FromQuery] Guid cartId, [FromQuery] Guid itemId)
    {
        try
        {
            await _cartService.RemoveItemFromCartAsync(cartId, itemId);
            return Ok("The item got removed from the cart succsessfully");
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
    
    [HttpPut("update"), Authorize(Roles = "User, Admin")]
    public async Task<IActionResult> UpdateCart([FromBody] Cart cart)
    {
        try
        {
            var updatedCart = await _cartService.UpdateCartAsync(cart);
            return Ok(updatedCart);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("get-cart-by-userId"), Authorize(Roles = "User, Admin")]

    public async Task<IActionResult> GetCartByUserId(Guid userId)
    {
        var cart = await _cartService.GetCartByUserIdAsync(userId);
    
        if (cart == null)
        {
            return NotFound("No cart found for this user.");
        }

        
        var cartWithItems = new
        {
            cart.Id,
            cart.UserId,
            Items = cart.Items.Select(i => new 
            {
                i.ItemId,
                i.Quantity,
                ItemName = i.Item.Name,  
                ItemPrice = i.Item.Price,
            }).ToList()
        };
        Console.WriteLine($"Items count: {cartWithItems.Items.Count()}");
        return Ok(cartWithItems);
    }

    [HttpDelete("remove-cart-from-user")]

    public async Task<IActionResult> RemoveCartFromUser(Guid cartId, Guid userId)
    {
        var cart = await _cartService.GetCartByUserIdAsync(userId);
        if (cart == null || cart.Id != cartId)
        {
            return NotFound("Cart or user cannot be found");
        }

        await _cartService.DeleteCartAsync(cartId, userId);
        return Ok("Cart successfully deleted");
    }
}