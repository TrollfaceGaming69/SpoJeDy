import express from "express"
import Album from "../models/albums"

const router = express.Router();

router.get("/albums", async (req, res) => {
    try{
        const albums = await Album.find({}, {_id: 0, __v: 0});
        res.status(200).json(albums);
    }
    catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
});

router.get("/albums/:id", async (req, res) => {
    try{
        const albums = await Album.findOne({id: req.params.id}, {_id: 0, __v: 0});

        if(!albums) return res.status(404).json({message: "Album not found"});
        res.status(200).json(albums);
    }
    catch(err){
        res.status(500).json({message: "Server error", error: err.message})
    }
});

export default router;