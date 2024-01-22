const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        valid: {type: Boolean, default: true},
        ipAddress: {type: String},
        userAgent: {type: String},
    },
    {
        timestamps: true,
    }
);

const SessionModel = mongoose.model("Session", sessionSchema);

module.exports = SessionModel;
