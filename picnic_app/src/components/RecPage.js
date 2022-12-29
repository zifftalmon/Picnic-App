import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

const RecPage = () => {
    
    const [details, setDetails] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/recommendations/${id}`)
            .then(res => res.json())
            .then(data => console.log(data))
    }, [])
    
    
    const {id} = useParams();

    console.log(id);

    return (
        <div>
            <h1>
                rec1
            </h1>
        </div>
    )
}

export default RecPage