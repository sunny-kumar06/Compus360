import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";

function TeacherDashboard() {
    const navigate = useNavigate();

    const [feedbacks, setFeedbacks] = useState([]);
    const [lowStudents, setLowStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);

    // ✅ Logout Function
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const f = await API.get("/teacher-feedbacks");
                setFeedbacks(f.data);

                const l = await API.get("/low-attendance");
                setLowStudents(l.data);

                const a = await API.get("/teacher-assignments");
                setAssignments(a.data);

            } catch {
                localStorage.clear();
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <Navbar onLogout={handleLogout} />

            <div className="p-8 mt-6">

                <h2 className="text-2xl font-bold mb-8">
                    Teacher Dashboard
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h3 className="text-gray-500">Total Feedback</h3>
                        <p className="text-2xl font-bold text-indigo-600">
                            {feedbacks.length}
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h3 className="text-gray-500">Low Attendance</h3>
                        <p className="text-2xl font-bold text-red-600">
                            {lowStudents.length}
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h3 className="text-gray-500">Submitted Assignments</h3>
                        <p className="text-2xl font-bold text-green-600">
                            {assignments.length}
                        </p>
                    </div>

                </div>

                {/* Assignments */}
                <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
                    <h3 className="text-lg font-semibold mb-4">
                        Submitted Assignments
                    </h3>

                    {assignments.map((a) => (
                        <div key={a._id} className="border rounded-lg p-4 mb-3">
                            <p><strong>Student:</strong> {a.studentId?.email}</p>
                            <p><strong>Subject:</strong> {a.subject}</p>
                            <p><strong>File:</strong> {a.fileName}</p>
                        </div>
                    ))}
                </div>

                {/* Feedback */}
                <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
                    <h3 className="text-lg font-semibold mb-4">
                        Student Feedback
                    </h3>

                    {feedbacks.map((f) => (
                        <div key={f._id} className="border rounded-lg p-4 mb-3">
                            <p><strong>Student:</strong> {f.studentId?.email}</p>
                            <p><strong>Subject:</strong> {f.subject}</p>
                            <p>{f.message}</p>
                        </div>
                    ))}
                </div>

                {/* Low Attendance */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">
                        Low Attendance Students
                    </h3>

                    {lowStudents.map((s) => (
                        <div key={s._id} className="border rounded-lg p-4 mb-3 bg-red-50">
                            <p><strong>Email:</strong> {s.email}</p>
                            <p><strong>Attendance:</strong> {s.attendance}%</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default TeacherDashboard;