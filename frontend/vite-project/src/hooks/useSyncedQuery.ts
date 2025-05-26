import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchQuery, useSearchActions } from "../stores/searchStore";

export const useSyncedQuery = () => {
    const [params] = useSearchParams();
    const urlQuery = params.get("name") || "";
    const query = useSearchQuery();
    const { setQuery, search } = useSearchActions();

    useEffect(() => {
        if (urlQuery && urlQuery !== query) {
            setQuery(urlQuery);
            search();
        }
    }, [urlQuery, query, setQuery, search]);
};

