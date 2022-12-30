import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import RecMap from "./RecMap";

const RecPage = () => {
    const {id} = useParams();
    const [details, setDetails] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/recommendations/${id}`)
            .then(res => res.json())
            .then(data => data.map(item => {return setDetails(recs => [...recs, item])}))
    }, [id])   
    
    return (
        <div>
            {
                details.map(item => {
                    return(
                        <>
                        <div key={item.id} className='recBox'>
                            <span className="recSpan">
                                <h1>{item.title}</h1>
                                {item.location === 'North' ? <h2>{item.location} 🏔</h2> : item.location === 'South' ? <h2>{item.location} 🏜</h2>:<h2>{item.location}</h2>}
                                <h3>{item.description}</h3>
                                <div className="recFeatures">
                                    {item.is_shaded ? <div><h1>⛱</h1><p>Shaded Location</p></div>:<div><h1>❌</h1><p>No Shade</p></div>}
                                    {item.is_parking ? <div><h1>🚗</h1><p>Location with Parking</p></div>:<div><h1>❌</h1><p>No Parking</p></div>}
                                    {item.is_water ? <div><h1>🌊</h1><p>Body of Water in Location</p></div>:<div><h1>❌</h1><p>No Body of Water in location</p></div>}
                                    {item.is_space ? <div><h1>🏞</h1><p>Spacious location</p></div>:<div><h1>❌</h1><p>Compact Location</p></div>}
                                </div>
                            </span>
                            <img alt={`rec${item.id}-img`} src={item.image}/>
                        </div>
                            <RecMap address={item.title}/>
                        </>
                    )
                })
            }
        </div>
    )
}


// const onMapLoad = async(address) => {
//     const result = await getGeocode({address})
//     const {lat,lng} = await getLatLng(result)
//     panTo({lat, lng})
//   }
export default RecPage