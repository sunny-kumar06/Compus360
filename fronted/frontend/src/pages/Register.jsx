// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../utils/api";

// function Register() {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//         role: "",
//         department: "",
//         year: "",
//         attendance: "",
//         sgpa: ""
//     });

//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await API.post("/register", form);
//             setMessage("✅ Registered Successfully!");
//             setTimeout(() => navigate("/login"), 1500);
//         } catch (err) {
//             setMessage(err.response?.data?.message || "❌ Error occurred");
//         }
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>Register</h2>

//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     onChange={handleChange}
//                     required
//                 />
//                 <br /><br />

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     onChange={handleChange}
//                     required
//                 />
//                 <br /><br />

//                 <select name="role" onChange={handleChange} required>
//                     <option value="">Select Role</option>
//                     <option value="student">Student</option>
//                     <option value="teacher">Teacher</option>
//                 </select>

//                 <br /><br />

//                 {form.role === "student" && (
//                     <>
//                         <input
//                             type="text"
//                             name="department"
//                             placeholder="Department"
//                             onChange={handleChange}
//                         />
//                         <br /><br />

//                         <input
//                             type="text"
//                             name="year"
//                             placeholder="Year"
//                             onChange={handleChange}
//                         />
//                         <br /><br />

//                         <input
//                             type="number"
//                             name="attendance"
//                             placeholder="Attendance"
//                             onChange={handleChange}
//                         />
//                         <br /><br />

//                         <input
//                             type="number"
//                             name="sgpa"
//                             placeholder="SGPA"
//                             step="0.1"
//                             onChange={handleChange}
//                         />
//                         <br /><br />
//                     </>
//                 )}

//                 <button type="submit">Register</button>
//             </form>

//             <p>{message}</p>
//         </div>
//     );
// }

// export default Register;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        role: "",
        department: "",
        year: "",
        attendance: "",
        sgpa: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/register", form);
            setMessage("✅ Registered Successfully!");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Register
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="border p-2 w-full mb-4 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="border p-2 w-full mb-4 rounded"
                />

                <select
                    name="role"
                    onChange={handleChange}
                    required
                    className="border p-2 w-full mb-4 rounded"
                >
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>

                {form.role === "student" && (
                    <>
                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            onChange={handleChange}
                            className="border p-2 w-full mb-4 rounded"
                        />

                        <input
                            type="text"
                            name="year"
                            placeholder="Year"
                            onChange={handleChange}
                            className="border p-2 w-full mb-4 rounded"
                        />

                        <input
                            type="number"
                            name="attendance"
                            placeholder="Attendance"
                            onChange={handleChange}
                            className="border p-2 w-full mb-4 rounded"
                        />

                        <input
                            type="number"
                            name="sgpa"
                            placeholder="SGPA"
                            step="0.1"
                            onChange={handleChange}
                            className="border p-2 w-full mb-4 rounded"
                        />
                    </>
                )}

                <button
                    type="submit"
                    className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700 transition"
                >
                    Register
                </button>

                {message && (
                    <p className="text-center mt-4 text-sm text-red-500">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default Register;