"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination, Autoplay, EffectCreative } from 'swiper/modules';
// N'oublie pas le CSS correspondant
import 'swiper/css/effect-creative';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Moment {
  _id: string;
  title?: string;
  imageUrl?: string;
  cloudinaryId?: string;
}

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fermer le menu si on redimensionne l'écran au delà du mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadJS = async () => {
      if (typeof window !== 'undefined') {
        try {
          await import('bootstrap/dist/js/bootstrap.bundle.min.js');
        } catch (err) {
          console.error("Erreur chargement Bootstrap JS", err);
        }
      }
    };
    loadJS();

    document.title = "Arche de Noé | Chorale Vocale";

    const fetchMoments = async () => {
      try {
        const res = await fetch('/api/moments');
        const result = await res.json();
        const cleanData = result.data || result;
        if (Array.isArray(cleanData)) setMoments(cleanData);
      } catch (error) {
        console.error('Erreur lors de la récupération des moments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoments();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* --- NAVIGATION (Thème Bleu/Rouge/Blanc) --- */}
      <nav className="bg-blue-800 sticky top-0 z-[100] shadow-xl border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-black text-2xl tracking-tighter no-underline flex items-center gap-2">
                <span className="bg-red-600 px-2 py-1 rounded">ARCHE</span> DE NOÉ
              </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden lg:block">
              <ul className="flex space-x-8 items-center list-none mb-0">
                <li><a href="#pupitres" className="text-white no-underline hover:text-red-400 transition-colors font-bold uppercase text-sm tracking-widest">Nos Voix</a></li>
                <li><a href="#galerie" className="text-white no-underline hover:text-red-400 transition-colors font-bold uppercase text-sm tracking-widest">Galerie</a></li>
                <li>
                  <a href="#contact" className="bg-red-600 hover:bg-white hover:text-red-600 text-white px-6 py-2 rounded-full font-black no-underline transition-all transform hover:scale-105 shadow-lg border-2 border-transparent hover:border-red-600">
                    REJOINDRE LA CHORALE
                  </a>
                </li>
              </ul>
            </div>

            {/* Bouton Hamburger */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-white p-2 focus:outline-none transition-transform active:scale-90"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-5">
                  <span className={`absolute block w-6 h-1 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
                  <span className={`absolute block w-6 h-1 bg-white rounded-full transition-all duration-300 top-2 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute block w-6 h-1 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 top-2' : 'top-4'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile (Slide Down) */}
        <div className={`lg:hidden absolute w-full bg-blue-900 border-b-4 border-red-600 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-6 space-y-4">
            <a href="#pupitres" onClick={() => setIsOpen(false)} className="block text-white no-underline font-bold text-lg hover:text-red-400">Nos Voix</a>
            <a href="#galerie" onClick={() => setIsOpen(false)} className="block text-white no-underline font-bold text-lg hover:text-red-400">Galerie</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="block bg-red-600 text-white text-center py-3 rounded-lg font-black no-underline">REJOINDRE LA CHORALE</a>
          </div>
        </div>
      </nav>

      {/* --- ARCHE SECTION --- */}
      <header className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-blue-900/60 z-10"></div>
            <img 
                src="https://res.cloudinary.com/archedenoe/image/upload/v1771585361/moment_posters/g1p9qgajo1kn5gdx0fxw.jpg" 
                className="w-full h-full object-cover" 
                alt="Chorale Arche de Noé"
            />
        </div>
        
        <div className="container relative z-20 px-4">
          <h1 className="text-5xl md:text-8xl font-black mb-6 drop-shadow-2xl">
            CHANTER, C'EST <br/><span className="text-red-600 bg-white px-4">PRIER DEUX FOIS</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-medium text-white drop-shadow">
            L'ensemble vocal <span className="text-red-500 font-bold">Arche de Noé</span> de Lubumbashi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prochainsconcerts" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-black text-lg transition-all no-underline shadow-xl">
              Prochains Concerts
            </Link>
            <Link href="/chantsvideos" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-full font-black text-lg transition-all no-underline shadow-xl">
              Écouter nos chants
            </Link>
          </div>
        </div>
      </header>

      {/* --- SECTION PUPITRES --- */}
      <section id="pupitres" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-blue-900 mb-4 uppercase italic">Nos Voix</h2>
            <div className="w-24 h-2 bg-red-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { role: "Sopranos", icon: "🎶", desc: "Les voix les plus aiguës, apportant éclat et mélodie." },
              { role: "Altos", icon: "✨", desc: "La richesse et la profondeur des voix moyennes féminines." },
              { role: "Ténors", icon: "🔥", desc: "La puissance et la chaleur des voix aiguës masculines." },
              { role: "Basses", icon: "⚓", desc: "L'assise et la fondation de notre harmonie vocale." }
            ].map((p, idx) => (
              <div key={idx} className="bg-blue-50 p-8 rounded-none border-l-8 border-red-600 shadow-lg hover:bg-blue-100 transition-colors group">
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">{p.icon}</div>
                <h4 className="text-xl font-black text-blue-900 mb-3 uppercase tracking-tighter">{p.role}</h4>
                <p className="text-gray-700 leading-relaxed font-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALERIE SWIPER (Thème Rouge & Bleu) --- */}
      <section id="galerie" className="py-24 bg-blue-900 text-white overflow-hidden">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 uppercase tracking-widest">Moments en Musique</h2>
            <p className="text-red-400 font-bold uppercase tracking-widest">Revivez nos plus beaux concerts</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-20">
              <div className="w-12 h-12 border-4 border-red-600 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : moments.length > 0 ? (
            <div className="px-4">
              <Swiper
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                effect={'creative'}
                creativeEffect={{
                  prev: {
                    shadow: true,
                    translate: ['-120%', 0, -500],
                    opacity: 0.3,
                  },
                  next: {
                    translate: ['120%', 0, -500],
                    opacity: 0.3,
                  },
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true // Les points de pagination s'adaptent à la taille
                }}
                navigation={true}
                modules={[EffectCreative, Pagination, Navigation, Autoplay]}
                className="pb-24 !overflow-visible" // !overflow-visible pour voir les slides sortir
              >
                {moments.map((moment) => (
                  <SwiperSlide key={moment._id} className="max-w-[320px] md:max-w-[550px]">
                    <div className="relative group overflow-hidden rounded-[2rem] border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500">
                      
                      {/* Overlay Dégradé Permanent pour le texte */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-black/20 z-10"></div>
                      
                      <img 
                        src={moment.imageUrl || "https://images.unsplash.com/photo-1514320298574-255903965a45?q=80&w=800"} 
                        alt={moment.title || "Galerie"}
                        className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      
                      {/* Contenu textuel stylé */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-3 inline-block">
                          Souvenir
                        </span>
                        <p className="text-white font-black text-2xl md:text-3xl uppercase italic leading-none drop-shadow-lg">
                          {moment.title || "Concert Arche de Noé"}
                        </p>
                        <div className="w-0 group-hover:w-full h-1 bg-red-600 transition-all duration-500 mt-2"></div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : null}

          {/* --- SECTION VRAIES VIDÉOS YOUTUBE --- */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
              <div className="flex flex-col gap-3">
                <div className="relative aspect-video rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl group transition-all hover:border-red-600">
                  <iframe className="w-full h-full" src="https://www.youtube.com/embed/Q4xqchvM9pI?list=RDQ4xqchvM9pI" title="SHUKRANI" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                  
                </div>
                <div className="px-2">
                  <h5 className="text-white font-black uppercase italic tracking-tighter text-lg group-hover:text-red-500 transition-colors">
                    Kukrani
                  </h5>
                  <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">En direct de Lubumbashi</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="relative aspect-video rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl group transition-all hover:border-red-600">
                  <iframe className="w-full h-full" src="https://www.youtube.com/embed/zP1UNyfdWl8?list=RDzP1UNyfdWl8" title="YOBA_@CHORALEARCHEDENOÉ " allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
                <div className="px-2">
                  <h5 className="text-white font-black uppercase italic tracking-tighter text-lg group-hover:text-red-500 transition-colors">
                    YOBA
                  </h5>
                  <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">En direct de Lubumbashi</span>
                  </div>
                </div>
              </div>




          </div>
        </div>
      </section>

      {/* --- FOOTER (Rouge Bleu Blanc) --- */}
      <footer id="contact" className="bg-white text-blue-900 py-20 border-t-8 border-red-600">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-3xl font-black mb-6 uppercase italic text-blue-900">ARCHE DE NOÉ</h3>
            <p className="text-gray-600 font-medium">
              Une famille unie par la musique et la foi à <span className="text-red-600 font-bold">Lubumbashi</span>.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-tighter text-red-600 border-b-2 border-red-600 inline-block">Répétitions</h4>
            <p className="text-blue-900 font-bold mb-1">Mardi, Jeudi, Samedi</p>
            <p className="text-red-600 font-black text-2xl">17h50 — 19h30</p>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-tighter text-red-600 border-b-2 border-red-600 inline-block">Localisation</h4>
            <p className="text-blue-900 font-bold uppercase">Paroisse de Lubumbashi</p>
            <p className="text-gray-500 font-bold">République Démocratique du Congo</p>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
          &copy; 2026 Chorale Arche de Noé. Hébergé sur Railway & Cloudinary.
        </div>
      </footer>

      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #dc2626 !important;
          background: white;
          width: 45px !important;
          height: 45px !important;
          border-radius: 0%;
          box-shadow: 4px 4px 0px #1e3a8a;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: 900;
        }
        .swiper-pagination-bullet-active {
          background: #dc2626 !important;
          width: 25px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;