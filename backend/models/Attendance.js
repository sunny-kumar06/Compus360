const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    classYear: String,
    section: String,
    date: {
        type: Date,
        default: Date.now
    },
    records: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            status: {
                type: String,
                enum: ["present", "absent"]
            }
        }
    ]
});

module.exports = mongoose.model("Attendance", AttendanceSchema);