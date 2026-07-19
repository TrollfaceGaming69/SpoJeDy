import express from "express";
import UserPlaylist from "../models/userPlaylist.js";
import { upload, validateMagicBytes, processImageToWebp, uploadToImageKit } from "../utils/imageProcessor.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

router.post(
  "/playlists",
  verifyToken,
  upload.single("cover"),
  async (req, res) => {
    try {
      const { name, description } = req.body;

      if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Playlist name is required." });
      }

      let coverUrl = "";

      if (req.file) {
        if (!validateMagicBytes(req.file.buffer)) {
          return res.status(400).json({ message: "Invalid image file. Magic bytes do not match any supported format." });
        }

        let reencoded;
        try {
          reencoded = await processImageToWebp(req.file.buffer);
        } catch (sharpErr) {
          console.error("Playlist cover image processing failed:", sharpErr);
          return res.status(400).json({ message: "Invalid or corrupted image file." });
        }

        // Upload to ImageKit folder /userPlaylist/
        const uploadResponse = await uploadToImageKit(reencoded, "/userPlaylist/");
        coverUrl = uploadResponse.url;
      }

      // Generate the next integer ID
      const lastPlaylist = await UserPlaylist.findOne().sort("-id");
      const nextId = lastPlaylist ? lastPlaylist.id + 1 : 0;

      const newPlaylist = new UserPlaylist({
        id: nextId,
        name: name.trim(),
        description: description ? description.trim() : "",
        cover: coverUrl,
        songs: []
      });

      await newPlaylist.save();

      res.status(201).json({
        message: "Playlist created successfully.",
        playlist: newPlaylist
      });
    } catch (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File too large. Maximum size is 10 MB." });
      }
      console.error("Error creating playlist:", err);
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
