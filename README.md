# NexEvent - Event Management Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing events, bookings, and user authentication with OTP verification and email notifications.

## 🚀 Features

### User Features
- **User Authentication** - Register and login with JWT-based authentication
- **OTP Verification** - Email-based OTP for secure registration and booking
- **Browse Events** - View all available events with filtering by category and location
- **Book Events** - Secure booking system with OTP verification
- **User Dashboard** - View booking history and status
- **Email Notifications** - Automated emails for registration, booking confirmation, and OTP

### Admin Features
- **Admin Dashboard** - Comprehensive dashboard with statistics
- **Event Management** - Create, view, and delete events
- **Booking Management** - View all bookings, approve/reject booking requests
- **Payment Status Control** - Manually confirm payments and update payment status
- **Analytics** - Track total revenue, paid clients, and pending requests

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt.js** - Password hashing
- **Nodemailer** - Email service
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
NexEvent/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── bookingController.js  # Booking operations
│   │   └── eventController.js    # Event CRUD operations
│   ├── middleware/
│   │   └── auth.js               # JWT & admin authentication
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── OTP.js                # OTP schema
│   │   ├── event.js              # Event schema
│   │   └── bookingsModel.js      # Booking schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── booking.js            # Booking routes
│   │   └── event.js              # Event routes
│   ├── utils/
│   │   └── email.js              # Email utility functions
│   ├── .env                      # Environment variables
│   └── index.js                  # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx        # Navigation component
    │   ├── context/
    │   │   └── AuthContext.jsx   # Authentication context
    │   ├── pages/
    │   │   ├── Home.jsx          # Landing page
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   ├── UserDashboard.jsx # User dashboard
    │   │   ├── AdminDashboard.jsx# Admin dashboard
    │   │   ├── EventDetail.jsx   # Event details page
    │   │   ├── PaymentSuccess.jsx# Payment success page
    │   │   └── PaymentFailed.jsx # Payment failed page
    │   ├── utils/
    │   │   └── axios.js          # Axios instance with interceptors
    │   ├── .env                  # Environment variables
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Global styles
    └── index.html                # HTML template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Gmail account for email service (or update email configuration)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/nexevent.git
cd NexEvent
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Configure Backend Environment Variables**
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
JWT_SECRET=your_secret_key
```

4. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

5. **Configure Frontend Environment Variables**
Create a `.env` file in the `frontend/src` directory:
```env
VITE_SERVER_URL=http://localhost:5000/api
```

### Running the Application

1. **Start Backend Server**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

2. **Start Frontend Development Server** (in a new terminal)
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/send-otp` - Send registration OTP
- `POST /api/auth/verify-otp` - Verify registration OTP

### Events
- `GET /api/events` - Get all events (with optional category/location filters)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Bookings
- `POST /api/bookings` - Create booking (requires OTP)
- `POST /api/bookings/send-otp` - Send booking OTP
- `GET /api/bookings/my-booking` - Get user's bookings (Admin gets all)
- `PUT /api/bookings/:id/confirm` - Confirm booking (Admin only)
- `PUT /api/bookings/:id/payment-status` - Update payment status (Admin only)
- `DELETE /api/bookings/:id` - Cancel booking

## 🔐 Security Features

- **JWT Authentication** - Token-based authentication
- **Password Hashing** - Bcrypt for secure password storage
- **OTP Verification** - Email-based OTP for critical operations
- **Role-Based Access Control** - Separate user and admin roles
- **Protected Routes** - Middleware for route protection
- **CORS Configuration** - Configured for production deployment

## 📧 Email Configuration

The application uses Nodemailer with Gmail for sending:
- Registration OTP
- Booking OTP
- Booking confirmation emails

To set up Gmail app password:
1. Enable 2-Step Verification on your Google Account
2. Go to App Passwords
3. Generate a new app password
4. Use it in the `EMAIL_PASS` environment variable

## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

### Frontend (Render)
1. Create new Static Site on Render
2. Set root directory to `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `frontend/dist`
5. Add `VITE_SERVER_URL` environment variable
6. Deploy

See deployment guide in the project files for detailed instructions.

## 👥 User Roles

### Regular User
- Register and login
- Browse and book events
- View personal booking history
- Receive email notifications

### Admin
- All user features
- Create and manage events
- View and manage all bookings
- Approve/reject booking requests
- Update payment statuses
- View analytics dashboard

## 🔑 Test Credentials

### Admin Account
- **Email:** admin@nexevent.com
- **Password:** Admin@123

### Test User Account
- **Email:** user@example.com
- **Password:** user@123

## 🎨 UI/UX Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean and intuitive interface with Tailwind CSS
- **Real-time Feedback** - Loading states and error messages
- **Status Indicators** - Visual badges for booking and payment status
- **Smooth Animations** - Hover effects and transitions

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**
   - Ensure backend CORS is configured with frontend URL
   - Check `FRONTEND_URL` environment variable

2. **Email Not Sending**
   - Verify Gmail app password is correct
   - Check if 2-Step Verification is enabled

3. **Database Connection Failed**
   - Verify MongoDB connection string
   - Check IP whitelist in MongoDB Atlas

4. **Environment Variables Not Loading**
   - Frontend: Ensure variables start with `VITE_`
   - Restart dev server after adding variables

## 📝 Scripts

### Backend
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
npm run lint   # Run ESLint
```



## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For support, email rkrajeev0805@gmail.com or open an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
