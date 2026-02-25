import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Badge thématique */}
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
          Erreur de mesure
        </p>
        
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          404 : Silence radio
        </h1>
        
        <p className="mt-6 text-base leading-7 text-gray-600 max-w-md mx-auto">
          Désolé, cette page a dû quitter la scène prématurément. 
          Le lien que vous cherchez n'est plus au programme !
        </p>

        {/* Illustration visuelle avec Tailwind */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <div className="relative">
            <span className="text-6xl animate-bounce inline-block">🎵</span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gray-200 rounded-full blur-sm"></div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
          >
            Retourner au pupitre
          </Link>

          <Link 
            href="https://wa.me/243977077791?text=Bonjour,%20je%20suis%20perdu%20sur%20le%20site%20de%20la%20chorale%20ARCHE%20DE%20NOE..." 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors group"
            >
            {/* Icône WhatsApp (simple cercle + bulle) */}
            <svg 
                className="w-5 h-5 fill-current" 
                viewBox="0 0 24 24"
            >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.544.916 3.12 1.399 4.809 1.401 5.204 0 9.439-4.234 9.442-9.438 0-2.522-.983-4.891-2.767-6.677-1.784-1.783-4.155-2.765-6.68-2.765-5.204 0-9.44 4.235-9.443 9.44 0 1.77.462 3.498 1.339 5.011l-1.026 3.748 3.828-.102z"/>
            </svg>
            Contacter le bureau sur WhatsApp
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
            </Link>
        </div>
      </div>

      {/* Décoration de fond (optionnelle) */}
      <div className="absolute inset-0 -z-10 overflow-hidden blur-3xl" aria-hidden="true">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
        />
      </div>
    </main>
  );
}