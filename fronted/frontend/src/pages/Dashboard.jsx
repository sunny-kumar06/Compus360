import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [subject, setSubject] = useState("");
    const [file, setFile] = useState(null);

    const [feedbackSubject, setFeedbackSubject] = useState("");
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get("/dashboard");
                setUser(res.data.user);
            } catch {
                localStorage.clear();
                navigate("/login");
            }
        };
        fetchData();
    }, [navigate]);

    // Logout with confirmation
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            navigate("/login");
        }
    };

    const handleAssignmentSubmit = async () => {
        if (!subject || !file) {
            alert("Select subject and file");
            return;
        }

        try {
            await API.post("/submit-assignment", {
                subject,
                fileName: file.name
            });

            alert("Assignment Submitted ✅");
            setSubject("");
            setFile(null);
        } catch (err) {
            alert(err.response?.data?.message || "Submission Failed");
        }
    };

    const handleFeedbackSubmit = async () => {
        if (!feedbackSubject || !feedback) {
            alert("Select subject and write feedback");
            return;
        }

        try {
            await API.post("/submit-feedback", {
                subject: feedbackSubject,
                message: feedback
            });

            alert("Feedback Submitted ✅");
            setFeedback("");
            setFeedbackSubject("");
        } catch (err) {
            alert(err.response?.data?.message || "Feedback Failed");
        }
    };

    if (!user)
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );

    return (
        <div>

            <Navbar onLogout={handleLogout} />

            <div className="p-8 mt-6">


                <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                        Welcome, {user.email} 👋
                    </h2>

                    <p className="text-gray-500">
                        Today: {new Date().toDateString()}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div
                        className={`p-6 rounded-xl shadow-lg ${user.attendance < 75
                            ? "bg-red-100 border border-red-400"
                            : "bg-green-100"
                            }`}
                    >
                        <h3 className="font-semibold text-lg">Attendance</h3>
                        <p className="text-xl font-bold">{user.attendance}%</p>
                        {user.attendance < 75 && (
                            <p className="text-red-600 mt-2 font-medium">
                                ⚠ Low Attendance Risk
                            </p>
                        )}
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h3 className="font-semibold text-lg mb-2">Achievements</h3>
                        <ul className="text-sm space-y-1">
                            <li>🏅 Hackathon Participation</li>
                            <li>📚 Completed 5 LMS Courses</li>
                            <li>⭐ 4.5 Average Rating</li>
                        </ul>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h3 className="font-semibold text-lg">SGPA</h3>
                        <p className="text-xl font-bold">{user.sgpa}</p>
                    </div>

                </div>

                <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Submit Assignment</h3>

                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="border p-2 rounded-lg w-full mb-4"
                    >
                        <option value="">Select Subject</option>
                        <option>Data Structures</option>
                        <option>Operating Systems</option>
                        <option>DBMS</option>
                        <option>Computer Networks</option>
                    </select>

                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="mb-4"
                    />

                    <button
                        onClick={handleAssignmentSubmit}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Submit Assignment
                    </button>
                </div>

                <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">
                        Give Feedback to Teacher
                    </h3>

                    <select
                        value={feedbackSubject}
                        onChange={(e) => setFeedbackSubject(e.target.value)}
                        className="border p-2 rounded-lg w-full mb-4"
                    >
                        <option value="">Select Subject</option>
                        <option>Data Structures</option>
                        <option>Operating Systems</option>
                        <option>DBMS</option>
                        <option>Computer Networks</option>
                    </select>

                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback..."
                        className="border p-3 rounded-lg w-full mb-4"
                        rows="4"
                    />

                    <button
                        onClick={handleFeedbackSubmit}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Submit Feedback
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;