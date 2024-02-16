const express = require("express")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middlewares/errorMiddleware")
const port = process.env.PORT || 5000
const colors = require('colors')
const connectDB = require('./config/db')

connectDB();

const app = express()


// middlewares to receive body data from postman
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", require('./routes/goalRoutes'))
app.use("/api/users", require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started in port ${port}`));


