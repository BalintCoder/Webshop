using Microsoft.AspNetCore.Identity;

namespace WebshopProject.Backend.Services.Authentication;

public class AuthService : IAuthService
{
    private readonly UserManager<IdentityUser> _userManager;

    public AuthService(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<AuthResult> RegisterAsync(string email, string username, string passwod)
    {
        var result = await _userManager.CreateAsync(
            new IdentityUser { UserName = username, Email = email }, passwod);
        if (!result.Succeeded)
        {
            return FailedRegistration(result, email, username);
        }

        return new AuthResult(true, email, username, "");
    }

    private static AuthResult FailedRegistration(IdentityResult result, string email, string username)
    {
        var authResult = new AuthResult(false, email, username, "");
        foreach (var error in result.Errors)
        {
            authResult.ErrorMessages.Add(error.Code, error.Description);
        }

        return authResult;
    }
}