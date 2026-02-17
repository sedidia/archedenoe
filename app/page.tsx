"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import Head from 'next/head';

const HomePage = () => {
  // Correction de l'import JS : On s'assure que le document est prêt
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);


  return (
    <>
      <Head>
        <title>Arche de Noé | Chorale Vocale</title>
        <meta name="description" content="Rejoignez notre ensemble vocal pour une expérience humaine et musicale unique." />
      </Head>

      {/* CHANGEMENTS ICI : 
          1. navbar-dark : Rend le texte blanc/clair (indispensable sur fond foncé)
          2. bg-primary : Garde votre fond bleu
      */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">ARCHE DE NOÉ</a>
          
          {/* Le bouton toggle pour mobile */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Le menu qui se réduit */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#a-propos">À Propos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#pupitres">Nos Pupitres</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#galerie">Galerie</a>
              </li>
              <li className="nav-item">
                {/* Suppression de btn-outline-light ici pour éviter les conflits de padding dans le menu mobile */}
                <a className="nav-link fw-bold text-warning" href="#contact">Nous rejoindre</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="py-5 text-center bg-light border-bottom shadow-sm" 
              style={{ 
                backgroundImage: 'linear-gradient(rgba(234, 136, 136, 0.6), rgba(70, 143, 253, 0.6)), url("/mission")', 
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
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Prochains Concerts</button>
            <button type="button" className="btn btn-outline-light btn-lg px-4">Écouter nos chants</button>
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="col-md-4">
                <div className="ratio ratio-4x3 overflow-hidden rounded shadow-sm">
                  <img src={`https://picsum.photos/seed/${i+40}/800/600`} 
                       alt={`Performance ${i}`} 
                       className="img-fluid object-fit-cover hover-zoom" 
                       style={{ transition: 'transform .3s ease' }}
                  />
                </div>
              </div>
            ))}
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