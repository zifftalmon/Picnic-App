import React, { Component } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';
// import '@reach/combobox/style.css'

const containerStyle = {
    width: '500px',
    height: '300px'
  };
  
  const center = {
    lat: 31.771959,
    lng: 35.217018
  };

const SearchLocation = (props) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAGfyc1R8xD4DL6Ic_6x63QzXXDW-qjAEs",
        libraries: ['places'],
      })

      const [map, setMap] = React.useState(null)

      const [selected, setSelected] = React.useState(null);

      const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!  
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])

      const onUnmount = React.useCallback(function callback(map) {
        setMap(map)
      }, [])
    
      return isLoaded ? (
        <div className='searchDiv'>
        <form>
            <input type='text' placeholder='search for a location'/>
            <input type='submit' value='search'/>
        </form>
            <div>
                <PlacesAutoComplete setSelected={setSelected} />
            </div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={{lat: 31,lng: 35}}/>
            {selected && <Marker position={selected} />}
          </GoogleMap>
          </div>
      ) : <></>
    }

    const PlacesAutoComplete = ({setSelected}) => {
        const {
            ready,
            value,
            setValue,
            suggestions:{status,data},
            clearSuggestions,
        } = usePlacesAutocomplete()


        const handleSelect = async (address) => {
            setValue(address, false)
            clearSuggestions()

            const results = await getGeocode({address})
            const {lat, lng} = await getLatLng(results[0])
            setSelected({lat,lng})
        }


        return (
            <Combobox onSelect={handleSelect}>

                <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready}/>
                <ComboboxPopover>
                    <ComboboxList>
                        {status === 'OK' && data.map(({place_id, description}) => <ComboboxOption key={place_id} value={description}/>)}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        )
    }
    

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         value:'',
    //         sites:[]
    //     }
    // }

    // handleChange = (e) => {
    //     this.setState({value:e.target.value})
    //     console.log(this.state.value);
    // }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch(`http://localhost:3001/sites/name:${this.state.value}`)
    //     .then(res => res.json())
    //     .then(data => this.setState({sites:data}))
    // }


    // render() {
    // return (
    //     <div>
            // <form onSubmit={this.handleSubmit}>
            //     <input onChange={this.handleChange} type='text' placeholder='search for a location'/>
            //     <input type='submit' value='search'/>
            // </form>
    //         {/* {
    //             this.state.sites.map(item => {
    //                     return (
    //                         <div key={item.id}>
    //                             <h1>{item.name},{item.area}</h1>
    //                         </div>
    //                     )
    //             })
    //         } */}
    //     </div>
    // );


export default SearchLocation;