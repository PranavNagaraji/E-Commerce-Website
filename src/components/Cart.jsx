import {useSelector} from 'react-redux';

function Cart(){
    const cartItems=useSelector(state=>state.cart.items);
    const uniqueItemsInCart=cartItems.length;
    return (
        <>
        <button className="cartButton">
            <img src="/cart.svg" alt="Cart" style={{
                height:'30px',
                width:'40px',
            }}></img>
            <p style={{
                textDecoration:'none',
                fontSize:'1rem',
            }}>Cart ({uniqueItemsInCart})</p>
        </button>
        </>
    );
}
export default Cart;