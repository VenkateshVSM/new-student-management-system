# Smart Student Management System

A full-stack student management project built with HTML5, CSS3, JavaScript, Node.js, Express.js, MySQL, and JWT authentication.

## Features

- Admin, teacher, and student login with JWT
- Role-based access control
- Student, teacher, course, schedule, enrollment, attendance, marks, fees, notification, report, and audit modules
- Responsive dashboard UI
- Search and filter support
- Grade and GPA calculation
- Fee pending amount calculation
- Attendance percentage endpoint
- PDF report card download
- Excel export endpoint
- MySQL schema with sample data

## Folder Structure

```text
Student-Management-System/
├── client/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── css/
│   ├── js/
│   └── images/
├── server/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── models/
│   └── uploads/
├── database/
│   └── student_management.sql
├── package.json
└── README.md
```

## Setup

1. Create the database:

```bash
mysql -u root -p < database/student_management.sql
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment:

```bash
cp .env.example .env
```

Update `.env` with your MySQL username, password, database name, and JWT secret.

4. Start the server:

```bash
npm run dev
```

Open `http://localhost:5000`.

## Seed Logins

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@example.com | admin123 |
| Teacher | nisha@example.com | admin123 |
| Student | aarav@example.com | admin123 |

## Main API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/dashboard/admin`
- `GET /api/dashboard/teacher`
- `GET /api/dashboard/student`
- `/api/students`
- `/api/teachers`
- `/api/courses`
- `/api/schedules`
- `/api/enrollments`
- `/api/attendance`
- `/api/marks`
- `/api/fees`
- `/api/notifications`
- `GET /api/reports/semester/:studentId`
- `GET /api/reports/pdf/:studentId`
- `GET /api/reports/export/:table`

## Notes

Seed users use a plain demo password to simplify first-time setup. Accounts created through the register page are stored with bcrypt hashes.
