namespace WebshopProject.Backend.Services.Authentication;

public interface IAuthService
{
    Task<AuthResult> RegisterAsync(string email, string username, string passwod);
}