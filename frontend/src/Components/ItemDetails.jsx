import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styling/itemDetails.css"
import cart from "../Images/cart.png"
import {getUserIdFromToken} from "./GetUserIdFromToken.jsx";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ItemDetailsImage from "./ItemDetailsImage.jsx";
const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchItemDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/ItemModel/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Item fetch failed");
            }

            const data = await response.json();
            setItem(data);
        } catch (error) {
            console.error("Failed to fetch item details", error);
        }
    };

    useEffect(() => {
        fetchItemDetails();
    }, [id]);

    if (!item) {
        return <p>Loading...</p>;
    }

    
    const handleAddToCart = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const userId = getUserIdFromToken();

            if (!userId) {
                console.error("No user ID found");
                setLoading(false);
                return;
            }

            
            let carResponse = await fetch(`/api/Cart/get-cart-by-userId?userId=${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            
            if (!carResponse.ok) {
                carResponse = await fetch(`/api/Cart/create?userId=${userId}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId: userId }),
                });

                if (!carResponse.ok) {
                    throw new Error("Failed to create cart");
                }
            }

            
           let cartData = await carResponse.json();
            
            
            if (!cartData.id) {
                throw new Error("No valid CartId found");
            }
            
            const addItemResponse = await fetch(`/api/Cart/add-item?userId=${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: cartData.id,  
                    itemId: item.id,           
                    quantity: 1,               
                }),
            });

            if (addItemResponse.ok) {
                toast.success("Item successfully added to the cart");
            } else {
                toast.error("Couldn't add the item for the cart");
            }
        } catch (e) {
            console.error("Error handling cart", e);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="no-scroll-page"> 
            <div className="itemholder2">
                <div className="individualitem2" key={item.id}>
                    <div className="itemnamecss2">
                        <h3>{item.name}</h3>
                    </div>
                    <div className="image-container2">
                        <ItemDetailsImage itemName={item.name} />
                    </div>
                    <div className="details2">
                        <p>Description: {item.description}</p>
                        <div className="only4">
                        <h3>Weight: {item.weight}g</h3>
                        <h3>Material: {item.madeOf}</h3>
                        <h3>Price: {item.price} Ft</h3>
                        <h3>Kind: {item.kind}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="CartIcon">
                <img src={cart} className="Cart-icon" alt="Cart"/>
            </div>
            <div>
                <button className="cartButton" onClick={handleAddToCart} disabled={loading}>
                    {loading ? "Adding to Cart..." : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ItemDetails;
