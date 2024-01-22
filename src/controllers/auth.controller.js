const asyncHandler = require("../helper/asyncHandler")
const {createUser, validatePassword} = require('../services/auth.service')
const {jwtSign, verifyJwt} = require('../helper/jwt.helper')
const {createSession, updateSession} = require("../services/session.services");
const ErrorResponse = require("../helper/errorResponse")
const request = require("../helper/request");

/*******************************************************************
 * @desc                register a new user
 * @Method              POST
 * @URL                 /music/v1/register
 * @access              Public
 * @Response            Object {"title": title, "url"}
 *******************************************************************/
exports.registerUser = asyncHandler(async (req, res, next) => {

    const user = await createUser()

    // if reject
    if (!user) return

    // create session
    res.status(200).send({
        success: true,
        message: "L'inscription est effectuée avec succès"
    });
});


/*******************************************************************
 * @desc                Login user and create session using jwt
 * @Method              POST
 * @URL                 /music/v1/login
 * @access              Public
 * @Response            Object {"title": title, "url"}
 *******************************************************************/
exports.login = asyncHandler(async (req, res, next) => {
    
    try {
        const user = await validatePassword()

        console.log("yesssssssssssssssss", user);
        
        // if reject
        if (!user) return

        //save session in database
        const session = await createSession(user)
        if (!session) next(new ErrorResponse("Erreur de server"), 500)

        user.session = session?._id
        const token = await jwtSign({...user, session: session?._id})

        const options = {
            path: '/',
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true
        }

        res.cookie('token', token, options)
        // create session
        res.status(200).send({
            success: true,
            user,
            token
        });
    } catch (errer) {
        console.log({errer})
    }
});

/*******************************************************************
 * @desc                Log out user and destroy session
 * @Method              POST
 * @URL                 /music/v1/log-out
 * @access              Public
 * @Response            Object {"title": title, "url"}
 *******************************************************************/
exports.logout = asyncHandler(async (req, res, next) => {
    const session = await updateSession({_id: req?.body?.session}, {valid: false})
    if (!session) return

    res.status(200).send({
        success: true,
        message: "Déconnexion réussie"
    });
});
