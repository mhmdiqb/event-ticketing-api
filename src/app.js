const exppress = require('express')
const helmet = require("helmet")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const swaggerUI = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")

const authRoutes = require("./routes/auth.routes")
const eventRoutes = require("./routes/event.routes")
const ticketRoutes = require("./routes/ticket.routes")
const orderRoutes = require("./routes/order.routes")
const { expirePendingOrders } = require("./services/order-expiry.service")

const app = exppress()

app.use(helmet())
app.use(cors())
app.use(exppress.json())
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: "Too many request, please try again later"
    }
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use("/api", apiLimiter)
app.use("/api/auth", authRoutes)
app.use("/api/events", eventRoutes)
app.use("/api",ticketRoutes)
app.use("/api/orders", orderRoutes)

setInterval(() => {
    expirePendingOrders()
}, 60 * 1000)

app.get("/", (req, res) => {
    res.json({
        message: "Event Ticketing API is running"
    })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server runningon htpp://localhost:${PORT}`)
})
