import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Map from "./Map"

const Reccomandations = () => {
    const [rec, setRec] = useState([])
    const [path, setPath] = useState()
    const [recTitle, setRecTitle] = useState()

    useEffect(() => {
        fetch('http://localhost:3001/recommendations')
            .then(res => res.json())
            .then(data => data.map(item => { return setRec(recs => [...recs, item]) }))
    }, [])
    
    return(
    <div className="recContainer">
            <div className="recGrid">
                {rec.map((item,id) => {
                    return(
                        <Link key={id} to={`/recommendations/${item.id}`} 
                              onClick={() => {
                                setPath(item.id)
                                setRecTitle(item.title)
                        }}>
                            <div key={id} id={id} className="recDiv">
                                <img src={item.image}/>
                                <h4>{item.title}</h4>
                                <h5>{item.location}</h5>
                            </div>
                        </Link>
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