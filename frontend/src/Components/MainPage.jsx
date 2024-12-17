import {useNavigate} from "react-router-dom";

export default function MainPage ()
{
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    return (
        <div>
            <h1>This is the main page</h1>
            <button onClick={handleLogOut}>Logout</button>
        </div>

    )
}