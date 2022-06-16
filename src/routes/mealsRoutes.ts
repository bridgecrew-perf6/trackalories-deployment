import express from 'express'
import Entry from '../schemas/entrySchema';
import User from '../schemas/userSchema';
import tokenExtractor from '../utils/tokenExtractor';


const mealsRouter = express.Router()

mealsRouter.get("/", tokenExtractor,async (request, response) => {
  const { userID } = request.body
  const meals = await Entry.find({ user: userID }).populate("user", { username: 1 })


  response.status(200).json(meals)
})



mealsRouter.post('/',tokenExtractor, async (request, response) => {
  const { date, userID, data } = request.body

  const meal: any = await Entry.find({ date: date, user: userID })


  if (meal.length > 0) {
    meal[0].data = meal[0].data.concat(data)
    try {
      await meal[0].save()
      return response.status(200).json(meal[0])
    } catch (error) {
      console.log(error)
      return response.status(400)
    }
  }

  const mealEntry = new Entry({
    ...request.body,
    user: userID
  }
  );

  const user: any = await User.findById(userID)


  user.entries = user.entries.concat(mealEntry._id)
  try {
    await mealEntry.save();
    await user.save()

    return response.status(200).json(mealEntry)


  } catch (error) {
    console.log(error)
    return response.status(400)
  }

})

export default mealsRouter
