using Microsoft.EntityFrameworkCore;
using WebshopProject.Backend.Models;
using WebshopProject.Data;

namespace WebshopProject.Backend.Repositories;

public class ItemRepository : IItemRepository
{
    private WebshopDbContext _dbContext;

    public ItemRepository(WebshopDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<IEnumerable<ItemModel>> GetAllItemsAsync()
    {
        return await _dbContext.ItemModels.ToListAsync();
    }
    
    public async Task<ItemModel?> GetItemByIdAsync(Guid id)
    {
        return await _dbContext.ItemModels.FirstOrDefaultAsync(item => item.Id == id);
    }
    
    public async Task AddItemAsync(ItemModel item)
    {
        await _dbContext.AddAsync(item); 
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task UpdateItemAsync(Guid id, UpdateItemDTO updateItemDto)
    {
        var item = await _dbContext.ItemModels.FirstOrDefaultAsync(i => i.Id == id);
    
        if (item == null)
        {
            throw new KeyNotFoundException($"Item with the {id} does not exist");
        }
        
        item.Name = updateItemDto.Name;
        item.Img = updateItemDto.Img;
        item.MadeOf = updateItemDto.MadeOf;
        item.Price = updateItemDto.Price;
        item.Weight = updateItemDto.Weight;
        item.Kind = updateItemDto.Kind;
        item.Description = updateItemDto.Description;
        
        _dbContext.Update(item);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task DeleteItemAsync(Guid id)
    {
        var item = await _dbContext.ItemModels.FirstOrDefaultAsync(i => i.Id == id);
        _dbContext.Remove(item);
        await _dbContext.SaveChangesAsync();
    }

    
}