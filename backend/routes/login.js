import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/users.js"
import ratelimit from "express-rate-limit"

const router = express.Router();

// rate limiter
const loginLimiter = ratelimit({
    windowMs: 5 * 60 * 100,
    max: 3,
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false,
    message: {message: "Too many failed attempts, try again after 5 minutes"}
})

router.post("/login", loginLimiter ,async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({message: "Invalid email or password"});
        }

        const token = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.status(200).json({message: "Login successful", token});
    }
    catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
});

export default router;