import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))

await mongoose.connect(process.env.MONGO_URI)

const Media = mongoose.model('Media', new mongoose.Schema({
  title: String,
  type: String,
  fileUrl: String,
  coverUrl: String,
}))

// Get all media
app.get('/api/media', async (req, res) => {
  const media = await Media.find()
  res.json(media)
})

// Get by type — e.g. GET /api/media?type=video
app.get('/api/media', async (req, res) => {
  const filter = req.query.type ? { type: req.query.type } : {}
  const media = await Media.find(filter)
  res.json(media)
})

app.listen(3000, () => console.log('API running on :3000'))