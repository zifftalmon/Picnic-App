import { useMemo,useState,useCallback,useRef } from "react";
import { GoogleMap, useLoadScript, Marker, } from "@react-google-maps/api";

export const Search = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAGfyc1R8xD4DL6Ic_6x63QzXXDW-qjAEs',
        libraries: ['places']
    });


    if(!isLoaded) return <div>Loading...</div>
    return <Map/>
}

const Map = () => {
    const center = useMemo(() => ({lat: 31.77195,lng: 35.21701}), []) 
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false
    }),[]
    )

    return (
        <div className="container">
            <div className="controls">
                <h1>Where to picnic..?</h1>
            </div>
            <div className="map">
                <GoogleMap 
                zoom={10} 
                center={center} 
                mapContainerStyle={{width:'100vw', height:'100vh'}}
                options={options}
                >
                    <Marker position={center} />
                    
                </GoogleMap>
            </div>
        </div>
    )
}

export default Search