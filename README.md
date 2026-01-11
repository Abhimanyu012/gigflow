# GigFlow - Freelance Marketplace Platform

A full-stack freelance marketplace where clients post gigs and freelancers submit bids.

## 🌐 Live Demo

- **Frontend**: https://lively-phoenix-560339.netlify.app
- **Backend API**: https://gigflow-qoos.onrender.com

## 🚀 Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication

### Frontend
- React 19 + Vite
- Tailwind CSS v4
- Redux Toolkit

## 📁 Project Structure

```
gigflow/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── store/
    └── package.json
```

## 🛠️ Local Development

### Prerequisites
- Node.js >= 18.0.0
- MongoDB

### Setup

1. **Clone and install**
   ```bash
   git clone https://github.com/Abhimanyu012/gigflow.git
   cd gigflow
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Backend environment** (`backend/.env`)
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:5173
   ```

3. **Run**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

4. **Open** http://localhost:5173

## 📚 API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

### Gigs
- `GET /api/gigs` - All gigs
- `POST /api/gigs` - Create gig (Client)
- `GET /api/gigs/:id` - Single gig
- `PUT /api/gigs/:id` - Update gig
- `DELETE /api/gigs/:id` - Delete gig

### Bids
- `POST /api/bids` - Submit bid (Freelancer)
- `GET /api/bids/:gigId` - Get all bids for a gig (Owner only)
- `GET /api/bids/my-bids` - User's bids
- `PATCH /api/bids/:bidId/hire` - Hire a freelancer (atomic update)

## 🔐 User Roles

- **Client**: Post gigs, manage bids
- **Freelancer**: Browse gigs, submit bids

## 🚀 Deployment

- **Frontend**: Netlify (auto-deploys from `frontend/`)
- **Backend**: Render (auto-deploys from `backend/`)

See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

## 📝 License

MIT
