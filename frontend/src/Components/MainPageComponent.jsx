import {useEffect, useState} from "react";
import "/src/Styling/mainpage.css"
import kep from "../Images/kepremove.png"
import kep2 from "../Images/kep2.jpg"
import kep3 from "../Images/kep3remove.png"
import kep4 from "../Images/kep4.jpg"
import kep5 from "../Images/kep5.jpg"
import kep4removed from "../Images/kep4removed.png"
export default  function MainPageComponent ()  {
    
    const [items, setItems] = useState([])

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
    
    useEffect(() =>{
        fetchItems()
    },[])

    return (
        <div className="itemholder">
            {items.map((item) => (
                <div className="individualitem" key={item.id}>
                    <div className="itemnamecss">
                        <h3>Name of the item: {item.name}</h3>
                    </div>
                  
                    {item.name === "Ear Shellring" && (
                        <img src={kep} alt={`${item.name}`} className="item-image" />
                    )}
                    {item.name === "Flowerous Pendant" && (
                        <img src={kep4removed} alt={`${item.name}`} className="item-image" />
                    )}
                    {item.name === "Mistirous Pendant" && (
                        <img src={kep3} alt={`${item.name}`} className="item-image" />
                    )}
                   
                    <h3> Weight of the item: {item.weight}g</h3>
                    <h3> Made of material: {item.madeOf}</h3>
                    <h3> The price of the Item: {item.price} Ft</h3>
                </div>
            ))}
        </div>
    );
}