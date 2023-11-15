const {constants} = require("../constants")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ 
                title: "Validation Error", 
                message: err.message, 
                stackTrace: err.stack 
            })
            break;
        case constants.NOT_FOUND:
            res.json({ 
                title: "Not Found", 
                message: err.message, 
                stackTrace: err.stack 
            })
            break;
        case constants.FORBIDDEN:
            res.json({ 
                title: "Forbidden", 
                message: err.message, 
                stackTrace: err.stack 
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({ 
                title: "Unauthorized", 
                message: err.message, 
                stackTrace: err.stack 
            })
            break;
        case constants.SERVER_ERROR:
            if (err.name === "MongoError" && err.code === 11000) {
                // Duplicate key error (unique constraint violation)
                res.status(400).json({ 
                    title: "Duplicate Key Error", 
                    message: "Duplicate key violation",
                    stackTrace: err.stack 
                });
            } else {
                // Other server errors
                res.json({
                    title: "Server Error",
                    message: err.message,
                    stackTrace: err.stack,
                });
            }
        default:
            console.log("No Error. All Good")
            // break;
    }
}
module.exports = errorHandler