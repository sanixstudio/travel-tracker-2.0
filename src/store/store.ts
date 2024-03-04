import { create } from "zustand";

// Define the shape of your combined store
export interface StoreState {
  flyToLocation: { lng: number; lat: number };
  pinLocation: { lng: number; lat: number };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setFlyToLocation: (lng: number, lat: number) => void;
  setPinLocation: (lng: number, lat: number) => void;
  showPins: boolean;
  setShowPins: (show: boolean) => void;
  pointerLocation: { lng: number; lat: number };
  setPointerLocation: (lng: number, lat: number) => void;
}

// Create the Zustand store
export const useStore = create<StoreState>((set) => ({
  flyToLocation: { lng: 37, lat: 122 },
  pinLocation: { lng: 0, lat: 0 },
  searchQuery: "",
  pointerLocation: { lng: 0, lat: 0 },

  setFlyToLocation: (lng: number, lat: number) =>
    set({ flyToLocation: { lng, lat } }),

  setPinLocation: (lng: number, lat: number) =>
    set({ pinLocation: { lng, lat } }),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  showPins: true, // or false if you want pins to be hidden by default
  setShowPins: (show: boolean) => set({ showPins: show }),

  setPointerLocation: (lng: number, lat: number) =>
    set({ pointerLocation: { lng, lat } }),
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

export const useShowPins = () => useStore((state) => state.showPins);
export const useSetShowPins = () => useStore((state) => state.setShowPins);

export const usePointerLocation = () =>
  useStore((state) => state.pointerLocation);
export const useSetPointerLocation = () =>
  useStore((state) => state.setPointerLocation);
