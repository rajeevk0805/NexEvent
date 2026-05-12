import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from "./routes/auth.js"
import event from "./routes/event.js";
import booking from "./routes/booking.js";

dotenv.config();
connectDB();



const app = express();
// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/events",event)
app.use("/api/bookings",booking)


const PORT = process.env.PORT || 5000;

// Export app for Vercel serverless
export default app;

// Only listen on port in development (not on Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
