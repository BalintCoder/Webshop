using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using WebshopProject.Data;

namespace IntegrationTests;

public class WebshopProjectWebApplicationFactory : WebApplicationFactory<Program>
{
    private readonly string _dbName = Guid.NewGuid().ToString();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var WebshopDbContextDescripor = services.SingleOrDefault(d =>
                d.ServiceType == typeof(DbContextOptions<WebshopDbContext>));
            var userDbContextDescripor = services.SingleOrDefault(d =>
                d.ServiceType == typeof(DbContextOptions<UserContext>));

            services.Remove(WebshopDbContextDescripor);
            services.Remove(userDbContextDescripor);

            services.AddDbContext<WebshopDbContext>(options =>
            {
                options.UseInMemoryDatabase(_dbName);
            });

            services.AddDbContext<UserContext>(options =>
            {
                options.UseInMemoryDatabase(_dbName);
            });

            using var scope = services.BuildServiceProvider().CreateScope();

            var webshopContext = scope.ServiceProvider.GetRequiredService<WebshopDbContext>();
            webshopContext.Database.EnsureDeleted();
            webshopContext.Database.EnsureCreated();

        });
    }
}