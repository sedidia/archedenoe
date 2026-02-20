import mongoose from 'mongoose';

const MomentSchema = new mongoose.Schema({
  date: String,
  location: String,
  description: String,
  entryType: String,
  imageUrl: String,      // <--- Vérifie que ce champ est présent
  cloudinaryId: String   // <--- Vérifie que ce champ est présent
});
export default mongoose.models.Moment || mongoose.model('Moment', MomentSchema);

