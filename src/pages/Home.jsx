// Now we would have to display the categories in the home page
// So we would have fetch each category from a dummyapi 
// Now fetch all those categories and display them as clickable buttons

// useNavigate is a React Router hook that lets you programmatically navigate to a different route in your app.

import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CategoryItem from '../components/CategoryItem.jsx';

function Home(){
    const [categories, setCategories]=useState([]);
    const navigate=useNavigate();

    // Use useEffect to fetch your api data
    useEffect(()=>{
        fetch('https://dummyjson.com/products/categories')
        .then(res=>res.json())
        .then(data=>setCategories(data))
        .catch(console.error);
    }, []); 
    // Without [], it runs on every render, causing an infinite fetch loop.
    
    const handleClick=(category)=>{
        navigate(`/products/${category}`);
    }

    return(
        <div>
            <h2 style={{color:'red', fontSize:'2rem'}}>Categories</h2>
            <div className="categoriesContainer">
                {categories.map(i => (
                    <CategoryItem name={i.name} onClick={()=>handleClick(i.slug)} key={i.slug}/>
                ))}
            </div>
        </div>
    );
}

export default Home;