import mongoose from 'mongoose';

const ConcertSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  description: String,
  entryType: String,
  imageUrl: String,      // <--- Vérifie que ce champ est présent
  cloudinaryId: String   // <--- Vérifie que ce champ est présent
});
export default mongoose.models.Concert || mongoose.model('Concert', ConcertSchema);

