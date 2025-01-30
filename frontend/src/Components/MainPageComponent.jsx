import {useEffect, useState} from "react";
import "/src/Styling/mainpage.css"
import kep from "../Images/kepremove.png"
import kep3 from "../Images/kep3remove.png"
import kep4removed from "../Images/kep4removed.png"
import kep5remove from "../Images/kep5remove.png"
import {useNavigate} from "react-router-dom";
import kep6 from "../Images/kep6.png"
import kep7 from "../Images/kep7.png"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 📌 Importálni kell a stílust
export default function MainPageComponent({ filter }) {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const fetchItems = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token)
            {
                toast.error("Your token has expired")
                setTimeout(() => navigate("/"), 1000);
            }
            const response = await fetch("/api/ItemModel/GetAll", {
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
            setItems(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleItemClick = (id) => {
        navigate(`/item/${id}`);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    
    const filteredItems = items.filter((item) =>
        item.kind.toLowerCase().includes(filter)
    );

    return (
        <div className="itemholder">
            {filteredItems.map((item) => (
                <div
                    className="individualitem"
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                >
                    <div className="itemnamecss">
                        <h3>{item.name}</h3>
                    </div>
                    <div className="image-container">
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
                        {item.name === "The Mariposa" && (
                            <img src={kep6} alt={`${item.name}`} className="item-image" />
                        )}
                        {item.name === "The BlackPansy" && (
                            <img src={kep7} alt={`${item.name}`} className="item-image" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
    
}