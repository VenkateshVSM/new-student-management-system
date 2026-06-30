// API host fallback for frontend deployments.
// For Firebase Hosting free plan, point this to a separate backend host
// such as a free Vercel or Render deployment that exposes the /api routes.
// After your backend deploys, set this to the Vercel backend URL, e.g.
// window.API_URL = 'https://<your-vercel-app>.vercel.app/api';
// Default to the deployed Vercel backend alias. Override with environment
// specific value by setting `window.API_URL` before this script runs.
window.API_URL = window.API_URL || 'https://ssms-backend.vercel.app/api';
