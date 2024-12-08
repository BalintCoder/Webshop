using Moq;
using WebshopProject.Backend.Models;
using WebshopProject.Backend.Repositories;
using WebshopProject.Backend.Services;
using Xunit;
using Assert = Xunit.Assert;
namespace TestsForTheServices;

public class GetItemByIdTesting
{
    [Fact]

    public async Task GetItemById()
    {
        var mockReposiotry = new Mock<IItemRepository>();

        var item = new ItemModel()
        {
            Id = new Guid(), Name = "gyöngyözött", Img = "asdasdsaddas", MadeOf = "kaktusz", Price = 333,
            Weight = 89
        };

        mockReposiotry.Setup(repo => repo.GetItemByIdAsync(item.Id)).ReturnsAsync(item);

        var service = new ItemModelService(mockReposiotry.Object);
        var result = await service.GetItemByIdAsync(item.Id);
        
        Assert.NotNull(result);
        Assert.Equal(item.Id, result.Id);
        
    }
}