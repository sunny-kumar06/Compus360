# 🚀 Campus360 – Student Management System

Campus360 is a full-stack student management platform built to simplify academic management by allowing students and teachers to interact through a unified dashboard.

The system allows students to manage assignments, feedback, and attendance while teachers can monitor student performance and manage academic data.

This project demonstrates a complete **Full Stack Web Application** using React, Node.js, Express, and MongoDB with live deployment.

---

# 🌐 Live Demo

Frontend (Vercel)  
https://campus360.vercel.app

Backend API (Railway)  
https://compus360-production.up.railway.app

GitHub Repository  
https://github.com/sunny-kumar06/Compus360

---

# 🧑‍💻 Tech Stack

Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router

Backend
- Node.js
- Express.js
- JWT Authentication
- REST APIs

Database
- MongoDB Atlas
- Mongoose

Deployment
- Frontend → Vercel
- Backend → Railway
- Database → MongoDB Atlas

---

# ✨ Features

🔐 Authentication System
- Secure user registration
- Login using JWT authentication
- Protected routes for dashboard access

👨‍🎓 Student Features
- View personal dashboard
- Submit assignments
- Send feedback to teachers
- View attendance and SGPA

👨‍🏫 Teacher Features
- View student assignments
- View feedback from students
- Monitor students with low attendance
- Update student attendance

📊 Dashboard
- Attendance overview
- SGPA tracking
- Academic performance view

---

# 📂 Project Structure

Campus360
│
├── backend
│   ├── models
│   │   ├── User.js
│   │   ├── Assignment.js
│   │   ├── Feedback.js
│   │   └── Attendance.js
│   │
│   ├── routes
│   │   └── auth.js
│   │
│   └── server.js
│
└── frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   └── utils
    │
    └── App.jsx

---

# 🔑 API Endpoints

Authentication

POST /api/auth/register  
POST /api/auth/login  
GET  /api/auth/dashboard  

Assignments

POST /api/auth/submit-assignment  
GET  /api/auth/assignments  

Feedback

POST /api/auth/submit-feedback  
GET  /api/auth/feedbacks  

Teacher APIs

GET  /api/auth/teacher-feedbacks  
GET  /api/auth/teacher-assignments  
GET  /api/auth/low-attendance  
PUT  /api/auth/update-attendance/:id  

---

# ⚙️ Installation & Setup

Clone the repository

git clone https://github.com/sunny-kumar06/Compus360.git

Move into project folder

cd Compus360

Backend setup

cd backend  
npm install  

Create .env file

MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  

Run backend

npm start

Frontend setup

cd frontend  
npm install  
npm run dev

---

# 🔐 Environment Variables

Backend .env file

MONGO_URI=your_mongodb_atlas_uri  
JWT_SECRET=your_jwt_secret  
PORT=5000

---

# 🎯 Future Improvements

- Assignment file upload system
- Admin dashboard
- Analytics charts
- Email notifications
- Role-based access control

---

# 👨‍💻 Author

Sunny Kumar

GitHub  
https://github.com/sunny-kumar06

---

⭐ If you like this project, consider giving it a star on GitHub.<img width="1898" height="966" alt="Screenshot 2026-03-07 082638" src="https://github.com/user-attachments/assets/5410fe00-7dfc-4b5d-86cc-1cb880d957a6" />
<img width="1919" height="957" alt="Screenshot 2026-03-07 082608" src="https://github.com/user-attachments/assets/1b7ce96f-5082-418e-b3ab-e0f79f1c6cdf" />
