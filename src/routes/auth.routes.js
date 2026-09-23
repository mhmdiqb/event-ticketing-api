const express = require("express")

const { registerUser, loginUser, getMe } = require("../controllers/user.controller")
const { authenticate } = require("../middlewares/middleware")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", authenticate, getMe)

module.exports = router;