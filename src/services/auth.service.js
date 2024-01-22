const {omit} = require("lodash");
const UserModel = require("../models/user.model");
const request = require("../helper/request")
const ErrorResponse = require('../helper/errorResponse')

/*************************************************************************
 * @description        This function create new user if not exist
 * @returns            If OK: Return user information without password
 *************************************************************************/
exports.createUser = async () =>   {
    try {
        const user = await UserModel.create(request.body);
        return omit(user.toJSON(), "password");
    } catch (e) {
        console.log({e})
        request.next(new ErrorResponse(e, 500))
        return false
    }
}

/**************************************************************************
 * @description       This function check is password is correct or not
 * @returns           If OK: Return the user information without password
 **************************************************************************/
exports.validatePassword = async () => {
    // looking email on database
    const {body: {email, password}} = request
    const user = await UserModel.findOne({email});

    // if not found user return error
    if (!user) return request.next(new ErrorResponse(`Il n'y a aucun utilisateur avec cette adresse e-mail ${email}`));

    // compare password
    const isValid = await user.comparePassword(password);

    // if password is not correct return error
    if (!isValid) return request.next(new ErrorResponse(`Le mot de passe n'est pas correct`));

    // if password ok
    return omit(user.toJSON(), "password");
}

exports.findUser = async (query) => UserModel.findOne(query).lean();
