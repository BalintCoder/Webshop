using System.Diagnostics;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;


namespace WebshopProject.Backend.Services.Authentication;

public class TokenService : ITokenService
{
    private const int ExpirationMinutes = 60;
    public string CreateToken(IdentityUser user, string role)
    {
        var expiration = DateTime.UtcNow.AddMinutes(ExpirationMinutes);
        var token = CreateJwtToken(
            CreateClaims(user, role),
            CreateSingingCredentials(),
            expiration
        );
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    private JwtSecurityToken CreateJwtToken(List<Claim> claims, SigningCredentials credentials, DateTime expiration) =>
        new(
            GetConfigurationStrings("JWT_VALID_ISSUER"),
            GetConfigurationStrings("JWT_VALID_AUDIENCE"),
            claims,
            expires: expiration,
            signingCredentials: credentials
        );

    private List<Claim> CreateClaims(IdentityUser user, string? role)
    {
        try
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, "TokenForTheApiWithAuth"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat,
                    EpochTime.GetIntDate(DateTime.UtcNow).ToString(CultureInfo.InvariantCulture),
                    ClaimValueTypes.Integer64),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)

            };
            if (role != null)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    private SigningCredentials CreateSingingCredentials()
    {
        return new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(GetConfigurationStrings("JWT_SECRET"))
            ),
            SecurityAlgorithms.HmacSha256
        );
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