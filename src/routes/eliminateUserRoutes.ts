import express from "express";
import Entry from "../schemas/entrySchema";
import User from "../schemas/userSchema";
import tokenExtractor from "../utils/tokenExtractor";

const eliminateUserRouter = express.Router()

eliminateUserRouter.delete('/',tokenExtractor, async (request, response) => {
  const { userID } = request.body

  const returnedUser: any = await User.findByIdAndDelete(userID)
  await Entry.find({ user: userID }).deleteMany()

  if (returnedUser.length === 0 || !returnedUser || returnedUser === undefined) {
    return response.status(404).json({ error: "No data" })
  }


  try {
    
    return response.status(200).json({ message: 'Erased from the DB' })
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }

})

export default eliminateUserRouter