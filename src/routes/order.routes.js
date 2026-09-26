const express = require("express")

const { createOrder, getOrders, payOrder } = require("../controllers/order.controller")
const { authenticate} = require("../middlewares/auth.middleware")

const router = express.Router()

router.post(
    "/",
    authenticate,
    createOrder
)

router.get(
    "/",
    authenticate,
    getOrders
)

router.post(
    "/:id/pay",
    authenticate,
    payOrder
)

module.exports = router