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
import useGetTrackers from "@/hooks/getTrackers";
import {
  useFlyToLocation,
  usePinLocation,
  usePointerLocation,
  useSearchQuery,
  useSetFlyToLocation,
  useSetPinLocation,
  useShowPins,
} from "@/store/store";
import { Pin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

const MapBox = () => {
  const mapRef = useRef<MapRef | null>(null);
  const { savedTrackers } = useGetTrackers();
  const { isSignedIn } = useUser();
  const { toast } = useToast();
  const [mapStyle, setMapStyle] = useState<string>(streetMapStyleV12);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [markerVisible, setMarkerVisible] = useState(false);
  const showSavedPins = useShowPins();
  const [, setCurrentLocation] = useState({ lng: 0, lat: 0 });

  const searchQuery = useSearchQuery();
  const pinLocation = usePinLocation();
  const setPinLocation = useSetPinLocation();
  const flyToLocation = useFlyToLocation();
  const setFlyToLocation = useSetFlyToLocation();
  const pointerLocation = usePointerLocation();

  useEffect(() => {
    console.log(pointerLocation);
  }, [pointerLocation]);

  const { searchResults, error: suggestionsError } =
    useGetSuggestions(searchQuery);
  const { searchResults: locationResults, error: locationError } =
    useGetLocation(searchResults);

  useEffect(() => {
    if (locationResults.length === 2) {
      const [lng, lat] = locationResults.map(Number);
      setFlyToLocation(lng, lat);
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
    const { lng, lat } = e.lngLat;
    setMarkerVisible((prevState) => !prevState);
    setCurrentLocation({ lng, lat });
    setPinLocation(lng, lat);

    if (!drawerOpen) {
      // Only show toast if drawer is not open
      toast({
        duration: 2500,
        title: "Save pin?",
        className: `dark:bg-slate-800 dark:text-white ${
          markerVisible && !drawerOpen ? "visible" : "invisible"
        }`,
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
    const { lng, lat } = e.lngLat;
    setPinLocation(lng, lat);
  };

  const onTrackerSaved = () => {
    setMarkerVisible(false);
    setDrawerOpen(false);
    const lng = 0;
    const lat = 0;
    setPinLocation(lng, lat);
  };

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [flyToLocation.lng, flyToLocation.lat],
      zoom: 18,
      duration: 4000,
      offset: [0, 0],
    });
  }, [flyToLocation.lng, flyToLocation.lat]);

  const layerStyle: CircleLayer = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#EE3616",
    },
    layout: {
      visibility: showSavedPins ? "visible" : "none",
    },
    metadata: {
      description: "Saved pins",
    },
  };

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
      initialViewState={{
        longitude: -122.433892,
        latitude: 37.780261,
        zoom: 16,
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
        <NavigationControl position="bottom-right" style={{marginBottom: '6em'}} />
        <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        <StyleChangeButton setMapStyle={setMapStyle} />
        <ScaleControl style={{ zIndex: 0, marginBottom: '6em' }} />
      {markerVisible && (
        <Marker
          color="red"
          scale={0.8}
          draggable={true}
          onDrag={onMarkerDrag}
          longitude={pinLocation.lng}
          latitude={pinLocation.lat}
          clickTolerance={3}
        />
      )}
      <SaveTrackerDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        onTrackerSaved={onTrackerSaved}
      />
      {pointerLocation.coordinates.lng !== 0 &&
        pointerLocation.coordinates.lat !== 0 && (
          <Popup
            longitude={pointerLocation.coordinates.lng}
            latitude={pointerLocation.coordinates.lat}
            closeButton={false}
            closeOnClick={false}
            anchor="top"
          >
            <>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger className="hover:bg-primary/30 transition-all duration-300 py-1">
                    <Pin fill="#ee3616" color="#ee3616" />
                  </TooltipTrigger>
                  <TooltipContent className={``}>
                    <div className="text-white text-xs bg-black p-2 mt-1">
                      {pointerLocation.fullAddress}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          </Popup>
        )}
    </Map>
  );
};

export default MapBox;
