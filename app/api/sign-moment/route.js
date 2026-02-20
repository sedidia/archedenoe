// app/api/sign-upload/route.js
import { v2 as cloudinary } from 'cloudinary';

export async function POST() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  const signature = cloudinary.utils.api_sign_request(
    { 
      timestamp: timestamp, 
      folder: 'moment_posters' 
    },
    process.env.CLOUDINARY_API_SECRET
  );

  return Response.json({
    signature,
    timestamp,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Vérifie que cette variable est bien dans ton .env ou Railway
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
}