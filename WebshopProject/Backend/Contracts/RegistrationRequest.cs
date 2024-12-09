using System.ComponentModel.DataAnnotations;

namespace WebshopProject.Backend.Contracts;

public record RegistrationRequest(
    [Required] string Email,
    [Required] string UserName,
    [Required] string Password);
