import axios from 'axios'
import Cookies from 'universal-cookie'

const dev = process.env.NODE_ENV !== 'production'
const server = dev ? 'http://localhost:3000/api/' : 'https://www.familyfortunate.us/api/'
const instance = axios.create({
  baseURL: server,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

instance.defaults.headers.common['Authorization'] = `Bearer ${new Cookies().get('TOKEN') || ''}`

export const setAuthToken = (token: string | undefined) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete instance.defaults.headers.common['Authorization']
  }
}

export default instance
