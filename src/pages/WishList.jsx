import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishList } from '../redux/slices/wishListSLice';
import { useNavigate } from 'react-router-dom';
import AddToCart from '../components/AddToCart';
import authService from '../services/authService';

function WishList() {
    const wishItems = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = authService.getCurrentUser();
    // const alerted = useRef(false);

    // if (!user && !alerted.current) {
    //     alert('Please login!');
    //     alerted.current = true;
    //     navigate('/login');
    // }
    if (wishItems.length === 0)
        return <h1 style={{ color: 'red' }}>Start adding items to your Wish List!</h1>;
    const handleClick = (product) => {
        navigate(`/products/${product.category}/${product.id}`);
    };
    return (
        <>
            <h2 style={{ color: 'SlateBlue' }}>Welcome to your Wish List!</h2>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
            }}>
                {wishItems.map(item => (
                    <div className="productButton" onClick={(e) => handleClick(item)} key={item.id}>
                        <img src={item.thumbnail} alt={item.title}></img>
                        <h3 style={{ color: 'red', fontSize: 'max(18px,1.8vw)' }}>{item.title}</h3>
                        <p>${item.price}</p>
                        <AddToCart alert={true} product={item} />
                        <button onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removeFromWishList(item.id));
                        }} className="addToWishListButton">💔</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default WishList;