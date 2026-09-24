const express = require("express")

const {createEvent, getEvents} = require("../controllers/event.contoller")

const { authenticate, authorize } = require("../middlewares/auth.middleware")

const router = express.Router()

router.get("/", getEvents)

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    createEvent
)


module.exports = router

