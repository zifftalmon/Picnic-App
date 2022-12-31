import { useState,useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";


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
  
const [marker, setMarker] = useState({})

const mapRef = useRef();
const onMapLoad = useCallback((map) => {
  mapRef.current = map
  const getLocation = async(address) => {
    const call = await getGeocode({address}) 
    const {lat,lng} = await getLatLng(call[0])
    setMarker({lat,lng})
    panTo({lat,lng})
  }
  getLocation(props.address)
}, [])

const panTo = useCallback(({lat,lng}) => {
  mapRef.current.panTo({lat,lng})
  mapRef.current.setZoom(10)
}, [])
 
const calculate = useCallback(({lat,lng}) => {
  mapRef.current.panTo({lat,lng})
  mapRef.current.setZoom(10)
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
          >
            <Marker position={marker}/>
          </GoogleMap>
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

  async function CalcRoute(props,{ calculate }) {
    // eslint-disable-next-line no-undef
    const directions = google.maps.DirectionsService()
    const result = await directions.route({
      origin:props.origin,
      destination:props.destination,
    // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })
    return (
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              calculate({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
              console.log(position);
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