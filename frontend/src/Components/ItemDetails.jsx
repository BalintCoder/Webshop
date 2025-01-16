import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import kep from "../Images/kepremove.png";
import kep4removed from "../Images/kep4removed.png";
import kep3 from "../Images/kep3remove.png";
import kep5remove from "../Images/kep5remove.png";
import "../Styling/itemDetails.css"
import kep6 from "../Images/kep6.png";
import kep7 from "../Images/kep7.png";

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

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

    return (
        <div className="itemholder2">
                <div className="individualitem2" key={item.id}>
                    <div className="itemnamecss2">
                        <h3>{item.name}</h3>
                    </div>
                    <div className="image-container2">
                    {item.name === "Ear Shellring" && (
                        <img src={kep} alt={`${item.name}`} className="item-image2"/>
                    )}
                    {item.name === "Flowerous Pendant" && (
                        <img src={kep4removed} alt={`${item.name}`} className="item-image2"/>
                    )}
                    {item.name === "Mistirous Pendant" && (
                        <img src={kep3} alt={`${item.name}`} className="item-image2"/>
                    )}
                    {item.name === "The West" && (
                        <img src={kep5remove} alt={`${item.name}`} className="item-image2"/>
                    )}
                        {item.name === "The Mariposa" && (
                            <img src={kep6} alt={`${item.name}`} className="item-image2" />
                        )}
                        {item.name === "The BlackPansy" && (
                            <img src={kep7} alt={`${item.name}`} className="item-image2" />
                        )}
                        
                    </div>
                    <div className="details2">
                        <p>Description: {item.description}</p>
                        <h3> Weight: {item.weight}g</h3>
                        <h3> Material: {item.madeOf}</h3>
                        <h3> Price: {item.price} Ft</h3>
                        <h3> Kind: {item.kind}</h3>
                    </div>
                </div>

        </div>
    );
};

export default ItemDetails;