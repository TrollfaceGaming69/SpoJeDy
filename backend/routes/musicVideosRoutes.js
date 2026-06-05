import express from "express"
import MusicVideos from "../models/musicVideos.js"

const router = express.Router();

router.get("/musicVideos", async (req, res) => {
    try{
        const musicVideos = await MusicVideos.find({}, {_id: 0, __v: 0});
        console.log("Found videos");
        res.status(200).json(musicVideos);
    }
    catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
});

router.get("/videos/:id", async (req, res) => {
    try{
        const musicVideos = await MusicVideos.findOne({id: req.params.id}, { _id: 0, __v: 0 });
        if(!musicVideos) return res.status(404).json({message: "Video not found"});
        res.status(202).json(musicVideos);
    }
    catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;