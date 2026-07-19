import express from "express"
import MusicVideos from "../models/musicVideos.js"

const router = express.Router();

const normalizeVideo = (video) => {
    if (!video || typeof video !== 'object') return video;

    const plainVideo = video.toObject ? video.toObject() : video;

    return Object.fromEntries(
        Object.entries(plainVideo).filter(([key]) => !['_id', '__v'].includes(key)).map(([key, value]) => {
            if (typeof value === 'string') {
                return [key, value.trim()];
            }
            return [key, value];
        })
    );
};

router.get("/musicVideos", async (req, res) => {
    try{
        const musicVideos = await MusicVideos.find({}, {_id: 0, __v: 0}).lean();
        const normalizedVideos = musicVideos.map(normalizeVideo);
        console.log("Found videos");
        res.status(200).json(normalizedVideos);
    }
    catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
});

router.get("/videos/:id", async (req, res) => {
    try{
        const musicVideo = await MusicVideos.findOne({id: req.params.id}, { _id: 0, __v: 0 }).lean();
        if(!musicVideo) return res.status(404).json({message: "Video not found"});
        res.status(202).json(normalizeVideo(musicVideo));
    }
    catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;