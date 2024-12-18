import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now },
  });

export const Image = mongoose.model('Img', imageSchema)