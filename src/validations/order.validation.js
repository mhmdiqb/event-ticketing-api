const { z } = require("zod")

const createOrderSchema = z.object({
    ticketId: z.coerce
        .number()
        .int()
        .positive(),

    quantity: z.coerce
        .number()
        .int()
        .positive()
})

module.exports = {
    createOrderSchema
}