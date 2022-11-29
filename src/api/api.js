import axios from 'axios'
const baseURL = "http://localhost:5000/api"

export const getAllProducts = async () => {
  const fetchData = await axios.get(`${baseURL}/get-all-products`)

  return fetchData.data
}