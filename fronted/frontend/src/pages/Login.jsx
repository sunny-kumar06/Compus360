import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/login", form);

            // ✅ Save token and role
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            setMessage("✅ Login Successful!");

            // 🔥 Role Based Redirect
            setTimeout(() => {
                if (res.data.role === "teacher") {
                    navigate("/teacher-dashboard");
                } else {
                    navigate("/dashboard");
                }
            }, 800);

        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded-lg"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded-lg"
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-sm mt-4 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-indigo-600 font-semibold">
                        Register
                    </Link>
                </p>

                {message && (
                    <p className="mt-4 text-center font-medium">
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
}

export default Login;