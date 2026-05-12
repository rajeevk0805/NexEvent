import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendOTPEmail } from "../utils/email.js";
import OTP from "../models/OTP.js";
import jwt from "jsonwebtoken";


const generateToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role:'user',
      isVerified:false,
    });
   
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Your OTP is ${otp}`);
    await OTP.create({ email, otp, action: 'account_verification' });
    await sendOTPEmail(email, otp, "account_verification");

    res.status(201).json({
      message: "User registered successfully. Please Check Your Email for OTP to verify your account",
      email: user.email,
    });


  } catch {
    res.status(500).json({
      error: error.message,
    });
  }
};


// login

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    if(!user.isVerified && user.role === 'user') {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await OTP.deleteMany({ email, action: 'account_verification' });
      await OTP.create({ email, otp, action: 'account_verification' });
      await sendOTPEmail(email, otp, "account_verification");
      return res.status(200).json({
        message: "Account is not verified. Please check your email for OTP to verify your account",
      });
    }
    res.json({
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
     


  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const otpRecord = await OTP.findOne({ email, otp, action: 'account_verification' });
  if (!otpRecord) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }
  const user = await User.findOneAndUpdate({ email }, { isVerified: true }, { returnDocument: 'after' });
  res.status(200).json({
    message: "OTP verified successfully",
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
  await OTP.deleteMany({ email, action: 'account_verification' });
};
