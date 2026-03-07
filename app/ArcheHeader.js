"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ArcheHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Remplacez par le vrai numéro de la chorale (format international sans + ni 00)
  const WHATSAPP_NUMBER = "243000000000"; 
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour Arche de Noé, je souhaiterais avoir des informations.`;

  const messages = [
    { 
      title: "Chanter, c'est", 
      highlight: "Prier deux fois", 
      sub: "L'excellence chorale de Lubumbashi.",
      accent: "bg-red-600",
      textAccent: "text-red-600",
      borderAccent: "border-red-600"
    },
    { 
      title: "L'harmonie du", 
      highlight: "Cœur et de l'Âme", 
      sub: "Une élévation spirituelle par la voix.",
      accent: "bg-blue-500",
      textAccent: "text-blue-500",
      borderAccent: "border-blue-500"
    },
    { 
      title: "Vivez la", 
      highlight: "Symphonie", 
      sub: "Rejoignez l'univers de l'Arche de Noé.",
      accent: "bg-amber-500",
      textAccent: "text-amber-500",
      borderAccent: "border-amber-500"
    }
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setIsAnimating(false);
      }, 800); 
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const current = messages[index];

  // Fonction pour formater proprement les ID des htags
  const formatTag = (text) => {
    return text.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Enlever les accents
      .replace(/\s+/g, ''); // Enlever les espaces
  };

  return (
    <header className="relative h-screen w-full flex items-center overflow-hidden bg-black font-serif transition-colors duration-1000">
      
      {/* NAVBAR RESPONSIVE */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 font-sans ${
        isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-xl py-4' : 'bg-transparent py-6 md:py-8'
      }`}>
        <div className="container mx-auto px-6 md:px-20 flex justify-between items-center relative z-[160]">
          {/* Logo */}
          <Link href="/" className="text-white flex items-center gap-2 no-underline">
            <div className={`w-8 h-8 md:w-10 md:h-10 ${current.accent} rounded-full transition-colors duration-1000 flex items-center justify-center font-black text-white text-sm md:text-base`}>A</div>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">Arche de Noé</span>
          </Link>

          {/* Liens Centraux (Desktop) */}
          <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
            {['Accueil', 'Galerie', 'Concerts', 'A propos'].map((item) => (
              <Link key={item} href={`#${formatTag(item)}`} className="hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Bouton Action & Burger */}
          <div className="flex items-center gap-4">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`hidden sm:block px-6 py-2 rounded-full border border-white/30 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 ${current.borderAccent}`}
            >
              Nous Contacter
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white focus:outline-none lg:hidden"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* MENU MOBILE OVERLAY */}
        <div className={`fixed inset-0 bg-black h-screen w-screen z-[150] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] lg:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
           <div className="flex flex-col items-center justify-center h-full gap-8 text-3xl font-bold uppercase tracking-widest">
              {['Accueil', 'Galerie', 'Concerts', 'À propos', 'Contact'].map((item, i) => {
                const isContact = item.toLowerCase().includes('contact');
                return (
                  <Link 
                    key={item} 
                    href={isContact ? WHATSAPP_URL : `#${formatTag(item)}`} 
                    target={isContact ? "_blank" : "_self"}
                    onClick={() => setIsMenuOpen(false)}
                    className={`transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:${current.textAccent}`}
                    style={{ transitionDelay: `${i * 100 + 300}ms` }}
                  >
                    {item}
                  </Link>
                );
              })}
           </div>
        </div>
      </nav>

      {/* Contenu Texte & Vidéo (simplifié pour la démo) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 scale-105">
          <source src="https://res.cloudinary.com/archedenoe/video/upload/v1772827962/user_videos/dcbz7wkrdfxkcl0y1pfy.webm" type="video/mp4" />
        </video>
      </div>
      
      <div className="container relative z-20 px-6 md:px-20 lg:px-32">
        <div className={`transition-all duration-1000 ease-in-out ${isAnimating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
          <span className={`${current.textAccent} font-sans font-bold tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 block`}>
            Arche de Noé présente
          </span>
          <h1 className="text-4xl md:text-8xl font-light text-white leading-tight mb-4 tracking-tight">
            {current.title} <br/>
            <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {current.highlight}
            </span>
          </h1>
          <p className={`text-base md:text-xl max-w-sm md:max-w-lg mb-8 md:mb-12 text-gray-300 font-sans font-light border-l-2 ${current.borderAccent} pl-6`}>
            {current.sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 font-sans">
            <Link href="#prochainsconcerts" className={`px-10 py-4 ${current.accent} text-white text-center font-bold uppercase tracking-widest rounded-sm shadow-lg`}>
              Découvrir
            </Link>
            <Link href="#chantsvideos" className="px-10 py-4 border border-white/50 text-white text-center font-bold uppercase tracking-widest rounded-sm group flex items-center justify-center gap-2">
              Écouter →
            </Link>
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="absolute top-0 left-0 w-full h-1 z-[90] bg-white/10">
        <div className={`h-full ${current.accent} transition-all duration-[6000ms] ease-linear`} style={{ width: isAnimating ? '0%' : '100%' }} key={index} />
      </div>
    </header>
  );
};

export default ArcheHeader;