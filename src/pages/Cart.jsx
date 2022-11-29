import { useEffect } from 'react'
import './Cart.css'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar'
import { addToCart, decreaseCart, removeFromCart, totalItem, clearCart } from '../redux/slice/ProductSlice'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product.value)

  console.log(product.cartItem)

  useEffect(() => {
    dispatch(totalItem())
  }, [dispatch, product])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product))
  }

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }

  const handleClearCart = (product) => {
    dispatch(clearCart(product))
  }

  const checkOut = () => {
    alert("your furniture has been purchased")
    navigate('/')
  }

  return (
    <div className='cart'>
      <Navbar/>
      <div className="display_product_cart">
        {product.cartItem === 0? (
          <div className="cart_empty">
            <h4>Your cart is currently empty</h4>
            <p>Start to shop here</p>
            <Link to='/product'><LocalMallIcon/></Link>
          </div>
        ):(
          <div className='cart_items'>
            <div className="title">
              <h4>Product</h4>
              <h4>Price</h4>
              <h4>Quantity</h4>
              <h4>Total</h4>
            </div>
            {product.cartItem && product.cartItem.map((item, index) => {
              return <div className="product_item" key={index}>
                <img src={item.image} alt='product' />
                <h5>{item.name}</h5>
                <h5>{item.price}</h5>
                <p>{item.description}</p>
                <button className='btn btn-warning' onClick={() => handleRemoveFromCart(item)}>Remove cart</button>

                <div className="product_quantity_total">
                  <button className='btn btn-success' onClick={() => handleDecreaseCart(item)}>-</button>
                  <h4>{item.cartQuantity}</h4>
                  <button className='btn btn-success' onClick={() => handleAddToCart(item)}>+</button>
                </div>
              </div>
            })}

            <div className="summary">
              <button className='btn btn-danger' onClick={() => handleClearCart()} >Clear Cart</button>

              <div className="check_out">
                  <h3>Subtotal</h3>
                  <h5>{product?.productTotal}</h5>
                  <button className='btnbtn-primary' onClick={() => checkOut()} >Check Out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart