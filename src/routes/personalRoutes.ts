import express from 'express'
import { SALT_ROUNDS } from '../config/config'
import User from '../schemas/userSchema'
const bcrypt = require('bcrypt');

const personalRouter = express.Router()


personalRouter.get("/", async (request, response) => {
  const { userID } = request.body
  const returnedUser: any = await User.findById(userID)
  let { username, email, activity, height, weight } = returnedUser

  if (!returnedUser || returnedUser === undefined) {
    return response.status(404).json({ error: "No data" })
  }

  try {
    return response.status(200).json({ username: username, email: email, activity: activity, height: height, weight: weight })
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }
})


personalRouter.put('/', async (request, response) => {
  let { userID, username, email, password, activity } = request.body


  const returnedUser: any = await User.findById(userID)

  if (!returnedUser || returnedUser === undefined) {
    return response.status(404).json({ error: "No data" })
  }

  if (password !== undefined) password = await bcrypt.hashSync(password, SALT_ROUNDS)


  await User.findByIdAndUpdate(userID, {
    username: username,
    email: email,
    activity: activity,
    password
  }, { runValidators: true })


  try {
    return response.status(200).send('Done!')
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }
})


export default personalRouter