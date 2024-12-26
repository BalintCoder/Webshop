import { useLocation } from "react-router-dom";

const ItemDetails = () => {
    const { state } = useLocation();
    const { item } = state || {};  // The item passed via navigate

    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <div>
            <h1>{item.name}</h1>
            <p>Weight: {item.weight}g</p>
            <p>Material: {item.madeOf}</p>
            <p>Price: {item.price} Ft</p>
        </div>
    );
};

export default ItemDetails;