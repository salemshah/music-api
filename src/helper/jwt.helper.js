const jwt = require("jsonwebtoken")
const config = require("config");

/********************************************************************
 * @description              create a new access token
 * @param userInfo          User info to set for jwt token
 * @returns {*}             JWT Token with jsonwebtoken
 ********************************************************************/
exports.jwtSign = (userInfo) => {
    const secret = config.get("jwt.secret")
    const expiresIn = config.get("jwt.accessTokenTimeToLive")
    return jwt.sign(userInfo, secret, {expiresIn})
}

/********************************************************************
 *@description          This function verify if the access is valid and not expired
 * @param token         Access Token from client side
 * @returns             {Promise<{valid: boolean, expired: boolean, verifiedToken: null}
 *                      |{valid: boolean, expired: boolean, verifiedToken: (*)}>}
 *******************************************************************/
exports.verifyJwt = async (token) => {
    try {
        const secret = config.get("jwt.secret")
        const verifiedToken = await jwt.verify(token, secret)
        return {valid: true, expired: false, verifiedToken}
    } catch (error) {
        return {valid: false, expired: error.message === "jwt expired", verifiedToken: null}
    }
}