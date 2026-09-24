const { compareSync } = require("bcrypt")
const jwt = require("jsonwebtoken")
const { all } = require("../routes/auth.routes")

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization token is required"
        })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "Invalid authorization format"
        })
    }

    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decode

        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "authentication required"
            })
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "yo do not have permission to access this resource"
            })
        }

        next()
    }
}

module.exports = {
    authenticate,
    authorize
}