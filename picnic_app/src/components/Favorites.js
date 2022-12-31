import { useState, useEffect } from "react";
import RecMap from "./RecMap";

const Favorites = () => {
  const [favoriteList,setFavoriteList] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/favorites')
    .then(res => res.json())
    .then(data => data.map(item => { return setFavoriteList(list => [...list, item]) }))
  },[])
  console.log(favoriteList);
  return(
    <div>
      <h1>favorites</h1>
      {
        favoriteList.map(item => {
          return(
            <div key={item.id}>
              <h1>{item.title}</h1>
              <RecMap/>
            </div>
          )
        })
      }
    </div>
  )
}

export default Favorites