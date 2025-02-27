using System.Net;
using System.Net.Http.Json;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;
using WebshopProject.Backend.Models;
using WebshopProject.Backend.Services.Authentication;
using WebshopProject.Data;
using Xunit.Abstractions;
using Xunit.Sdk;

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

    public async Task RegisterUser_Endpoint_ReturnsCreated()
    {
        var request = new
        {
            Email = "integrationtest@example.com",
            UserName = "IntegrationUser",
            Password = "TestPassword123!"
        };
    
        var content = new StringContent(JsonSerializer.Serialize(request), Encoding.UTF8, "application/json");

        var response = await _client.PostAsync("/Auth/Register", content);

        response.EnsureSuccessStatusCode(); 
        var responseContent = await response.Content.ReadAsStringAsync();
        Assert.Contains("integrationtest@example.com", responseContent);
        Assert.Contains("IntegrationUser", responseContent);
        

    }
    
    [Fact]
    public async Task LoginUser_Endpoint_ReturnsBody()
    {
        var request = new
        {
            Email = "test@example.com",
            Password = "Test@123"
        };

        var content = new StringContent(JsonSerializer.Serialize(request), Encoding.UTF8, "application/json");

        var response = await _client.PostAsync("/Auth/Login", content);
        

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var responseContent = await response.Content.ReadAsStringAsync();
        using var jsonDoc = JsonDocument.Parse(responseContent);
        var root = jsonDoc.RootElement;
        Assert.True(root.TryGetProperty("password", out var tokenElement), "The response doesn't contain a token.");

        var token = tokenElement.GetString();
        Assert.False(string.IsNullOrEmpty(token), "The JWT token is empty or null!");
    }
    
    
}