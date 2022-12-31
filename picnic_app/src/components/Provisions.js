import { useState, useEffect } from "react"
import Status from "./Status"

const Provisions = () => {
    const [list, setList] = useState(['water', 'hat', 'snacks'])


    useEffect(() => {
        fetch('http://localhost:3001/provisions')
            .then(res => res.json())
            .then(data => data.map(item => { return setList(list => [...list, item.name]) }))
    }, [])



    const handleSubmit = (e) => {
        fetch('http://localhost:3001/provisions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: e.target[0].value })
        })
            .then(data => data.json())
            .then(res => setList(list => [...list, res]))
    }

    const removeItem = (e) => {
        console.log(e);
        fetch(`http://localhost:3001/provisions`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: e.target.previousSibling.textContent })
        })
            .then(res => res.json())
        list.splice(e.target.id, 1)
        setList([...list])
    }

    const handleCheck = (e) => {
        if (e.target.checked) {
            e.target.nextSibling.style.textDecoration = 'line-through'
        } else {
            e.target.nextSibling.style.textDecoration = ''
        }
    }

    const handleListName = (e) => {
        fetch('http://localhost:3001/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { 
                location:e.target[0].value,
                name:e.target[1].value, 
                items:list
                })
        })
    }

    return (
        <div>
            <div className="provisions">
                <Status />
                <form className="listForm" onSubmit={handleSubmit}>
                    <input type='text' placeholder="enter an item   (i.e: mashed potato, wine)" required />
                    <input type='submit' />
                </form>
                <div className="list">
                    {
                        list.length > 0 ?
                            list.map((item, i) => {
                                return (
                                    <div className="listDiv" key={i}>
                                        <div className="item">
                                            <input onChange={handleCheck} name={item} type='checkbox' id={item} />
                                            <label htmlFor={item}>{item}</label>
                                        </div>
                                        <button id={i} onClick={removeItem}>delete item</button>
                                    </div>
                                )
                            }) :
                            <h1><i>please add an item</i></h1>
                    }
                    {
                        list.length > 0 ?
                            <div>
                                <form onSubmit={handleListName}>
                                    <input type='text' placeholder="location" />
                                    <input type='text' placeholder="list name" />
                                    <input type='submit' value='save list' />
                                </form>
                            </div> :
                            <div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Provisions