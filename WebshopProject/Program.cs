using System.Configuration;
using System.Diagnostics;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebshopProject.Backend.Repositories;
using WebshopProject.Backend.Services;
using WebshopProject.Data;
using DotNetEnv;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using WebshopProject.Backend.Services.Authentication;
using ConfigurationManager = Microsoft.Extensions.Configuration.ConfigurationManager;

namespace WebshopProject;

public class Program
{
    public static void Main(string[] args)
    {
        DotNetEnv.Env.Load();
        Console.WriteLine(Environment.GetEnvironmentVariable("JWT_SECRET"));

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Demo Api", Version = "v1"
        
    });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{}
        }
    });
});
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<IItemModelService, ItemModelService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<AuthenticationSeeder>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<ICartService, CartService>();

builder.Services.AddDbContext<WebshopDbContext>(options =>
    options.UseMySQL(GetConnectionString(builder.Configuration)?? throw new Exception()));

builder.Services.AddDbContext<UserContext>(options =>
    options.UseMySQL(GetConnectionString(builder.Configuration) 
                     ?? throw new Exception("WebshopDb connection string is not configured!")));


    

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ClockSkew = TimeSpan.Zero,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = GetConfigurationStrings("JWT_VALID_ISSUER"),
            ValidAudience = GetConfigurationStrings("JWT_VALID_AUDIENCE"),
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(GetConfigurationStrings("JWT_SECRET"))
                ),
        };
        options.IncludeErrorDetails = true;
        options.Events = new JwtBearerEvents
        {
            OnChallenge = context =>
            {
                context.HandleResponse();
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            }
        };
    });

builder.Services
    .AddIdentityCore<IdentityUser>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
        options.User.RequireUniqueEmail = true;
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 6;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireLowercase = false;

    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<UserContext>();

var app = builder.Build();

using var scope = app.Services.CreateScope();
scope.ServiceProvider.GetRequiredService<WebshopDbContext>().Database.Migrate();
scope.ServiceProvider.GetRequiredService<UserContext>().Database.Migrate();
var authenticationSeeder = scope.ServiceProvider.GetRequiredService<AuthenticationSeeder>();
authenticationSeeder.AddRoles();
authenticationSeeder.AddAdmin();


app.MapControllers();

var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
if (!Directory.Exists(uploadsPath))
{
    Directory.CreateDirectory(uploadsPath);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/images"
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();
app.Run();
    }

    public static string GetConnectionString(ConfigurationManager manager)
    {
        var envVariable = Environment.GetEnvironmentVariable("ConnectionString");

        if (string.IsNullOrEmpty(envVariable))
        {
           return manager.GetConnectionString("WebshopDb");
        }

        return envVariable;
    }

    public static string GetConfigurationStrings(string ConfigurationValue)
    {
        var defaultValue = "L7bGMUiuph2lV22u4qCmltod3XakPqNdH8UQTY6Uiu";
        
        var value = Environment.GetEnvironmentVariable(ConfigurationValue);

        if (string.IsNullOrEmpty(value))
        {
            Debug.WriteLine($"That configuration value:" +
                            $"{ConfigurationValue} has not been set up yet it just uses a default value. Please set it for production");
            return defaultValue;
        }

        return value;
       

    }
    
}

