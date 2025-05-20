import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddToCart from '../components/AddToCart.jsx';
import AddToWishList from '../components/AddToWishList.jsx';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProduct(data)
            })
            .catch(console.error);
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3vw', color: 'green' }}>{product.title}</h2>
            <img src={product.thumbnail} alt={product.title} style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
            <p style={{ fontSize: '1.2rem' }}>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Rating:</strong> {product.rating}/5⭐</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <AddToCart alert={true} product={product} />
            <AddToWishList product={product}/>
        </div>
    );
}

export default ProductDetails;