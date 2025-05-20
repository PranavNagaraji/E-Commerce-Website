import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddToCart from '../components/AddToCart.jsx';
import AddToWishList from '../components/AddToWishList.jsx';

function ProductList() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res => res.json())
            .then(data => setProducts(data.products))
            .catch(console.error);
    }, []);
    const handleClick = (productId) => {
        navigate(`/products/${category}/${productId}`);
    };
    return (
        <div>
            <h2 style={{color:'green'}}>{category}</h2>
            <div className="productContainer">
                {products.map(product => (
                    <div className="productButton" key={product.id} onClick={() => handleClick(product.id)}>
                        <img src={product.thumbnail} alt={product.title}></img>
                        <h3 style={{ color: 'red', fontSize:'max(18px,1.8vw)' }}>{product.title}</h3>
                        <p>${product.price}</p>
                        <AddToCart alert={true} product={product}/>
                        <AddToWishList product={product}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;