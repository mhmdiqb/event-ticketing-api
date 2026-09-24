const express = require("express")

const {createEvent} = require("../controllers/event.contoller")

const { authenticate, authorize } = require("../middlewares/auth.middleware")

const router = express.Router()

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    createEvent
)

module.exports = router

