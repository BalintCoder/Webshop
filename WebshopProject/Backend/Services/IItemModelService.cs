using WebshopProject.Backend.Models;

namespace WebshopProject.Backend.Services;

public interface IItemModelService
{
    Task<IEnumerable<ItemModel>> GetAllAsync();

    Task<ItemModel?> GetItemByIdAsync(Guid id);

    Task AddItemAsync(ItemModel itemModel);

    Task UpdateItem(Guid id, UpdateItemDTO updateItemDto);
    
    Task DeleteItemAsync(Guid id);

    Task<ItemModel?> GetItemByName(string name);
}