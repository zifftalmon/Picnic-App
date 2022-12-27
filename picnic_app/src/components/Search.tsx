import { useMemo,useState,useCallback,useRef } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, MarkerClusterer } from "@react-google-maps/api";
import React from "react";
//@ts-ignore
import Places from "./Places.tsx";

type LatLngLiteral = google.maps.LatLngLiteral
type DirectiosnResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions

export const Search = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAGfyc1R8xD4DL6Ic_6x63QzXXDW-qjAEs',
        libraries: ['places']
    });


    if(!isLoaded) return <div>Loading...</div>
    return <Map/>
}



export const Map = () => {
    const [office, setOffice] = useState<LatLngLiteral>()
    const mapRef = useRef<GoogleMap>()
    const center = useMemo<LatLngLiteral>(() => ({lat: 31.77195,lng: 35.21701}), []) 
    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }),[]
    )
    const onLoad = useCallback((map) => (mapRef.current = map), []);
    
    
    return (
        <div className="container">
            <div className="controls">
                <h1>Where to picnic..?</h1>
                <Places  setOffice={(position) => {
                    setOffice(position);
                    mapRef.current?.panTo(position)
                    console.log(position);
                    
                }}/>
            </div>
 
             <div className="map">
                <GoogleMap 
                zoom={10} 
                center={center} 
                mapContainerClassName='map-container'
                options={options}
                onClick={onLoad}
                >                    
                </GoogleMap>
            </div>
        </div>
    )
}

export default Search