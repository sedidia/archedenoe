"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Correction de l'import JS : On s'assure que le document est prêt

  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des données depuis l'API
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
    const fetchMoments = async () => {
      try {
        const res = await fetch('/api/moments');
        const data = await res.json();
        // On suppose que l'API renvoie { success: true, data: [...] }
        console.log(data);
        
        setMoments(data.data || data); 
      } catch (error) {
        console.error("Erreur lors de la récupération des moments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoments();
  }, []);


  return (
    <>
      <Head>
        <title>Arche de Noé | Chorale Vocale</title>
        <meta name="description" content="Rejoignez notre ensemble vocal pour une expérience humaine et musicale unique." />
      </Head>

      <nav className="bg-blue-600 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* LOGO : Visible sur tous les appareils */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl tracking-wider">
                ARCHE DE NOÉ
              </Link>
            </div>

            {/* MENU PC : visible uniquement sur 'lg' (PC) et plus, caché sur mobile */}
            <div className="hidden lg:block">
              <ul className="flex space-x-8 items-center">
                <li>
                  <a href="#a-propos" className="text-white hover:text-blue-200 transition-colors">À Propos</a>
                </li>
                <li>
                  <a href="#pupitres" className="text-white hover:text-blue-200 transition-colors">Nos Pupitres</a>
                </li>
                <li>
                  <a href="#galerie" className="text-white hover:text-blue-200 transition-colors">Galerie</a>
                </li>
                <li>
                  <a href="#contact" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg font-bold transition-all shadow-sm">
                    Nous rejoindre
                  </a>
                </li>
              </ul>
            </div>

            {/* BOUTON HAMBURGER : visible uniquement sur mobile/tablette, caché sur PC (lg) */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-white hover:text-blue-200 focus:outline-none p-2"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Ouvrir le menu</span>
                <div className="relative w-6 h-6">
                  {/* Lignes de l'icône animée */}
                  <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 top-3 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* MENU MOBILE : s'affiche uniquement quand isOpen est vrai ET qu'on est sur mobile */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2 bg-blue-700 shadow-inner">
            <a href="#a-propos" onClick={() => setIsOpen(false)} className="block text-white py-2 px-3 hover:bg-blue-800 rounded-md">À Propos</a>
            <a href="#pupitres" onClick={() => setIsOpen(false)} className="block text-white py-2 px-3 hover:bg-blue-800 rounded-md">Nos Pupitres</a>
            <a href="#galerie" onClick={() => setIsOpen(false)} className="block text-white py-2 px-3 hover:bg-blue-800 rounded-md">Galerie</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="block text-yellow-400 font-bold py-2 px-3 border border-yellow-400 rounded-md mt-4 text-center">
              Nous rejoindre
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="py-5 text-center bg-light border-bottom shadow-sm" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(234, 136, 136, 0.6), rgba(70, 143, 253, 0.6)), url("/")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          color: 'white', 
          minHeight: '60vh', 
          display: 'flex', 
          alignItems: 'center' 
        }}>
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-3">Chanter, c'est prier deux fois</h1>
          <p className="lead mb-4">L'ensemble vocal Arche de Noé vous invite à découvrir l'harmonie des voix et du cœur.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link href={"/prochainsconcerts"} className="btn btn-primary btn-lg px-4 gap-3">
              Prochains Concerts
            </Link>
            <Link href={"/chantsvideos"} className="btn btn-outline-light btn-lg px-4">
              Écouter nos chants
            </Link>
          </div>
        </div>
      </header>

      {/* --- SECTION PUPITRES --- */}
      <section id="pupitres" className="py-5">
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
                <div className="card h-100 shadow-sm border-0 bg-light">
                  <div className="card-body py-4">
                    <h4 className="card-title fw-bold">{p.role}</h4>
                    <p className="card-text text-muted">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALERIE --- */}
      <section id="galerie" className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Moments en Musique</h2>
          <div className="row g-3">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Chargement des événements...</p>
              </div>
            ) : moments.length > 0 ? (
              moments.map((moment) => (
                <div key={moment._id} className="col-md-4">
                  <div className="ratio ratio-4x3 overflow-hidden rounded shadow-sm">
                    <img src={moment.imageUrl || "https://ix-marketing.imgix.net/global.jpg?auto=format,compress&w=1946"} 
                        alt={moment.title}
                        className="img-fluid object-fit-cover hover-zoom" 
                        style={{ transition: 'transform .3s ease' }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="lead text-muted">Aucun concert prévu pour le moment. Revenez bientôt !</p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="py-5 bg-dark text-white text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h3 className="mb-4">Rejoignez l'Arche</h3>
              <p className="text-muted">Répétitions tous les mardis soir à 19h00.</p>
              <form className="mt-4">
                <div className="input-group mb-3 shadow-sm">
                  <input type="email" className="form-control" placeholder="Votre email" aria-label="Email" />
                  <button className="btn btn-primary" type="button">S'inscrire</button>
                </div>
              </form>
              <div className="mt-4">
                <p className="small mb-0 opacity-50">&copy; 2026 Chorale Arche de Noé.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .hover-zoom:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};

export default HomePage;