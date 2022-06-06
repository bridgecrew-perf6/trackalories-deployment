export interface User {
  username: String,
  email: String,
  password: String,
  height: Number,
  weight: Weight[],
  sex: Sex,
  activity: Number,
  birthdate: Date
  entries: Entry[]
}


export enum Sex {
  male = 'male',
  female = 'female'
}

export interface Entry {
  date: String | undefined,
  data: [],
  user: String
}

export interface Weight {
  date: String,
  weight: Number
}