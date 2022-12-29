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
    
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

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

      const mapRef = useRef();
      const onMapLoad = useCallback((map) => {
        mapRef.current = map
      }, [])

      const panTo = useCallback(({lat,lng}) => {
        mapRef.current.panTo({lat,lng})
        mapRef.current.setZoom(10)
      }, [])

    if (!isLoaded) return <div>Loading...</div>;
    return (
      <div className="homeDiv">
        <div className="homeDesc">
          <Locate panTo={panTo}/>
          <Search panTo={panTo}/>
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
        {selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}} 
        onCloseClick={() => {
            setSelected(null)
        }}>
            <div className="infoWindow">
                <h2>camping site occupied!</h2>
                <p>updated: {formatRelative(selected.time, new Date())}</p>
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

const Search = ({ panTo }) => {
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 31.77, lng: () => 35.21 },
      radius: 100 * 1000 
    }
  })  
    const handleInput = (e) => {
        setValue(e.target.value);
      };

    return (
    <div className="search">
      <Combobox onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await getGeocode({address})
          const {lat,lng} = await getLatLng(results[0])
          panTo({lat,lng})
        }catch (e){
            console.log('error!');
        }
      }}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover className="placeList">
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Map