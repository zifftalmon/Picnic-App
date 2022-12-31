import { useState,useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete
} from "@react-google-maps/api";
import { formatRelative, set } from "date-fns";


const libraries = ['places']

const options = {
  disableDefaultUI: true,
    zoomControl: true
}
const center = {
    lat: 31.77,
    lng: 35.21
}

const Map = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries
  });  

//STATES AND REF
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [locationState, setLocationState] = useState('vacant')
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance,setDistance] = useState('')
  const [duration, setDuration] = useState('')
    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()


//FUNCTION FOR SETTING MARKERS
  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);
//MAPREF TO PREVENT CONSTANT RENRENDERING
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
    }, [])
//FUNCTION FOR PANNING THE MAP
    const panTo = useCallback(({lat,lng}) => {
      mapRef.current.panTo({lat,lng})
      mapRef.current.setZoom(10)
    }, [])
//POST REQUEST FOR ADDING LOCATIONS TO FAVORITES PAGE
      const handleFavorite = (e) => {
        fetch('http://localhost:3001/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            { 
              title:e.target[0].value,
              description:e.target[1].value, 
              latitude:e.target.childNodes[0].innerHTML,
              longitude:e.target.childNodes[1].innerHTML
            })
          })
        }

        // const location = navigator.geolocation.getCurrentPosition(mapRef.current)
        // console.log(location);

        const getRoute = async () => {
          const directions = new window.google.maps.DirectionsService();
          const result = await directions.route({
            origin:originRef.current.value,
            destination:destinationRef.current.value,
            //eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
          })
          setDirectionResponse(result)
          setDistance(result.routes[0].legs[0].distance.text)
          setDuration(result.routes[0].legs[0].duration.text)
        }

        const clearRoute = () => {
          setDirectionResponse(null)
          setDistance('')
          setDuration('')
        }

        console.log(originRef.current.value);
        
        if (!isLoaded) return <div>Loading...</div>;
        return (
          <div className="homeDiv">
        <div className="homeDesc">
          <DirectionsService options/>
          <Locate panTo={panTo}/>
          {/* <Search panTo={panTo}/> */}
          <Autocomplete>
          <input type='text' placeholder="origin" required ref={originRef}/>
          </Autocomplete>
          <Autocomplete>
          <input type='text' placeholder="destination" required ref={destinationRef}/>
          </Autocomplete>
          <br/>
          <input type='submit' value='find Route' onClick={getRoute}/>
          <h1>{distance}</h1>
          <h2>{duration}</h2>
        </div>
        <div className="mapDiv">
          <GoogleMap
              mapContainerClassName="map"
              options={options}
              zoom={10}
              center={center}
              onClick={onMapClick}
              onLoad={onMapLoad}
              >
          {markers.map((marker) => (
            <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url:'/icons8-picnic-64 (1).png',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0,0),
              anchor: new window.google.maps.Point(15,15)
            }}
            onClick={() => {
              setSelected(marker)
            }}
            />
            ))}
            {directionResponse && <DirectionsRenderer directions={directionResponse}/> }
        {selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}} 
        onCloseClick={() => {
          setSelected(null)
        }}>
            <div className="infoWindow">
                <h2>{`location is ${locationState}`}</h2>
                <p>updated: {formatRelative(selected.time, new Date())}</p>
                <form onSubmit={handleFavorite}>
                  <p style={{position:'absolute',visibility:'hidden'}}>{selected.lat}</p>
                  <p style={{position:'absolute',visibility:'hidden'}}>{selected.lng}</p>
                  {/* <input type='checkbox' id='check' onChange={handleCheck}/>
                  <label htmlFor="check">i'm travelling here</label> */}
                  <input type='text' placeholder="location name"/>
                  <input type='text' placeholder="tell us about this location"/>
                  <br/>
                  <input type='submit' value='add to favorites'/>
                </form>
            </div>
        </InfoWindow>): null}
            </GoogleMap>
        </div>
      </div>
    )
  }
  
  function Locate({ panTo }) {
    return (
      <button
      className="locate"
      onClick={() => {
      navigator.geolocation.getCurrentPosition((position) => {
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


export default Map