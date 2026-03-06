require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors({
    origin: "*"
}));

app.use(express.json());

/* ================= DATABASE CONNECTION ================= */

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

/* ================= ROUTES ================= */

app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
    res.send("🚀 Campus360 Backend Running");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});