"use client";

import React from 'react';
import Link from 'next/link';

const ProchainsConcerts = () => {
  // Données fictives (À remplacer plus tard par un appel à ta BDD MongoDB)
  const concerts = [
    {
      id: 1,
      titre: "Concert de Pâques - Mwana leza pakufwa",
      date: "12 Avril 2026",
      heure: "18h30",
      lieu: "Temple la sentinelle, L'shi",
      description: "Un répertoire sacré pour célébrer la résurrection.",
      prix: "Entrée libre",
      image: "https://images.unsplash.com/photo-1515524738708-327f6b0037a7?q=80&w=800"
    },
  ];

  return (
    <div>
      {/* Barre de navigation simplifiée */}
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-5">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold">
            ← Retour à l'Accueil
          </Link>
          <span className="navbar-text text-white fw-bold text-uppercase">
            Nos Concerts
          </span>
        </div>
      </nav>
      <section id="concerts" className="py-5 bg-light">


        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold text-primary">Prochains Concerts</h2>
              <p className="lead text-muted">Venez vibrer au rythme de nos voix lors de nos prochaines représentations.</p>
              <div className="border-bottom w-25 mx-auto border-primary border-3 mt-3"></div>
            </div>
          </div>

          <div className="row g-4">
            {concerts.map((concert) => (
              <div key={concert.id} className="col-12">
                <div className="card shadow-sm border-0 overflow-hidden hover-shadow transition-all">
                  <div className="row g-0">
                    {/* Image du concert - Utilisera Cloudinary plus tard */}
                    <div className="col-md-4">
                      <img 
                        src={concert.image} 
                        className="img-fluid h-100 object-fit-cover" 
                        alt={concert.titre} 
                        style={{ minHeight: '250px' }}
                      />
                    </div>
                    
                    {/* Détails du concert */}
                    <div className="col-md-8">
                      <div className="card-body p-4 d-flex flex-column h-100">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="badge bg-primary px-3 py-2">{concert.date}</span>
                          <span className="text-primary fw-bold">{concert.prix}</span>
                        </div>
                        
                        <h3 className="card-title fw-bold mb-3">{concert.titre}</h3>
                        
                        <div className="mb-3 text-muted">
                          <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                            <span>{concert.lieu}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-clock-fill me-2 text-warning"></i>
                            <span>{concert.heure}</span>
                          </div>
                        </div>
                        
                        <p className="card-text text-secondary mb-4">
                          {concert.description}
                        </p>
                        
                        <div className="mt-auto">
                          <button className="btn btn-outline-primary fw-bold px-4">
                            Réserver ma place
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .transition-all {
            transition: all 0.3s ease;
          }
          .hover-shadow:hover {
            transform: translateY(-5px);
            box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
          }
        `}</style>
      </section>
    </div>
  );
};

export default ProchainsConcerts;