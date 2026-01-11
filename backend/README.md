# GigFlow Backend API

A Node.js + Express.js backend for the GigFlow freelance marketplace platform.

## 🚀 Features

- **User Authentication**: JWT-based authentication with HttpOnly cookies
- **Gig Management**: Full CRUD operations for job postings
- **Bidding System**: Submit bids on gigs with atomic hiring logic
- **Security**: Helmet, rate limiting, input sanitization, HPP protection
- **Validation**: Request validation using express-validator

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── index.js      # Main config (env vars)
│   │   └── db.js         # MongoDB connection
│   ├── controllers/      # Route controllers
│   │   ├── auth.controller.js
│   │   ├── gig.controller.js
│   │   └── bid.controller.js
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js       # Authentication middleware
│   │   ├── error.js      # Error handling
│   │   └── validate.js   # Request validation
│   ├── models/           # Mongoose models
│   │   ├── User.js
│   │   ├── Gig.js
│   │   └── Bid.js
│   ├── routes/           # API routes
│   │   ├── auth.routes.js
│   │   ├── gig.routes.js
│   │   └── bid.routes.js
│   ├── utils/            # Utility functions
│   │   ├── ApiError.js   # Custom error class
│   │   ├── ApiResponse.js # Response wrapper
│   │   ├── asyncHandler.js
│   │   └── constants.js
│   ├── app.js            # Express app setup
│   └── server.js         # Server entry point
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/gigflow` |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `JWT_COOKIE_EXPIRE` | Cookie expiration (days) | `7` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login & set cookie | Public |
| POST | `/api/auth/logout` | Logout & clear cookie | Private |
| GET | `/api/auth/me` | Get current user | Private |

### Gigs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/gigs` | Fetch all open gigs | Public |
| GET | `/api/gigs/:id` | Get single gig | Public |
| GET | `/api/gigs/my-gigs` | Get user's gigs | Private |
| POST | `/api/gigs` | Create new gig | Private |
| PUT | `/api/gigs/:id` | Update gig | Private (Owner) |
| DELETE | `/api/gigs/:id` | Delete gig | Private (Owner) |

### Bids
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/bids` | Submit a bid | Private |
| GET | `/api/bids/:gigId` | Get bids for gig | Private (Gig Owner) |
| GET | `/api/bids/my-bids` | Get user's bids | Private |
| PATCH | `/api/bids/:bidId/hire` | Hire freelancer | Private (Gig Owner) |
| DELETE | `/api/bids/:bidId` | Withdraw bid | Private (Bid Owner) |

### Query Parameters (GET /api/gigs)
- `search` - Search by title/description
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

## 🔒 Security Features

- **Helmet**: Sets secure HTTP headers
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Configured for frontend origin
- **Mongo Sanitize**: Prevents NoSQL injection
- **HPP**: Prevents HTTP Parameter Pollution
- **JWT HttpOnly Cookies**: Secure token storage

## 🏗️ Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Gig
```javascript
{
  title: String,
  description: String,
  budget: Number,
  ownerId: ObjectId (User),
  status: 'open' | 'assigned',
  assignedTo: ObjectId (User)
}
```

### Bid
```javascript
{
  gigId: ObjectId (Gig),
  freelancerId: ObjectId (User),
  message: String,
  price: Number,
  status: 'pending' | 'hired' | 'rejected'
}
```

## 🔄 Hiring Logic (Atomic Transaction)

When a client hires a freelancer:
1. Gig status → `assigned`
2. Chosen bid status → `hired`
3. All other bids → `rejected`

This is done atomically using MongoDB transactions.

## 📝 License

ISC
