import logophoto from "../Images/instaworking.png"
import logophoto3 from "../Images/freal.png"
import logophoto4 from "../Images/vingreenreal.png"
export default function HeaderComponent ({ setFilter })
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
    
    const handleSearchChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    }
    
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
                </div>
                <h1 className="headertitle">Hand Crafted WebShop</h1>
            </nav>
        </header>
    )
}