const asyncHandler = require("../helper/asyncHandler")
const ErrorResponse = require("../helper/errorResponse")
const {verifyJwt} = require('../helper/jwt.helper')
const request = require('../helper/request')

/*******************************************
 * @type {function(*=, *=, *=): Promise<*>}
 *******************************************/
//protect routes
exports.protectWithToken = asyncHandler(async (req, res, next) => {
    let token
    if (req?.cookies?.token) {
        token = req.cookies.token
    } else if (req?.headers?.authorization && req?.headers?.authorization?.startsWith('Bearer')) {
        console.log(req?.cookie)
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ErrorResponse('Non authentifié, vous devez vous authentifier', 401))
    }

    const {expired, verifiedToken} = await verifyJwt(token)
    const user = verifiedToken

    if (verifiedToken) {
        request.setLocalUser(user)
        return next()
    }

    //TODO:
    // if (expired) {
    //     console.log("ssssssss")
    // }


    request.setLocalUser(null)

    // res.redirect('http://localhost:3000/login');


    res.status(401).send({
        success: false,
        message: "Le token d'accès n'est pas correct, vous devez vous authentifier"
    })
})
