import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

import Home from './pages/Home';
import Product from './pages/Product'
import Cart from './pages/Cart'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
