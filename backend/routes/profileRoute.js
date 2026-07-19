import express from "express"
import ratelimit from "express-rate-limit"
import { z } from "zod"
import User from "../models/users.js"
import { verifyToken } from "../middleware/authMiddleware.js"
import { imagekit, upload, validateMagicBytes, processImageToWebp, uploadToImageKit } from "../utils/imageProcessor.js"
import multer from "multer"

const router = express.Router();

// ─── Rate Limiter (5 uploads per 15 min) ────────────────────────────────────────
const uploadLimiter = ratelimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many upload attempts. Try again after 15 minutes." },
});

// ─── Zod Schema ─────────────────────────────────────────────────────────────────
const usernameSchema = z.object({
    username: z.string()
        .trim()
        .min(1, "Username must be at least 1 character.")
        .max(30, "Username must be at most 30 characters.")
        .regex(/^[a-zA-Z0-9_ ]+$/, "Username can only contain letters, numbers, underscores, and spaces."),
});

// ─── Helper: Generate signed URL ────────────────────────────────────────────────
function getSignedProfileUrl(imagePath) {
    if (!imagePath) return "";
    return imagekit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
        src: imagePath,
        signed: true,
        expiresIn: 60 * 60 * 24, // 24-hour signed URL
    });
}

// ─── GET /api/profile ───────────────────────────────────────────────────────────
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            profilePicture: getSignedProfileUrl(user.profilePicture),
        });
    } catch (err) {
        res.status(500).json({ message: "Server error.", error: err.message });
    }
});

// ─── PUT /api/profile ───────────────────────────────────────────────────────────
router.put(
    "/profile",
    verifyToken,
    uploadLimiter,
    upload.single("profilePicture"),
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            // ── Ownership validation ──
            const storedUserId = user._id?.toString?.() ?? '';
            if (storedUserId !== req.user.userId) {
                return res.status(403).json({ message: "You can only update your own profile." });
            }

            // ── Username update (if provided) ──
            if (req.body.username !== undefined) {
                const parsed = usernameSchema.safeParse({ username: req.body.username });
                if (!parsed.success) {
                    return res.status(400).json({
                        message: "Invalid username.",
                        errors: parsed.error.flatten().fieldErrors,
                    });
                }
                user.username = parsed.data.username;
            }

            // ── Profile picture upload (if provided) ──
            if (req.file) {
                // Magic byte validation
                if (!validateMagicBytes(req.file.buffer)) {
                    return res.status(400).json({ message: "Invalid image file. Magic bytes do not match any supported format." });
                }

                // Re-encode with Sharp → WebP (also strips EXIF metadata)
                let reencoded;
                try {
                    reencoded = await processImageToWebp(req.file.buffer);
                } catch (sharpErr) {
                    console.error("Profile image processing failed:", sharpErr);
                    return res.status(400).json({ message: "Invalid or corrupted image file." });
                }

                // Upload to ImageKit under /pfp/ folder
                const uploadResponse = await uploadToImageKit(reencoded, "/pfp/");

                // Delete old profile picture from ImageKit (if exists)
                if (user.profilePictureFileId) {
                    try {
                        await imagekit.files.delete(user.profilePictureFileId);
                    } catch (deleteErr) {
                        // Non-critical: log but don't fail the request
                        console.warn("Failed to delete old profile picture from ImageKit:", deleteErr.message);
                    }
                }

                // Store only upload metadata (path + fileId), never user input
                user.profilePicture = uploadResponse.filePath;
                user.profilePictureFileId = uploadResponse.fileId;
            }

            await user.save();

            res.status(200).json({
                message: "Profile updated successfully.",
                username: user.username,
                profilePicture: getSignedProfileUrl(user.profilePicture),
            });
        } catch (err) {
            // Handle Multer file size errors
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({ message: "File too large. Maximum size is 10 MB." });
            }
            if (err.message && err.message.includes("Only JPEG")) {
                return res.status(400).json({ message: err.message });
            }
            console.error("Profile update error:", err);
            res.status(500).json({ message: "Server error.", error: err.message });
        }
    }
);

// ─── Multer error handler ───────────────────────────────────────────────────────
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "File too large. Maximum size is 10 MB." });
        }
        return res.status(400).json({ message: err.message });
    }
    if (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
});

export default router;
