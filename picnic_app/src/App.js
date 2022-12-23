import Home from './components/Home';
import Navbar from './components/Navbar';
import Provisions from './components/Provisions';
import Favorites from './components/Favorites';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/provisions' element={<Provisions/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
