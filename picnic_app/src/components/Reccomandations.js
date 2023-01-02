import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Map from "./Map"

const Reccomandations = () => {
    const [rec, setRec] = useState([])
    const [form, setForm] = useState('hidden')

    useEffect(() => {
        fetch('/recommendations')
            .then(res => res.json())
            .then(data => data.map(item => { return setRec(recs => [...recs, item]) }))
    }, [])

    const hanldeRecSubmit = (e) => {
              fetch('/recommendations', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                { 
                  title:e.target[1].value,
                  location:e.target[2].value, 
                  description:e.target[3].value,
                  image:e.target[4].value,
                  is_shaded:e.target[5].checked,
                  is_parking:e.target[6].checked,
                  is_water:e.target[7].checked,
                  is_space:e.target[8].checked
                })
              })
            }
    
    return(
    <div className="recContainer">
            <div className="recGrid">
                {rec.map((item,id) => {
                    return(
                        <Link style={{textDecoration:'none', color:'black'}} key={id} to={`/recommendations/${item.id}`}>
                                <div key={id} id={id} className="recDiv">
                                    <img alt={`img${id}`} src={item.image}/>
                                    <h5>{item.title}</h5>
                                    <h6>{item.location}</h6>
                                </div>
                            </Link>
                    )
                })}
            </div>
            <div className="recForm" style={{visibility:form}}>
                <form onSubmit={hanldeRecSubmit}>
                    <button style={{position:'absolute', right:'48em',top:'1em',cursor:'pointer'}} onClick={() => setForm('hidden')}>close</button>
                    <input type='text' placeholder="enter title" required/>
                    <br/>
                    <select>
                        <option>North</option>
                        <option>South</option>
                        <option>Center</option>
                    </select>
                    <br/>
                    <input type='text' placeholder="enter description" required/>
                    <br/>
                    <input type='text' placeholder="image link" required/>
                    <p>check for yes, leave blank for no</p>
                    <input type='checkbox' id="shade"/>
                    <label htmlFor="park">is the location shaded?</label>
                    <br/>
                    <input type='checkbox' id='park'/>
                    <label htmlFor="shade">does the location have parking?</label>
                    <br/>
                    <input type='checkbox' id='water'/>
                    <label htmlFor="water">does the location have a body of water?</label>
                    <br/>
                    <input type='checkbox' id='space'/>
                    <label htmlFor="space">is the location spacious?</label>
                    <br/>
                    <input type='submit' value='submit reccomandation'/>
                </form>
            </div>
            <div className="recMap">
                <Map/>
            <button className="addRec" onClick={() => setForm('visible')}>add a reccomandation</button>
            </div>
    </div>
    )
}

export default Reccomandations