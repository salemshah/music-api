const express = require("express");
//const validateResource = require( "../middleware/validateResource";
const {createUserSchema, loginUserSchema, logoutUserSchema} = require("../schemas/user.schema");
const {registerUser, login, logout} = require("../controllers/auth.controller");
const resourceMiddleware = require('../middlewares/ressource.middleware')

const router = express.Router()

/**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
// .post(getUsers)
router.route('/register')
    .post(resourceMiddleware(createUserSchema), registerUser)


router.route('/login')
    .post(resourceMiddleware(loginUserSchema), login)

router.route('/logout')
    .post(resourceMiddleware(logoutUserSchema), logout)

module.exports = router;
