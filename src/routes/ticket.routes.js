const express = require("express")

const { createTicket, getTicketByEvent, getTicketById, updateTicket, deleteTicket } = require("../controllers/ticket.controller")
const { authenticate, authorize } = require("../middlewares/auth.middleware")
const { get } = require("./auth.routes")

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

router.get(
    "/tickets/:id",
    getTicketById   
)

router.put(
    "/tickets/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    updateTicket
)

router.delete(
    "/tickets/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    deleteTicket
)


module.exports = router