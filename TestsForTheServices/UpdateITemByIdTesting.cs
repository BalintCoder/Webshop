using Moq;
using WebshopProject.Backend.Models;
using WebshopProject.Backend.Repositories;
using WebshopProject.Backend.Services;
using Xunit;
using Assert = Xunit.Assert;

namespace TestsForTheServices;

public class UpdateITemByIdTesting
{
    [Fact]
    public async Task UpdatingItemById()
    {
        var mockRepository = new Mock<IItemRepository>();

        var listStorage = new List<ItemModel>
        {
            new ItemModel
            {
                Id = Guid.NewGuid(), Name = "gyöngyözött", Img = "asdasdsaddas", MadeOf = "kaktusz", Price = 333,
                Weight = 89
            },
            new ItemModel
                { Id = Guid.NewGuid(), Name = "törött gyöngy", Img = "asdqwe", MadeOf = "fa", Price = 100, Weight = 50 }
        };

        var ItemToUpdate = listStorage[0].Id;
        
        var updateDto = new UpdateItemDTO
        {
            Name = "Updated",
            Img = "img",
            MadeOf = "material",
            Price = 200,
            Weight = 100
        };

        mockRepository.Setup(repo => repo.UpdateItemAsync(It.IsAny<Guid>(), It.IsAny<UpdateItemDTO>()))
            .Callback<Guid, UpdateItemDTO>((id, dto) =>
            {
                var existingItem = listStorage.FirstOrDefault(i => i.Id == id);
                if (existingItem != null)
                {
                    existingItem.Name = dto.Name;
                    existingItem.Img = dto.Img;
                    existingItem.MadeOf = dto.MadeOf;
                    existingItem.Price = dto.Price;
                    existingItem.Weight = dto.Weight;
                }
            })
            .Returns(Task.CompletedTask);

        var servie = new ItemModelService(mockRepository.Object);

        await servie.UpdateItem(ItemToUpdate, updateDto);
        
        var updatedItem = listStorage.First(i => i.Id == ItemToUpdate);
        
        Assert.Equal("Updated", updatedItem.Name);
    }
}