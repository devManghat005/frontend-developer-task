# Task Dashboard Application

## Overview
This project is a full stack web application built as part of a Frontend Developer Intern assignment. It includes a React frontend, a secure Node and Express backend, and a MongoDB database. The application allows users to register, log in, manage their profile, and perform CRUD operations on tasks through a protected dashboard.

The project demonstrates frontend engineering, backend API development, authentication, database integration, and secure application design.

---

## Features
- User authentication with JWT
- Secure password hashing using bcrypt
- Protected frontend routes
- User profile viewing and updating
- Task creation, editing, filtering, and deletion
- Search and filter functionality for tasks
- MongoDB database integration
- Modern responsive UI built with React and Tailwind
- Smooth transitions and animations
- Postman collection for API testing

---

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Framer Motion
- Axios

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt

---

## Project Structure
- `frontend` - Contains the React frontend application
- `backend` - Contains the Express API and database logic
- `postman_collection.json` - Contains API request examples for testing

---

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally
- npm installed

---

### Backend Setup

Navigate to the backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file with the following values:
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/frontend_task
JWT_SECRET=your_secret_key
```

Run the backend:
```bash
npm run dev
```

The backend will run on port 5001 by default.

---

### Frontend Setup

Navigate to the frontend folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the frontend:
```bash
npm run dev
```

The frontend will run at: `http://localhost:5173`

---

## Database

The application uses MongoDB Community Edition running locally.

The database contains two collections:
- `users`
- `tasks`

You can view the database using:
```bash
mongosh
```

Or through MongoDB Compass using the connection string:
```
mongodb://localhost:27017
```

---

## API Documentation

A full Postman collection is included in the repository as: `postman_collection.json`

It contains requests for:
- User registration
- User login
- Profile fetch and update
- Task create
- Task read
- Task update
- Task delete

---

## Security Practices
- Passwords are hashed using bcrypt
- JWT is used for authentication
- Protected API routes use middleware validation
- Protected frontend routes prevent unauthorized access
- Secrets are stored in environment variables

---

## Scaling for Production

In a production environment, the following changes would be applied:
- Use MongoDB Atlas instead of a local database
- Deploy the backend using a platform such as Render or Railway
- Deploy the frontend using Vercel or Netlify
- Use environment variables for API URLs
- Enable HTTPS
- Add rate limiting and request validation
- Configure stricter CORS rules

---

## Evaluation Criteria Covered
- Modern responsive UI
- Frontend and backend integration
- Secure authentication
- CRUD functionality
- Search and filtering
- Database persistence
- Clean project structure
- API documentation
- Scalability planning

---

## Author
Dev Manghat
