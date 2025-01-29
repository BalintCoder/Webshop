namespace WebshopProject.Backend.Models;

public class CartItem
{
    public Guid Id { get; set; }
    public Guid CartId { get; set; }
    public Cart Cart { get; set; }

    public Guid ItemId { get; set; }
    public ItemModel Item { get; set; }

    public int Quantity { get; set; } = 1; 
}