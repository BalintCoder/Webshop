using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebshopProject.Backend.ClassHelpers;
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
    
    [HttpGet("{id}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<ItemModel>> GetItemById(Guid id)
    {
        var item = await _itemModelService.GetItemByIdAsync(id);
        return Ok(item);
    }


    [HttpPost("AddNewItem"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddItem([FromForm] ItemModel itemModel)
    {
        Console.WriteLine("AddItem endpoint called");
        try
        {
            var existingItem = await _itemModelService.GetItemByName(itemModel.Name);
    
            if (existingItem != null)
            {
                return Conflict($"An item with the name \"{itemModel.Name}\" already exists.");
            }
            
            var newItem = new ItemModel
            {
                Id = Guid.NewGuid(),
                Img = itemModel.Img,
                MadeOf = itemModel.MadeOf,
                Name = itemModel.Name,
                Price = itemModel.Price,
                Weight = itemModel.Weight,
                Kind = itemModel.Kind,
                Description = itemModel.Description
    
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
            var existingItem = await _itemModelService.GetItemByName(updateItemDto.Name);
            if (existingItem != null && existingItem.Id != ItemId)
            {
                return Conflict($"An item with the name \"{updateItemDto.Name}\" already exists.");
            }
            
            await _itemModelService.UpdateItem(ItemId, updateItemDto);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "An error occurred while updating the item.");
           
        }
        
    }

    [HttpGet("get-item-by-name"),Authorize(Roles = "Admin")]

    public async Task<IActionResult> GetItemByName(string name)
    {
        try
        {
            var item = await _itemModelService.GetItemByName(name);

            return Ok(item);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [HttpPost("upload-image"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        var fileName = new UploadHandeling().UploadPhoto(file);
        if (fileName.Contains("Extention") || fileName.Contains("MaximumSize"))
        {
            return BadRequest(fileName); 
        }
        return Ok(new { fileName });
    } 
    
}