using Moq;
using WebshopProject.Backend.Models;
using WebshopProject.Backend.Repositories;
using WebshopProject.Backend.Services;
using Xunit;
using Assert = Xunit.Assert;
namespace TestsForTheServices;
public class AddItemAsyncTesting
{
    [Fact]
    public async void AddingItemTesting()
    {
        var mockrepository = new Mock<IItemRepository>();
        var itemStorage = new List<ItemModel>();

        var item = new ItemModel()
        {
            Id = new Guid(), Name = "gyöngyözött", Img = "asdasdsaddas", MadeOf = "kaktusz", Price = 333,
            Weight = 89
        };

        mockrepository.Setup(repo => repo.AddItemAsync(It.IsAny<ItemModel>()))
            .Callback<ItemModel>(i => itemStorage.Add(i)).Returns(Task.CompletedTask);
        
        mockrepository.Setup(repo => repo.GetAllItemsAsync())
            .ReturnsAsync(itemStorage);

         var service = new ItemModelService(mockrepository.Object);
         
         await service.AddItemAsync(item);
         
         var items = await service.GetAllAsync();
         
         Assert.Equal(1, items.Count());
    }
}