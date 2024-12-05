namespace WebshopProject.Backend.Models;

public class ItemModel
{
    public Guid Id { get; set; } = Guid.NewGuid();
    
    public string Name { get; set; }
    
    public string Img { get; set; }
    
    public double Weight { get; set; }
    
    public string MadeOf { get; set; }
    
    public double Price { get; set; }
}