const {get} = require("lodash");
const config = require("config");
const SessionModel = require("../models/session.model");
const {findUser} = require("./auth.service");
const request = require("../helper/request");
const {signJwt, verifyJwt} = require("../helper/jwt.helper");

exports.createSession = async (user) => {
    const userAgent = request.req.get("user-agent") || ""
    const ipAddress = request.req.ip
    return await SessionModel.create({user: user?._id, userAgent, ipAddress});
}

exports.findSessions = async (query) => {
    return SessionModel.find(query).lean();
}

exports.updateSession = async (query, update) => {
    try {
        const result = await SessionModel.updateOne(query, update).exec();
        return true
    } catch (error) {
        return false
    }
}

exports.reIssueAccessToken = async ({refreshToken}) => {
    const {decoded} = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, "session")) return false;

    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid) return false;

    const user = await findUser({_id: session.user});

    if (!user) return false;

    return signJwt(
        {...user, session: session._id},
        "accessTokenPrivateKey",
        {expiresIn: config.get("accessTokenTtl")} // 15 minutes
    );
}