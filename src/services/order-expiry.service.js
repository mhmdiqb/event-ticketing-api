const prisma = require("../lib/prisma")

const expirePendingOrders = async () => {

    try {

        const fifteenMinutesAgo = new Date(
            Date.now() - 1 * 60 * 1000
        )

        const orders = await prisma.order.findMany({
            where: {
                status: "PENDING",
                createdAt: {
                    lte: fifteenMinutesAgo
                }
            },
            include: {
                items: true
            }
        })

        for (const order of orders) {

            await prisma.$transaction(async (tx) => {

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

                await tx.order.update({
                    where: {
                        id: order.id
                    },
                    data: {
                        status: "EXPIRED"
                    }
                })

            })

            console.log(`Order #${order.id} expired automatically`)
        }

    } catch (error) {

        console.error(
            "Failed to expire pending orders:",
            error
        )

    }

}

module.exports = {
    expirePendingOrders
}