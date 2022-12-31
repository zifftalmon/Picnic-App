import Home from './components/Home';
import Lists from './components/Lists';
import Navbar from './components/Navbar';
import RecPage from './components/RecPage';
import ListPage from './components/ListPage';
import Favorites from './components/Favorites';
import Provisions from './components/Provisions';
import FavoritesPage from './components/FavoritePage';
import Reccomandations from './components/Reccomandations';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import './styles/Provisions.css'
import './styles/Nav.css'
import './styles/Map.css'
import './styles/Rec.css'
import './styles/RecPage.css'
import './styles/RecMap.css'
import './styles/Favorites.css'
import './styles/Lists.css'



function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/provisions' element={<Provisions/>}/>
          <Route path='/lists' element={<Lists/>}/>
          <Route path='/lists/:id' element={<ListPage/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/recommendations' element={<Reccomandations/>}/>
          <Route path='/recommendations/:id' element={<RecPage/>}/>
          <Route path='/favorites/:id' element={<FavoritesPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
