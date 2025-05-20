import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToWishList } from '../redux/slices/wishListSLice';
import authService from '../services/authService';

function AddToWishList({ product }) {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const user = authService.getCurrentUser();
    const alerted = useRef(false);

    const handleClick = (e) => {
        e.stopPropagation();
        if (!user && !alerted.current) {    
            alert('Please login!');
            alerted.current = true;
            navigate('/login');
            return;
        }
        dispatch(addToWishList(product));
    };

    return (
        <>
            <button onClick={handleClick} className="addToWishListButton">
                <div>❤️</div>
            </button>
        </>
    );
}

export default AddToWishList;