namespace WebshopProject.Backend.Models;

public class AddToCartDTO
{
    public Guid CartId { get; set; }
    public Guid ItemId { get; set; }
    public int Quantity { get; set; }
}