import { useEffect, useRef, useState } from "react";
import { HeroProps } from "../../types/types";
import {
  ProductItem,
  useProductList,
  useProductActions,
} from "../../stores/productsStore";
import ProductCard from "../card-component/ProductCard";
import Hero from "../hero/Hero";
import useIsMobile from "../../hooks/useIsMobile";
import "./gridHome.css";

const GridHome = ({ heading, subheading }: HeroProps) => {
  const productList = useProductList();
  const { fetchAllPlants } = useProductActions();
  const [displayedPlants, setDisplayedPlants] = useState<ProductItem[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // Check if the screen is mobile or not
  const isMobile = useIsMobile();

  /* Number of pic to load based on screen size (mobile or desktop) */
  const loadStep = isMobile ? 3 : 8;

  const lastItemRef = useRef<HTMLDivElement>(null);

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
      const minToShow = Math.max(displayedPlants.length, loadStep);
      const initial = productList.slice(0, minToShow);
      setDisplayedPlants(initial);
      setShowMore(productList.length > initial.length);
    }
  }, [productList, loadStep, loading]);

  const handleShowMore = () => {
    const next = productList.slice(0, displayedPlants.length + loadStep);
    setDisplayedPlants(next);
    setShowMore(next.length < productList.length);

    setTimeout(() => {
      if (lastItemRef.current) {
        const rect = lastItemRef.current.getBoundingClientRect();
        const scrollY = window.scrollY + rect.top - 100;
        window.scrollTo({ top: scrollY, behavior: "smooth" });
      }
      setLoadingMore(false);
    }, 300);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid-home">
      <Hero heading={heading} subheading={subheading} />
      <section>
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
      </section>

      {showMore && (
        <div className="button-container">
          <button
            onClick={handleShowMore}
            className="button-primary"
            disabled={loadingMore} // Desabilita botão enquanto carrega
          >
            {loadingMore ? "Loading..." : "Show More"} {/* Feedback no botão */}
          </button>
        </div>
      )}
    </div>
  );
};

export default GridHome;
