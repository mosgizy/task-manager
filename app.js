const express = require('express')
const app = express()
const task = require('./routes/task')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

app.use('/api/v1/tasks', task)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT | 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port,() => console.log(`Server listening on port ${port}`))
  } catch (error) {
    console.error(error)
  }
}

start()
