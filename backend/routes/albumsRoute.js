import { Router } from "express";
import Albums from "../models/albums"
import Songs from "../models/songs"

const router = Router()

router.get("/", async (req, res) => {
    const albums = await Albums.find()
    res.json(albums)
})

router.get("/:id/songs", async (req, res) => {
    const album = await Albums.findById(req.params.id)
    res.json(songs)
})

export default router