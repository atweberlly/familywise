import axios from './axios'

export const getUserData = async () => {
  try {
    const response = await axios.post('/users/getUser', {})
    return response.data.user[0]
  } catch (error) {
    console.log(error)
  }
}
