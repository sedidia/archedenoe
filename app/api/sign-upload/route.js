import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  // On crée une signature valide pour 1 heure
  const signature = cloudinary.utils.api_sign_request(
    { 
      timestamp: timestamp, 
      folder: 'user_videos' // <--- Doit être présent ici
    },
    process.env.CLOUDINARY_API_SECRET
  );

  return NextResponse.json({ 
    signature, 
    timestamp, 
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY 
  });
}