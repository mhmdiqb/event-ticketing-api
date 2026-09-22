const prisma = require("../lib/prisma")
const { hashPassword } = require("../utils/password")

const registerUser = async(req, res) => {
    const { name, email, password } = req.body;

    const hashedPAssword = await hashPassword(password)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPAssword
        }
    })

    res.status(201).json ({
        message: "user register successfully",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
}

module.exports = {
    registerUser
}