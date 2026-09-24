const exppress = require('express')
const { log } = require('node:console')
const authRoutes = require("./routes/auth.routes")
const eventRoutes = require("./routes/event.routes")
const ticketRoutes = require("./routes/ticket.routes")

const app = exppress()

app.use(exppress.json())
app.use("/api/auth", authRoutes)
app.use("/api/events", eventRoutes)
app.use("/api",ticketRoutes)

app.get("/", (req, res) => {
    res.json({
        message: "Event Ticketing API is running"
    })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server runningon htpp://localhost:${PORT}`)
})
