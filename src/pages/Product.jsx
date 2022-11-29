import { useDispatch, useSelector } from 'react-redux'
import './Product.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getDataProducts, addToCart } from '../redux/slice/ProductSlice'
import Navbar from '../components/Navbar'

const Product = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getDataProducts())
  }, [dispatch])

  const fetchData = useSelector((state) => state.product.value.products)

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    navigate('/cart')
  }

  return (
    <div>
    <Navbar/>
    <div className='products'>
      <div className="display_product">
        {fetchData?.map((item, index) => {
          return <div key={index}>
            <div className="card" style={{width: '18rem'}}>
              <img src={item.image} className="card-img-top" alt="product"/>
              <div className="card-body">
                <h4 className="card-title">{item.name}</h4>
                <h6 className="card-text"><span>$</span> {item.price}</h6>
                <p className="card-text">{item.description}</p>
                <button className='btn btn-primary' onClick={() => handleAddToCart()}>ADD TO CART</button>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
    </div>
  )
}

export default Product