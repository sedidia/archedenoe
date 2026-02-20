"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

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


  useEffect(() => {
    // 1. Chargement sécurisé de Bootstrap (Client-side uniquement)
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

    // 2. Mise à jour du titre (SEO pour composant client)
    document.title = "Arche de Noé | Chorale Vocale";

    // 3. Récupération des données
    const fetchMoments = async () => {
      try {
        const res = await fetch('/api/moments');
        const result = await res.json();
        
        // On vérifie si les données sont dans result.data ou result directement
        const cleanData = result.data || result;
        
        if (Array.isArray(cleanData)) {
          setMoments(cleanData);
        } else {
          setMoments([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des moments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoments();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* --- NAVIGATION --- */}
      <nav className="bg-blue-600 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl tracking-wider text-decoration-none">
                ARCHE DE NOÉ
              </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden lg:block">
              <ul className="flex space-x-8 items-center list-unstyled mb-0">
                <li><a href="#a-propos" className="text-white text-decoration-none hover:text-blue-200">À Propos</a></li>
                <li><a href="#pupitres" className="text-white text-decoration-none hover:text-blue-200">Nos Pupitres</a></li>
                <li><a href="#galerie" className="text-white text-decoration-none hover:text-blue-200">Galerie</a></li>
                <li>
                  <a href="#contact" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg font-bold text-decoration-none shadow-sm">
                    Nous rejoindre
                  </a>
                </li>
              </ul>
            </div>

            {/* Bouton Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-white p-2 focus:outline-none"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 top-3 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-2 pb-6 space-y-2 bg-blue-700 shadow-inner">
            <a href="#a-propos" onClick={() => setIsOpen(false)} className="block text-white py-2 text-decoration-none">À Propos</a>
            <a href="#pupitres" onClick={() => setIsOpen(false)} className="block text-white py-2 text-decoration-none">Nos Pupitres</a>
            <a href="#galerie" onClick={() => setIsOpen(false)} className="block text-white py-2 text-decoration-none">Galerie</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="block text-yellow-400 font-bold py-2 text-decoration-none border-top border-blue-500 mt-2">Nous rejoindre</a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="py-5 text-center bg-dark text-white" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1514320298574-255903965a45?q=80&w=1200")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          minHeight: '60vh', 
          display: 'flex', 
          alignItems: 'center' 
        }}>
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-3">Chanter, c'est prier deux fois</h1>
          <p className="lead mb-4">L'ensemble vocal Arche de Noé vous invite à découvrir l'harmonie des voix et du cœur.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link href="/prochainsconcerts" className="btn btn-primary btn-lg px-4 shadow">
              Prochains Concerts
            </Link>
            <Link href="/chantsvideos" className="btn btn-outline-light btn-lg px-4">
              Écouter nos chants
            </Link>
          </div>
        </div>
      </header>

      {/* --- SECTION PUPITRES --- */}
      <section id="pupitres" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Nos Voix</h2>
          <div className="row g-4 text-center">
            {[
              { role: "Sopranos", desc: "Les voix les plus aiguës, apportant éclat et mélodie." },
              { role: "Altos", desc: "La richesse et la profondeur des voix moyennes féminines." },
              { role: "Ténors", desc: "La puissance et la chaleur des voix aiguës masculines." },
              { role: "Basses", desc: "L'assise et la fondation de notre harmonie vocale." }
            ].map((p, idx) => (
              <div key={idx} className="col-md-3">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body py-4">
                    <h4 className="card-title fw-bold text-primary">{p.role}</h4>
                    <p className="card-text text-muted">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALERIE DYNAMIQUE --- */}
      <section id="galerie" className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Moments en Musique</h2>
          <div className="row g-3">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Chargement des souvenirs...</p>
              </div>
            ) : moments.length > 0 ? (
              moments.map((moment) => (
                <div key={moment._id || Math.random()} className="col-md-4 col-sm-6">
                  <div className="ratio ratio-4x3 overflow-hidden rounded shadow-sm">
                    <img 
                      src={moment.imageUrl || "https://images.unsplash.com/photo-1514320298574-255903965a45?q=80&w=400"} 
                      alt={moment.title || "Image de la chorale"}
                      className="img-fluid object-fit-cover hover-zoom" 
                      loading="lazy"
                      style={{ transition: 'transform .3s ease' }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="lead text-muted">La galerie sera bientôt mise à jour.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h3 className="mb-4">Rejoignez l'Arche</h3>
          <p className="text-muted small">Répétitions tous les mardis soir à 19h00.</p>
          <p className="small mb-0 opacity-50 mt-4">&copy; 2026 Chorale Arche de Noé. Lubumbashi, RDC.</p>
        </div>
      </footer>

      <style jsx>{`
        .hover-zoom:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default HomePage;