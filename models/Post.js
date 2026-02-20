import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  cloudinaryId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);