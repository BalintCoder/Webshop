using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebshopProject.Data;

public class UserContext : IdentityUserContext<IdentityUser>
{
    public UserContext(DbContextOptions<UserContext> options)
        : base(options)
    {
    }
}