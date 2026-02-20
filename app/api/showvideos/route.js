import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

// Route pour récupérer tous les posts
export async function GET() {
  try {
    // 1. Connexion à la base de données
    await dbConnect();

    // 2. Récupération de tous les documents (triés du plus récent au plus ancien)
    const posts = await Post.find({}).sort({ createdAt: -1 });

    // 3. Retourner les données avec un message de succès
    return NextResponse.json(
      { 
        success: true, 
        count: posts.length, 
        data: posts 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Impossible de récupérer les vidéos" 
      }, 
      { status: 500 }
    );
  }
}

// Gardez votre fonction export async function POST(req) { ... } en dessous