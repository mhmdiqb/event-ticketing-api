const express = require("express")

const { createOrder, getOrders, payOrder, getOderById, cancelOrder, expireOrder } = require("../controllers/order.controller")
const { authenticate} = require("../middlewares/auth.middleware")
const { validate } = require("../middlewares/validation.middleware")
const { createOrderSchema } = require("../validations/order.validation")


const router = express.Router()

router.post("/", authenticate, validate(createOrderSchema), createOrder)
router.get("/", authenticate, getOrders)
router.post("/:id/pay", authenticate, payOrder)
router.get("/:id", authenticate, getOderById)
router.post("/:id/cancel", authenticate, cancelOrder)
router.post("/:id/expire", authenticate, expireOrder)


module.exports = router