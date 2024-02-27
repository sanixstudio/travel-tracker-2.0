import { useState, useEffect, Key } from "react";

interface Feature {
  long: number;
  lat: number;
  id: Key | null | undefined;
}

const useGetSuggestions = (query: string) => {
  const [searchResults, setSearchResults] = useState<Feature[]>([]);
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
        setSearchResults(data.features);
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
