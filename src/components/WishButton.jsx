import {useSelector} from 'react-redux';

function WishButton(){
    const wishItems=useSelector(state=>state.wishlist.items);
    const itemCount=wishItems.length;
    return(
        <>
        <button className="wishButton">
            <img src="/wishList.svg" alt="WishList" style={{
                height:'30px',
                width:'40px',
            }}></img>
            <p style={{
                textDecoration:'none',
                fontSize:'1rem',
            }}>Wishlist ({itemCount})</p>
        </button>
        </>
    );
}

export default WishButton;