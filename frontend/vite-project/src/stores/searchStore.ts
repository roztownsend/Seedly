import { create } from "zustand";
import axios from "axios";

type SearchResult = {
    id: string;
    name: string;
}

type SearchState = {
    query: string;
    results: SearchResult[];
    setQuery: (query: string) => void;
    search: () => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
    query: "",
    results: [],
    setQuery: (query) => set({ query }),
    search: async () => {
        const query = get().query;
        if (!query) return;
        try {
            const response = await axios.get(`http://localhost:5000/plants/search?name=${encodeURIComponent(query)}`);
            set({ results: response.data });
            console.log("New search Zustand Store:", response.data)
        } catch (error) {
            console.error("Search error", error);
            set({ results: [] });
        }
    }
}))

export const useSearch = () => {
  const query = useSearchStore((state) => state.query);
  const results = useSearchStore((state) => state.results);
  const setQuery = useSearchStore((state) => state.setQuery);
  const search = useSearchStore((state) => state.search);

  return { query, results, setQuery, search };
};
