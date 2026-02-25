import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Moment from '@/models/Moment';
import { cookies } from 'next/headers';

// --- CETTE FONCTION PERMET DE LIRE (GET) ---
export async function GET() {
  try {
    await dbConnect();
    // On récupère les moments et on les trie du plus récent au plus ancien
    const Moments = await Moment.find({}).sort({ date: 1 }); 
    return NextResponse.json({ success: true, data: Moments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- TA FONCTION POST EXISTANTE (POUR ENREGISTRER) ---
export async function POST(req) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if(!session || session.value !== 'authentificated_arche_de_noe'){
    return new Response(JSON.stringify({ error: "Accès interdit : Veuillez vous connecter." }))
  }

  try {
    await dbConnect();
    const body = await req.json();
    const newMoment = await Moment.create(body);
    return NextResponse.json({ success: true, data: newMoment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}