using Microsoft.AspNetCore.Mvc;
using WebshopProject.Backend.Contracts;
using WebshopProject.Backend.Services.Authentication;

namespace WebshopProject.Backend.Controllers;
[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authenticationService;

    public AuthController(IAuthService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<RegistrationResponse>> Register(RegistrationRequest request)
    {
        var result = await _authenticationService
            .RegisterAsync(request.Email, request.UserName, request.Password, "User");
        if (!result.Succsess)
        {
            AddErrors(result);
            return BadRequest(ModelState);
        }

        return CreatedAtAction(nameof(Register), new RegistrationResponse(result.Email, result.UserName));
    }
    
    private void AddErrors(AuthResult result)
    {
        foreach (var error in result.ErrorMessages)
        {
            ModelState.AddModelError(error.Key, error.Value);
        }
    }

    [HttpPost("Login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        
        var result = await _authenticationService.LoginAsync(request.Email, request.Password);
        if (!result.Succsess)
        {
            AddErrors(result);
            return Unauthorized(ModelState); 
        }

        return Ok(new AuthResponse(result.Email, result.UserName, result.Token));
        
    }

    
}