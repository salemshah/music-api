const express = require("express");
const {protectWithToken} = require("../middlewares/auth.middleware")
const {createMusicSchema, updateMusicSchema} = require("../schemas/music.schema");
const {createNewMusic, getAllMusics} = require("../controllers/music.controller");
const resourceMiddleware = require('../middlewares/ressource.middleware')

const router = express.Router()

router.route('/music')
    .post(protectWithToken, resourceMiddleware(createMusicSchema), createNewMusic)
    .get(protectWithToken, getAllMusics)


module.exports = router