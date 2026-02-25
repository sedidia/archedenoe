import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  cloudinaryId: String,
  youtubeId: String,  // Stocké lors du POST /api/posts
  facebookId: String, // Stocké lors du POST /api/posts
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);