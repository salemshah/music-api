const MusicVoteModel = require("../models/music-vote.model")
const request = require("../helper/request")
const ErrorResponse = require("../helper/errorResponse")
const {databaseResponseTimeHistogram} = require("../helper/metrics");

/*************************************************************************
 * @description        This function create new MusicVote or update old MusicVote
 * @returns            If OK: Return all MusicVotes
 *************************************************************************/
exports.createMusicVote = async () => {
    const metricsLabels = {
        operation: "createMusicVote",
    };
    const voteData = {
        user: request?.user?._id, ...request.body
    }
    const query = {
        user: request?.user?._id,
        music: request?.body?.music
    }
    const timer = databaseResponseTimeHistogram.startTimer();
    try {

        if (voteData?.rating === 0) {
            return await MusicVoteModel.findOneAndDelete(query).exec()
        }

        const result = await MusicVoteModel.findOneAndUpdate(query, voteData, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        });

        timer({...metricsLabels, success: "true"});
        return result;
    } catch (e) {
        timer({...metricsLabels, success: "false"});
        throw e;
    }
}


/*************************************************************************
 * @description        This function get all MusicVote
 * @returns            If OK: Return all MusicVotes
 *************************************************************************/
exports.findMusicVotes = async () => {
    const metricsLabels = {
        operation: "findMusicVote",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await MusicVoteModel.find();
        timer({...metricsLabels, success: "true"});
        return result;
    } catch (e) {
        timer({...metricsLabels, success: "false"});
        throw e;
    }
}