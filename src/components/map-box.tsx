import { useEffect, useRef, useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  MapLayerMouseEvent,
  MapRef,
  Marker,
  MarkerDragEvent,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { Button } from "./ui/button";
import { ToastAction } from "@radix-ui/react-toast";
import SaveTrackerDrawer from "./tracker-form-drawer";
import { useToast } from "./ui/use-toast";
import { streetMapStyleV12 } from "@/utils/constants";
import StyleChangeButton from "./style-change-button";
import { useSearchQuery } from "@/context/searchQueryContext";
import useGetSuggestions from "@/hooks/getSuggestions";
import useGetLocation from "@/hooks/getLocation";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { usePinLocationContext } from "@/context/pinLocationContext";
import { useFlyToLocationContext } from "@/context/flyToLocation";

export default function MapBox() {
  const mapRef = useRef<MapRef | null>(null);
  const { isSignedIn } = useUser();
  const { searchQuery } = useSearchQuery();
  const { setPinLocation } = usePinLocationContext();
  const { toast } = useToast();
  const [mapStyle, setMapStyle] = useState<string>(streetMapStyleV12);
  const [open, setOpen] = useState(false);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const { flyToLocation, setFlyToLocation } = useFlyToLocationContext();

  const { searchResults } = useGetSuggestions(searchQuery);
  const { searchResults: locationResults, error: locationError } =
    useGetLocation(searchResults);

  useEffect(() => {
    if (locationResults.length === 2) {
      const lat = +locationResults[0];
      const lng = +locationResults[1];
      setFlyToLocation((prevState) => ({ ...prevState, lat, lng }));
    }
  }, [locationResults, setFlyToLocation]);

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
      setCurrentLocation({ lat, lng });
      setMarkerVisible(true);
      setPinLocation({ lat, lng });
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
  };

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [flyToLocation.lng, flyToLocation.lat],
      zoom: 14,
      duration: 1000,
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
        open={open}
        setOpen={setOpen}
        onTrackerSaved={onTrackerSaved}
      />
    </Map>
  );
}
