import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from "./routes/auth.js";
import event from "./routes/event.js";
import booking from "./routes/booking.js";

dotenv.config();

let dbConnected = false;

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

app.use("/api/auth", authRoutes);
app.use("/api/events", event);
app.use("/api/bookings", booking);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "NexEvent API is running" });
});


// Export for Vercel serverless deployment
export default async function handler(req, res) {
  
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
  
  return app(req, res);
}

// For local development only
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'vercel') {
  const PORT = process.env.PORT || 5000;
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}