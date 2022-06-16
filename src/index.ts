import express from 'express'
import { MONGO, PORT } from './config/config'
import loginRouter from './routes/loginRoutes'
import registerRouter from './routes/registerRoutes'
import mealsRouter from './routes/mealsRoutes'
import weightRouter from './routes/weightRoutes'
import personalRouter from './routes/personalRoutes'

import cors from 'cors'
import { connect } from 'mongoose'
import pingRouter from './routes/pingRoutes'
import eliminateUserRouter from './routes/eliminateUserRoutes'


const app = express()

app.use(cors())
app.use(express.json())
// app.use(express.static('build')) 

app.use('/ping', pingRouter)
app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)

app.use('/api/eliminate', eliminateUserRouter)
app.use('/api/meals', mealsRouter)
app.use('/api/personal', personalRouter)
app.use('/api/weight', weightRouter)

connectMDB().catch(err => console.log(err));

async function connectMDB() {
  // Connect to MongoDB
  await connect(`${MONGO}`);
  console.log('Connected To MongoDB')
}

app.listen(PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`Server running on port ${PORT}`)
})


