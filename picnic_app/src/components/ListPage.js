import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

const ListPage = () => {
    const {id} = useParams();
    const [details, setDetails] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001//lists/${id}`)
            .then(res => res.json())
            .then(data => data.map(item => {return setDetails(recs => [...recs, item])}))
    }, [id])
    console.log(details);
    return(
        <div>
            {
                details.map(item => {
                    return(
                        <div>
                            <h1>{item.name}</h1>
                            <h2>{item.items.join(' ')}</h2>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListPage