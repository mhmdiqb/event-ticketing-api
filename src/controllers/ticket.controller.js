const prisma = require("../lib/prisma")
const { registerUser } = require("./user.controller")

const createTicket = async (req, res) => {
    const { eventId } = req.params
    const { name, price, stock } = req.body

    if (!name || !price === undefined || !stock === undefined ) {
        return res.status(400).json({
            message: "Name, price, and stock are required"
        })
    }

    const event = await prisma.event.findUnique({
        where: {
            id: Number(eventId)
        }
    })

    if (!event) {
        return res.status(404).json({
            message: "Event not found"
        })
    }
    const ticket = await prisma.ticket.create({
        data: {
            name,
            price: Number(price),
            stock: Number(stock),
            eventId: Number(eventId)
        }
    })
    res.status(200).json({
        message: "Ticket created successfully",
        data: ticket
    })
}

module.exports = {
    createTicket
}