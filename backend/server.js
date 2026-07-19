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

app.listen(3000, () => console.log("server is running"))