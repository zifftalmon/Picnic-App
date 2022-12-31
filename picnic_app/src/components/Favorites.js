import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const Favorites = () => {
  const [favoriteList,setFavoriteList] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/favorites')
    .then(res => res.json())
    .then(data => data.map(item => { return setFavoriteList(list => [...list, item]) }))
  },[])
  console.log(favoriteList);
  return(
    <div className="favoritesDiv">
      {
        favoriteList.map(item => {
          return(
            <Link style={{textDecoration:'none', color:'black'}} key={item.id} to={`/favorites/${item.id}`}>
            <div key={item.id} id={item.id} className="favoriteItem">
                <h1>{item.title}</h1>
            </div>
        </Link>
          )
        })
      }
    </div>
  )
}

export default Favorites