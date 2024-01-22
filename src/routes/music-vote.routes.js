const express = require("express");
const {protectWithToken} = require("../middlewares/auth.middleware")
const {createMusicVoteSchema, updateMusicVoteSchema} = require("../schemas/music-vote.schema");
const {createMusicVote, updateMusicVote} = require("../controllers/music-vote.controller");
const resourceMiddleware = require('../middlewares/ressource.middleware')

const router = express.Router()

router.route('/music-vote')
    .post(protectWithToken, resourceMiddleware(createMusicVoteSchema), createMusicVote)
    // .put(protectWithToken, updateMusicVote)


module.exports = router