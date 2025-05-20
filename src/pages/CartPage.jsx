import {useDispatch, useSelector} from 'react-redux';
import {removeFromCart, addToCart} from '../redux/slices/cartSlice';
import {useNavigate} from 'react-router-dom';

function CartPage(){
    const cartItems=useSelector(state=>state.cart.items);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    if(cartItems.length===0){
        return (
            <>
                <h1 style={{color:'red'}}>Your Cart is empty!</h1>
            </>
        );
    }
    const handleClick=(product)=>{
        navigate(`/products/${product.category}/${product.id}`);
    }
    const subTotal=cartItems.reduce((total, item)=>total+item.quantity*item.price,0);
    const tax=(subTotal/100*8);
    const discount=((subTotal+tax)/100*5);
    const total=subTotal+tax-discount;
    return (
        <>
        <h2 style={{color:'SlateBlue'}}>Welcome to your shopping Cart!</h2>
        <div style={{
            display:'flex',
            alignItems: 'flex-start',
            gap: '20px'
        }}>
            <div style={{
            alignSelf: 'flex-start',
            marginLeft: '40px',
            minWidth: '250px',
            border: '2px solid #ccc',
            padding: '15px',
            fontSize: '1.2rem',
            position: 'sticky',
            top: '140px',
            color:'#777'
        }}>
            <h2>Summary</h2>
            <div style={{display:'flex', justifyContent:'space-around'}}>
                <div>
                    <p>Sub-Total</p>
                    <p>Tax</p>
                    <p style={{color:'green'}}>Discount</p>
                    <p style={{color:'#222'}}>Total</p>
                </div>
                <div>
                    <p>${subTotal.toFixed(2)}</p>
                    <p>${tax.toFixed(2)}</p>
                    <p style={{color:'green'}}>${discount.toFixed(2)}</p>
                    <p style={{color:'#222'}}>${total.toFixed(2)}</p>
                </div>
            </div>
        </div>
        <div style={{
            display:'flex',
            flexWrap:'wrap',
            gap:'20px',
            justifyContent:'center',
        }}>
        {cartItems.map(item=>(
            <div className="productButton" onClick={(e)=>handleClick(item)} key={item.id}>
            <img src={item.thumbnail} alt={item.title}></img>
            <h3 style={{ color: 'red', fontSize:'max(18px,1.8vw)' }}>{item.title}</h3>
            <p>${item.price}</p>
            <div style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <button onClick={(e)=>{
                    e.stopPropagation;
                    dispatch(removeFromCart(item));
                }} 
                className="plusMinusBtns">
                    -</button>
                <div onClick={(e)=>e.stopPropagation()} style={{backgroundColor:'#fff'}} className="plusMinusBtns">
                    {item.quantity}</div>
                <button onClick={(e)=>{
                    e.stopPropagation();
                    dispatch(addToCart(item))
                }} className="plusMinusBtns">
                    +</button>
            </div>
            </div>
        ))}
        </div>
        
        </div>
        </>
    );
};
export default CartPage;