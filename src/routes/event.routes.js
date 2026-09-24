const express = require("express")

const {createEvent, getEvents, getEventById, updateEvent} = require("../controllers/event.contoller")

const { authenticate, authorize } = require("../middlewares/auth.middleware")

const router = express.Router()

router.get("/", getEvents)
router.get("/:id", getEventById)

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    updateEvent
);

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    createEvent
)


module.exports = router

