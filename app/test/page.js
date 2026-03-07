"use client";

import React from 'react';

const ConcertsSection = () => {
  const concerts = [
    {
      date: "24",
      month: "Mai",
      year: "2026",
      title: "Symphonie de Pâques",
      location: "Cathédrale Saints-Pierre-et-Paul, Lubumbashi",
      time: "18:30",
      category: "Gala Prestige",
      status: "Billetterie Ouverte"
    },
    {
      date: "12",
      month: "Juin",
      year: "2026",
      title: "Chœurs en Harmonie",
      location: "Théâtre de la Ville",
      time: "19:00",
      category: "Concert Caritatif",
      status: "Bientôt disponible"
    },
    {
      date: "15",
      month: "Août",
      year: "2026",
      title: "L'Arche Céleste",
      location: "Esplanade du Palais",
      time: "20:00",
      category: "Plein Air",
      status: "Entrée Libre"
    }
  ];

  return (
    <section id="concerts" className="py-24 bg-black text-white font-sans overflow-hidden">
      <div className="container mx-auto px-6 md:px-20 lg:px-32">
        
        {/* En-tête de section */}
        <div className="mb-16 md:flex items-end justify-between">
          <div className="max-w-2xl">
            <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Agenda Culturel
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight">
              Prochaines <br />
              <span className="italic font-black text-gray-500">Représentations</span>
            </h2>
          </div>
          <p className="mt-6 md:mt-0 text-gray-400 font-light max-w-xs border-l border-gray-800 pl-6">
            Rejoignez-nous pour des moments d'élévation spirituelle et de perfection vocale à travers la RDC.
          </p>
        </div>

        {/* Liste des Concerts */}
        <div className="space-y-0">
          {concerts.map((concert, index) => (
            <div 
              key={index}
              className="group relative border-b border-white/10 py-10 flex flex-col md:flex-row md:items-center justify-between hover:px-4 transition-all duration-500 ease-in-out cursor-pointer"
            >
              {/* Effet de background au survol */}
              <div className="absolute inset-0 bg-white/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-10"></div>

              {/* Date */}
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="text-center min-w-[60px]">
                  <span className="block text-4xl font-serif font-light">{concert.date}</span>
                  <span className="block text-[10px] uppercase tracking-widest text-red-600 font-bold">{concert.month}</span>
                </div>
                <div className="h-12 w-[1px] bg-white/20 hidden md:block"></div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">{concert.category}</span>
                  <h3 className="text-2xl md:text-3xl font-serif group-hover:italic transition-all uppercase tracking-tight">
                    {concert.title}
                  </h3>
                </div>
              </div>

              {/* Infos Lieu & Heure */}
              <div className="md:text-right flex flex-col md:items-end gap-1">
                <div className="flex items-center gap-2 text-gray-300 font-light">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{concert.location}</span>
                </div>
                <span className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Début à {concert.time}</span>
              </div>

              {/* Bouton Ticket */}
              <div className="mt-6 md:mt-0">
                <button className="px-8 py-3 border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-white group-hover:text-black transition-all duration-300 rounded-full">
                  {concert.status}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pied de section */}
        <div className="mt-16 text-center">
          <a 
            href="https://wa.me/243000000000" 
            className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-red-600 transition-colors inline-flex items-center gap-4"
          >
            Réserver pour un événement privé
            <span className="text-xl">→</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ConcertsSection;