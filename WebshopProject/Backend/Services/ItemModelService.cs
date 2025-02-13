using WebshopProject.Backend.Models;
using WebshopProject.Backend.Repositories;

namespace WebshopProject.Backend.Services;

public class ItemModelService : IItemModelService
{
    private readonly IItemRepository _itemRepository;

    public ItemModelService(IItemRepository itemRepository)
    {
        _itemRepository = itemRepository;
    }

    public async Task<IEnumerable<ItemModel>> GetAllAsync()
    {
        return await _itemRepository.GetAllItemsAsync();
    }

    public Task<ItemModel?> GetItemByIdAsync(Guid id)
    {
        return _itemRepository.GetItemByIdAsync(id);
    }

    public async Task AddItemAsync(ItemModel itemModel)
    {
        await _itemRepository.AddItemAsync(itemModel);
    }
    

    public async Task UpdateItem(Guid id, UpdateItemDTO updateItemDto)
    {
        await _itemRepository.UpdateItemAsync(id, updateItemDto);
    }

    public async Task DeleteItemAsync(Guid id)
    {
        await _itemRepository.DeleteItemAsync(id);
    }

    public Task<ItemModel> GetItemByName(string name)
    {
        return _itemRepository.GetItemByNameAsync(name);
    }
}