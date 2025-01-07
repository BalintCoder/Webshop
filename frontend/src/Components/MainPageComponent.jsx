import {useEffect, useState} from "react";
import "/src/Styling/mainpage.css"
import kep from "../Images/kepremove.png"
import kep2 from "../Images/kep2.jpg"
import kep3 from "../Images/kep3remove.png"
import kep4 from "../Images/kep4.jpg"
import kep5 from "../Images/kep5.jpg"
import kep4removed from "../Images/kep4removed.png"
import kep5remove from "../Images/kep5remove.png"
import {Navigate, useNavigate} from "react-router-dom";
import kep6 from "../Images/kep6.png"
import kep7 from "../Images/kep7.png"
export default  function MainPageComponent ()  {
    
    const [items, setItems] = useState([])
    const navigate = useNavigate()

    const fetchItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("/api/ItemModel/GetAll", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Item fetch failed');
            }

            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleItemClick = (id) => {
        navigate(`/item/${id}`); // Csak az id-t küldjük át az URL-ben
    };
    
    
    useEffect(() =>{
        fetchItems()
    },[])

    return (
        <div className="itemholder">
            {items.map((item) => (
                <div className="individualitem" key={item.id} onClick={() => handleItemClick(item.id)}>
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