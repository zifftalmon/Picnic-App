import {useState, useEffect} from 'react'

const Lists = () => {
    const [lists,setLists] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/lists')
        .then(res => res.json())
        .then(data => data.map(item => { return setLists(list => [...list, item]) }))
      },[])

    return(
        <div>
            <h1>Lists</h1>
            {
                lists.map(item => {
                    return(
                        <div key={item.id}>
                            <h1>{item.name}</h1>
                            <p>{item.location}</p>
                            <p>{item.items.join(',')}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Lists