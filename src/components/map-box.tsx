import { useState } from "react";
import Map, {
  // FillLayer,
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";

// const parkLayer: FillLayer = {
//   id: "landuse_park",
//   type: "fill",
//   source: "mapbox",
//   "source-layer": "landuse",
//   filter: ["==", "class", "park"],
//   paint: {
//     "fill-color": "#4E3FC8",
//   },
// };

export default function MapBox() {
  // const [mapMode, setMapMode] = useState<string>("regular");
  const [showPopup, setShowPopup] = useState<boolean>(true);
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
        }
      }}
      antialias={true}
      style={{ width: "100%", height: "calc(100vh - 130px)" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <NavigationControl position="bottom-right" />
      <GeolocateControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      {/* <Layer {...parkLayer} /> */}
      {markerVisible && ( // Render the Marker only if markerVisible is true
        <Marker
          color="red"
          scale={0.8}
          latitude={currentLocation.lat}
          longitude={currentLocation.long}
        />
      )}
      {showPopup && (
        <Popup
          longitude={currentLocation.long} // Corrected longitude assignment
          latitude={currentLocation.lat} // Corrected latitude assignment
          anchor="top-right"
          onClose={() => setShowPopup(false)}
        >
          <h1 className="bg-red-500 text-white p-2 text-4xl">You are here</h1>
        </Popup>
      )}
    </Map>
  );
}
