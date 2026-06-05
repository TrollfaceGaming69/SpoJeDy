import express from "express"
import User from "../models/users.js"
import ratelimit from "express-rate-limit"

const router = express.Router();

const registerLimiter = ratelimit({
    windowMs: 5 * 60 * 100,
    max: 3,
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false,
    message: {message: "Too many failed attempts, try again after 5 minutes"}
})

router.post("/register", registerLimiter, async(requestAnimationFrame, res) => {
    const {username, email, password} = req.body;
    
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message: "Email already used"});
        }

        const user = new User({username, email, password})
        await user.save();

        res.status(201).json({message: "User has been registered"})
    }
    catch(err){
        res.status(500).json({message: "Server error", error: err.message})
    }
});

export default router;