using Microsoft.AspNetCore.Identity;

namespace WebshopProject.Backend.Services.Authentication;

public interface ITokenService
{
    public string CreateToken(IdentityUser identityUser, string role);
}