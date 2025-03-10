import {Await} from "react-router-dom";
import {useState} from "react";
import "/src/Styling/AddingForm.css"
import {  toast } from "react-toastify";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import GetRole from "./GetRole.jsx"

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
    const [itemName, setItemName] = useState("");
    const[item, setItem] = useState(null)
    const[itemId, setItemId] = useState(null)
    const[role, setRole] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const userRole = GetRole();
        setRole(userRole)
        if (userRole !== "Admin") {
            navigate("/mainPage");
        }
    }, [navigate]);
    if (role !== "Admin") {
        return null;
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleUpdateChange = (e) => {
        setItem((prevItem) => ({
            ...prevItem,
            [e.target.name]: e.target.value,
        }));
    };
    const handleAddingNewItem = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/ItemModel/AddNewItem", {
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
            }),
        });

        if (!response.ok) {
            if (response.status === 409) {
                toast.error(`An item with the name "${formData.name}" already exists.`);
            } else {
                console.error("Cannot add item at this moment");
            }
            return;
        }

        const data = await response.json();
        console.log("Item successfully added:", data);
        toast.success(`You have successfully added "${formData.name}" to the shop.`);
    };
    
    const handleNameChange = (e) => setItemName(e.target.value);

    const FetchingItem = async (name) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/ItemModel/get-item-by-name?name=${name}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Cant fetch this item");
            }
            const data = await response.json();
            if (data) {
                setItem(data);
                setItemId(data.id);
            }
            else {
                console.error("No data received");
            }
        } catch (e) {
            toast.error(`Cannot find this item: ${name}`, e)
        }
    };

    const updateItem = async () => {
        if (!itemId) {
            console.error("No item ID found");
            return;
        }

        const token = localStorage.getItem("token")

        const response = await fetch(`/api/ItemModel/${itemId}`,{
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: item.name,
                img: item.img,
                weight: Number(item.weight),
                madeOf: item.madeOf,
                price: Number(item.price),
                kind: item.kind,
                description: item.description
            })
        })
        if (!response.ok)
        {
            toast.error(`The ${item.name} already exists`)
            return;
        }

        let data = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
           
        } else {
            console.log("Update successful, but no JSON response");
        }
        toast.success(`you have updated the ${item.name} successfully`)
        setItem(null);
        setItemId(null)
        
    }
    
    const handleDelete = async () => {
        const token = localStorage.getItem("token")
        const response = await fetch(`/api/ItemModel/${itemId}`,{
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        if (!response.ok)
        {
            toast.error(`Cannot delete ${item.name}`)
        }
        
        toast.success(`You have successfully deleted ${item.name}`)
        setItem(null);
        setItemId(null)
        setItemName(null)
    }

    return (
        <>
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
                    <textarea
                        name="description"
                        placeholder="Description of the item"
                        value={formData.description}
                        onChange={handleChange}
                        className="input"
                        maxLength={200}
                        wrap="soft"
                        style={{wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "pre-wrap"}}
                    />
                    <p>{formData.description.length}/200</p>
                    <button onClick={handleAddingNewItem} className="form-button">Add new Item</button>
                </div>
            </div>

            <div className="update-item">
                <h1 className="get-update-title">Get item and update it</h1>
            </div>
            <input type="text" name="type-name" placeholder="item name..." value={itemName}
                   onChange={handleNameChange} />
            <button className="updating-button" onClick={() => FetchingItem(itemName)}
            >Get Item</button>

            {item && (
                <div className="item-form">
                    <input type="text" name="name" value={item.name} placeholder="item name..."
                           onChange={handleUpdateChange}/>
                    <input type="text" name="img" value={item.img} placeholder="item img..."
                           onChange={handleUpdateChange}/>
                    <input type="number" name="weight" value={item.weight} placeholder="item weigth..."
                           onChange={handleUpdateChange}/>
                    <input type="text" name="madeOf" value={item.madeOf} placeholder="item was made of..."
                           onChange={handleUpdateChange}/>
                    <input type="number" name="price" value={item.price} placeholder="item price..."
                           onChange={handleUpdateChange}/>
                    <input type="text" name="kind" value={item.kind} placeholder="item kind..."
                           onChange={handleUpdateChange}/>
                    <textarea name="description" value={item.description} placeholder="description..."
                              onChange={handleUpdateChange}
                              style={{wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "pre-wrap"}}
                              maxLength={200}
                              wrap="soft"/>

                    <button className="updating-button" onClick={updateItem}>Update</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>

                    <p>{item.description.length}/200</p>

                </div>
            )}
        </>
    )
}