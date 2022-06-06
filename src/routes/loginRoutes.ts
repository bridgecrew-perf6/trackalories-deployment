import express from 'express'
import { SECRET } from '../config/config';
const bcrypt = require('bcrypt');
import User from '../schemas/userSchema';
const jwt = require("jsonwebtoken")


const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const returnedUser: any = await User.find({ email: email })

  if (returnedUser.length === 0 || !returnedUser || returnedUser === undefined) {
    return response.status(404).json({ error: "No data in the DB" })
  }

  let user = returnedUser[0]
  const passwordCorrect = user === null ? false :
    await bcrypt.compare(password, user.password)

  let userToken

  if (passwordCorrect) userToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userToken, SECRET, {
    expiresIn: 60 * 60 * 24 * 5,
  })


  try {
    return response.status(200).json({
      username: user.username,
      email: user.email, activity: user.activity, height: user.height, weight: user.weight,
      token
    })

  } catch (error) {
    console.log(error)
    return response.status(400).send(error)
  }

})

export default loginRouter
