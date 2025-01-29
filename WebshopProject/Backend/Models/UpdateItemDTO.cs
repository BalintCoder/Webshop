namespace WebshopProject.Backend.Models;

public class UpdateItemDTO
{
    
    public string Name { get; set; }
    
    public string Img { get; set; }
    
    public double Weight { get; set; }
    
    public string MadeOf { get; set; }
    
    public double Price { get; set; }
    
    public string? Kind { get; set; }
    
    public string? Description { get; set; }
    
}