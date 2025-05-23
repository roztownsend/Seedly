import { useEffect } from "react";
import { useSearch } from "../../stores/searchStore";
import ProductGrid from "../product-grid/ProductGrid"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const SearchResults: React.FC = () => {
    const { query, results } = useSearch();
    const navigate = useNavigate();

    console.log("Search Results from component:", { query, results }); 

    useEffect(() => {
        if (!results.length) {
            navigate("/")
        }
    }, [results, navigate]);

    return (
        <section className="search-results">
            <ProductGrid products={results} />
            <div className="search-results__end">That's all for {query}. Check out our <Link to="/seeds" className="text-link-primary">assortment of seeds</Link>{" "} for more.</div>
        </section>
    )
};