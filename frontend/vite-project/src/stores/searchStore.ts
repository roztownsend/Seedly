import { create } from "zustand";
import axios from "axios";
import { ProductItem } from "./productsStore";

type SearchState = {
    query: string;
    submittedQuery: string;
    results: ProductItem[];
    loading: boolean;
    actions: SearchActions;
};


type SearchActions = {
    setQuery: (query: string) => void;
    search: () => Promise<any[]>;
};

export const useSearchStore = create<SearchState>((set, get) => ({
    query: "",
    submittedQuery: "",
    results: [],
    loading: false,
    actions: {
        setQuery: (query: string) => set({ query }),
        search: async () => {
            const { query } = get();
            if (!query) return [];
            set({ loading: true, submittedQuery: query });
            try {
                const response = await axios.get(`http://localhost:5001/plants/search?name=${encodeURIComponent(query)}`);
                const data = response.data.data;
                set({ results: data, loading: false });
                console.log("New search Zustand Store:", response.data.data);
                return data;
            } catch (error) {
                console.error("Search error", error);
                set({ results: [], loading: false });
                return [];
            }
        }
    }
}));



export const useSearchQuery = () => useSearchStore((state) => state.query);

export const useSubmittedQuery = () => useSearchStore((state) => state.submittedQuery);

export const useSearchLoading = () => useSearchStore((state) => state.loading);

export const useSearchResults = () => useSearchStore((state) => state.results);

export const useSearchActions = () => useSearchStore((state) => state.actions)