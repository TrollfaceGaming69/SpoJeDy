import { Router } from "express";
import Songs from "../models/songs"

const router = Router()

router.get("/", async (req, res) => {
    const songs = await Songs.find().populate("albumId")
})

router.get('/:id', async (req, res) => {
  const song = await Song.findById(req.params.id).populate('albumId', 'title coverUrl')
  res.json(song)
})

export default router