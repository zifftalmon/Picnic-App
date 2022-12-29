import { useState, useEffect } from "react"
import { Route,Routes,useNavigate } from "react-router-dom"
import RecPage from "./RecPage"
import Map from "./Map"

const Reccomandations = () => {
    const [rec, setRec] = useState([])
    const [path, setPath] = useState()
    const [recTitle, setRecTitle] = useState()

    useEffect(() => {
        fetch('http://localhost:3001/recommendations')
            .then(res => res.json())
            .then(data => data.map(item => { return setRec(list => [...list, item]) }))
    }, [])

    const handleClick = (e) => {
        console.log(e);
        setPath(e.target.id)
        setRecTitle(e.target.children[1].textContent)
    }

    console.log(path,recTitle);

    return(
    <div className="recContainer">
            <div className="recGrid">
                {rec.map((item,id) => {
                    return(
                        <div id={id+1} className="recDiv" onClick={handleClick}>
                            <img src={item.image}/>
                            <h4>{item.title}</h4>
                            <h5>{item.location}</h5>
                        </div>
                    )
                })}
            </div>
            <div className="recMap">
                <Map/>
            </div>
            <Routes>
                <Route path={`/${path}`} element={<RecPage title={recTitle}/>}/>
            </Routes>
    </div>
    )
}

export default Reccomandations