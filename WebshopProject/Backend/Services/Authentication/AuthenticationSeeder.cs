using Microsoft.AspNetCore.Identity;

namespace WebshopProject.Backend.Services.Authentication;

public class AuthenticationSeeder
{
    private RoleManager<IdentityRole> roleManager;

    public AuthenticationSeeder(RoleManager<IdentityRole> roleManager)
    {
        this.roleManager = roleManager;
    }

    public void AddRoles()
    {
        var tAdmin = CreateAdminRole(roleManager);
        tAdmin.Wait();
        var tUser = CreateUserRole(roleManager);
        tUser.Wait();
    }

    private async Task CreateAdminRole(RoleManager<IdentityRole> roleManager)
    {
        await this.roleManager.CreateAsync(new IdentityRole("Admin"));
    }
    
    private async Task CreateUserRole(RoleManager<IdentityRole> roleManager)
    {
        await this.roleManager.CreateAsync(new IdentityRole("User"));
    }
    
    
}