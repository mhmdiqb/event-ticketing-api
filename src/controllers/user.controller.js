const registerUser = async(req, res) => {
    const { name, email, password } = req.body;

    res.status(201).json ({
        message: "register endpoint works",
        data: {
            name,
            email,
            password
        }
    })
}

module.exports = {
    registerUser
}