const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(authHeader, "authHeader")
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
        console.log(token, "token")
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        console.log("verifyyy")
        if (err) {
            console.log("errr", err)
            res.status(401)
            throw new Error("User is not authorized")
        }
        req.user = decoded.user
        // Used to move to the next middleware
        next()
    })
    if (!token){
        res.status(401)
        throw new Error("User is not authorized or token is missing")
    }
}
});

module.exports = validateToken