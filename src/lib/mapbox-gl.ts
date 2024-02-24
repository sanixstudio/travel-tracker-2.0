import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN;
export const map = new mapboxgl.Map({
  container: "map", // container ID
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
