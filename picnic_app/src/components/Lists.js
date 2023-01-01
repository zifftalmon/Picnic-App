import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Lists = () => {
    const [lists,setLists] = useState([])

    useEffect(() => {
        fetch('/lists')
        .then(res => res.json())
        .then(data => data.map(item => { return setLists(list => [...list, item]) }))
      },[])

    return(
        <div>
            <h1>Lists</h1>
            <div className='listContainer'>
                {
                    lists.map(item => {
                        return(
                            <Link style={{textDecoration:'none', color:'black'}} to={`/lists/${item.id}`}>
                                <div className='savedList' key={item.id}>
                                    <h1>{item.name}</h1>
                                    <p>{item.location}</p>
                                    <p>{item.items.join(',')}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Lists