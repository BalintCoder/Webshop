
export default function MainItemImage({ img }) {
    return (
        <img
            src={`/api/images/${img}`}
            alt="Item Image"
            className="item-image2"
        />
    );
}