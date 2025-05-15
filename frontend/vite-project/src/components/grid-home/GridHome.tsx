import { useEffect, useState } from "react";
import { HeroProps } from "../../types/types";
import { ProductItem, useProductsStore } from "../../stores/productsStore";
import ProductCard from "../card-component/ProductCard";
import Hero from "../hero/Hero";
import useIsMobile from "../../hooks/useIsMobile";
import "./gridHome.css";

const GridHome = ({ heading, subheading }: HeroProps) => {
  const { productList, fetchAllPlants } = useProductsStore();
  const [displayedPlants, setDisplayedPlants] = useState<ProductItem[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if the screen is mobile or not
  const isMobile = useIsMobile();

  /* Number of pic to load based on screen size (mobile or desktop) */
  const loadStep = isMobile ? 3 : 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchAllPlants();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchAllPlants]);

  // Set the initial displayed plants and show more button
  useEffect(() => {
    if (!loading && productList.length > 0) {
      const initial = productList.slice(0, loadStep);{/* Load the first 3 or 8 plants based on screen size */ }
      setDisplayedPlants(initial);
      setShowMore(productList.length > loadStep);
    }
  }, [productList, loadStep, loading]);

  const handleShowMore = () => {
    const next = productList.slice(0, displayedPlants.length + loadStep);
    setDisplayedPlants(next);
    setShowMore(next.length < productList.length);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid-home">
      <Hero heading={heading} subheading={subheading} />
      <section>
        <div className="cards-container">
          {displayedPlants.map((plant) => (
            <div key={plant.id} className="card-item">
              <ProductCard item={plant} />
            </div>
          ))}
        </div>
      </section>

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

export default GridHome;
