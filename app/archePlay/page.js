"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Heart, MessageCircle, Share2, Loader2, X, Youtube, Facebook } from 'lucide-react';

/**
 * COMPOSANT : ActionModal
 * Une fenêtre élégante pour les choix de l'utilisateur
 */
const ActionModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#121212] border border-white/10 w-full max-w-xs rounded-[32px] p-8 text-center shadow-2xl transform animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-white mb-8 leading-tight">{title}</h3>
        <div className="flex flex-col gap-4">
          {children}
        </div>
        <button 
          onClick={onClose}
          className="mt-8 text-sm font-medium text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

/**
 * COMPOSANT : VideoCard
 */
const VideoCard = ({ video, isTarget }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [modalType, setModalType] = useState(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.6 });

  // Fusion des refs pour Intersection Observer et Scroll
  const setRefs = useCallback((node) => {
    containerRef.current = node;
    inViewRef(node);
  }, [inViewRef]);

  // Lecture automatique au scroll
  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [inView]);

  // Scroll auto si la vidéo est ciblée par l'URL
  useEffect(() => {
    if (isTarget && containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [isTarget]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/archePlay?v=${video._id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: `Découvre cette vidéo sur ArchePlay : ${video.title}`,
          url: shareUrl,
        });
      } catch (err) { console.log("Partage annulé"); }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Lien de la vidéo copié !");
    }
  };

  const goToLike = (platform) => {
    setModalType(null);
    const url = platform === 'yt' 
      ? `https://www.youtube.com/watch?v=${video.youtubeId}` 
      : `https://www.facebook.com/watch/?v=${video.facebookId}`;
    
    if (confirm("Vous allez être redirigé vers une plateforme externe pour liker cette vidéo. Continuer ?")) {
      window.open(url, '_blank');
    }
  };

  return (
    <div ref={setRefs} className="relative h-screen w-full flex-shrink-0 bg-black snap-start flex items-center justify-center overflow-hidden border-b border-white/5">
      <video
        ref={videoRef}
        src={video.videoUrl || video.url}
        className="h-full w-full object-contain"
        loop muted playsInline
      />

      <ActionModal 
        isOpen={modalType === 'like'} 
        onClose={() => setModalType(null)}
        title="Sur quelle plateforme voulez-vous liker ?"
      >
        <button 
          onClick={() => goToLike('fb')}
          className="flex items-center justify-center gap-4 bg-[#1877F2] hover:bg-[#166fe5] p-5 rounded-2xl text-white font-bold transition-transform active:scale-95"
        >
          <Facebook fill="white" size={24} /> Facebook
        </button>
        <button 
          onClick={() => goToLike('yt')}
          className="flex items-center justify-center gap-4 bg-[#FF0000] hover:bg-[#e60000] p-5 rounded-2xl text-white font-bold transition-transform active:scale-95"
        >
          <Youtube fill="white" size={24} /> YouTube
        </button>
      </ActionModal>

      {/* OVERLAY INTERFACE */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent text-white z-30">
        <div className="flex items-end justify-between gap-6">
          <div className="flex-1 pb-4">
            <h3 className="font-black text-xl mb-2 text-blue-400 drop-shadow-md">@{video.author || "Chorale"}</h3>
            <p className="text-base opacity-90 line-clamp-2 font-medium leading-relaxed drop-shadow">
              {video.title}
            </p>
          </div>

          <div className="flex items-center gap-6 bg-white/10 p-4 rounded-[28px] backdrop-blur-xl border border-white/10 shadow-2xl">
            <button onClick={() => setModalType('like')} className="flex flex-col items-center group">
              <div className="p-1 group-active:scale-125 transition-transform duration-200">
                <Heart size={34} strokeWidth={2} className="text-white group-hover:text-red-500 transition-colors" />
              </div>
              <span className="text-[10px] mt-1 font-black uppercase tracking-widest opacity-80">Like</span>
            </button>

            <button onClick={handleShare} className="flex flex-col items-center group">
              <div className="p-1 group-active:scale-125 transition-transform duration-200">
                <Share2 size={32} strokeWidth={2} className="text-white group-hover:text-blue-400 transition-colors" />
              </div>
              <span className="text-[10px] mt-1 font-black uppercase tracking-widest opacity-80">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * COMPOSANT PRINCIPAL
 */
export default function ArchePlay() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    // Lecture de l'ID vidéo dans l'URL pour le partage direct
    const params = new URLSearchParams(window.location.search);
    setTargetId(params.get('v'));

    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/showvideos"); 
        const result = await response.json();
        if (result.success) setVideos(result.data);
      } catch (err) { console.error("Erreur chargement:", err); }
      finally { setLoading(false); }
    };
    fetchVideos();
  }, []);

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide">

      <nav className="bg-red-800 sticky top-0 z-[100] ">
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
                      <li><a onClick={() => setAboutIsOpen(false)} href="#" className="text-white no-underline hover:text-red-400 transition-colors font-bold uppercase text-sm tracking-widest">A propos</a></li>
                      <li><a onClick={() => setAboutIsOpen(false)} href="#pupitres" className="text-white no-underline hover:text-red-400 transition-colors font-bold uppercase text-sm tracking-widest">Nos Voix</a></li>
                      <li><a onClick={() => setAboutIsOpen(false)} href="#galerie" className="text-white no-underline hover:text-red-400 transition-colors font-bold uppercase text-sm tracking-widest">Galerie</a></li>
                      <li>
                        <a onClick={() => setAboutIsOpen(false)} href="#contact" className="bg-red-600 hover:bg-white hover:text-red-600 text-white px-6 py-2 rounded-full font-black no-underline transition-all transform hover:scale-105 shadow-lg border-2 border-transparent hover:border-red-600">
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
                  <button onClick={closeNav} className="pb-4 block text-white no-underline font-bold text-lg hover:text-red-400">A propos</button>
                  <a href="#pupitres" onClick={closeAbout} className="block text-white no-underline font-bold text-lg hover:text-red-400">Nos Voix</a>
                  <a href="#galerie" onClick={closeAbout} className="block text-white no-underline font-bold text-lg hover:text-red-400">Galerie</a>
                  <a href="#contact" onClick={closeAbout} className="block bg-red-600 text-white text-center py-3 rounded-lg font-black no-underline">REJOINDRE LA CHORALE</a>
                </div>
              </div>
            </nav>


      {videos.map((video) => (
        <VideoCard 
          key={video._id} 
          video={video} 
          isTarget={video._id === targetId} 
        />
      ))}
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="text-blue-500 animate-spin" size={48} />
            <p className="text-white/50 text-sm font-medium tracking-widest uppercase">Chargement</p>
          </div>
        </div>
      )}
      
    
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}