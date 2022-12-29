import { useState,useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsService
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

const libraries = ['places']

const style = {
    width:'100%',
    height:'100vh'
}

const options = {
    disableDefaultUI: true,
    zoomControl: true
}
const center = {
    lat: 31.77,
    lng: 35.21
}

const RecMap = (props) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
})


const mapRef = useRef();
const onMapLoad = useCallback((map) => {
  mapRef.current = map
}, [])

const panTo = useCallback(({lat,lng}) => {
  mapRef.current.panTo({lat,lng})
  mapRef.current.setZoom(13)
}, [])

if (!isLoaded) return <div>Loading...</div>;
    return (
      <div>
            <Locate panTo={panTo}/>
        <div>
          <GoogleMap
              mapContainerStyle={style}
              options={options}
              zoom={8}
              center={center}
              onLoad={onMapLoad}
          ></GoogleMap>
        </div>
    </div>
    )
}

function Locate({ panTo }) {
    return (
      <button
        className="locateRec"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img src="/icons8-compass-south-48.png" alt="compass" />
      </button>
    );
  }
export default RecMap