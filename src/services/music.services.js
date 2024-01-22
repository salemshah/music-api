const MusicModel = require("../models/music.model")
const MusicVoteModel = require("../models/music-vote.model")
const {omit} = require("lodash")
const request = require("../helper/request")
const ErrorResponse = require("../helper/errorResponse")
const {databaseResponseTimeHistogram} = require("../helper/metrics");
const {uploadAudioToCloudinary} = require('../helper/music-updloader')

/*************************************************************************
 * @description        This function create new music
 * @returns            If OK: Return all musics
 *
 *
 *************************************************************************/
exports.createMusic = async () => {
    const metricsLabels = {
        operation: "createMusic",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const resultUpload = await uploadAudioToCloudinary()
        request.body.url = resultUpload?.url;
        const result = await MusicModel.create(request.body);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch (e) {
        timer({...metricsLabels, success: "false"});
        throw e;
    }
}


/*************************************************************************
 * @description        This function get all music
 * @returns            If OK: Return all musics
 *************************************************************************/
exports.findMusics = async () => {
    const metricsLabels = {
        operation: "findMusic",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await MusicModel.find({}).populate("votes");
        timer({...metricsLabels, success: "true"});
        return result;
    } catch (e) {
        console.log({e})
        timer({...metricsLabels, success: "false"});
        throw e;
    }
}

/*************************************************************************
 * @description        This function get all music
 * @returns            If OK: Return all musics
 *************************************************************************/
exports.findMusic = async (query, options) => {

    const metricsLabels = {
        operation: "findMusic",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await MusicModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch (e) {
        timer({...metricsLabels, success: "false"});

        throw e;
    }
}

exports.findAndUpdateMusic = async (query, update, options) => {
    return MusicModel.findOneAndUpdate(query, update, options);
}

exports.deleteMusic = async (query) => {
    return MusicModel.deleteOne(query);
}

