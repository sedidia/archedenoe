import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { google } from 'googleapis';
import { PassThrough } from 'stream'; // Indispensable pour YouTube
import { cookies } from 'next/headers';

export async function POST(req) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if(!session || session.value !== 'authentificated_arche_de_noe'){
    return new Response(JSON.stringify({ error: "Accès interdit : Veuillez vous connecter." }))
  }
  
  try {
    // 1. Connexion à la base de données
    await dbConnect();

    // 2. Récupération des données du frontend
    const body = await req.json();
    const { title, videoUrl, cloudinaryId } = body;

    // Debug : Vérification des variables d'environnement dans le terminal
    console.log("--- DEBUG ENV ---");
    console.log("YT_ID présent :", !!process.env.YT_CLIENT_ID);
    console.log("FB_TOKEN présent :", !!process.env.FB_PAGE_ACCESS_TOKEN);

    if (!title || !videoUrl || !cloudinaryId) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    let youtubeId = null;

    // --- LOGIQUE YOUTUBE ---
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.YT_CLIENT_ID,
        process.env.YT_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );

      oauth2Client.setCredentials({ refresh_token: process.env.YT_REFRESH_TOKEN });

      const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

      // Récupération de la vidéo depuis Cloudinary en Stream
      const videoRes = await fetch(videoUrl);
      if (!videoRes.ok) throw new Error("Impossible de lire la vidéo sur Cloudinary");

      // Conversion Web Stream -> Node.js Stream (pour corriger l'erreur .pipe)
      const passThroughStream = new PassThrough();
      const reader = videoRes.body.getReader();

      // On lance la lecture du flux en arrière-plan
      (async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            passThroughStream.end();
            break;
          }
          passThroughStream.write(Buffer.from(value));
        }
      })();

      const ytResponse = await youtube.videos.insert({
        part: 'snippet,status',
        requestBody: {
          snippet: { title, description: "Publié via ArchePlay" },
          status: { privacyStatus: 'public' },
        },
        media: { body: passThroughStream },
      });

      youtubeId = ytResponse.data.id;
      console.log("✅ Succès YouTube ID:", youtubeId);
    } catch (ytErr) {
      console.error("❌ Erreur YouTube détaillée:", ytErr.response?.data || ytErr.message);
    }

    // --- LOGIQUE FACEBOOK ---
    try {
      const fbRes = await fetch(`https://graph.facebook.com/me/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_url: videoUrl,
          title: title,
          description: "Publié via ArchePlay",
          access_token: process.env.FB_PAGE_ACCESS_TOKEN
        }),
      });
      const fbData = await fbRes.json();
      if (fbRes.ok) console.log("✅ Succès Facebook ID:", fbData.id);
      else console.error("❌ Erreur Facebook:", fbData.error?.message);
    } catch (fbErr) {
      console.error("❌ Erreur réseau Facebook:", fbErr.message);
    }

    // --- SAUVEGARDE MONGODB ---
    const newPost = await Post.create({
      title,
      videoUrl,
      cloudinaryId,
      youtubeId,
    });

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });

  } catch (error) {
    console.error("ERREUR GLOBALE API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// FONCTIONNEL

// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import Post from '@/models/Post';

// export async function POST(req) {
//   try {
//     await dbConnect();
    
//     const body = await req.json();
//     const { title, videoUrl, cloudinaryId } = body;

//     // Validation manuelle avant MongoDB pour éviter la 400 générique
//     if (!title || !videoUrl || !cloudinaryId) {
//       return NextResponse.json(
//         { success: false, error: "Données manquantes (titre, url ou id)" },
//         { status: 400 }
//       );
//     }

//     const newPost = await Post.create({
//       title,
//       videoUrl,
//       cloudinaryId,
//     });

//     return NextResponse.json({ success: true, data: newPost }, { status: 201 });
//   } catch (error) {
//     console.error("ERREUR API POSTS:", error);
//     return NextResponse.json(
//       { success: false, error: error.message }, 
//       { status: 400 }
//     );
//   }
// }