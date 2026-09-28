const express = require("express")

const { createEvent, getEvents, getEventById, updateEvent, deleteEvent} = require("../controllers/event.contoller")

const { authenticate, authorize } = require("../middlewares/auth.middleware")
const { validate } = require("../middlewares/validation.middleware")
const { createEventSchema } = require("../validations/event.validation")

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 */

router.get("/", getEvents)

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *       404:
 *         description: Event not found
 */
router.get("/:id", getEventById)

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - location
 *               - startDate
 *               - endDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Konser Musik Ponorogo
 *               description:
 *                 type: string
 *                 example: Konser musik tahunan
 *               location:
 *                 type: string
 *                 example: Alun-Alun Ponorogo
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-10-10T19:00:00
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-10-10T22:00:00
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have permission
 */

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    validate(createEventSchema),
    updateEvent
);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have permission
 *       404:
 *         description: Event not found
 */
router.post(
    "/",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    validate(createEventSchema),
    createEvent
)

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - location
 *               - startDate
 *               - endDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Konser Musik Ponorogo Updated
 *               description:
 *                 type: string
 *                 example: Event telah diperbarui
 *               location:
 *                 type: string
 *                 example: Alun-Alun Ponorogo
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-10-10T19:00:00
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-10-10T22:00:00
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have permission
 *       404:
 *         description: Event not found
 */

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    deleteEvent
)


module.exports = router

