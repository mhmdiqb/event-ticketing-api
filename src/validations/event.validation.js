const { z } = require("zod")

const createEventSchema = z.object({
    title: z.string().min(3),
    description:z.string().optional(),
    location:z.string().min(3),
    startDate:z.coerce.date(),
    endDate:z.coerce.date()
})

module.exports = {
    createEventSchema
}