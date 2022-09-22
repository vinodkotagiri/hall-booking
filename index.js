const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())

const port = 8000

//Home route

const getHome = (req, res) => {
	res.status(200).sendFile(path.join(__dirname, '/index.html'))
}
app.use('/', getHome)

//Room routes
const roomRoutes = require('./routes/room')
app.use('/rooms', roomRoutes)

//Bookings routes
const bookingRoutes = require('./routes/booking')
app.use('/bookings', bookingRoutes)

//Connect Database
mongoose.connect(process.env.MONGO_URL, () => console.log('Database connected'))
//Listen the server on port
app.listen(port, () => console.log('listening on port ' + port))
