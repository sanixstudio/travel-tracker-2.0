import { useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { ToastAction } from "@radix-ui/react-toast";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export default function MapBox() {
  const { toast } = useToast();
  // const [mapMode, setMapMode] = useState<string>("regular");
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [markerVisible, setMarkerVisible] = useState(false); // New state for marker visibility
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    long: 0,
  });

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      onClick={(e) => {
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
            duration: 3000,
            title: "Save pin?",
            className: "dark:bg-slate-800 dark:text-white",
            // description: "There was a problem with your request.",
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
      }}
      antialias={true}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <NavigationControl position="bottom-right" />
      <GeolocateControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      <ScaleControl />
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
          anchor="top-right"
          onClose={() => setShowPopup(false)}
        >
          <h1 className="bg-red-500 text-white p-2 text-4xl">You are here</h1>
        </Popup>
      )}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="data[state]-open]:bg-red-500" asChild />
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                >
                  <span className="sr-only">Decrease</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                >
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <div className="mt-3 h-[120px]"></div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </Map>
  );
}
