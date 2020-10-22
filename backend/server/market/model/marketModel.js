import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const location = mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const marketSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  location: location,
  images: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now() },
});

marketSchema.plugin(uniqueValidator);

export default mongoose.model("Market", marketSchema);
