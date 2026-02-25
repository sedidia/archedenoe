"use client";
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, AlertCircle, Loader2 } from 'lucide-react';
import PostVideo from "./postvideo";
import PostConcert from "./postconcert";
import PostMoment from "./postmoment";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("videos");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [accessCode, setAccessCode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const savedAccess = sessionStorage.getItem("archePlay_access");
    if (savedAccess === "granted") {
      setIsAuthorized(true);
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    // Utilisation d'une variable d'env (comparaison côté client ici pour la simplicité, 
    // mais idéalement via une route API pour la sécurité maximale)
    const secret = process.env.NEXT_PUBLIC_ACCESS_CODE;
  
    if (accessCode === secret) {
      setIsAuthorized(true);
      sessionStorage.setItem("archePlay_access", "granted");
    } else {
      setError("Code d'accès incorrect. Veuillez réessayer.");
      setAccessCode("");
    }
    setLoading(false);
  };

  return (
    <div>
      {isAuthorized? 
      <div className="container-fluid p-0 overflow-hidden">
        {/* OVERLAY MOBILE : Fond sombre quand le menu est ouvert */}
        {isSidebarOpen && (
          <div 
            className="sidebar-overlay d-md-none" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* HEADER MOBILE */}
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-2 shadow d-md-none">
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="navbar-brand px-3 fs-6 fw-bold">Arche de Noé Admin</span>
        </header>

        <div className="row g-0">
          {/* BARRE LATÉRALE - Fluide avec Transform */}
          <nav className={`col-md-3 col-lg-2 bg-dark sidebar min-vh-100 shadow-lg ${isSidebarOpen ? "open" : ""}`}>
            <div className="position-sticky pt-4 px-3">
              <div className="d-flex align-items-center mb-4 px-2">
                <i className="bi bi-shield-check text-primary fs-4 me-2"></i>
                <h5 className="text-white text-uppercase small fw-bold mb-0 opacity-75">Gestion Chorale</h5>
              </div>
              
              <ul className="nav flex-column gap-2">
                <li className="nav-item">
                  <button 
                    onClick={() => switchTab("videos")}
                    className={`nav-link w-100 text-start border-0 py-3 px-3 transition-sm ${activeTab === "videos" ? "bg-primary text-white rounded-3 shadow" : "text-white-50 bg-transparent hover-link"}`}
                  >
                    <i className="bi bi-camera-video me-2"></i> Publier Vidéo
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={() => switchTab("postconcert")}
                    className={`nav-link w-100 text-start border-0 py-3 px-3 transition-sm ${activeTab === "postconcert" ? "bg-primary text-white rounded-3 shadow" : "text-white-50 bg-transparent hover-link"}`}
                  >
                    <i className="bi bi-calendar-event me-2"></i> Programmer concert à venir
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={() => switchTab("momentenmusique")}
                    className={`nav-link w-100 text-start border-0 py-3 px-3 transition-sm ${activeTab === "momentenmusique" ? "bg-primary text-white rounded-3 shadow" : "text-white-50 bg-transparent hover-link"}`}
                  >
                    <i className="bi bi-music-note-beamed me-2"></i> Publier moment en Musique
                  </button>
                </li>
              </ul>

              <hr className="text-white-50 my-4" />
              
              <div className="px-2">
                <a href="/" className="btn btn-outline-info btn-sm w-100 py-2">
                  <i className="bi bi-house-door me-1"></i> Site Public
                </a>
              </div>
            </div>
          </nav>

          {/* CONTENU PRINCIPAL */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light min-vh-100 pt-3">
            <div className="d-none d-md-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
              <h1 className="h4 fw-bold text-dark m-0">
                {activeTab === "videos" && "Publication Vidéo HD"}
                {activeTab === "postconcert" && "Gestion Concerts"}
                {activeTab === "momentenmusique" && "Moments Musicaux"}
              </h1>
              <span className="badge rounded-pill bg-primary px-3 py-2">Mode Administration</span>
            </div>

            <div className="row justify-content-center pt-2">
              <div className="col-12 col-xl-10">
                {activeTab === "videos" && (
                  <div className="fade-in">
                    <PostVideo />
                  </div>
                )}
                {/* ... Garder les autres conditions ici ... */}
              </div>
            </div>
            <div className="row justify-content-center pt-2">
              <div className="col-12 col-xl-10">
                {activeTab === "postconcert" && (
                  <div className="fade-in">
                    <PostConcert />
                  </div>
                )}
                {/* ... Garder les autres conditions ici ... */}
              </div>
            </div>
            <div className="row justify-content-center pt-2">
              <div className="col-12 col-xl-10">
                {activeTab === "momentenmusique" && (
                  <div className="fade-in">
                    <PostMoment />
                  </div>
                )}
                {/* ... Garder les autres conditions ici ... */}
              </div>
            </div>
          </main>
        </div>

        <style jsx>{`
          /* Style de la Sidebar */
          .sidebar {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1050;
          }

          .hover-link:hover {
            color: white !important;
            background-color: rgba(255, 255, 255, 0.05) !important;
            border-radius: 8px;
          }

          .transition-sm {
            transition: all 0.2s ease;
          }

          /* Overlay Sombre Mobile */
          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(2px);
            z-index: 1040;
            animation: fadeInOverlay 0.3s ease;
          }

          @keyframes fadeInOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @media (max-width: 767.98px) {
            .sidebar {
              position: fixed;
              top: 0;
              left: 0;
              bottom: 0;
              width: 280px;
              transform: translateX(-100%); /* Masqué par défaut */
            }
            .sidebar.open {
              transform: translateX(0); /* Glisse vers l"intérieur */
            }
          }

          .fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
      
      :
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black text-white p-4">
        <div className="w-full max-w-md p-8 bg-[#121212] border border-white/10 rounded-[32px] shadow-2xl text-center">
          <div className="inline-flex p-4 bg-purple-600/20 rounded-full mb-6 text-purple-500">
            <Lock size={40} />
          </div>
          
          <h1 className="text-2xl font-black mb-2 uppercase tracking-tight">Accès Restreint</h1>
          <p className="text-gray-400 mb-8 text-sm">Veuillez saisir le code d'accès de la Chorale pour continuer.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                placeholder="Code secret"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 transition-all text-center text-xl tracking-widest"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium animate-shake">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Unlock size={20} />}
              Débloquer l'accès
            </button>
          </form>

          <p className="mt-8 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            ArchePlay Admin System
          </p>
        </div>
      </div>
      }

    </div>
  );
}