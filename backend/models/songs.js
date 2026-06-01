import mongoose from "mongoose"

export default mongoose.model("Songs", new mongoose.Schema({
    id:  {type: Number, required: true},
    name: {type: String, required: true},
    src: {type: String, required: true},
    cover: String,
    artist: String
}, {timestamps: true}))