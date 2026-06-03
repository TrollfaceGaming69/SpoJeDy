import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import mongoSanitize from "express-mongo-sanitize"

import registerRoute from "./routes/register"
import loginRoute from "./routes/login"

import albumsRoute from "./routes/albumsRoute"
import songsRoute from "./routes/songsRoute"
import musicVideosRoute from "./routes/musicVideosRoutes"

const app = express()
app.use(cors({origin: "http://localhost:5173"}))
app.use(express.json())
app.use(mongoSanitize());


await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Connection failed:', err.message))

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", albumsRoute);
app.use("/api", songsRoute);
app.use("/api", musicVideosRoute);

app.listen(3000, () => console.log("server is running"))