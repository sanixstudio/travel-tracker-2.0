import { useEffect, useRef, useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  MapLayerMouseEvent,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { Button } from "./ui/button";
import { ToastAction } from "@radix-ui/react-toast";
import SaveTrackerDrawer from "./tracker-form-drawer";
import { useToast } from "./ui/use-toast";
import { streetMapStyle } from "@/utils/constants";
import StyleChangeButton from "./style-change-button";
import { useSearchQuery } from "@/context/searchQueryContext";
import useGetSuggestions from "@/hooks/getSuggestions";
import useGetLocation from "@/hooks/getLocation";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { usePinLocationContext } from "@/context/pinLocationContext";
import useGetTrackers from "@/hooks/getTrackers";
import { BookMarkedIcon } from "lucide-react";

export default function MapBox() {
  const { savedTrackers } = useGetTrackers();
  const mapRef = useRef<MapRef | null>(null);
  const { isSignedIn } = useUser();
  const { searchQuery } = useSearchQuery();
  const { setPinLocation } = usePinLocationContext();
  const { toast } = useToast();
  const [mapStyle, setMapStyle] = useState<string>(streetMapStyle);
  const [open, setOpen] = useState(false);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const { searchResults, loading, error } = useGetSuggestions(searchQuery);
  const {
    searchResults: locationResults,
    loading: locationLoading,
    error: locationError,
  } = useGetLocation(searchResults);

  const lat = +locationResults[0];
  const lng = +locationResults[1];

  useEffect(() => {
    if (locationResults.length === 2) {
      mapRef?.current?.flyTo({
        center: [lat, lng],
        zoom: 14,
      });
    }
  }, [lat, locationResults, lng]);

  useEffect(() => {
    if (locationError) {
      console.error("Error fetching location:", locationError);
    }
  }, [locationError]);

  const handleClick = (e: MapLayerMouseEvent) => {
    if (markerVisible) {
      setMarkerVisible(false);
    } else {
      const { lat, lng } = e.lngLat;
      setCurrentLocation({
        lat,
        lng,
      });
      setMarkerVisible(true);
      setPinLocation({ lat, lng }); // Update pinLocation context
      toast({
        duration: 2500,
        title: "Save pin?",
        className: "dark:bg-slate-800 dark:text-white",
        action: (
          <div className="flex gap-2">
            {isSignedIn ? (
              <Button onClick={() => setOpen(true)}>Yes</Button>
            ) : (
              <SignInButton mode="modal">
                <span className="p-2 px-4 border block bg-primary rounded-md cursor-pointer hover:bg-primary/80 transition-all duration-300">
                  Yes
                </span>
              </SignInButton>
            )}
            <Button variant={"destructive"} className=" px-0">
              <ToastAction altText="Cancel" className="p-2">
                Cancel
              </ToastAction>
            </Button>
          </div>
        ),
      });
    }
  };

  const onTrackerSaved = () => {
    setMarkerVisible(false);
  };

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
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {locationLoading && <div>Loading location...</div>}
      {locationError && <div>Error fetching location: {locationError}</div>}
      {markerVisible && (
        <Marker
          color="red"
          scale={0.8}
          latitude={currentLocation.lat}
          longitude={currentLocation.lng}
        />
      )}
      {savedTrackers.map((tracker) => (
        <Popup
          longitude={tracker.longitude}
          latitude={tracker.latitude}
          anchor="top-left"
          className="p-0 hover:z-20"
        >
          <BookMarkedIcon color="red" />
        </Popup>
      ))}
      <SaveTrackerDrawer
        open={open}
        setOpen={setOpen}
        onTrackerSaved={onTrackerSaved}
      />
    </Map>
  );
}
