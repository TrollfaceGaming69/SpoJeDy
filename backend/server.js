import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express()
app.use(cors({origin: "http://localhost:5173"}))
app.use(express.json())


await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Connection failed:', err.message))

app.listen(3000, () => console.log("server is running"))