import React, { useEffect, useRef, useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  MapLayerMouseEvent,
  MapRef,
  Marker,
  MarkerDragEvent,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { Button } from "./ui/button";
import { ToastAction } from "@radix-ui/react-toast";
const SaveTrackerDrawer = React.lazy(() => import("./tracker-form-drawer"));
import { useToast } from "./ui/use-toast";
import { streetMapStyleV12 } from "@/utils/constants";
import StyleChangeButton from "./style-change-button";
import { useSearchQuery } from "@/context/searchQueryContext";
import useGetSuggestions from "@/hooks/getSuggestions";
import useGetLocation from "@/hooks/getLocation";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { usePinLocationContext } from "@/context/pinLocationContext";
import { useFlyToLocationContext } from "@/context/flyToLocation";
import { Pin } from "lucide-react";

const MapBox = () => {
  const mapRef = useRef<MapRef | null>(null);
  const { isSignedIn } = useUser();
  const { searchQuery } = useSearchQuery();
  const { pinLocation, setPinLocation } = usePinLocationContext();
  const { toast } = useToast();
  const [mapStyle, setMapStyle] = useState<string>(streetMapStyleV12);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  const { flyToLocation, setFlyToLocation } = useFlyToLocationContext();

  const { searchResults, error: suggestionsError } = useGetSuggestions(searchQuery);
  const { searchResults: locationResults, error: locationError } = useGetLocation(searchResults);

  useEffect(() => {
    if (locationResults.length === 2) {
      const [lng, lat] = locationResults.map(Number);
      setFlyToLocation((prevState) => ({ ...prevState, lat, lng }));
    }
  }, [locationResults, setFlyToLocation]);

  useEffect(() => {
    if (suggestionsError) {
      console.error("Error fetching suggestions:", suggestionsError);
    }
    if (locationError) {
      console.error("Error fetching location:", locationError);
    }
  }, [suggestionsError, locationError]);

  const handleClick = (e: MapLayerMouseEvent) => {
    const { lat, lng } = e.lngLat;
    setMarkerVisible(prevState => !prevState);
    setCurrentLocation({ lat, lng });
    setPinLocation({ lat, lng });
    if (!markerVisible) {
      toast({
        duration: 2500,
        title: "Save pin?",
        className: "dark:bg-slate-800 dark:text-white",
        action: (
          <div className="flex gap-2">
            {isSignedIn ? (
              <Button onClick={() => setDrawerOpen(true)}>Yes</Button>
            ) : (
              <SignInButton mode="modal">
                <span className="p-2 px-4 border block bg-primary rounded-md cursor-pointer hover:bg-primary/80 transition-all duration-300">
                  Yes
                </span>
              </SignInButton>
            )}
            <Button variant={"destructive"} className="px-0">
              <ToastAction altText="Cancel" className="p-2">
                Cancel
              </ToastAction>
            </Button>
          </div>
        ),
      });
    }
  };

  const onMarkerDrag = (e: MarkerDragEvent) => {
    const { lat, lng } = e.lngLat;
    setPinLocation({ lat, lng });
  };

  const onTrackerSaved = () => {
    setMarkerVisible(false);
    setDrawerOpen(false);
    setPinLocation({ lat: 0, lng: 0 });
  };

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [flyToLocation.lng, flyToLocation.lat],
      zoom: 14,
      duration: 4000,
    });
  }, [flyToLocation.lat, flyToLocation.lng]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      onClick={handleClick}
      antialias={true}
      style={{ width: "100%", height: "100vh" }}
      mapStyle={mapStyle}
    >
      <NavigationControl position="bottom-right" />
      <GeolocateControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      <StyleChangeButton setMapStyle={setMapStyle} />
      <ScaleControl style={{ zIndex: 0 }} />
      {markerVisible && (
        <Marker
          color="red"
          scale={0.8}
          draggable={true}
          onDrag={onMarkerDrag}
          latitude={currentLocation.lat}
          longitude={currentLocation.lng}
          clickTolerance={3}
        />
      )}
      <SaveTrackerDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        onTrackerSaved={onTrackerSaved}
      />
      {
        <Popup
          children={<Pin fill="red" />}
          latitude={pinLocation.lat}
          longitude={pinLocation.lng}
          className="p-0 bg-transparent flex justify-center items-center"
          closeButton={false}
          closeOnClick={false}
        ></Popup>
      }
    </Map>
  );
}

export default MapBox;
