const ErrorResponse = require( "api/src/helper/errorResponse")

// authorized user by role
exports.roleAccess = (...roles) => {
    return (req, res, next) => {

        if (!req.user.status) {
            console.log('<============= status =============>'.bgYellow)
            //res.clearCookie(process.env.COOKIE_NAME)
            return next(new ErrorResponse('Access denied!!!', 401))
        }

        if (!roles.includes(req.user.role)) {
            console.log('<============= role ==============>'.bgYellow)
            //res.clearCookie(process.env.COOKIE_NAME)
            return next(new ErrorResponse('Access denied!!!', 401))
            //return
        }
        next()
    }
}