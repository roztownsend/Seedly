

const ProductSorter: React.FC = () => {
    return (
        <select className="dropdown" name="sort" id="">
            <option value="price">Price (low to high)</option>
            <option value="price">Price (high to low)</option>
            <option value="alphabetical">Product Name (A-Z)</option>
        </select>
    )
};



export default ProductSorter;