const express = require("express")

const { validate } = require("../middlewares/validation.middleware")
const { createTicket, getTicketByEvent, getTicketById, updateTicket, deleteTicket } = require("../controllers/ticket.controller")
const { authenticate, authorize } = require("../middlewares/auth.middleware")
const { createTicketSchema, updateTicketSchema } = require("../validations/ticket.validation")

const router = express.Router()

router.post(
    "/events/:eventId/tickets",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    validate(createTicketSchema),
    createTicket
)

router.get(
    "/events/:eventId/tickets",
    getTicketByEvent
)

router.get(
    "/tickets/:id",
    getTicketById   
)

router.put(
    "/tickets/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    validate(updateTicketSchema),
    updateTicket
)

router.delete(
    "/tickets/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    deleteTicket
)


module.exports = router