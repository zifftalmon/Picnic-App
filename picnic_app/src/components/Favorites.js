import React from "react"
import Search from "./Search"
import { useLoadScript } from "@react-google-maps/api";

export default function Favorites() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAGfyc1R8xD4DL6Ic_6x63QzXXDW-qjAEs',
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Search />;
}
