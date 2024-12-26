import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import kep from "../Images/kepremove.png";
import kep4removed from "../Images/kep4removed.png";
import kep3 from "../Images/kep3remove.png";
import kep5remove from "../Images/kep5remove.png";

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

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
        return <p>Loading...</p>;  // Ha az item adat még nem érkezett meg, akkor ezt mutatja
    }

    return (
        <div>
            <h1>{item.name}</h1>
            {item.name === "Ear Shellring" && (
                <img src={kep} alt={`${item.name}`} className="item-image" />
            )}
            {item.name === "Flowerous Pendant" && (
                <img src={kep4removed} alt={`${item.name}`} className="item-image" />
            )}
            {item.name === "Mistirous Pendant" && (
                <img src={kep3} alt={`${item.name}`} className="item-image" />
            )}
            {item.name === "The West" && (
                <img src={kep5remove} alt={`${item.name}`} className="item-image" />
            )}
            <p>Weight: {item.weight}g</p>
            <p>Material: {item.madeOf}</p>
            <p>Price: {item.price} Ft</p>
        </div>
    );
};

export default ItemDetails;