import React from 'react'
import './Navbar.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { productQuantity } = useSelector((state) => state.product.value)

  return (
    <div className='navbar'>
      <div className="container">
        <Link to='/product'>Furniture <span><LocalMallIcon/></span></Link>
        <ul className='nav_cart'>
          <li>
            <ShoppingCartIcon /> <span className='quantity'>{productQuantity}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar