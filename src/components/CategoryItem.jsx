function CategoryItem({name, onClick}){
    return (
        <button className="categoryButton" onClick={onClick} style={{ display: 'block', margin: '8px 0' }}>
            {name}
        </button>
    );
}

export default CategoryItem;