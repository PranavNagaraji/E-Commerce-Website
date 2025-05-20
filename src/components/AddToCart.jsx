import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

function AddToCart({ product, alert: showAlert }) {
    const dispatch = useDispatch();
    return (
        <>
        <button onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
            if (showAlert)
                alert(`You have succesfully added a "${product.title}" into your cart!`);
        }}
            className="addToCartButton">
            <img src="/basket.svg" style={{height:'15px'}}></img>
        </button>
        </>
    );
}

export default AddToCart;