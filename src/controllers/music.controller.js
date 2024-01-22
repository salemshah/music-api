const asyncHandler = require("../helper/asyncHandler")
const {createMusic, findMusics} = require("../services/music.services")

/*******************************************************************
 * @desc                Create new music
 * @Method              Post
 * @URL                 /music/v1/musics
 * @access              Privet
 * @Response            Object {"title": title, "url"}
 *******************************************************************/
exports.createNewMusic = asyncHandler(async (req, res, next) => {
    const music = await createMusic()

    res.status(200).send({
        success: true,
        music
    });
});

/*******************************************************************
 * @desc                Get all musics
 * @Method              Get
 * @URL                 /music/v1/musics
 * @access              Public
 * @Response            Object {"title": title, "url"}
 *******************************************************************/
exports.getAllMusics = asyncHandler(async (req, res, next) => {
    const musics = await findMusics()
    res.status(200).send({
        success: true,
        length: musics?.length,
        musics
    });
});
