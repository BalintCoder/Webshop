import kep from "../Images/kepremove.png";
import kep4 from "../Images/kep4removed.png";
import kep3 from "../Images/kep3remove.png";
import kep5 from "../Images/kep5remove.png";
import kep6 from "../Images/kep6.png";
import kep7 from "../Images/kep7.png";
import kep8 from "../Images/new.png";
import kep9 from "../Images/necknew.png";
import kep10 from "../Images/freakingnew.png";
import kep11 from "../Images/neckagain.png";
import kep12 from "../Images/flowernew.png";
import kep13 from "../Images/newagain.png";
import kep14 from "../Images/pairnew.png";
import kep15 from "../Images/thatsnew.png";

export default function ItemDetailsImage ({itemName})
{
    const imageMap = {
        "Ear Shellring": kep,
        "Flowerous Pendant": kep4,
        "Mistirous Pendant": kep3,
        "The West": kep5,
        "The Mariposa": kep6,
        "The BlackPansy": kep7,
        "The Cherry": kep8,
        "The NeckParade": kep9,
        "The Evolved": kep10,
        "The Elegance": kep11,
        "The LonelyBoss": kep12,
        "The Little Intoxication": kep13,
        "The Pair": kep14,
        "The BlackBelt": kep15,
    };

    const imageSrc = imageMap[itemName];
    return imageSrc ? (
        <img src={imageSrc} alt={itemName} className="item-image2" />
    ) : null;
    
    
}