import express from "express"
import Song from "../models/songs.js"

const router = express.Router()

router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find({}, {_id: 0, __v: 0});
    res.status(200).json(songs);
  } catch(err){
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/songs/:id", async (req, res) => {
  try{
    const songs = await Song.findOne({ id: req.params.id }, { _id: 0, __v: 0 });
    if (!songs) return res.status(404).json({ message: "Song not found" });
    res.status(200).json(songs);
  }
  catch(err){
    res.status(500).json({message: "Server error", error: err.message});
  }
});

export default router;