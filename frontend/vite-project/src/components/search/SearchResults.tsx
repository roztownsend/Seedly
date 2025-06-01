import { useSubmittedQuery, useSearchLoading, useSearchResults } from "../../stores/searchStore";
import ProductGrid from "../product-grid/ProductGrid"
import { Link } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";
import { Loading } from "../../components/loading/Loading";
import { useSyncedQuery } from "../../hooks/useSyncedQuery";
import "./searchResults.css";

export const SearchResults: React.FC = () => {
    useSyncedQuery();
    const query = useSubmittedQuery();
    const loading = useSearchLoading();
    const results = useSearchResults();

    if (loading) return <Loading />;
    if (!loading && !results.length && !query.trim()) return null;
    if (!results.length) 
        return (
            <section className="search-results not-found-state">
                <FaRegSadTear className="state-icon" />
                <p className="status-text">No results for <strong>{query}</strong>. <br />
                Try changing your query and searching again, or check out our <Link to="/shop" className="text-link-primary">assortment of seeds</Link>{" "} instead.</p>
            </section>
    );

    return (
        <section className="search-results">
            <h1>Results for {query}</h1>
            <ProductGrid products={results} />
            <div className="search-results__end">
                That's all for <strong>{query}</strong>. Check out our <Link to="/shop" className="text-link-primary">assortment of seeds</Link>{" "} for more.
            </div>
        </section>
    )
};