import { useState,useEffect } from "react"


const Provisions = () => {
    const [list,setList] = useState(['water','hat','snacks'])
    const [line,setLine] = useState('')
    const [count, setCount] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        setList(list => [...list, e.target[0].value])
    }

    const removeItem = (e) => {
        list.splice(e.target.id, 1)
        setList([...list])
    }
    const handleLine = (e) => {
        setCount(count + 1)
        if(count % 2 === 0) {
            e.currentTarget.style.textDecoration = 'line-through'
        }else{
            e.currentTarget.style.textDecoration = ''
        }
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
                <form className="listForm" onSubmit={handleSubmit}>
                    <input type='text' placeholder="enter an item   (i.e: mashed potato, wine)" required/>
                    <input type='submit'/>
                </form>
                    <div className="list">
                        {
                            list.map((item,i) => {
                                return(
                                    <div className="listDiv" key={i}>
                                        <div className="item">
                                            <input onChange={handleCheck} name={item} type='checkbox' id={item}/>
                                            <label htmlFor={item} onClick={handleLine} style={{textDecoration:line}}>{item}</label> 
                                        </div>
                                        <button id={i} onClick={removeItem}>delete item</button>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
        </div>
    )
}

export default Provisions