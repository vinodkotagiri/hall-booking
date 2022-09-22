const nodemon = require('nodemon')
const Room = require('../models/rooms')

// List All the customers with booked Data
const getBookings = async (req, res) => {
	try {
		const bookedRooms = await Room.find({ isBooked: true })

		res.status(200).send(bookedRooms)
	} catch (error) {
		res.status(500).send('Internal Server Error: ' + error.message)
	}
}

//Create a new booking

const createBookings = async (req, res) => {
	try {
		// Get the booking data from the client
		const { customerName, Date, startTime, endTime, roomID } = req.body

		//See if the room is already booked
		const room = await Room.findOne({ _id: roomID }).lean()
		if (room.isBooked) return res.status(400).send('Already booked')

		//Book the room and update status
		await Room.updateOne(
			{ _id: roomID },
			{ customerName, Date, startTime, endTime, isBooked: true }
		)
	} catch (error) {
		res.status(500).send('Internal Server Error:' + error.message)
	}
}
module.exports = { getBookings, createBookings }
