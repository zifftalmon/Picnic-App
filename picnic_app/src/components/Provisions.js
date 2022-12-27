import { useState,useEffect } from "react"
import Status from "./Status"

const Provisions = () => {
    const [list,setList] = useState(['water','hat','snacks'])


    useEffect(() => {
        const getList = async() => {
            const call = await fetch('http://localhost:3001/provisions')
            const res = await call.json()
            res.map(item => {
                return setList(list => [...list, item.name])
            })
        }
        getList()
    },[])



    const handleSubmit = (e) => {
            fetch('http://localhost:3001/provisions', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:e.target[0].value})
            })
            .then(data => data.json())
            .then(res => setList(list => [...list, res]))
    }

    const removeItem = (e) => {
        console.log(e);
        fetch(`http://localhost:3001/provisions`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },  
            body: JSON.stringify({name:e.target.previousSibling.textContent})
        })
        .then(res => res.json())
        list.splice(e.target.id, 1)
        setList([...list])
    }

    const handleCheck = (e) => {
        if(e.target.checked) {
            e.target.nextSibling.style.textDecoration = 'line-through'
        }else{
            e.target.nextSibling.style.textDecoration = ''
        }
    }
    
    return (
        <div>
            <div className="provisions">
                <Status/>
                <form className="listForm" onSubmit={handleSubmit}>
                    <input type='text' placeholder="enter an item   (i.e: mashed potato, wine)" required/>
                    <input type='submit'/>
                </form>
                    <div className="list">
                        {
                            list.length > 0 ? 
                            list.map((item,i) => {
                                return(
                                    <div className="listDiv" key={i}>
                                        <div className="item">
                                            <input onChange={handleCheck} name={item} type='checkbox' id={item}/>
                                            <label htmlFor={item}>{item}</label> 
                                        </div>
                                        <button id={i} onClick={removeItem}>delete item</button>
                                    </div>
                                )
                            }):
                            <h1><i>please add an item</i></h1>
                        }
                        {
                            list.length > 0 ?
                            <div>
                                <input type='text' placeholder="location"/>
                                <input type='text' placeholder="list name"/>
                                <button>save list</button>
                            </div>:
                            <div>
                            </div>
                        }
                    </div>
            </div>
        </div>
    )
}

export default Provisions