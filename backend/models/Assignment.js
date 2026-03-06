const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subject: String,
    fileName: String,
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Assignment", AssignmentSchema);