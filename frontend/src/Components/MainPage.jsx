import {useNavigate} from "react-router-dom";
import MainPageComponent from "./MainPageComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import {useState} from "react";
export default function MainPage ()
{
    
    const[filter, setFilter] = useState("");
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <div>
            <h1>
                <HeaderComponent setFilter={setFilter} />
                <MainPageComponent filter={filter}/>
            </h1>
            <button onClick={handleLogOut}>Logout</button>
            
        </div>

    )
}