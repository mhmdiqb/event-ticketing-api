const req = require("express/lib/request")
const prisma = require("../lib/prisma")

const createOrder = async (req, res) => {
    const { ticketId, quantity } = req.body

    if (!ticketId || !quantity) {
        return res.status(400).json({
            message: "ticketId and quantity are required"
        })
    }
    if (quantity <= 0) {
        return res.status(400).json({
            message: "Quantity must be greater than 0"
        })
    }
    try {
        const order = await prisma.$transaction(async (tx) => {
            const ticket = await tx.ticket.findUnique({
                where: {
                    id: Number(ticketId)
                }
            })
            if (!ticket) {
                throw new error("Ticket not found")
            }
            if (ticket.stock < quantity) {
                throw new error("Insufficient ticket stock")
            }
            const total = ticket.price * quantity

            const updateTicket = await tx.ticket.updateMany({
                where: {
                    id: Number(ticketId),
                    stock: {
                        gte: quantity
                    }
                },
                data: {
                    stock: {
                        decrement: quantity
                    }
                }
            })
            if (updateTicket.count === 0) {
                throw new Error("Insufficient ticket stock")
            }
            const newOrder = await tx.order.create({
                data: {
                    userId: req.user.id,
                    total: total,
                    status: "PENDING",
                    items: {
                        create: {
                            ticketId: ticket.id,
                            quantity: quantity,
                            price: ticket.price
                        }
                    }
                },
                include: {
                    items: true
                }
            })
            return newOrder
        })
        res.status(200).json({
            message: "Order created successfully"
        })
    } catch (error) {
        if (error.message === "Ticket not found") {
            return res.status(400).json({
                message: "Ticket not found"
            })
        }
        console.error(error)

        res.status(500).json({
            message: "failed to create order"
        })
    }
}

const getOrders = async(req, res) => {
    const orders = await prisma.order.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            items: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    res.status(200).json({
        message: "Orders retrieved successfully",
        data: orders
    })
}

const payOrder = async(req, res) => {
    const orderId = Number(req.params.id)

    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        if (order.userId !== req.user.id) {
            return res.status(403).json({
                message: "yo do not permission to pay this order"
            })
        }
        if (order.status !== "PENDING") {
            return res.status(400).json({
                message: "order cannot be paid"
            })
        }
        const updateOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: "PAID"
            }
        })
        res.status(200).json({
            message: "Payment successful",
            data: updateOrder
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Failed to proccess payment"
        })
    }
}

const getOderById = async (req, res) => {
    const orderId = Number(req.params.id)

    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                items: {
                    include: {
                        ticket: true
                    }
                }
            }
        })
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        if (order.userId !== req.user.id) {
            return res.status(403).json({
                message: "yo do not have permission to view this order"
            })
        }
        res.status(200).json({
            message: "Order retrieved successfully"
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: "Failed to retrieve order"
        })
    }
}

const cancelOrder = async(req, res) => {
    const orderId = Number(req.params.id)

    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                items: true
            }
        })
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        if (order.userId !== Number(req.user.id)) {
            return res.status(403).json({
                message: "You do not have permission to cancel this order"
            })
        }
        if (order.status !== "PENDING") {
            return res.status(400).json({
                message: "Only pending orders can be cancelled"
            })
        }
        const cancelledOrder = await prisma.$transaction(async (tx) => {
            for (const item of order.items) {
                await tx.ticket.update({
                    where: {
                        id: item.ticketId
                    },
                    data: {
                        stock: {
                            increment: item.quantity
                        }
                    }
                })
            }
            const updateOrder = await tx.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status: "CANCELLED"
                }
            })
            return updateOrder
        })
        res.status(200).json({
            message: "Order cancelled successfully",
            data: cancelledOrder
        })
    } catch (error) {
        console.error(error) 

        res.status(500).json({
            message: "failed to cancel to order"
        })
    }
}

const expireOrder = async (req, res) => {
    const orderId = Number(req.params.id) 

    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                items: true
            }
        })
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        if (order.status !== "PENDING") {
            return res.status(400).json({
                message: "Only pending orders can be expired"
            })
        }
        const expiredOrder = await prisma.$transaction(async(tx) => {
            for (const item of order.items) {
                await tx.ticket.update({
                    where: {
                        id: item.ticketId
                    },
                    data: {
                        stock: {
                            increment: item.quantity
                        }
                    }
                })
            }
            const updateOrder = await tx.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status: "EXPIRED"
                }
            })
            return updateOrder
        })
        res.status(200).json({
            message: "Order expired successfully",
            data: expiredOrder
        })
    } catch (error) {
        console.error(error)
        
        res.status(500).json({
            message: "Failed to expire order"
        })
    }
}

module.exports = {
    createOrder,
    getOrders,
    payOrder,
    getOderById,
    cancelOrder,
    expireOrder
}