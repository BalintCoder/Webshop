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
    const [file, setFile] = useState(null);
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
    
    
    


    const handleUpload = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const file = e.target.files[0];

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/ItemModel/upload-image", {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setFile(data);

                
                setFormData(prevState => ({
                    ...prevState,
                    img: data.fileName || '',  
                }));

               
                if (item) {
                    setItem(prevItem => ({
                        ...prevItem,
                        img: data.fileName || '',  // A fájl neve
                    }));
                }
                
            } else {
                console.error('Couldnt upload the file', response);
                alert("Something went wrong with the upload");
            }
        } catch (error) {
            console.error('Something went wrong', error);
            alert("Something is not working");
        }
    };


    

    const handleUpdateChange = (e) => {
        if (e.target.name === "img") {
            
            setItem((prevItem) => ({
                ...prevItem,
                img: e.target.value, 
            }));
        } else {
            setItem((prevItem) => ({
                ...prevItem,
                [e.target.name]: e.target.value,
            }));
        }
    };
    const handleAddingNewItem = async () => {
        const token = localStorage.getItem("token");

        
        const formDataToSend = new FormData();

        formDataToSend.append("name", formData.name);
        formDataToSend.append("img", formData.img);
        formDataToSend.append("weight", formData.weight);
        formDataToSend.append("madeOf", formData.madeOf);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("kind", formData.kind);
        formDataToSend.append("description", formData.description);
        
        
        const response = await fetch("/api/ItemModel/AddNewItem",{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formDataToSend,
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

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch(`/api/ItemModel/${itemId}`, {
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
            });

            if (!response.ok) {
                toast.error(`The ${item.name} already exists`);
                return;
            }

            let data = null;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                console.log("Update successful, but no JSON response");
            }

            
            setFormData(prevState => ({
                ...prevState,
                img: item.img, 
            }));

            toast.success(`You have updated the ${item.name} successfully`);
            setItem(null);
            setItemId(null);

        } catch (error) {
            console.error("Error updating item:", error);
            toast.error("Failed to update the item");
        }
    };
    
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
                    <input type="file" name="img" placeholder="img of the item" 
                           onChange={handleUpload} className="input"/>
                    {formData.img && (
                        <img
                            src={`/api/images/${formData.img}`}
                            alt="Feltöltött kép"
                            style={{ maxWidth: "200px", marginTop: "10px" }}
                        />
                    )}
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
                    <input type="file" name="img"  placeholder="item img..."
                           onChange={handleUpload}/>
                    {formData.img && (
                        <img
                            src={`/api/images/${formData.img}`}
                            alt="Feltöltött kép"
                            style={{ maxWidth: "200px", marginTop: "10px" }}
                        />
                    )}
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