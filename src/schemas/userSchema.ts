import mongoose, { Schema, model } from 'mongoose';
import { User } from '../types/types';
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: [], required: true },
  activity: { type: Number, required: true },
  sex: { type: String, required: true },
  birthdate: { type: Date, required: true },
  entries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entry",
    }
  ]
})

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.password
  },
})
userSchema.plugin(uniqueValidator)
const User = model<User>('User', userSchema)

export default User 