"use client";

import React from 'react';
import Link from 'next/link';

const VideosPage = () => {
  // Liste des vidéos (À lier plus tard à votre MongoDB / Cloudinary / YouTube)
  const videos = [
    {
      id: 1,
      titre: "Yoba",
      description: "Notre prestation émouvante du chant 'Minuit Chrétiens' lors du concert annuel.",
      miniature: "https://images.unsplash.com/photo-1596707258079-2475a363a0a3?q=80&w=800", // Image Cloudinary
      videoUrl: "https://www.youtube.com/watch?v=zP1UNyfdWl8&list=RDzP1UNyfdWl8&start_radio=1", // Votre lien Cloudinary ou YouTube
      duree: "4:30"
    },
    {
      id: 2,
      titre: "Yoba'",
      description: "Un aperçu de nos sessions de répétition, capturant la passion de la chorale.",
      miniature: "https://images.unsplash.com/photo-1549725272-b7b5c00e6c38?q=80&w=800",
      videoUrl: "https://www.youtube.com/watch?v=zP1UNyfdWl8&list=RDzP1UNyfdWl8&start_radio=1", // Exemple YouTube Embed
      duree: "3:15"
    },
    {
      id: 3,
      titre: "Yoba",
      description: "Une performance surprise qui a enchanté les passants avec un medley de chants populaires.",
      miniature: "https://images.unsplash.com/photo-1545627258-0051e70776b7?q=80&w=800",
      videoUrl: "https://www.youtube.com/watch?v=zP1UNyfdWl8&list=RDzP1UNyfdWl8&start_radio=1",
      duree: "2:00"
    }
  ];

  const renderVideoPlayer = (video) => {
    // Si c'est un lien YouTube/Vimeo, utiliser un iframe
    if (video.videoUrl.includes("youtube.com") || video.videoUrl.includes("vimeo.com")) {
      return (
        <div className="ratio ratio-16x9">
          <iframe 
            src={video.videoUrl} 
            title={video.titre} 
            allowFullScreen 
            className="rounded"
            loading="lazy"
          ></iframe>
        </div>
      );
    } 
    // Sinon, utiliser la balise <video> pour Cloudinary ou d'autres hôtes directs
    else {
      return (
        <div className="ratio ratio-16x9">
          <video controls poster={video.miniature} className="w-100 h-100 object-fit-cover rounded">
            <source src={video.videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéo.
          </video>
        </div>
      );
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Barre de navigation simplifiée */}
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-5">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold">
            ← Retour à l'Accueil
          </Link>
          <span className="navbar-text text-white fw-bold text-uppercase">
            Nos Vidéos
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row mb-4">
          <div className="col-md-8 mx-auto text-center">
            <h1 className="display-4 fw-bold text-dark">Vidéos de la Chorale</h1>
            <p className="lead text-muted">Revivez nos performances et découvrez les coulisses de l'Arche de Noé.</p>
          </div>
        </div>

        <div className="row justify-content-center g-4 pb-5">
          {videos.map((video) => (
            <div key={video.id} className="col-lg-6 col-md-10">
              <div className="card shadow-sm border-0 h-100 overflow-hidden hover-scale transition-all">
                {renderVideoPlayer(video)}
                <div className="card-body p-4">
                  <h3 className="card-title fw-bold text-primary mb-2">{video.titre}</h3>
                  <p className="card-text text-muted mb-3">{video.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-secondary small">
                      <i className="bi bi-clock me-1"></i> Durée: {video.duree}
                    </span>
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                      Voir la vidéo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note pour l'utilisateur */}
        <div className="text-center mt-5 pb-5">
          <p className="text-muted italic small">
            D'autres vidéos sont disponibles sur notre chaîne officielle.
          </p>
        </div>
      </div>

      <style jsx>{`
        .transition-all {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-scale:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        iframe, video {
          border: none;
        }
      `}</style>
    </div>
  );
};

export default VideosPage;