import mongoose from 'mongoose'

export default mongoose.model('MusicVideos', new mongoose.Schema({
    id: {type: Number, requided: true},
    name:       { type: String, required: true },
    fileUrl:    { type: String, required: true },
    cover:    String,
    artist:   String,
}, { timestamps: true }))