using Moq;
using WebshopProject.Backend.Models;
using WebshopProject.Backend.Repositories;
using WebshopProject.Backend.Services;
using Xunit;
using Assert = Xunit.Assert;

namespace TestsForTheServices;

public class GetAllAsyncTesting
{
    [Fact]
    public async Task GetAllTheModels()
    {
        var mockRepository = new Mock<IItemRepository>();

        var items = new List<ItemModel>()
        {
            new ItemModel
            {
                Id = new Guid(), Name = "gyöngyözött", Img = "asdasdsaddas", MadeOf = "kaktusz", Price = 333,
                Weight = 89
            },
            new ItemModel
            {
                Id = new Guid(), Name = "asdsad", Img = "asdasdsaddas", MadeOf = "kaktusz", Price = 333, Weight = 89
            },
            new ItemModel
                { Id = new Guid(), Name = "nem olyan", Img = "okkk", MadeOf = "aaaa", Price = 343, Weight = 89 }
        };

        mockRepository.Setup(repo => repo.GetAllItemsAsync()).ReturnsAsync(items);

        var service = new ItemModelService(mockRepository.Object);

        var result = await service.GetAllAsync();


        Assert.NotNull(result);
        Assert.Equal(3, result.Count());
    }
}