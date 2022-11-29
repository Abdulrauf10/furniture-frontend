import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <h1 className='home_furniture'>FIND YOUR BEST FURNITURE<span><br/>HERE</span></h1>
      <Link to='/product'>
        <button className='btn btn-success'>GO TO PRODUCTS</button>
      </Link>
    </div>
  )
}

export default Home