using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using WebshopProject.Data;

namespace IntegrationTests;
[Collection("IntegrationTests")]
public class AuthControllerIntegrationTests
{
    private readonly IntegrationTestsFactory _app;
    private readonly HttpClient _client;

    public AuthControllerIntegrationTests()
    {
        _app = new IntegrationTestsFactory();
        _client = _app.CreateClient();
    }

    [Fact]

    public async Task AddingAndRetrevingUserAsync()
    {
        using var scope = _app.Services.CreateScope();

        var userContext = scope.ServiceProvider.GetRequiredService<UserContext>();

        var testUser = new IdentityUser
        {
            UserName = "IntegRationUser",
            Email = "Integration@gmail.com"
        };

        await userContext.Users.AddAsync(testUser);
        await userContext.SaveChangesAsync();

        var retrievedUser = userContext.Users.FirstOrDefault(u => u.Email == "Integration@gmail.com");
        Assert.NotNull(retrievedUser);
        Assert.Equal("Integration@gmail.com", retrievedUser.Email);
    }
}