import { useState, useEffect } from "react";

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
      {
        favoriteList.map(item => {
          return(
            <div key={item.id}>
              <h1>{item.title}</h1>
              <h2>{item.description}</h2>
              {/* <h3>{item.latitude},{item.longitude}</h3> */}
            </div>
          )
        })
      }
    </div>
  )
}

export default Favorites