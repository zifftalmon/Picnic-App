import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import FavMap from "./FavMap";


const FavoritesPage = () => {
    const {id} = useParams();
    const [details, setDetails] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/favorites/${id}`)
            .then(res => res.json())
            .then(data => data.map(item => {return setDetails(recs => [...recs, item])}))
    }, [id])   
    
    return (
        <div>   
            {
                details.map(item => {
                    console.log(item.latitude,item.longitude);
                    return(
                        <div>
                            <h1>{item.title}</h1>
                            <h2>{item.description}</h2>
                            <FavMap address={{lat:item.latitude,lng:item.longitude}}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FavoritesPage