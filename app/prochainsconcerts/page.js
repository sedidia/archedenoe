"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ProchainsConcerts = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des données depuis l'API
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const res = await fetch('/api/concerts');
        const data = await res.json();
        // On suppose que l'API renvoie { success: true, data: [...] }
        setConcerts(data.data || data); 
      } catch (error) {
        console.error("Erreur lors de la récupération des concerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  return (
    <div>
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
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Chargement des événements...</p>
              </div>
            ) : concerts.length > 0 ? (
              concerts.map((concert) => (
                <div key={concert._id} className="col-12">
                  <div className="card shadow-sm border-0 overflow-hidden hover-shadow transition-all">
                    <div className="row g-0">
                      {/* Image Cloudinary */}
                      <div className="col-md-4">
                        <img 
                          src={concert.imageUrl || "https://ix-marketing.imgix.net/global.jpg?auto=format,compress&w=1946"} 
                          className="img-fluid h-100 object-fit-cover" 
                          alt={concert.title} 
                          style={{ minHeight: '280px' }}
                        />
                      </div>
                      
                      {/* Détails du concert */}
                      <div className="col-md-8">
                        <div className="card-body p-4 d-flex flex-column h-100">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="badge bg-primary px-3 py-2">
                              {/* Formatage simple de la date */}
                              {new Date(concert.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                            <span className={`fw-bold ${concert.entryType === 'Payant' ? 'text-success' : 'text-primary'}`}>
                              {concert.entryType === 'Payant' ? 'Entrée Payante' : 'Entrée Libre'}
                            </span>
                          </div>
                          
                          <h3 className="card-title fw-bold mb-3">{concert.title}</h3>
                          
                          <div className="mb-3 text-muted">
                            <div className="d-flex align-items-center mb-1">
                              <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                              <span>{concert.location}</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-clock-fill me-2 text-warning"></i>
                              <span>{concert.time}</span>
                            </div>
                          </div>
                          
                          <p className="card-text text-secondary mb-4">
                            {concert.description}
                          </p>
                          
                          <div className="mt-auto">
                            <button className="btn btn-primary fw-bold px-4 shadow-sm">
                              {concert.entryType === 'Payant' ? 'Acheter un billet' : 'Réserver ma place'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

        <style jsx>{`
          .transition-all {
            transition: all 0.3s ease;
          }
          .hover-shadow:hover {
            transform: translateY(-5px);
            box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
          }
          .object-fit-cover {
            object-fit: cover;
          }
        `}</style>
      </section>
    </div>
  );
};

export default ProchainsConcerts;