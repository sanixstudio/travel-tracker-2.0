import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface PinInterface {
  lng: number;
  lat: number;
}

interface PinLocationContextType {
  pinLocation: PinInterface;
  setPinLocation: Dispatch<SetStateAction<PinInterface>>;
}

// Create the context
const PinLocationContext = createContext<PinLocationContextType | undefined>(
  undefined
);

// Custom hook to use the PinLocationContext
export const usePinLocationContext = () => {
  const context = useContext(PinLocationContext);
  if (!context) {
    throw new Error(
      "usePinLocationContext must be used within a PinLocationProvider"
    );
  }
  return context;
};

// Provider component for the PinLocationContext
const PinLocationProvider = ({ children }: { children: JSX.Element }) => {
  const [pinLocation, setPinLocation] = useState<PinInterface>({
    lat: 0,
    lng: 0,
  });

  return (
    <PinLocationContext.Provider value={{ pinLocation, setPinLocation }}>
      {children}
    </PinLocationContext.Provider>
  );
};

export default PinLocationProvider;
