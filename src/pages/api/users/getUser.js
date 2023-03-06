import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'
import * as jose from 'jose'
import Cookies from 'universal-cookie'

const getUser = async (req, res) => {
  const SECRET = new TextEncoder().encode(`${process.env.JWT_SECRET}`)
  const cookies = new Cookies(req.headers.cookie)
  const jwtToken = cookies.get('TOKEN')
  try {
    const { payload: DATA } = await jose.jwtVerify(jwtToken, SECRET)

    await dbConnect()
    const user = await User.find({
      email: DATA.userEmail,
    })
    res.status(200).json({ user: user })
  } catch (error) {
    console.log('GetAuthenticatedUser, Something Went Wrong', error)
    res.status(400).json(error)
  }
}

export default getUser
