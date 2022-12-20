import React, { Component } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

const SearchLocation = (props) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAGfyc1R8xD4DL6Ic_6x63QzXXDW-qjAEs"
      })

      const [map, setMap] = React.useState(null)

      const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])

      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    
      return isLoaded ? (
        <>
        <form>
            <input type='text' placeholder='search for a location'/>
            <input type='submit' value='search'/>
        </form>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
          </>
      ) : <></>
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