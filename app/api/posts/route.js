import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { title, videoUrl, cloudinaryId } = body;

    // Validation manuelle avant MongoDB pour éviter la 400 générique
    if (!title || !videoUrl || !cloudinaryId) {
      return NextResponse.json(
        { success: false, error: "Données manquantes (titre, url ou id)" },
        { status: 400 }
      );
    }

    const newPost = await Post.create({
      title,
      videoUrl,
      cloudinaryId,
    });

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    console.error("ERREUR API POSTS:", error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 400 }
    );
  }
}