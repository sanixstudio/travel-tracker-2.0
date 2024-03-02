import React, { useEffect, useRef, useState } from "react";
import {
  CircleLayer,
  FullscreenControl,
  GeolocateControl,
  Layer,
  Map,
  MapLayerMouseEvent,
  MapRef,
  Marker,
  MarkerDragEvent,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
} from "react-map-gl";
import { Button } from "./ui/button";
import { ToastAction } from "@radix-ui/react-toast";
const SaveTrackerDrawer = React.lazy(() => import("./tracker-form-drawer"));
import { useToast } from "./ui/use-toast";
import { streetMapStyleV12 } from "@/utils/constants";
import StyleChangeButton from "./style-change-button";
import useGetSuggestions from "@/hooks/getSuggestions";
import useGetLocation from "@/hooks/getLocation";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { MapPin } from "lucide-react";
import useGetTrackers from "@/hooks/getTrackers";
import {
  useFlyToLocation,
  usePinLocation,
  useSearchQuery,
  useSetFlyToLocation,
  useSetPinLocation,
} from "@/store/store";

const MapBox = () => {
  const mapRef = useRef<MapRef | null>(null);
  const { savedTrackers } = useGetTrackers();
  const { isSignedIn } = useUser();
  const { toast } = useToast();
  const [mapStyle, setMapStyle] = useState<string>(streetMapStyleV12);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [markerVisible, setMarkerVisible] = useState(false);
  // TODOUse Better State management for this
  const [showSavedPins] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  const searchQuery = useSearchQuery();
  const pinLocation = usePinLocation();
  const setPinLocation = useSetPinLocation();
  const flyToLocation = useFlyToLocation();
  const setFlyToLocation = useSetFlyToLocation();

  const { searchResults, error: suggestionsError } =
    useGetSuggestions(searchQuery);
  const { searchResults: locationResults, error: locationError } =
    useGetLocation(searchResults);

  useEffect(() => {
    if (locationResults.length === 2) {
      const [lng, lat] = locationResults.map(Number);
      setFlyToLocation(lat, lng);
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
    setMarkerVisible((prevState) => !prevState);
    setCurrentLocation({ lat, lng });
    setPinLocation(lat, lng);

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
    setPinLocation(lat, lng);
  };

  const onTrackerSaved = () => {
    setMarkerVisible(false);
    setDrawerOpen(false);
    const lat = 0;
    const lng = 0;
    setPinLocation(lat, lng);
  };

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [flyToLocation.lng, flyToLocation.lat],
      zoom: 14,
      duration: 4000,
    });
  }, [flyToLocation.lat, flyToLocation.lng]);

  const layerStyle: CircleLayer = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#EE3616",
    },
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
      {savedTrackers.length > 0 && (
        <Source
          id="my-data"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: savedTrackers.map((tracker) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [tracker.longitude, tracker.latitude],
              },
              properties: {}, // Add additional properties if needed
            })),
          }}
        >
          <Layer {...layerStyle} />
        </Source>
      )}
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
          latitude={pinLocation.lat}
          longitude={pinLocation.lng}
          clickTolerance={3}
        />
      )}
      <SaveTrackerDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        onTrackerSaved={onTrackerSaved}
      />
      {showSavedPins &&
        savedTrackers.length > 0 &&
        savedTrackers.map((tracker, i) => (
          <Popup
            key={i}
            children={<MapPin fill="red" />}
            latitude={tracker.latitude}
            longitude={tracker.longitude}
            className="p-0 bg-transparent flex justify-center items-center"
            closeButton={false}
            closeOnClick={false}
          ></Popup>
        ))}
    </Map>
  );
};

export default MapBox;
