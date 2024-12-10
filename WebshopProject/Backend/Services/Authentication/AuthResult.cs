namespace WebshopProject.Backend.Services.Authentication;

public record AuthResult(
    bool Succsess,
    string Email,
    string UserName,
    string Token)

{

public readonly Dictionary<string, string> ErrorMessages = new();
}
