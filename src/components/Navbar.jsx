import {Routes, Route, Link} from 'react-router-dom';
import Cart from './Cart.jsx';
import WishButton from './WishButton.jsx';
import LoginButton from './LoginButton.jsx';

function Navbar(){
    return(
        <nav className="Navbar">
            <div style={{ 
            padding: '10px', 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textDecoration:'none',
            }}>
                <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
                    Home
                </Link>
            </div>
            <div style={{
                display:'flex',
                gap:'4px'
            }}>
                <Link to="/login"><LoginButton/></Link>
                <Link to="/wishlist"><WishButton/></Link>
                <Link to="/cart"><Cart/></Link>
            </div>
        </nav>
    )
}

export default Navbar;