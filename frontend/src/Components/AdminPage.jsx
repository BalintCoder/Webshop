import {Await} from "react-router-dom";
import {useState} from "react";
import "/src/Styling/AddingForm.css"
export default function AdminPage ()
{
    const[formData, setFormData] = useState({
        name: "",
        img: "",
        weight: "",
        madeOf: "",
        price: "",
        kind: "",
        description: "",
    })
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const  handleAddingNewItem = async () => {

        const token = localStorage.getItem("token")

        const response = await fetch("/api/ItemModel/AddNewItem",{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                img: formData.img,
                weight: Number(formData.weight),
                madeOf: formData.madeOf,
                price: Number(formData.price),
                kind: formData.kind,
                description: formData.description,
            })
        })
        if (!response.ok)
        {
            console.error("Cant do this right now")
            return;
        }
        
        const data = await response.json()
        console.log("Adding was successful:", data);
    }

    return (
        <div className="container">
            <h1 className="title">Adding new item</h1>
            <div className="form-container">
                <input type="text" name="name" placeholder="Name of the item" value={formData.name}
                       onChange={handleChange} className="input"/>
                <input type="text" name="img" placeholder="img of the item" value={formData.img}
                       onChange={handleChange} className="input"/>
                <input type="number" name="weight" placeholder="weight of the item" value={formData.weight}
                       onChange={handleChange} className="input"/>
                <input type="text" name="madeOf" placeholder="item made of..." value={formData.madeOf}
                       onChange={handleChange} className="input"/>
                <input type="number" name="price" placeholder="price of the item" value={formData.price}
                       onChange={handleChange} className="input"/>
                <input type="text" name="kind" placeholder="kind of the item" value={formData.kind}
                       onChange={handleChange} className="input"/>
                <textarea name="description" placeholder="description of the item" value={formData.description}
                          onChange={handleChange} className="input"/>
                <button onClick={handleAddingNewItem} className="form-button">Add new Item</button>
            </div>
        </div>
    )
}