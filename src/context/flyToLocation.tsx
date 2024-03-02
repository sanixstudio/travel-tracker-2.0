import React, { createContext, useContext, useState } from "react";

const FlyToLocationContext = createContext<{
  flyToLocation: { lng: number; lat: number };
  setFlyToLocation: React.Dispatch<
    React.SetStateAction<{ lng: number; lat: number }>
  >;
}>({
  flyToLocation: { lng: 0, lat: 0 },
  setFlyToLocation: () => {},
});

export const FlyToLocationProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [flyToLocation, setFlyToLocation] = useState<{
    lng: number;
    lat: number;
  }>({
    lng: 0,
    lat: 0,
  });

  return (
    <FlyToLocationContext.Provider value={{ flyToLocation, setFlyToLocation }}>
      {children}
    </FlyToLocationContext.Provider>
  );
};

export const useFlyToLocationContext = () => useContext(FlyToLocationContext);
