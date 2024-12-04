using Microsoft.EntityFrameworkCore;  
using WebshopProject.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ItemDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebshopDb")));

// Beállítjuk az adatbázis kapcsolatot

var app = builder.Build();

using (var context = app.Services.CreateScope().ServiceProvider.GetRequiredService<ItemDbContext>())
{
    var tableNames = context.Model.GetEntityTypes()
        .Select(t => t.GetTableName())
        .ToList();

    foreach (var tableName in tableNames)
    {
        Console.WriteLine(tableName);
    }
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.Run();