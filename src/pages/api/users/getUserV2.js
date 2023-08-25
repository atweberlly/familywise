import * as jose from 'jose'
import Cookies from 'universal-cookie'
import User from '../../../../models/userModel'

const getUser = async (cookie) => {
  const SECRET = new TextEncoder().encode(`${process.env.JWT_SECRET}`)
  const cookies = new Cookies(cookie)
  const jwtToken = cookies.get('TOKEN')
  const { payload: DATA } = await jose.jwtVerify(jwtToken, SECRET)
  const user = await User.find({
    email: DATA.userEmail,
  })

  if (user) return user[0]
}

export { getUser }
