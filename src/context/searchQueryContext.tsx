import React, { createContext, useContext, useState } from "react";

// Define the shape of your context
interface SearchQueryContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const SearchQueryContext = createContext<SearchQueryContextType | undefined>(
  undefined
);

// Custom hook to use the SearchQueryContext
export const useSearchQuery = () => {
  const context = useContext(SearchQueryContext);
  if (!context) {
    throw new Error("useSearchQuery must be used within a SearchQueryProvider");
  }
  return context;
};

// Provider component for the SearchQueryContext
const SearchQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export default SearchQueryProvider;
