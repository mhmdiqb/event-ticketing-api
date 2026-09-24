const express = require("express")

const { createTicket } = require("../controllers/ticket.controller")
const { authenticate, authorize } = require("../middlewares/auth.middleware")

const router = express.Router()

router.post(
    "/events/:eventId/tickets",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    createTicket
)

module.exports = router