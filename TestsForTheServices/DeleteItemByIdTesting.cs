using Moq;
using WebshopProject.Backend.Models;
using WebshopProject.Backend.Repositories;
using WebshopProject.Backend.Services;
using Xunit;
using Assert = Xunit.Assert;
namespace TestsForTheServices;

public class DeleteItemByIdTesting
{
    [Fact]
    public async Task DeleteItemById()
    {
        var mockrepository = new Mock<IItemRepository>();

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

        var ItemIdToDelete = listStorage[0].Id;

        mockrepository.Setup(repo => repo.DeleteItemAsync(It.IsAny<Guid>()))
            .Callback<Guid>(id => listStorage.RemoveAll(i => i.Id == id))
            .Returns(Task.CompletedTask);

        mockrepository.Setup(repo => repo.GetAllItemsAsync()).ReturnsAsync(listStorage);

        var service = new ItemModelService(mockrepository.Object);
        await service.DeleteItemAsync(ItemIdToDelete);

        var items = await service.GetAllAsync();
        
        Assert.DoesNotContain(items, i => i.Id == ItemIdToDelete);
        Assert.Equal(1, items.Count());

    }
}