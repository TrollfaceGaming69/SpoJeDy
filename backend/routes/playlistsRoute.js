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

        const uploadResponse = await uploadToImageKit(reencoded, "/userPlaylist/");
        coverUrl = uploadResponse.url;
      }

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

// Get all playlists
router.get("/playlists", verifyToken, async (req, res) => {
  try {
    const playlists = await UserPlaylist.find({}, { _id: 0, __v: 0 }).sort("id");
    res.status(200).json(playlists);
  } catch (err) {
    console.error("Error fetching playlists:", err);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// Get playlist by id
router.get("/playlists/:id", verifyToken, async (req, res) => {
  try {
    const playlist = await UserPlaylist.findOne(
      { id: Number(req.params.id) },
      { _id: 0, __v: 0 }
    );
    if (!playlist) return res.status(404).json({ message: "Playlist not found." });
    res.status(200).json(playlist);
  } catch (err) {
    console.error("Error fetching playlist:", err);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// Add a song to a playlist
router.put("/playlists/:id/songs", verifyToken, async (req, res) => {
  try {
    const { songId } = req.body;
    if (songId === undefined || songId === null) {
      return res.status(400).json({ message: "songId is required." });
    }

    const playlist = await UserPlaylist.findOne({ id: Number(req.params.id) });
    if (!playlist) return res.status(404).json({ message: "Playlist not found." });

    if (playlist.songs.includes(Number(songId))) {
      return res.status(400).json({ message: "Song already in playlist." });
    }

    playlist.songs.push(Number(songId));
    await playlist.save();

    const updated = playlist.toObject();
    delete updated._id;
    delete updated.__v;

    res.status(200).json({ message: "Song added to playlist.", playlist: updated });
  } catch (err) {
    console.error("Error adding song to playlist:", err);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// Remove a song from a playlist
router.delete("/playlists/:id/songs/:songId", verifyToken, async (req, res) => {
  try {
    const playlist = await UserPlaylist.findOne({ id: Number(req.params.id) });
    if (!playlist) return res.status(404).json({ message: "Playlist not found." });

    const songIndex = playlist.songs.indexOf(Number(req.params.songId));
    if (songIndex === -1) {
      return res.status(404).json({ message: "Song not in playlist." });
    }

    playlist.songs.splice(songIndex, 1);
    await playlist.save();

    const updated = playlist.toObject();
    delete updated._id;
    delete updated.__v;

    res.status(200).json({ message: "Song removed from playlist.", playlist: updated });
  } catch (err) {
    console.error("Error removing song from playlist:", err);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

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
