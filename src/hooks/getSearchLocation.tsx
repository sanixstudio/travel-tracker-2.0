import { useState, useEffect } from "react";

const useMapboxSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState([]); // Adjust type accordingly
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/search/searchbox/v1/retrieve/${
            import.meta.env.VITE_MAP_BOX_ID
          }?session_token=[GENERATED-UUID]&access_token=${
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

    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return { searchResults, loading, error };
};

export default useMapboxSearch;
