const exppress = require('express')
const { log } = require('node:console')

const app = exppress()

app.use(exppress.json())

app.get("/", (req, res) => {
    res.json({
        message: "Event Ticketing API is running"
    })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server runningon htpp://localhost:${PORT}`)
})
