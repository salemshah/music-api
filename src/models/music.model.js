const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        url: {type: String},
        typ: {type: String},
        description: {type: String}
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true}

    }
);

musicSchema.virtual('votes', {
    ref: 'MusicVote', // foreign model name: child
    localField: '_id', // musicSchema Id
    foreignField: 'music' // foreign field name
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
