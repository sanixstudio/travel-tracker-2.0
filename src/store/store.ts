import { create } from "zustand";

// Define the shape of your combined store
export interface StoreState {
  flyToLocation: { lat: number; lng: number };
  pinLocation: { lat: number; lng: number };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setFlyToLocation: (lat: number, lng: number) => void;
  setPinLocation: (lat: number, lng: number) => void;
}

// Create the Zustand store
export const useStore = create<StoreState>((set) => ({
  flyToLocation: { lat: 0, lng: 0 },
  pinLocation: { lat: 0, lng: 0 },
  searchQuery: "Hi",

  setFlyToLocation: (lat: number, lng: number) =>
    set({ flyToLocation: { lat, lng } }),
  setPinLocation: (lat: number, lng: number) =>
    set({ pinLocation: { lat, lng } }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));

// Export custom hooks to access the store values
export const useFlyToLocation = () => useStore((state) => state.flyToLocation);
export const useSetFlyToLocation = () =>
  useStore((state) => state.setFlyToLocation);

export const usePinLocation = () => useStore((state) => state.pinLocation);
export const useSetPinLocation = () =>
  useStore((state) => state.setPinLocation);

export const useSearchQuery = () => useStore((state) => state.searchQuery);
export const useSetSearchQuery = () =>
  useStore((state) => state.setSearchQuery);
