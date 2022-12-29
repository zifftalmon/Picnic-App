import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

const RecPage = () => {
    const {id} = useParams();
    const [details, setDetails] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/recommendations/${id}`)
            .then(res => res.json())
            .then(data => data.map(item => {setDetails(recs => [...recs, item])}))
    }, [])   
    
    console.log(details);
    return (
        <div>
            {
                details.map(item => {
                    return(
                        <div key={item.id} className="rec-div">
                            <h1>{item.title}</h1>
                            <h1>{item.location}</h1>
                            <h2>{item.description}</h2>
                            <img src={item.image}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RecPage