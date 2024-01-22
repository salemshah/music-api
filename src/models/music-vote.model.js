const mongoose = require("mongoose");

const musicVoteSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        music: {type: mongoose.Schema.Types.ObjectId, ref: "Music", required: true},
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        }
    },
    {
        timestamps: true,
    }
);

const MusicVoteModel = mongoose.model("MusicVote", musicVoteSchema);

module.exports = MusicVoteModel;