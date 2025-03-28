import {useEffect, useState} from "react";
import "/src/Styling/mainpage.css"
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainItemImage from "./MainItemImage.jsx";
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
                        <MainItemImage img={item.img} />
                    </div>
                </div>
            ))}
        </div>
    );
    
}