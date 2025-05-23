import { create } from "zustand";
import axios from "axios";
import { ProductItem } from "./productsStore";

type SearchState = {
    query: string;
    results: ProductItem[];
    loading: boolean;
    setQuery: (query: string) => void;
    search: () => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
    query: "",
    results: [],
    loading: false,
    setQuery: (query) => set({ query }),
    search: async () => {
        const query = get().query;
        if (!query) return;
        set({ loading: true });
        try {
            const response = await axios.get(`http://localhost:5000/plants/search?name=${encodeURIComponent(query)}`);
            set({ results: response.data.data, loading: false });
            console.log("New search Zustand Store:", response.data.data)
        } catch (error) {
            console.error("Search error", error);
            set({ results: [], loading: false });
        }
    }
}));

export const useSearch = () => {
  const query = useSearchStore((state) => state.query);
  const loading = useSearchStore((state) => state.loading);
  const results = useSearchStore((state) => state.results);
  const setQuery = useSearchStore((state) => state.setQuery);
  const search = useSearchStore((state) => state.search);

  return { query, results, loading, setQuery, search };
};
