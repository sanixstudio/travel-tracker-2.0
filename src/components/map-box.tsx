import React, { useEffect, useRef, useState } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  MapLayerMouseEvent,
  MapRef,
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
import useGetSuggestions from "@/hooks/getSuggestions";
import useGetLocation from "@/hooks/getLocation";
import { SignInButton, useUser } from "@clerk/clerk-react";
import useGetTrackers from "@/hooks/getTrackers";
import {
  useFlyToLocation,
  usePointerLocation,
  useSearchQuery,
  useSetFlyToLocation,
  useSetPointerLocation,
} from "@/store/store";
import { Circle, MapPin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

const MapBox = () => {
  const [, setToolTipVisible] = useState({});
  const mapRef = useRef<MapRef | null>(null);
  const { savedTrackers } = useGetTrackers();
  const { isSignedIn } = useUser();
  const { toast } = useToast();
  const [mapStyle, setMapStyle] = useState<string>(streetMapStyleV12);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [, setCurrentLocation] = useState({ lng: 0, lat: 0 });

  const searchQuery = useSearchQuery();
  const flyToLocation = useFlyToLocation();
  const setFlyToLocation = useSetFlyToLocation();
  const pointerLocation = usePointerLocation();
  const setPointerLocation = useSetPointerLocation();

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
    setPointerLocation(lng, lat, "Location"); // Updated to pass the new coordinates and fullAddress
    if (!drawerOpen) {
      // Only show toast if drawer is not open
      toast({
        duration: 2500,
        title: "Save pin?",
        className: `dark:bg-slate-800 dark:text-white ${
          !markerVisible && !drawerOpen ? "visible" : "invisible"
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

  const onTrackerSaved = () => {
    setMarkerVisible(false);
    setDrawerOpen(false);
    setPointerLocation(
      pointerLocation.coordinates.lng,
      pointerLocation.coordinates.lat,
      "Pointer"
    );
  };

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [flyToLocation.lng, flyToLocation.lat],
      zoom: 18,
      duration: 4000,
      offset: [0, 0],
    });
  }, [flyToLocation.lng, flyToLocation.lat]);

  // const layerStyle: CircleLayer = {
  //   id: "point",
  //   type: "circle",
  //   paint: {
  //     "circle-radius": 10,
  //     "circle-color": "#EE3616",
  //   },
  //   layout: {
  //     visibility: showSavedPins ? "visible" : "none",
  //   },
  //   metadata: {
  //     description: "Saved pins",
  //   },
  // };

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
      <NavigationControl
        position="bottom-right"
        style={{ marginBottom: "2em" }}
      />
      <GeolocateControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      <StyleChangeButton setMapStyle={setMapStyle} />
      <ScaleControl style={{ zIndex: 0, marginBottom: "2em" }} />
      {/* {markerVisible && (
        <Marker
          color="red"
          scale={0.8}
          draggable={true}
          longitude={pointerLocation.coordinates.lng}
          latitude={pointerLocation.coordinates.lat}
          clickTolerance={3}
        />
      )} */}
      <SaveTrackerDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        onTrackerSaved={onTrackerSaved}
      />
      {markerVisible && (
        <Popup
          longitude={pointerLocation.coordinates.lng}
          latitude={pointerLocation.coordinates.lat}
          anchor="top"
        >
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger
                onMouseEnter={() =>
                  setToolTipVisible((prevState) => ({
                    ...prevState,
                    Pointer: true,
                  }))
                }
                onMouseLeave={() =>
                  setToolTipVisible((prevState) => ({
                    ...prevState,
                    Pointer: false,
                  }))
                }
                className="hover:bg-primary/30 transition-all duration-300 py-1"
              >
                <MapPin fill="#ee3616" color="#ee3616" />
              </TooltipTrigger>
              <TooltipContent className={`max-w-[200px]`}>
                <div className="text-white text-xs bg-black p-2 mt-1 flex flex-wrap">
                  <span className="text-wrap">
                    {pointerLocation.fullAddress}
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Popup>
      )}
      {savedTrackers.length > 0 &&
        savedTrackers.map((tracker, i) => (
          <Popup
            key={tracker.id}
            longitude={tracker.longitude}
            latitude={tracker.latitude}
            closeButton={false}
            anchor="top"
          >
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger
                  onMouseEnter={() =>
                    setToolTipVisible((prevState) => ({
                      ...prevState,
                      [i]: true,
                    }))
                  }
                  onMouseLeave={() =>
                    setToolTipVisible((prevState) => ({
                      ...prevState,
                      [i]: false,
                    }))
                  }
                  className="hover:bg-primary/30 transition-all duration-300 py-1"
                >
                  <Circle size={14} fill="#ee4a2dd3" color="#ee3616a2" />
                </TooltipTrigger>
                <TooltipContent className={`max-w-[200px]`}>
                  <div className="text-white text-xs bg-black p-2 mt-1 flex flex-wrap">
                    <span className="text-wrap">{tracker.title}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Popup>
        ))}
    </Map>
  );
};

export default MapBox;
