const express = require("express")

const { validate } = require("../middlewares/validation.middleware")
const { createTicket, getTicketByEvent, getTicketById, updateTicket, deleteTicket } = require("../controllers/ticket.controller")
const { authenticate, authorize } = require("../middlewares/auth.middleware")
const { createTicketSchema, updateTicketSchema } = require("../validations/ticket.validation")

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket management
 */

/**
 * @swagger
 * /api/events/{eventId}/tickets:
 *   post:
 *     summary: Create a ticket for an event
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: VIP
 *               price:
 *                 type: integer
 *                 example: 150000
 *               stock:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 *       404:
 *         description: Event not found
 */
router.post(
    "/events/:eventId/tickets",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    validate(createTicketSchema),
    createTicket
)

/**
 * @swagger
 * /api/events/{eventId}/tickets:
 *   get:
 *     summary: Get tickets by event
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Tickets retrieved successfully
 *       404:
 *         description: Event not found
 */
router.get(
    "/events/:eventId/tickets",
    getTicketByEvent
)

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ticket ID
 *     responses:
 *       200:
 *         description: Ticket retrieved successfully
 *       404:
 *         description: Ticket not found
 */
router.get(
    "/tickets/:id",
    getTicketById   
)

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: VIP
 *               price:
 *                 type: integer
 *                 example: 175000
 *               stock:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 *       404:
 *         description: Ticket not found
 */
router.put(
    "/tickets/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    validate(updateTicketSchema),
    updateTicket
)

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ticket ID
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 *       404:
 *         description: Ticket not found
 */
router.delete(
    "/tickets/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    deleteTicket
)


module.exports = router