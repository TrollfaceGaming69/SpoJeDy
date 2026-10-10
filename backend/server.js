import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import registerRoute from "./routes/register.js"
import loginRoute from "./routes/login.js"

import albumsRoute from "./routes/albumsRoute.js"
import songsRoute from "./routes/songsRoute.js"
import musicVideosRoute from "./routes/musicVideosRoutes.js"
import profileRoute from "./routes/profileRoute.js"
import playlistsRoute from "./routes/playlistsRoute.js"

const app = express()
const allowedOrigins = [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/]

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL)
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some((pattern) => pattern.test(origin))) {
      callback(null, true)
      return
    }
    callback(null, false)
  },
  credentials: true,
}))
app.use(express.json())

app.use((req, res, next) => {
  if (req.method === 'GET') {
    if (req.path.match(/\.(mp3|mp4|webm|webp|png|jpg|jpeg|svg)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (req.path.startsWith('/api/albums') || req.path.startsWith('/api/songs') || req.path.startsWith('/api/videos') || req.path.startsWith('/api/musicVideos')) {
      res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');
    }
  }
  next();
})


await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Connection failed:', err.message))

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", albumsRoute);
app.use("/api", songsRoute);
app.use("/api", musicVideosRoute);
app.use("/api", profileRoute);
app.use("/api", playlistsRoute);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))