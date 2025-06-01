import { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "../card-component/ProductCard";
import useIsMobile from "../../hooks/useIsMobile";
import "./productGrid.css";
import { ProductItem } from "../../stores/productsStore";
import { memo } from "react";
import { useProductGridStore } from "../../stores/productGridStore"; 

type ProductGridProps = {
  products: ProductItem[];
  filterEdibleOnly?: boolean;
};


const ProductGrid = ({ products }: ProductGridProps) => {
    const [displayedPlants, setDisplayedPlants] = useState<ProductItem[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false);

    const lastItemRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();
    const loadStep = isMobile ? 3 : 8;

    // Zustand store
    const { displayedCount, setDisplayedCount } = useProductGridStore();

    //Filter isEdible
    const edibleProducts = useMemo(
        () => products.filter(product => product.isedible === true),
        [products]
    );

    useEffect(() => {
        const initialCount = displayedCount > 0 ? displayedCount : loadStep;
        const initial = edibleProducts.slice(0, initialCount);
        setDisplayedPlants(initial);
        setShowMore(edibleProducts.length > initialCount);
    }, [edibleProducts, loadStep, displayedCount]);


    const handleShowMore = () => {
        const nextCount = displayedPlants.length + loadStep;
        const next = edibleProducts.slice(0, nextCount);
        setDisplayedPlants(next);
        setShowMore(next.length < edibleProducts.length);
        setDisplayedCount(next.length);

        setTimeout(() => {
            if (lastItemRef.current) {
                const rect = lastItemRef.current.getBoundingClientRect();
                const scrollY = window.scrollY + rect.top - 100;
                window.scrollTo({ top: scrollY, behavior: "smooth" });
            }
        }, 300);
    };

if (!edibleProducts.length) return <p>No edible products found.</p>;

return (
    <div className="product-grid">
        <div className="cards-container">
            {displayedPlants.map((plant, idx) => (
                <div
                    key={plant.id}
                    className="card-item"
                    ref={idx === displayedPlants.length - 1 ? lastItemRef : null}
                >
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
