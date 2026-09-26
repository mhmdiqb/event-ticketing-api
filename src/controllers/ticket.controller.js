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
const getTicketByEvent = async (req, res) => {
    const { eventId } = req.params

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

    const tickets = await prisma.ticket.findMany({
        where: {
            id: Number(eventId)
        },
        orderBy: {
            price: "asc"
        }
    })
    res.status(200).json({
        message: "Tickets retrieved successfully",
        data: tickets
    })
}

const getTicketById = async (req, res) => {
    const { id } = req.params

    const ticket = await prisma.ticket.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            event: true
        }
    })
    if (!ticket) {
        return res.status(404).json({
            message: "Ticket not found"
        })
    }
    res.status(200).json({
        message: "Ticket retrieved successfully",
        data: ticket
    })
}

const updateTicket = async (req, res) => {
    const { id } = req.params
    const { name, price, stock } = req.body

    const existingTicket = await prisma.ticket.findUnique({
        where: {
            id: Number(id)
        }
    })
    
    if (!existingTicket) {
        return res.status(404).json({
            message: "Ticket not found"
        })
    }

    const ticket = await prisma.ticket.update({
        where: {
            id: Number(id)
        },
        data: {
            name: name ?? existingTicket.name,
            price: price !== undefined
                ? Number(price)
                : existingTicket.price,
            stock: stock !== undefined
                ? Number(stock)
                : existingTicket.stock
        }
    })
    res.status(200).json({
        message: "Ticket update Successfully",
        data: ticket
    })
}

const deleteTicket = async (req, res) => {
    const { id } = req.params

    const existingTicket = await prisma.ticket.findUnique({
        where: {
            id: Number(id)
        }
    })
    if (!existingTicket) {
        return res.status(404).json({
            message: "Ticket not found"
        })
    }

    await prisma.ticket.delete({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        message: "Ticket deleted successfully"
    })
}

module.exports = {
    createTicket,
    getTicketByEvent,
    getTicketById,
    updateTicket,
    deleteTicket
}

