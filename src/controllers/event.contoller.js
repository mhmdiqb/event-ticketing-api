const prisma = require("../lib/prisma");

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
        });
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
    });

    res.status(201).json({
        message: "Event created successfully",
        data: event
    });
};

module.exports = {
    createEvent
};