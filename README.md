# Job Portal - MERN Stack Project

## Overview

The **Job Portal** is a full-stack web application built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. It connects **job seekers** and **companies**, allowing users to search, apply, and manage job applications, while companies can post, manage, and track applicants efficiently.

This project integrates **Clerk Authentication** for secure user login and **Cloudinary** for image and resume uploads. It is deployed on **Vercel (Frontend)** and **Render/Vercel (Backend)** for production-ready deployment.

---

## Key Features

### User Side (Job Seekers)

* **User Authentication:** Integrated with Clerk for secure login/signup.
* **Dynamic Job Search:** Filter jobs by title, category, and location.
* **Profile Management:** Upload and update resumes.
* **Job Application Tracking:** View all applied jobs with current application status (Pending, Accepted, or Rejected).

### Company Side (Recruiters)

* **Company Registration and Login:** Secure company authentication with JWT.
* **Job Management:** Post, edit, and delete job listings.
* **Applicant Tracking:** View applicants per job posting.
* **Status Update:** Accept or reject applicants with instant feedback.

### Admin & Server

* **MongoDB Integration:** Persistent data storage for users, jobs, and applications.
* **Webhook Support:** Real-time user synchronization between Clerk and MongoDB.
* **Cloudinary Integration:** Image and resume file storage.
* **Vercel Deployment:** Seamless CI/CD pipeline setup for production builds.

---

## Tech Stack

**Frontend:**

* React.js
* Tailwind CSS
* Axios
* React Router DOM
* React Toastify

**Backend:**

* Node.js
* Express.js
* Mongoose (MongoDB)
* Clerk Authentication API
* Cloudinary SDK
* Bcrypt for password hashing

**Database:**

* MongoDB Atlas (Cloud Database)

**Deployment:**

* Vercel (Frontend)
* Vercel (Backend)

---

## Environment Variables

Create a `.env` file in the `server/` directory with the following keys:

```bash
MONGODB_URI=your_mongo_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

---

## Folder Structure

```
job-portal/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # All page-level components
│   │   ├── context/          # Global state management (AppContext)
│   │   └── assets/           # Images, icons, etc.
│   └── vite.config.js
├── server/                   # Backend server
│   ├── config/               # DB and Cloudinary configurations
│   ├── controllers/          # Route controller logic
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route files
│   └── utils/                # JWT, helper utilities
└── README.md
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/job-portal.git
cd job-portal
```

### 2. Install Dependencies

**For server:**

```bash
cd server
npm install
```

**For client:**

```bash
cd ../client
npm install
```

### 3. Run the Project

```bash
# In one terminal
dcd server
npm run sever

# In another terminal
cd client
npm run dev
```

Visit **[http://localhost:5173/](http://localhost:5173/)** to see the app.

---

## API Endpoints

### User Routes

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/api/users/user`          | Get logged-in user details |
| POST   | `/api/users/apply`         | Apply for a job            |
| GET    | `/api/users/applications`  | View all user applications |
| POST   | `/api/users/update-resume` | Update user resume         |

### Company Routes

| Method | Endpoint                     | Description               |
| ------ | ---------------------------- | ------------------------- |
| POST   | `/api/company/register`      | Register a company        |
| POST   | `/api/company/login`         | Company login             |
| GET    | `/api/company/list-jobs`     | Fetch company jobs        |
| POST   | `/api/company/post-job`      | Post a new job            |
| POST   | `/api/company/change-status` | Change application status |

---

## Deployment

### Frontend (Vercel)

1. Push your project to GitHub.
2. Connect your repo to Vercel.
3. Add required environment variables in the Vercel dashboard.
4. Deploy — Vercel will automatically detect React via Vite.

### Backend (Render/Vercel)

1. Push the server folder to a new GitHub repo.
2. Connect it to Vercel.
3. Add `.env` values under the "Environment Variables" section.
4. Start the deployment.

---

## Key Learning Points

* Integration of **Clerk Authentication** with custom backend logic using **Webhooks**.
* Handling **file uploads** with Cloudinary.
* Secure JWT-based company login.
* Efficient **job and applicant management** workflow.
* Implemented reusable components and state management via React Context.

---

## Future Enhancements

* Add admin dashboard for monitoring activity.
* Email notifications for application status changes.
* Pagination and advanced search filters.
* Analytics for job performance metrics.

---


---

### License

This project is licensed under the **MIT License**.
