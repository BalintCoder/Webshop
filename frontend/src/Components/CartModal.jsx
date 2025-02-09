import React, { useEffect, useState } from "react";
import "../Styling/cartModal.css";
import { getUserIdFromToken } from "./GetUserIdFromToken.jsx";
import MainItemImage from "./MainItemImage.jsx";
import { toast } from "react-toastify";

export default function CartModal ({isOpen, onClose}) {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [maxPrice, setMaxPrice] = useState(0);
    const [cartId, setCartId] = useState(null);
    const[button, setButton] = useState(true)
    
    useEffect(() => {
        if (isOpen)
        {
            fetchCartItmes()
        }
    }, [isOpen])
    
    
    const fetchCartItmes = async () => {
        try {
            const token = localStorage.getItem('token')
            const userId = getUserIdFromToken()
            setLoading(true)
            if (!userId) return;

            let carResponse = await fetch(`/api/Cart/get-cart-by-userId?userId=${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (carResponse.ok)
            {
                const data = await carResponse.json()
                setCartItems(data.items || [])
                setCartId(data.id);
                const totalPrice = data.items.reduce((acc, item) => acc + (item.quantity * item.itemPrice), 0);
                setMaxPrice(totalPrice);
            } else {
                console.error("Failed to fetch cart items");
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    }
    if (!isOpen) return null;

    const deleteItem = async (id) => {  
        try {
            const token = localStorage.getItem('token');
            const userId = getUserIdFromToken();
            if (!userId) {
                console.error("No user ID found");
                return;
            }

            let carResponse = await fetch(`/api/Cart/get-cart-by-userId?userId=${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            let cartData = await carResponse.json();
            console.log("Cart Response Data:", JSON.stringify(cartData, null, 2));

            let cartId = cartData.id; 
            let itemToDelete = cartData.items.find(item => item.itemId === id);

            if (!itemToDelete) {
                console.error("Item not found in cart:", id);
                return;
            }
            
            const removeResponse = await fetch(`/api/Cart/remove-item?cartId=${cartId}&itemId=${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (removeResponse.ok) {
                setCartItems((prevItems) => prevItems.filter(item => item.itemId !== id));
                console.log(`Item ${id} deleted successfully.`);
               setMaxPrice(prevPrice => {
                   const deletedItem = cartItems.find(item => item.itemId === id)
                   if (!deletedItem) return prevPrice;
                   return prevPrice - (deletedItem.quantity * deletedItem.itemPrice);
                   
               })
            } else {
                console.error("Failed to delete item:", removeResponse.status);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };
    
    
    const deleteCart = async () => {
        
        const token = localStorage.getItem('token')
        const userId = getUserIdFromToken()

        let carResponse = await fetch(`/api/Cart/get-cart-by-userId?userId=${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const cartData = await carResponse.json()
        
        if (cartData.id === cartId)
        {
            const response = await fetch(`/api/Cart/remove-cart-from-user?cartId=${cartId}&userId=${userId}`,{
                method:'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            
            if (response.ok)
            {
                setCartItems([])
                toast.success("purchasing was successful, hope you will like the item")
                setButton(cartData.items.length > 1)
            } else {
                console.error("Failed to delete cart:", response.status);
            }
        }
        
        
    }
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Your Cart</h2>
                {loading ? (
                    <p>Loading cart items...</p>
                ) : cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <div className="modal-details">
                                    <div className="item-remove">
                                        <button onClick={() => deleteItem(item.itemId)} title="Delete item"
                                                className="item-remove-button">X
                                        </button>
                                    </div>
                                    <span className="modal-item-name">{item.itemName}</span>
                                    <span className="quantity">{item.quantity}x</span>
                                    <span className="realprice">{item.itemPrice}Ft</span>
                                    <span className="price">{item.quantity * item.itemPrice} Ft</span>
                                </div>
                                <MainItemImage itemName={item.itemName}/>
                            </li>

                        ))}
                    </ul>

                )}
                {button && (
                    <div className="delete-cart">
                        <button onClick={() => deleteCart(cartId)} className="delete-cart-button" value={button}>Purchase</button>
                    </div>
                )}
                <h1 className="total"> Total:{maxPrice} Ft</h1>
            </div>
        </div>
    )

}