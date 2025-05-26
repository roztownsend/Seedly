import { useSearchQuery, useSearchLoading, useSearchResults } from "../../stores/searchStore";
import ProductGrid from "../product-grid/ProductGrid"
import { Link } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";
import { Loading } from "../../components/loading/Loading";
import { useSyncedQuery } from "../../hooks/useSyncedQuery";
import "./searchResults.css";

export const SearchResults: React.FC = () => {
    useSyncedQuery();
    const query = useSearchQuery();
    const loading = useSearchLoading();
    const results = useSearchResults();

    if (loading) return <Loading />;
    if (!results.length) 
        return (
            <section className="search-results not-found-state">
                <FaRegSadTear className="state-icon" />
                <p className="status-text">No results for <strong>{query}</strong>. <br />
                Try changing your query and searching again, or check out our <Link to="/seeds" className="text-link-primary">assortment of seeds</Link>{" "} instead.</p>
            </section>
    );

    return (
        <section className="search-results">
            <ProductGrid products={results} />
            <div className="search-results__end">
                That's all for <strong>{query}</strong>. Check out our <Link to="/seeds" className="text-link-primary">assortment of seeds</Link>{" "} for more.
            </div>
        </section>
    )
};