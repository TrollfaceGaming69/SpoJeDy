import express from "express"
import Song from "../models/songs.js"

const router = express.Router()

const normalizeSong = (song) => {
  if (!song || typeof song !== 'object') return song;

  const plainSong = song.toObject ? song.toObject() : song;

  return Object.fromEntries(
    Object.entries(plainSong).filter(([key]) => !['_id', '__v'].includes(key)).map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, value.trim()];
      }
      return [key, value];
    })
  );
};

router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find({}, {_id: 0, __v: 0}).lean();
    const normalizedSongs = songs.map(normalizeSong);
    console.log("Found songs");
    res.status(200).json(normalizedSongs);
  } catch(err){
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/songs/:id", async (req, res) => {
  try{
    const song = await Song.findOne({ id: Number(req.params.id) }, { _id: 0, __v: 0 }).lean();
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.status(200).json(normalizeSong(song));
  }
  catch(err){
    res.status(500).json({message: "Server error", error: err.message});
  }
});

export default router;