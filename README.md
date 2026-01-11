# GigFlow - Freelance Marketplace Platform

A full-stack freelance marketplace platform where clients can post gigs and freelancers can submit bids.

## 🚀 Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** Authentication with HttpOnly cookies
- **Security**: Helmet, CORS, Rate Limiting, MongoDB Sanitization

### Frontend
- **React 19** with Vite
- **Tailwind CSS v4** for styling
- **Redux Toolkit** for state management
- **React Router DOM** for routing
- **React Hook Form** + Zod for form validation
- **Lucide React** for icons

## 📁 Project Structure

```
gigflow/
├── backend/
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── utils/        # Utility functions
│   │   ├── app.js        # Express app setup
│   │   └── server.js     # Server entry point
│   └── package.json
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── assets/       # Images and SVGs
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── store/        # Redux store
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── package.json          # Root package.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gigflow
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**

   Backend (`backend/.env`):
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gigflow
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   JWT_COOKIE_EXPIRE=7
   CLIENT_URL=http://localhost:5173
   ```

   Frontend (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**
   ```bash
   # Run both frontend and backend
   npm run dev

   # Or run separately
   npm run dev:backend
   npm run dev:frontend
   ```

6. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Gigs
- `GET /api/gigs` - Get all gigs
- `GET /api/gigs/:id` - Get single gig
- `POST /api/gigs` - Create a gig (Client only)
- `PUT /api/gigs/:id` - Update a gig
- `DELETE /api/gigs/:id` - Delete a gig
- `GET /api/gigs/my-gigs` - Get user's gigs

### Bids
- `GET /api/bids` - Get all bids
- `POST /api/bids` - Submit a bid (Freelancer only)
- `GET /api/bids/my-bids` - Get user's bids
- `PATCH /api/bids/:id/status` - Accept/Reject a bid

## 🔐 User Roles

- **Client**: Can post gigs and manage bids
- **Freelancer**: Can browse gigs and submit bids

## 🎨 Features

- Modern, responsive UI with Tailwind CSS
- Role-based access control
- Real-time form validation
- Toast notifications
- Secure authentication with JWT
- Protected routes

## 📝 License

This project is licensed under the MIT License.
