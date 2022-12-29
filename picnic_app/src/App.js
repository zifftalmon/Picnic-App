import Home from './components/Home';
import Navbar from './components/Navbar';
import RecPage from './components/RecPage';
import Provisions from './components/Provisions';
import Favorites from './components/Favorites';
import Reccomandations from './components/Reccomandations';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import './styles/Provisions.css'
import './styles/Nav.css'
import './styles/Map.css'
import './styles/Rec.css'
import './styles/RecPage.css'
import './styles/RecMap.css'


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/provisions' element={<Provisions/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/recommendations' element={<Reccomandations/>}/>
          <Route path='/recommendations/:id' element={<RecPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
