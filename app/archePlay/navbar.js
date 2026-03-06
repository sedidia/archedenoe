import React, { useState, useEffect } from 'react';

const NavbarArchePlay = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Gestion du scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">
            rche<span className="text-indigo-400">deNoé</span>
          </span>
        </div>

        {/* Liens Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {['Accueil', 'pupitres', 'galerie'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        {/* <div className="flex items-center gap-4">
          <button className="hidden sm:block text-gray-300 hover:text-white px-4 py-2 text-sm">
            Connexion
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all">
            S'abonner
          </button>
          
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div> */}
      </div>

      {/* Dropdown Mobile */}
      {/* {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-6 py-4 space-y-4">
          <a href="#" className="block text-white">Accueil</a>
          <a href="#" className="block text-white">Bibliothèque</a>
          <a href="#" className="block text-white">Tendances</a>
          <hr className="border-gray-800" />
          <button className="w-full text-left text-white">Connexion</button>
        </div>
      )} */}
    </nav>
  );
};

export default NavbarArchePlay;