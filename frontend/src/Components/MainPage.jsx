import {useNavigate} from "react-router-dom";
import MainPageComponent from "./MainPageComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
export default function MainPage ()
{
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    return (
        <div>
            <h1>
                <HeaderComponent/>
                <MainPageComponent/>
            </h1>
            <button onClick={handleLogOut}>Logout</button>
            
        </div>

    )
}