import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Récupération des secrets depuis le .env.local
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    // Vérification
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      
      // ✅ Next.js 15 : On attend la promesse des cookies
      const cookieStore = await cookies();

      // On crée un cookie sécurisé
      cookieStore.set('admin_session', 'authenticated_arche_de_noe', {
        httpOnly: true, // Sécurité : inaccessible via JavaScript côté client
        secure: process.env.NODE_ENV === 'production', // Uniquement en HTTPS en production
        maxAge: 60 * 60 * 24, // Expire après 24 heures
        path: '/',
      });

      return NextResponse.json({ message: "Connexion réussie" }, { status: 200 });
    }

    // Si les identifiants ne correspondent pas
    return NextResponse.json(
      { error: "Email ou mot de passe incorrect" },
      { status: 401 }
    );

  } catch (error) {
    console.error("ERREUR LOGIN:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}