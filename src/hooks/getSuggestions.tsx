import { useState, useEffect } from "react";

const useGetSuggestions = (query: string) => {
  const [searchResults, setSearchResults] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async (query: string) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&language=en&session_token=[GENERATED-UUID]&access_token=${
            import.meta.env.VITE_MAP_BOX_TOKEN
          }`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSearchResults(data.suggestions[1].mapbox_id);
      } catch (error) {
        setError((error as Error).message); // Explicitly cast error to Error type
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults(query);
  }, [query]);

  return { searchResults, loading, error };
};

export default useGetSuggestions;
