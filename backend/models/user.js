const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["student", "teacher"] },

    // Academic Fields
    department: { type: String, default: "Computer Science" },
    year: { type: String, default: "2nd Year" },
    attendance: { type: Number, default: 60 },
    sgpa: { type: Number, default: 8.6 }

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);