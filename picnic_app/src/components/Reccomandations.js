import { useState, useEffect } from "react"
import Map from "./Map"

const Reccomandations = () => {
    const [rec, setRec] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/recommendations')
            .then(res => res.json())
            .then(data => data.map(item => { return setRec(list => [...list, item]) }))
    }, [])

    console.log(rec);

    return(
    <div className="recContainer">
            <div className="recGrid">
                {rec.map(item => {
                    return(
                        <div className="recDiv">
                            <img src={item.image}/>
                            <p>{item.title}</p>
                            <p>{item.location}</p>
                        </div>
                    )
                })}
            </div>
            <div className="recMap">
                <Map/>
            </div>
    </div>
    )
}

export default Reccomandations