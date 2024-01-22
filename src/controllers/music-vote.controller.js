const asyncHandler = require("../helper/asyncHandler")
const {createMusicVote, findMusicVotes} = require("../services/music-vote.services")

/*******************************************************************
 * @desc                Create new MusicVote
 * @Method              Post
 * @URL                 /music-vote/v1/musics
 * @access              Privet
 * @Response            Object {"title": title, "url"}
 *******************************************************************/
exports.createMusicVote = asyncHandler(async (req, res, next) => {
    const MusicVote = await createMusicVote()

    res.status(200).send({
        success: true,
        MusicVote
    });
});

/*******************************************************************
 * @desc                Get all musics
 * @Method              Get
 * @URL                 /music-vote/v1/musics
 * @access              Public
 * @Response            Object {"title": title, "url"}
 *******************************************************************/
exports.updateMusicVote = asyncHandler(async (req, res, next) => {
    const musics = await findMusicVotes()
    res.status(200).send({
        success: true,
        length: musics?.length,
        musics
    });
});
