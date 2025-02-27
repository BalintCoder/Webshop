using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebshopProject.Data;

namespace IntegrationTests;

public class IntegrationTestsFactory : WebApplicationFactory<WebshopProject.Program>
{
    private readonly string _dbName = Guid.NewGuid().ToString();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        Environment.SetEnvironmentVariable("JWT_SECRET", "L7bGMUiuph2lV22u4qCmlhof3XakPqNdH4aQTY6Uiu");
        builder.ConfigureServices(services =>
        {
            var webshopDbDescriptor = services.SingleOrDefault(d =>
                d.ServiceType == typeof(DbContextOptions<WebshopDbContext>));
            var userDbDescriptor = services.SingleOrDefault(d =>
                d.ServiceType == typeof(DbContextOptions<UserContext>));

            if (webshopDbDescriptor != null)
                services.Remove(webshopDbDescriptor);
            if (userDbDescriptor != null)
                services.Remove(userDbDescriptor);

            
            services.AddDbContext<WebshopDbContext>(options =>
                options.UseInMemoryDatabase(_dbName));

            services.AddDbContext<UserContext>(options =>
                options.UseInMemoryDatabase(_dbName));

            
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<UserContext>() 
                .AddDefaultTokenProviders();

            
            using var scope = services.BuildServiceProvider().CreateScope();
            var scopedServices = scope.ServiceProvider;

            var webshopContext = scopedServices.GetRequiredService<WebshopDbContext>();
            var userContext = scopedServices.GetRequiredService<UserContext>();

            webshopContext.Database.EnsureDeleted();
            webshopContext.Database.EnsureCreated();

            userContext.Database.EnsureDeleted();
            userContext.Database.EnsureCreated();

            SeedIdentityData(scopedServices).GetAwaiter().GetResult();
        });
    }

    private async Task SeedIdentityData(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();

        
        var roles = new[] { "User", "Admin" };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        
        var testUser = new IdentityUser
        {
            Email = "test@example.com",
            UserName = "testuser"
            
        };

        var existingUser = await userManager.FindByEmailAsync(testUser.Email);
        if (existingUser == null)
        {
            await userManager.CreateAsync(testUser, "Test@123");
            await userManager.AddToRoleAsync(testUser, "User");
        }
    }
}