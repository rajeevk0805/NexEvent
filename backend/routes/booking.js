import express from "express";
const router = express.Router();
import { protect,admin } from "../middleware/auth.js";
import {bookEvent,sendBookingOTP,getMyBookings,confirmBooking,cancelBooking,updatePaymentStatus} from "../controllers/bookingController.js"

router.post("/",protect,bookEvent)
router.post("/send-otp",protect,sendBookingOTP)
router.get("/my-booking",protect,getMyBookings);
router.put("/:id/confirm",protect,admin,confirmBooking)
router.delete("/:id",protect,cancelBooking);
router.put("/:id/payment-status",protect,admin,updatePaymentStatus);

export default router;