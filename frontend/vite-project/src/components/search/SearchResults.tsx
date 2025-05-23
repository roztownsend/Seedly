import { useEffect } from "react";
import { useSearch, useSearchStore } from "../../stores/searchStore";
import ProductGrid from "../product-grid/ProductGrid"
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";
import "./searchResults.css";

export const SearchResults: React.FC = () => {
    // const { query, loading, results } = useSearch();
    const query = useSearchStore((state) => state.query);
    const loading = useSearchStore((state) => state.loading);
    const results = useSearchStore((state) => state.results);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Search Results from component:", { query, results }); 
        if (!loading && results.length === 0) {
            navigate("/")
        }
    }, [results, loading, navigate]);

    if (loading) return <Loading />;
    if (!results.length) return <p>No results for {query}.</p>

    return (
        <section className="search-results">
            <ProductGrid products={results} />
            <div className="search-results__end">
                That's all for <strong>{query}</strong>. Check out our <Link to="/seeds" className="text-link-primary">assortment of seeds</Link>{" "} for more.
            </div>
        </section>
    )
};