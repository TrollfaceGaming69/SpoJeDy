import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

dotenv.config()

import registerRoute from "./routes/register.js"
import loginRoute from "./routes/login.js"

import albumsRoute from "./routes/albumsRoute.js"
import songsRoute from "./routes/songsRoute.js"
import musicVideosRoute from "./routes/musicVideosRoutes.js"

const app = express()
app.use(cors({origin: "http://localhost:5173"}))
app.use(express.json())

await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Connection failed:', err.message))

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", albumsRoute);
app.use("/api", songsRoute);
app.use("/api", musicVideosRoute);

app.listen(3000, () => console.log("server is running"))