import React, { createContext, useContext, useState } from "react";

const FlyToLocationContext = createContext<{
  flyToLocation: { lat: number; lng: number };
  setFlyToLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
}>({
  flyToLocation: { lat: 0, lng: 0 },
  setFlyToLocation: () => {},
});

export const FlyToLocationProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [flyToLocation, setFlyToLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });

  return (
    <FlyToLocationContext.Provider value={{ flyToLocation, setFlyToLocation }}>
      {children}
    </FlyToLocationContext.Provider>
  );
};

export const useFlyToLocationContext = () => useContext(FlyToLocationContext);
