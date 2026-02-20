'use client';

import React, { useState } from 'react';

export default function HomePage() {
  const [aboutIsOpen, setAboutaboutIsOpen] = useState(false);

  const features = [
    {
      title: "Notre Passion",
      desc: "L'harmonie des voix pour créer des moments d'émotion pure.",
      border: "border-red-600",
      text: "text-red-600"
    },
    {
      title: "Notre Répertoire",
      desc: "Du classique au contemporain, une diversité qui nous définit.",
      border: "border-blue-600",
      text: "text-blue-600"
    },
    {
      title: "Nous Rejoindre",
      desc: "Ouvert à tous les passionnés, sans distinction de niveau.",
      border: "border-gray-200",
      text: "text-gray-800"
    }
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Bouton pour ouvrir le Modal */}
      <button 
        onClick={() => setAboutaboutIsOpen(true)}
        className="bg-blue-600 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Découvrir la Chorale
      </button>

      {/* MODAL PLEIN ÉCRAN */}
      {aboutIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
          
          {/* Backdrop (Arrière-plan flou) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setAboutaboutIsOpen(false)}
          ></div>

          {/* Contenu du Modal */}
          <div className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-6xl sm:rounded-2xl shadow-2xl overflow-y-auto transition-all duration-500 scale-100">
            
            {/* Bouton Fermer */}
            <button 
              onClick={() => setAboutaboutIsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-red-600 hover:text-white text-gray-800 p-2 rounded-full transition-colors shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Ton composant AboutSection intégré ici */}
            <section className="relative bg-white py-12 px-6 sm:px-10 overflow-hidden">
              {/* Éléments décoratifs */}
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-red-600"></div>

              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">À propos de nous</h2>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    L'Âme de notre <span className="text-red-600">Chorale</span>
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {features.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-6 border-l-4 ${item.border} bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300`}
                    >
                      <h3 className={`text-lg font-bold ${item.text} mb-2`}>{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-16 flex flex-col lg:flex-row items-center gap-10">
                  <div className="w-full lg:w-1/2 relative">
                    <div className="absolute -top-3 -left-3 w-full h-full border-2 border-blue-600 rounded-lg hidden sm:block"></div>
                    <div className="relative h-72 w-full bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                       <img 
                        src="https://res.cloudinary.com/archedenoe/image/upload/v1771585800/moment_posters/gy9ctd4na3lwudxxxdh2.jpg" 
                        alt="Chorale en concert"
                        className="w-full h-full object-cover"
                       />
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 space-y-4 text-left">
                    <h3 className="text-2xl font-bold text-gray-900">Une histoire de cœur et de voix</h3>
                    <p className="text-gray-600">
                      Depuis plus de 10 ans, nous rassemblons des personnes de tous horizons pour partager 
                      le plaisir du chant choral. Notre ensemble se distingue par sa rigueur et sa convivialité.
                    </p>
                    <div className="flex gap-4 pt-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                        Nous découvrir
                      </button>
                      <button 
                        onClick={() => setAboutaboutIsOpen(false)}
                        className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      )}
    </main>
  );
}