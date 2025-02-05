import React, { useEffect, useState } from "react";
import "../Styling/cartModal.css";
import { getUserIdFromToken } from "./GetUserIdFromToken.jsx";
import MainItemImage from "./MainItemImage.jsx";

export default function CartModal ({isOpen, onClose}) {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [maxPrice, setMaxPrice] = useState(0);
    
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
                                    <span className="modal-item-name">{item.itemName}</span>
                                    <span className="quantity">{item.quantity}x</span>
                                    <span className="price">{item.quantity * item.itemPrice} Ft</span>
                                </div>
                                <MainItemImage itemName={item.itemName}/>
                            </li>

                        ))}
                    </ul>

                )}
                <h1 className="total"> Total:{maxPrice} Ft</h1>
            </div>
        </div>
    )

}