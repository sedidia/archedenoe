import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Concert from '@/models/Concert';

// --- CETTE FONCTION PERMET DE LIRE (GET) ---
export async function GET() {
  try {
    await dbConnect();
    // On récupère les concerts et on les trie du plus récent au plus ancien
    const concerts = await Concert.find({}).sort({ date: 1 }); 
    return NextResponse.json({ success: true, data: concerts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- TA FONCTION POST EXISTANTE (POUR ENREGISTRER) ---
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newConcert = await Concert.create(body);
    return NextResponse.json({ success: true, data: newConcert }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}