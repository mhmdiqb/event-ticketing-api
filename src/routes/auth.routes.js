const express = require("express")

const { registerUser, loginUser, getMe, adminTest } = require("../controllers/user.controller")
const { authenticate, authorize } = require("../middlewares/middleware")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", authenticate, getMe)
router.get("/admin-test", authenticate, authorize("ADMIN"), adminTest)

module.exports = router;