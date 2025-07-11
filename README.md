💼 Job Hunter Pro
Job Hunter Pro is a personal job application tracker built with React. It helps you stay organized during your job search by allowing you to log, edit, and track the status of your applications in one place.

🚀 Features
🔐 User authentication (Login/Register with validation)

📋 Add and manage job applications

📝 Edit or delete submitted jobs

📊 View application statistics with interactive charts

🔍 Search job listings (custom or via API)

✅ Filter by status: applied, interview, rejected

📈 Graphs showing application progress

🧠 Smart UX with responsive design and animations

💾 Data persistence (local or via API)

🛠️ Technologies Used
Stack Details
Frontend React, TypeScript, Vite
State Redux Toolkit, Redux Persist
Routing React Router
Forms Formik + Yup for form validation
Styles Bootstrap 5 + Custom CSS
Charts Recharts (BarChart for job stats)
Animation Framer Motion
API Mocked with json-server or extendable
Hosting Ready for deployment on Netlify/Vercel

📁 Folder Structure
bash
Copy
Edit
src/
├── app/ # Redux store config
├── components/ # Navbar, JobCard, JobStats, etc.
├── features/ # authSlice, jobSlice
├── pages/ # Login, Register, Dashboard, Search, AddJob, EditJob
├── types/ # Shared TypeScript types
├── utils/ # API helper, constants
✅ Usage
Clone the repo:

bash
Copy
Edit
git clone https://github.com/yourname/job-hunter-pro.git
cd job-hunter-pro
Install dependencies:

bash
Copy
Edit
npm install
Run local server (with mock API):

bash
Copy
Edit
npm run dev
(Optional) Start json-server for API:

bash
Copy
Edit
json-server --watch db.json --port 5000
📌 Future Improvements
Add JWT authentication and backend API

structure

src:

- app (hooks.ts, store.ts)
- components(AddJobModal....)
  -features(job/jobsSlice.ts)
  -images
  -json(mockData)
  -pages(Home.tsx...)
- styles
- types
- utils(filtredJobs.ts)
  App.tsx
  main.tsx
