import logophoto from "../Images/instaworking.png"
import logophoto3 from "../Images/freal.png"
import logophoto4 from "../Images/vingreenreal.png"
import cart from "../Images/cart.png";
import {useEffect, useState} from "react";
import CartModal from "./CartModal.jsx";
export default function HeaderComponent ({ setFilter })
{
    const [isCartOpen, setIsCartOpen] = useState(false);

    const goToInsta = () => {
        window.open("https://www.instagram.com/", "_blank");
    };
    const goToFacebook = () => {
        window.open("https://www.facebook.com//", "_blank");
    };
    const goToVinted = () => {
        window.open("https://www.vinted.hu/", "_blank");
    };
    
    const handleSearchChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    }

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            
            document.body.style.overflow = "auto";
        }
        
    }, [isCartOpen]);
    
    return (
        <header className="header">
            
            <nav>
                <div className= "searchbarholder">
                    <input type={"search"}
                    placeholder="Search: earring, medal"
                    onChange={handleSearchChange}/>
                </div>
                <div className="logodiv">
                    <img src={logophoto} alt="Logo" className="i" onClick={goToInsta}/>
                    <img src={logophoto3} alt="Logo3" className="f" onClick={goToFacebook}/>
                    <img src={logophoto4} alt="Logo3" className="v" onClick={goToVinted}/>
                    <img src={cart} onClick={() => setIsCartOpen(true)} className="Cart-icon-main" alt="Cart"/>
                </div>
                <h1 className="headertitle">Hand Crafted WebShop</h1>
                <div className="cart-modal">
                <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                </div>
            </nav>
        </header>
    )
}