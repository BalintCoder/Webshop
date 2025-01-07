import logophoto from "../Images/instaworking.png"
import logophoto2 from "../Images/facebookworking.png"
import logophoto3 from "../Images/freal.png"
import logophoto4 from "../Images/vingreenreal.png"
import { useNavigate } from "react-router-dom";
export default function HeaderComponent ()
{


    const goToInsta = () => {
        window.open("https://www.instagram.com/gardosbalint/", "_blank");
    };
    const goToFacebook = () => {
        window.open("https://www.facebook.com/balint.gardos/", "_blank");
    };
    const goToVinted = () => {
        window.open("https://www.vinted.hu/member/122433559", "_blank");
    };
    
    
    return (
        <header className="header">
            
            <nav>
                <div className="logodiv">
                    <img src={logophoto} alt="Logo" className="i" onClick={goToInsta}/>
                    <img src={logophoto3} alt="Logo3" className="f" onClick={goToFacebook}/>
                    <img src={logophoto4} alt="Logo3" className="v" onClick={goToVinted}/>
                </div>
                <h1 className="headertitle">Hand Crafted WebShop</h1>
            </nav>
        </header>
    )
}