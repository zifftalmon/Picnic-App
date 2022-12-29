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
    
    console.log(details);
    return (
        <div>
            {
                details.map(item => {
                    return(
                        <div key={item.id} className='recBox'>
                            <span className="recSpan">
                                <h1>{item.title}</h1>
                                {item.location === 'North' ? <h2>{item.location} 🏔</h2> : item.location === 'South' ? <h2>{item.location} 🏜</h2>:<h2>{item.location}</h2>}
                                <h3>{item.description}</h3>
                                <div className="recFeatures">
                                    {item.is_shaded ? <div><h1>⛱</h1><p>shaded location</p></div>:<div><h1><s>⛱</s></h1><p>no shade</p></div>}
                                    {item.is_parking ? <div><h1>🚗</h1><p>location with parking</p></div>:<div><h1><s>🚗</s></h1><p>no parking</p></div>}
                                    {item.is_water ? <div><h1>🌊</h1><p>water body in location</p></div>:null}
                                    {item.is_space ? <div><h1>🏞</h1><p>spacious location</p></div>:null}
                                </div>
                            </span>
                            <img alt={`rec${item.id}-img`} src={item.image}/>
                        </div>
                    )
                })
            }
            <RecMap/>
        </div>
    )
}

export default RecPage