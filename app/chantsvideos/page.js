"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const VideosPage = () => {
  // 1. État pour stocker les vidéos de la base de données
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Récupération des données depuis MongoDB
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/showvideos'); // Votre route API
        const result = await response.json();
        
        if (result.success) {
          setVideos(result.data); // result.data contient la liste de MongoDB
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const renderVideoPlayer = (video) => {
    // Gestion Cloudinary (URL directe)
    if (video.videoUrl.includes("cloudinary.com")) {
      return (
        <div className="ratio ratio-16x9 bg-black">
          <video 
            controls 
            className="w-100 h-100 rounded"
            preload="metadata"
          >
            <source src={video.videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéo.
          </video>
        </div>
      );
    } 
    // Gestion YouTube (Si vous en ajoutez plus tard)
    else if (video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be")) {
      // Transformation de l'URL pour l'embed si nécessaire
      const embedUrl = video.videoUrl.replace("watch?v=", "embed/");
      return (
        <div className="ratio ratio-16x9">
          <iframe 
            src={embedUrl} 
            title={video.title} 
            allowFullScreen 
            className="rounded"
            loading="lazy"
          ></iframe>
        </div>
      );
    }
    return <div className="ratio ratio-16x9 bg-secondary rounded flex items-center justify-center text-white">Format non supporté</div>;
  };

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-5">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold">
            ← Retour à l'Accueil
          </Link>
          <span className="navbar-text text-white fw-bold text-uppercase">
            Nos Vidéos (Archive MongoDB)
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row mb-4">
          <div className="col-md-8 mx-auto text-center">
            <h1 className="display-4 fw-bold text-dark">Vidéos de la Chorale</h1>
            <p className="lead text-muted">Contenu récupéré en temps réel depuis votre base MongoDB.</p>
          </div>
        </div>

        {/* État de chargement */}
        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3">Connexion à la base de données...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center p-5 bg-white rounded shadow-sm">
            <p className="text-muted">Aucune vidéo trouvée dans la base de données.</p>
            <Link href="/votre-page-d-upload" className="btn btn-primary">Publier la première vidéo</Link>
          </div>
        ) : (
          <div className="row justify-content-center g-4 pb-5">
            {videos.map((video) => (
              <div key={video._id} className="col-lg-6 col-md-10">
                <div className="card shadow-sm border-0 h-100 overflow-hidden hover-scale transition-all">
                  {renderVideoPlayer(video)}
                  <div className="card-body p-4">
                    <h3 className="card-title fw-bold text-primary mb-2">{video.title}</h3>
                    <p className="card-text text-muted mb-3">
                      Posté le : {new Date(video.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-info text-dark">Cloudinary HD</span>
                      <a 
                        href={video.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-sm btn-outline-primary"
                      >
                        Lien direct
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .transition-all {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-scale:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        video {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default VideosPage;