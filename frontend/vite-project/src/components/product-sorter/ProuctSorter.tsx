import { ProductItem, FetchAllPlantsResponse, useProductActions } from "../../stores/productsStore";

const ProductSorter = ({ data }: FetchAllPlantsResponse) => {
    const { updateProductList } = useProductActions();


    const lowHigh: () => void = () => {
        const sortedLow: ProductItem[] = data.sort((a, b) => a.price - b.price);
        updateProductList([...sortedLow]);
    };

    const highLow: () => void = () => {
        const sortedHigh: ProductItem[] = data.sort((a, b) => b.price - a.price);
        updateProductList([...sortedHigh]);
    };

    const alphabetical: () => void = () => {
        const alphaCollator: Intl.Collator = new Intl.Collator("en");
        const sortedAlpha = data.sort((a,b) => alphaCollator.compare(a.product_name, b.product_name));
        updateProductList([...sortedAlpha]);
    };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    switch(value) {
        case "price-high":
            lowHigh();
            break;
        case "price-low":
            highLow();
            break;
        case "alphabetical":
            alphabetical();
            break;
    }
}
    return (
        <select className="dropdown" onChange={handleChange} name="sorter" id="sorter">
            <option value="price-low">Price (low to high)</option>
            <option value="price-high">Price (high to low)</option>
            <option value="alphabetical">Product Name (A-Z)</option>
        </select>
    )
};

export default ProductSorter;