const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subject: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);