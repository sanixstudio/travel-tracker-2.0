import { useState, useEffect } from "react";

const useGetLocation = (query: string) => {
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async (mapbox_id: string) => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapbox_id}?session_token=[GENERATED-UUID]&access_token=${
            import.meta.env.VITE_MAP_BOX_TOKEN
          }`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSearchResults(data.features[0].geometry.coordinates);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message); // Explicitly cast error to Error type
        setLoading(false);
      }
    };

    fetchSearchResults(query)
  }, [query]);

  return { searchResults, loading, error };
};

export default useGetLocation;
