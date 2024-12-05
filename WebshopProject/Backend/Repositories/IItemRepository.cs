using WebshopProject.Backend.Models;

namespace WebshopProject.Backend.Repositories;

public interface IItemRepository
{
    Task<IEnumerable<ItemModel>> GetAllItemsAsync();
    Task<ItemModel?> GetItemByIdAsync(Guid id);
    Task AddItemAsync(ItemModel item);
    Task UpdateItemAsync(ItemModel item);
    Task DeleteItemAsync(ItemModel itemModel);


}