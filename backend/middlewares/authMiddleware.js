const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/user.model")

const protect = asyncHandler(async (req, res, next) => {
    let token

    // jwt token format : Bearer <>
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {

            // Get token from header
            // Bearer token. Split(' ') splits it into array[bearer,token]
            token = req.headers.authorization.split(' ')[1]

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get User id from the token
            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not authorized, invalid token")
    }
})

module.exports = { protect }