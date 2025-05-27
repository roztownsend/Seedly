import { useEffect, useState } from "react";
import ProductCard from "../card-component/ProductCard";
import useIsMobile from "../../hooks/useIsMobile";
import "./productGrid.css";
import { ProductItem } from "../../stores/productsStore";
import { memo } from "react";
type ProductGridProps = {
    products: ProductItem[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
    const [displayedPlants, setDisplayedPlants] = useState<ProductItem[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false);

//check if mobile and load numbers of cards accordingly
  const isMobile = useIsMobile();
  const loadStep = isMobile ? 3 : 8;

  useEffect(() => {
    if (products.length > 0) {
      const initial = products.slice(0, loadStep);
      setDisplayedPlants(initial);
      setShowMore(products.length > loadStep);
    }
  }, [products, loadStep]);

  const handleShowMore = () => {
    const next = products.slice(0, displayedPlants.length + loadStep);
    setDisplayedPlants(next);
    setShowMore(next.length < products.length);
  };

  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="product-grid">
        <div className="cards-container">
          {displayedPlants.map((plant) => (
            <div key={plant.id} className="card-item">
              <ProductCard item={plant} />
            </div>
          ))}
        </div>

      {showMore && (
        <div className="button-container">
          <button onClick={handleShowMore} className="button-primary">
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(ProductGrid);
