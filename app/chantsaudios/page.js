"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const ChantsPage = () => {
  // Liste des chants (À lier plus tard à votre MongoDB / Cloudinary)
  const playlist = [
    {
      id: 1,
      titre: "Hymne à la Joie",
      compositeur: "Beethoven",
      categorie: "Classique",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Remplacez par votre lien Cloudinary
      duree: "3:45"
    },
    {
      id: 2,
      titre: "Douce Nuit",
      compositeur: "Traditionnel",
      categorie: "Noël",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duree: "4:12"
    },
    {
      id: 3,
      titre: "Amazing Grace",
      compositeur: "John Newton",
      categorie: "Gospel",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      duree: "5:00"
    }
  ];

  return (
    <div className="bg-light min-vh-100">
      {/* Barre de navigation simplifiée */}
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-5">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold">
            ← Retour à l'Accueil
          </Link>
          <span className="navbar-text text-white fw-bold text-uppercase">
            Répertoire Vocal
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row mb-4">
          <div className="col-md-8 mx-auto text-center">
            <h1 className="display-4 fw-bold text-dark">Nos Chants</h1>
            <p className="lead text-muted">Écoutez les enregistrements de nos plus belles répétitions et concerts.</p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm border-0">
              <div className="list-group list-group-flush">
                {playlist.map((chant) => (
                  <div key={chant.id} className="list-group-item p-4 hover-bg-light transition-all">
                    <div className="row align-items-center">
                      {/* Infos Chant */}
                      <div className="col-md-4 mb-3 mb-md-0">
                        <h5 className="mb-1 fw-bold text-primary">{chant.titre}</h5>
                        <p className="mb-0 text-muted small">
                          <span className="badge bg-secondary me-2">{chant.categorie}</span>
                          {chant.compositeur}
                        </p>
                      </div>

                      {/* Lecteur Audio */}
                      <div className="col-md-6 mb-3 mb-md-0">
                        <audio controls className="w-100 custom-audio-player">
                          <source src={chant.audioUrl} type="audio/mpeg" />
                          Votre navigateur ne supporte pas l'élément audio.
                        </audio>
                      </div>

                      {/* Durée */}
                      <div className="col-md-2 text-md-end text-muted small">
                        <i className="bi bi-clock me-1"></i> {chant.duree}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Note pour l'utilisateur */}
        <div className="text-center mt-5 pb-5">
          <p className="text-muted italic small">
            Tous nos chants sont protégés. Pour obtenir les partitions, contactez le chef de chœur.
          </p>
        </div>
      </div>

      <style jsx>{`
        .transition-all {
          transition: background-color 0.2s ease;
        }
        .hover-bg-light:hover {
          background-color: #f8f9fa;
        }
        .custom-audio-player {
          height: 35px;
        }
      `}</style>
    </div>
  );
};

export default ChantsPage;