const prisma = require("../lib/prisma")

const createEvent = async (req, res) => {

    const {
        title,
        description,
        location,
        startDate,
        endDate
    } = req.body;

    if (!title || !location || !startDate || !endDate) {
        return res.status(400).json({
            message: "Title, location, startDate, and endDate are required"
        })
    }

    const event = await prisma.event.create({
        data: {
            title,
            description,
            location,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            organizerId: req.user.id
        }
    })

    res.status(201).json({
        message: "Event created successfully",
        data: event
    })
}

const getEvents = async (req, res) => {

    const events = await prisma.event.findMany({
        orderBy: {
            startDate: "asc"
        }
    })

    res.status(200).json({
        message: "Events retrieved successfully",
        data: events
    })
}

const getEventById = async (req, res) => {
    const {id} = req.params
    const event = await prisma.event.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!event) {
        return res.status(404).json({
            message: "Event not found"
        })
    }
    res.status(200).json({
        message: "Event retrieved successfully",
        data: event
    })
}

module.exports = {
    createEvent,
    getEvents,
    getEventById
}