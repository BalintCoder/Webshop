using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebshopProject.Backend.Models;
using WebshopProject.Backend.Services;

namespace WebshopProject.Backend.Controllers;
[ApiController]
[Route("[controller]")]
public class ItemModelController : ControllerBase
{
    private readonly IItemModelService _itemModelService;

    public ItemModelController(IItemModelService itemModelService)
    {
        _itemModelService = itemModelService;
    }



    [HttpGet("GetAll"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<IEnumerable<ItemModel>>> GetAll()
    {
        try
        {
            var items = await _itemModelService.GetAllAsync();

            return Ok(items);
        }
        catch (Exception e)
        {
            return StatusCode(500, "An error occurred while fetching items.");
        }
    }
    
    [HttpGet("{id}"), Authorize(Roles = "Admin")]
    public async Task<ActionResult<ItemModel>> GetItemById(Guid id)
    {
        var item = await _itemModelService.GetItemByIdAsync(id);
        return Ok(item);
    }


    [HttpPost("AddNewItem"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddItem([FromBody] ItemModel itemModel)
    {
        Console.WriteLine("AddItem endpoint called");
        try
        {
            var newItem = new ItemModel
            {
                Id = Guid.NewGuid(),
                Img = itemModel.Img,
                MadeOf = itemModel.MadeOf,
                Name = itemModel.Name,
                Price = itemModel.Price,
                Weight = itemModel.Weight

            };
            await _itemModelService.AddItemAsync(newItem);
            return CreatedAtAction(nameof(GetItemById), new { id = newItem.Id }, newItem); 
        }
        catch (Exception e)
        {
            return StatusCode(500, "An error occurred while adding the item.");
        }
    }

    [HttpDelete("{ItemId}"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteItem(Guid ItemId)
    {
        try
        {
            await _itemModelService.DeleteItemAsync(ItemId);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, "An error occurred while deleting the item.");
           
        }
    }
    
    [HttpPatch("{ItemId}"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateItem(Guid ItemId, [FromBody] UpdateItemDTO updateItemDto)
    {
        try
        {
            await _itemModelService.UpdateItem(ItemId, updateItemDto);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "An error occurred while updating the item.");
           
        }
        
    }
    
}