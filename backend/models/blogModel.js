import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true,
  },
});

export default mongoose.model("Blog", BlogSchema);
