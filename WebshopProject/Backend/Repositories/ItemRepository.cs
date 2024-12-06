using Microsoft.EntityFrameworkCore;
using WebshopProject.Backend.Models;
using WebshopProject.Data;

namespace WebshopProject.Backend.Repositories;

public class ItemRepository : IItemRepository
{
    private ItemDbContext _dbContext;

    public ItemRepository(ItemDbContext dbContext)
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

    public async Task UpdateItemAsync(Guid id)
    {
        var item = await _dbContext.ItemModels.FirstOrDefaultAsync(i => i.Id == id);
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