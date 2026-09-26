const express = require("express")

const { createOrder, getOrders, payOrder, getOderById, cancelOrder } = require("../controllers/order.controller")
const { authenticate} = require("../middlewares/auth.middleware")
const { route } = require("./auth.routes")

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

router.get(
    "/:id",
    authenticate,
    getOderById
)

router.post(
    "/:id/cancel",
    authenticate,
    cancelOrder
)

module.exports = router