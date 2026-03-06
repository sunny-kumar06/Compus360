import axios from "axios";

const API = axios.create({
    baseURL: "compus360-production.up.railway.app"
});

// 🔥 Automatically token attach karega future me
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;