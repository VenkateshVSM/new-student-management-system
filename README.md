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

## Firebase + GitHub Deployment

This repository is configured to deploy the static frontend to Firebase Hosting via GitHub Actions.

- Frontend source: `client/`
- Hosting config: `firebase.json`
- GitHub action: `.github/workflows/firebase-hosting.yml`
- Firebase project: `student-205d0`

### What to do

1. Push the repository to GitHub.
2. Create a Firebase service account JSON for your project.
3. Add the JSON as a GitHub secret named `FIREBASE_SERVICE_ACCOUNT`.
4. Push to the `main` branch and GitHub Actions will deploy the site automatically.

### Important

- This setup deploys only the static frontend.
- The backend API still requires a separate backend host unless you upgrade to Firebase Blaze and use Cloud Functions.
- If you deploy the backend to Vercel, point `window.API_URL` in `client/js/config.js` to the Vercel backend URL followed by `/api`.

## Vercel Backend Deployment

This project can deploy the Express API backend to Vercel using the GitHub workflow in `.github/workflows/vercel-backend.yml`.

1. Create a Vercel account and connect it to this GitHub repository.
2. Add these GitHub secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. Push to `main`.
4. After Vercel deploys, update `client/js/config.js` to use:

```js
window.API_URL = 'https://<your-vercel-app>.vercel.app/api';
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

- The frontend is deployable on Firebase Hosting free plan.
- The `/api/*` backend cannot run on Firebase static hosting alone; it requires a backend host or Firebase Functions with Blaze plan.
- To use the app on Firebase Hosting, deploy the frontend as a static site and point `window.API_URL` to a separate backend deployment.

Seed users use a plain demo password to simplify first-time setup. Accounts created through the register page are stored with bcrypt hashes.

## Deployment (detailed)

Prerequisites:
- `firebase` CLI logged in for frontend deploy
- `vercel` CLI or Vercel dashboard access for backend
- GitHub repository connected to both services for CI

Frontend (Firebase Hosting):

1. Build/send static files to `client/` (already present in this repo).
2. Deploy manually:

```bash
firebase deploy --only hosting --project student-205d0
```

Backend (Vercel):

1. Create a Vercel project (or use an existing one) and link the repo.
2. Deploy from CLI (or use GitHub Actions):

```bash
# link (once)
npx vercel link --project ssms-backend

# deploy production
npx vercel --prod --yes --project ssms-backend
```

3. Add required environment variables in Vercel (production):

```bash
npx vercel env add DATABASE_URL "<your-db-url>" production --project ssms-backend
npx vercel env add JWT_SECRET "<your-jwt-secret>" production --project ssms-backend
npx vercel env add CLIENT_ORIGIN "https://student-205d0.web.app" production --project ssms-backend
```

CI / GitHub Actions:
- Frontend deploy workflow: `.github/workflows/firebase-hosting.yml` — deploys `client/` to Firebase on `main`.
- Backend deploy workflow: `.github/workflows/vercel-backend.yml` — runs an integration health check then deploys to `ssms-backend` using `VERCEL_TOKEN` secret.

Quick checks:

```bash
curl https://ssms-backend.vercel.app/api/health
curl https://student-205d0.web.app
```

Logs & debugging:

```bash
# Inspect recent deployments
npx vercel ls --all

# View deployment logs
npx vercel inspect <deployment-url> --logs
```

If you want, I can add a short `README` subsection that includes screenshots or an automated script for environment setup.
