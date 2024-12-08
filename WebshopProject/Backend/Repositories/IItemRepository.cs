using WebshopProject.Backend.Models;

namespace WebshopProject.Backend.Repositories;

public interface IItemRepository
{
    Task<IEnumerable<ItemModel>> GetAllItemsAsync();
    Task<ItemModel?> GetItemByIdAsync(Guid id);
    Task AddItemAsync(ItemModel item);
    Task UpdateItemAsync(Guid guid, UpdateItemDTO updateItemDto);
    Task DeleteItemAsync(Guid id);


}