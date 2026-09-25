const express = require("express")

const { createTicket, getTicketByEvent } = require("../controllers/ticket.controller")
const { authenticate, authorize } = require("../middlewares/auth.middleware")

const router = express.Router()

router.post(
    "/events/:eventId/tickets",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    createTicket
)

router.get(
    "/events/:eventId/tickets",
    getTicketByEvent
)

module.exports = router