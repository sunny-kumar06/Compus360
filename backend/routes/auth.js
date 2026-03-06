const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Assignment = require("../models/Assignment");
const Feedback = require("../models/Feedback");
const Attendance = require("../models/Attendance");

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
    try {
        const {
            email,
            password,
            role,
            department,
            year,
            attendance,
            sgpa
        } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, Password and Role are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            email,
            password: hashedPassword,
            role
        };

        if (role === "student") {
            userData.department = department;
            userData.year = year;
            userData.attendance = attendance;
            userData.sgpa = sgpa;
        }

        const user = new User(userData);
        await user.save();

        res.status(201).json({
            message: "User Registered Successfully ✅"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});


/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, role: user.role });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});


/* ================= VERIFY TOKEN ================= */
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ message: "Access Denied ❌" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or Expired Token ❌" });
    }
}


/* ================= PROTECTED DASHBOARD ================= */
router.get("/dashboard", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json({
            message: "Dashboard Data Loaded ✅",
            user: user
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});


/* ================= UPDATE PROFILE ================= */
router.put("/update-profile", verifyToken, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                department: req.body.department,
                year: req.body.year,
                attendance: req.body.attendance,
                sgpa: req.body.sgpa
            },
            { new: true }
        );

        res.json({ message: "Profile Updated ✅", user: updatedUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});


/* ================= SUBMIT ASSIGNMENT ================= */
router.post("/submit-assignment", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Only students can submit assignments" });
        }

        const { subject, fileName } = req.body;

        if (!subject || !fileName) {
            return res.status(400).json({ message: "All fields required" });
        }

        const assignment = new Assignment({
            studentId: req.user.id,
            subject,
            fileName
        });

        await assignment.save();

        res.json({ message: "Assignment Submitted ✅" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});


/* ================= GET ASSIGNMENT HISTORY ================= */
router.get("/assignments", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Only students can view assignments" });
        }

        const assignments = await Assignment.find({
            studentId: req.user.id
        }).sort({ submittedAt: -1 });

        res.json(assignments);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});


/* ================= SUBMIT FEEDBACK ================= */
router.post("/submit-feedback", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Only students can submit feedback" });
        }

        const { subject, message } = req.body;

        if (!subject || !message) {
            return res.status(400).json({ message: "All fields required" });
        }

        const feedback = new Feedback({
            studentId: req.user.id,
            subject,
            message
        });

        await feedback.save();

        res.json({ message: "Feedback Submitted ✅" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});


/* ================= GET FEEDBACK HISTORY ================= */
router.get("/feedbacks", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Only students can view feedback history" });
        }

        const feedbacks = await Feedback.find({
            studentId: req.user.id
        }).sort({ createdAt: -1 });

        res.json(feedbacks);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});

router.post("/create-assignment", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Only teachers can create assignments" });
        }

        const { subject, title } = req.body;

        const assignment = new Assignment({
            subject,
            fileName: title, // using fileName field as title for teacher
        });

        await assignment.save();

        res.json({ message: "Assignment Created ✅" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});

router.get("/teacher-feedbacks", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Only teachers allowed" });
        }

        const feedbacks = await Feedback.find()
            .populate("studentId", "email department year")
            .sort({ createdAt: -1 });

        res.json(feedbacks);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});

router.get("/low-attendance", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Only teachers allowed" });
        }

        const students = await User.find({
            role: "student",
            attendance: { $lt: 75 }
        }).select("email department year attendance");

        res.json(students);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});

router.put("/update-attendance/:id", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Only teachers allowed" });
        }

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { attendance: req.body.attendance },
            { new: true }
        );

        res.json(updated);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});

/* ================= TEACHER VIEW ALL ASSIGNMENTS ================= */
router.get("/teacher-assignments", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Only teachers allowed" });
        }

        const assignments = await Assignment.find()
            .populate("studentId", "email department year")
            .sort({ submittedAt: -1 });

        res.json(assignments);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error ❌" });
    }
});

router.get("/students", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Only teachers allowed" });
        }

        const { year, section } = req.query;

        const students = await User.find({
            role: "student",
            year: year,
            department: "Computer Science" // optional
        }).select("email year");

        res.json(students);

    } catch (err) {
        res.status(500).json({ message: "Server Error ❌" });
    }
});

router.post("/take-attendance", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Only teachers allowed" });
        }

        const { classYear, section, records } = req.body;

        const attendance = new Attendance({
            classYear,
            section,
            records
        });

        await attendance.save();

        res.json({ message: "Attendance Saved ✅" });

    } catch (err) {
        res.status(500).json({ message: "Server Error ❌" });
    }
});

router.get("/attendance-history", verifyToken, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Only teachers allowed" });
        }

        const data = await Attendance.find()
            .populate("records.studentId", "email")
            .sort({ date: -1 });

        res.json(data);

    } catch (err) {
        res.status(500).json({ message: "Server Error ❌" });
    }
});
module.exports = router;