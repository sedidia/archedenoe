"use client";
import { useState } from "react";
import PostVideo from "./postvideo/page";
import PostConcert from "./postconcert/page";
import PostMoment from "./postmoment/page";


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("videos");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
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
  );
}