const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt")


const { hashPassword } = require("../utils/password");
const { is } = require("express/lib/request");
const { generateToken } = require("../utils/token");


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email, and password are required"
        });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        return res.status(409).json({
            message: "Email already registered"
        });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    res.status(201).json({
        message: "User registered successfully",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

const loginUser = async (req, res) => {

    const { email, password } = req.body   

    if (!email || !password) {
        return res.status(400).json({
            message: "email and password are required"
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return res.status(401).json({
            message: "invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    const token = generateToken(user)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "email and password invalid"
        })
    }

    res.json({
        message: "Login successful",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    })
}

const getMe = async (req, res) => {
    res.json({
        message: "authonticated user",
        data: req.user
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
};

