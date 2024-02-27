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

export default function MapBox() {
  const mapRef = useRef<MapRef | null>(null);
  const { searchQuery } = useSearchQuery();
  const { toast } = useToast();
  const [mapStyle, setMapStyle] = useState<string>(streetMapStyle);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    long: 0,
  });

  const { searchResults, loading, error } = useGetSuggestions(searchQuery);
  const {
    searchResults: locationResults,
    loading: locationLoading,
    error: locationError,
  } = useGetLocation(searchResults);

  const long = +locationResults[0];
  const lat = +locationResults[1];

  console.log({ long, lat });

  useEffect(() => {
    if (locationResults.length === 2) {
      mapRef?.current?.flyTo({
        center: [long, lat],
        zoom: 14,
      });
    }
    console.log("flying");
  }, [lat, locationResults, long]);

  useEffect(() => {
    if (locationError) {
      console.error("Error fetching location:", locationError);
    }
  }, [locationError]);

  const handleClick = (e: MapLayerMouseEvent) => {
    if (markerVisible) {
      setMarkerVisible(false);
    } else {
      setCurrentLocation({
        lat: e.lngLat.lat,
        long: e.lngLat.lng,
      });
      setMarkerVisible(true);
      toast({
        duration: 2500,
        title: "Save pin?",
        className: "dark:bg-slate-800 dark:text-white",
        action: (
          <div className="flex gap-2">
            <Button onClick={() => setOpen(true)}>Yes</Button>
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
          longitude={currentLocation.long}
        />
      )}
      {showPopup && (
        <Popup
          longitude={currentLocation.long}
          latitude={currentLocation.lat}
          anchor="top-left"
          onClose={() => setShowPopup(false)}
        >
          <h1 className="bg-red-500 text-white p-2 text-4xl">You are here</h1>
        </Popup>
      )}
      <SaveTrackerDrawer open={open} setOpen={setOpen} />
    </Map>
  );
}
