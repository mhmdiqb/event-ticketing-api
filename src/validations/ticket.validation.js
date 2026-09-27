const { z } = require("zod")

const createTicketSchema = z.object({
    name: z.string().min(2),
    price: z.coerce.number().int().positive(),
    stock: z.coerce.number().int().nonnegative()
})

const updateTicketSchema = z.object({
    name: z.string().min(2).optional(),
    price: z.coerce.number().int().positive().optional(),
    stock: z.coerce.number().int().nonnegative().optional()
})

module.exports = {
    createTicketSchema,
    updateTicketSchema
}