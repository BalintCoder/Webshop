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
        var item = await _itemRepository.GetItemByIdAsync(id);

        if (item == null)
        {
            throw new KeyNotFoundException($"Item with ID {id} not found.");
        }
        
        item.Name = updateItemDto.Name;
        item.Img = updateItemDto.Img;
        item.Weight = updateItemDto.Weight;
        item.MadeOf = updateItemDto.MadeOf;
        item.Price = updateItemDto.Price;

        await _itemRepository.UpdateItemAsync(id);
    }

    public async Task DeleteItemAsync(Guid id)
    {
        await _itemRepository.DeleteItemAsync(id);
    }
}