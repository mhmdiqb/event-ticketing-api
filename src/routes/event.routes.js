const express = require("express")

const { createEvent, getEvents, getEventById, updateEvent, deleteEvent} = require("../controllers/event.contoller")

const { authenticate, authorize } = require("../middlewares/auth.middleware")
const { post } = require("./auth.routes")

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

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    deleteEvent
)


module.exports = router

