import { useEffect, useRef, useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  MapLayerMouseEvent,
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
import useMapboxSearch from "@/hooks/getSearchLocation";
import StyleChangeButton from "./style-change-button";
import { useSearchQuery } from "@/context/searchQueryContext";

export default function MapBox() {
  const mapRef = useRef(null);
  const { searchQuery } = useSearchQuery();
  const { toast } = useToast();
  const { searchResults, loading, error } = useMapboxSearch(searchQuery);
  console.log(searchResults, loading, error);
  const [mapStyle, setMapStyle] = useState<string>(streetMapStyle);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [markerVisible, setMarkerVisible] = useState(false); // New state for marker visibility
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    long: 0,
  });

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  console.log(searchResults);

  const handleClick = (e: MapLayerMouseEvent) => {
    if (markerVisible) {
      // If marker is visible, hide it on click
      setMarkerVisible(false);
    } else {
      // Show the marker and update location
      setCurrentLocation({
        lat: e.lngLat.lat,
        long: e.lngLat.lng,
      });
      setMarkerVisible(true);
      toast({
        duration: 2500,
        hidden: true,
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
          anchor="top-left" // Change the anchor direction here
          onClose={() => setShowPopup(false)}
        >
          <h1 className="bg-red-500 text-white p-2 text-4xl">You are here</h1>
        </Popup>
      )}
      <SaveTrackerDrawer open={open} setOpen={setOpen} />
    </Map>
  );
}
