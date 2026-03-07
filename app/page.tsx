"use client";

import ArcheHeader from "./ArcheHeader";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCreative } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

interface Moment {
  _id: string;
  title?: string;
  imageUrl?: string;
  cloudinaryId?: string;
}

const HomePage = () => {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [aboutIsOpen, setAboutIsOpen] = useState(false);

  const WHATSAPP_NUMBER = "243990123278"; 
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour Arche de Noé...`;

  const messages = [
    { title: "Chanter, c'est", highlight: "Prier deux fois", sub: "L'excellence chorale de Lubumbashi.", accent: "bg-red-600", textAccent: "text-red-600", borderAccent: "border-red-600" },
    { title: "L'harmonie du", highlight: "Cœur et de l'Âme", sub: "Une élévation spirituelle par la voix.", accent: "bg-blue-600", textAccent: "text-blue-600", borderAccent: "border-blue-600" },
    { title: "Vivez la", highlight: "Symphonie", sub: "Rejoignez l'univers de l'Arche de Noé.", accent: "bg-amber-500", textAccent: "text-amber-500", borderAccent: "border-amber-500" }
  ];

  const features = [
    { title: "Notre Passion", desc: "L'harmonie des voix pour créer des moments d'émotion pure.", border: "border-red-600", text: "text-red-600" },
    { title: "Notre Répertoire", desc: "Du classique au contemporain, une diversité qui nous définit.", border: "border-blue-600", text: "text-blue-600" },
    { title: "Nous Rejoindre", desc: "Ouvert à tous les passionnés, sans distinction de niveau.", border: "border-gray-300", text: "text-gray-800" }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setIsAnimating(false);
      }, 800); 
    }, 6000);
    
    fetch('/api/moments').then(res => res.json()).then(result => {
      const data = Array.isArray(result) ? result : (result.data || []);
      setMoments(data);
      setLoading(false);
    }).catch(() => {
      setMoments([]); // Sécurité en cas d'erreur
      setLoading(false);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const current = messages[index];
  const formatTag = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-red-600 selection:text-white">
      
      {/* --- HEADER --- */}
      <header className="relative h-screen w-full flex items-center overflow-hidden bg-black font-serif transition-colors duration-1000">
            <nav className={`p-4  fixed top-0 w-full z-[100] transition-all duration-500 font-sans ${isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-xl py-4' : 'bg-transparent py-6 md:py-8'}`}>
              <div className="container mx-auto px-6 md:px-20 flex justify-between items-center relative z-[160]">
                <Link href="/" className="text-white flex items-center gap-2 no-underline">
                  <div className={`w-8 h-8 md:w-10 md:h-10 ${current.accent} rounded-full transition-colors duration-1000 flex items-center justify-center font-black text-white text-sm md:text-base`}>C</div>
                  <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">Arche de Noé</span>
                </Link>
                <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em] text-white/100">
                  {['Accueil', 'Galerie', 'Concerts', 'A propos'].map((item) => (
                    <Link key={item} href={`#${formatTag(item)}`} className="text-white hover:text-white transition-colors">{item}</Link>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a href={WHATSAPP_URL} target="_blank" className={`hidden sm:block px-6 py-2 rounded-full border border-white/30 text-[10px] md:text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-red hover:text-black transition-all duration-300 ${current.borderAccent}`}>Nous Contacter</a>
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white lg:hidden">
                    <div className="w-6 h-5 relative flex flex-col justify-between">
                      <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                      <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                      <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                  </button>
                </div>
              </div>
              <div className={`fixed inset-0 bg-black h-screen w-screen z-[150] transition-all duration-700 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                 <div className="flex flex-col items-center justify-center h-full gap-8 text-3xl font-bold uppercase tracking-widest text-white">
                    {['Accueil', 'Galerie', 'Concerts', 'À propos', 'Contact'].map((item) => (
                      <Link key={item} href={item === 'Contact' ? WHATSAPP_URL : `#${formatTag(item)}`} onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">{item}</Link>
                    ))}
                 </div>
              </div>
            </nav>
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 scale-105">
                <source src="https://res.cloudinary.com/archedenoe/video/upload/v1772864209/WhatsApp_Video_2026-03-01_at_8.36.38_PM_esv8g8.mp4" type="video/mp4" />
              </video>
            </div>

            {/* LOGOS RÉSEAUX SOCIAUX À DROITE (Vertical Bas -> Haut) */}
            <div className="absolute bottom-5 right-6 md:right-12 z-30 flex flex-col-reverse gap-3 items-center">
              <a href="https://www.tiktok.com/@chorale.arche.de3?_r=1&_t=ZN-94U0FVRW2E6" className="text-white/60 hover:text-white transition-all hover:-translate-y-1"><i className="fab fa-tiktok text-xl"></i></a>
              <a href="https://www.youtube.com/@choralearchedenoe?si=x1iRCIrwonpd2Bc4" className="text-white/60 hover:text-white transition-all hover:-translate-y-1"><i className="fab fa-youtube text-xl"></i></a>
              <a href="https://web.facebook.com/profile.php?id=61588220311478&rdid=cGjXnv2JnRjT7pJ2&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1cAMnuMgTz%2F%3F_rdc%3D1%26_rdr#" className="text-white/60 hover:text-white transition-all hover:-translate-y-1"><i className="fab fa-facebook-f text-xl"></i></a>
              {/* <div className="w-px h-24 bg-gradient-to-t from-white/100 to-transparent"></div> */}
              <span className="text-[20px] font-bold tracking-[0.5em] uppercase text-white/30 rotate-180 [writing-mode:vertical-lr] mb-4">ADN</span>
            </div>

            <div className="p-4 container relative z-20 px-6 md:px-20 lg:px-32">
              <div className={`transition-all duration-1000 ${isAnimating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
                <span className={`${current.textAccent} font-sans font-bold tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 block`}>Arche de Noé présente</span>
                <h1 className="text-5xl md:text-8xl font-light text-white leading-tight mb-4 tracking-tight">
                  {current.title} <br/>
                  <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{current.highlight}</span>
                </h1>
                <p className={`text-base md:text-xl max-w-sm md:max-w-lg mb-8 md:mb-12 text-gray-300 font-sans font-light border-l-2 ${current.borderAccent} pl-6`}>{current.sub}</p>
                <div className="flex flex-col sm:flex-row gap-6 font-sans">
                  <Link href="chantsvideos" className={`px-10 py-4 ${current.accent} text-white text-center font-bold uppercase tracking-widest rounded-sm shadow-xl`}>Découvrir</Link>
                  <Link href="#archeplay" className="px-10 py-4 border border-white/50 text-white text-center font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-all">Écouter →</Link>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 z-[90] bg-white/10">
              <div className={`p-5 h-full ${current.accent} transition-all duration-[6000ms] ease-linear`} style={{ width: isAnimating ? '0%' : '100%' }} key={index} />
            </div>
      </header>

      {/* --- SECTION PUPITRES --- */}
      <section id="pupitres" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm block mb-2">Structure Vocale</span>
              <h2 className="text-5xl md:text-6xl font-serif font-black text-slate-900 italic uppercase leading-none">Nos <span className="text-blue-700">Voix</span></h2>
            </div>
            <div className="h-px flex-grow bg-slate-200 mx-8 hidden md:block mb-4"></div>
            <p className="max-w-xs text-slate-500 font-medium italic text-sm">L'équilibre parfait entre puissance et finesse liturgique.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { role: "Sopranos", icon: "🎶", desc: "Clarté cristalline et hauteurs angéliques.", bg: "hover:bg-red-50" },
              { role: "Altos", icon: "✨", desc: "Richesse veloutée et cœur de l'harmonie.", bg: "hover:bg-blue-50" },
              { role: "Ténors", icon: "🔥", desc: "Énergie vibrante et lyrisme masculin.", bg: "hover:bg-red-50" },
              { role: "Basses", icon: "⚓", desc: "Profondeur solennelle et assise rythmique.", bg: "hover:bg-blue-50" }
            ].map((p, idx) => (
              <div key={idx} className={`bg-white p-10 border border-slate-100 transition-all duration-500 group relative ${p.bg}`}>
                <div className="text-5xl mb-6 transform group-hover:-translate-y-2 transition-transform">{p.icon}</div>
                <h4 className="text-2xl font-black text-slate-900 mb-3 uppercase italic tracking-tighter">{p.role}</h4>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">{p.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION ARCHE PLAY --- */}
      <section id="archeplay" className="relative py-32 bg-black overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src="https://res.cloudinary.com/archedenoe/video/upload/v1772864209/WhatsApp_Video_2026-03-01_at_8.36.38_PM_esv8g8.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-black/80"></div>
        
        <div className="container relative z-10 text-center">
          <div className="inline-block px-4 py-1 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-widest mb-6">Live Experience</div>
          <h2 className="text-5xl md:text-7xl font-serif font-black text-white mb-8 uppercase italic">Arche <span className="text-red-600">Play</span></h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-light">Immergez-vous dans nos dernières prestations. Chaque note est une émotion, chaque vidéo une histoire.</p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/archePlay" className="bg-white text-black px-12 py-4 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl">
              Voir plus de scènes
            </Link>
            <button className="px-12 py-4 border border-white/30 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
              Dernier Concert
            </button>
          </div>
        </div>
      </section>

      {/* --- GALERIE SWIPER --- */}
      <section id="galerie" className="py-24 bg-blue-50/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-black uppercase italic tracking-tighter text-slate-900">Galerie <span className="text-red-600">Instants</span></h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <Swiper
              modules={[EffectCreative, Pagination, Navigation, Autoplay]}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={true}
              effect={'creative'}
              creativeEffect={{ prev: { translate: ['-120%', 0, -500], opacity: 0 }, next: { translate: ['120%', 0, -500], opacity: 0 } }}
              autoplay={{ delay: 4000 }}
              pagination={{ clickable: true }}
              className="pb-20"
            >
              
              {Array.isArray(moments) && moments.map((moment) => (
                <SwiperSlide key={moment._id} className="max-w-[320px] md:max-w-[600px]">
                  <div className="relative group overflow-hidden bg-slate-200 aspect-[4/5] md:aspect-video border-[12px] border-white shadow-2xl">
                    <img src={moment.imageUrl || "https://images.unsplash.com/photo-1514320298574-255903965a45"} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100 duration-500">
                      <p className="text-white font-black text-2xl uppercase italic leading-none">{moment.title || "Moment Musical"}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* VRAIES VIDÉOS YOUTUBE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-12">
             {[
               { id: "Q4xqchvM9pI", title: "Shukrani" },
               { id: "zP1UNyfdWl8", title: "Yoba" }
             ].map((vid) => (
               <div key={vid.id} className="group">
                  <div className="relative aspect-video overflow-hidden border-b-4 border-red-600 shadow-xl mb-4">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vid.id}`} title={vid.title} allowFullScreen></iframe>
                  </div>
                  <h5 className="text-xl font-black uppercase italic text-slate-900 group-hover:text-blue-700 transition-colors tracking-tighter">{vid.title}</h5>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Enregistré en Live • Lubumbashi</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- RÉÉCRITURE SECTION A PROPOS (Design Épuré & Impactant) --- */}
      <section id="apropos" className="py-32 p-5 bg-white relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="aspect-[3/4] md:aspect-video overflow-hidden shadow-2xl">
                <img 
                  src="https://res.cloudinary.com/archedenoe/image/upload/v1771585800/moment_posters/gy9ctd4na3lwudxxxdh2.jpg" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] ease-in-out" 
                  alt="L'Arche de Noé en répétition" 
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-red-600/10 -z-10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="lg:col-span-6">
              <span className="text-blue-700 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Héritage & Vision</span>
              <h2 className="text-6xl md:text-7xl font-serif font-black text-slate-900 mb-8 uppercase italic leading-[0.9]">
                L'Âme de notre <br/> <span className="text-red-600">Ministère</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10 border-l-4 border-slate-100 pl-8 italic">
                "Depuis 2013, nous sculptons l'excellence vocale à Lubumbashi, transformant chaque répétition en un sanctuaire d'harmonie."
              </p>
              
              <div className="space-y-8">
                {features.map((f, i) => (
                  <div key={i} className="group flex items-start gap-6">
                    <div className={`w-12 h-12 shrink-0 flex items-center justify-center font-serif italic font-black text-2xl border ${f.border} ${f.text}`}>
                      0{i+1}
                    </div>
                    <div>
                      <h4 className={`text-xl font-black uppercase italic mb-1 ${f.text}`}>{f.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setAboutIsOpen(true)} 
                className="mt-12 group flex items-center gap-4 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl"
              >
                Explorer notre univers
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- RÉÉCRITURE FOOTER (Élégant & Structuré) --- */}
      <footer id="contact" className="px-4 bg-slate-950 text-white pt-32 pb-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10 px-6">
          
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-black text-white group-hover:scale-110 transition-transform">C</div>
              <span className="text-4xl font-black tracking-tighter uppercase italic">Arche de Noé</span>
            </Link>
            <p className="text-slate-400 max-w-sm text-lg leading-relaxed font-light italic">
              "Une famille, unie par la rigueur musicale et la ferveur spirituelle. Nous chantons pour toucher le ciel."
            </p>
            <div className="mt-10 flex gap-4">
              <div className="mt-10 flex gap-4">
                {[
                  { 
                    icon: 'facebook-f', 
                    url: 'https://web.facebook.com/profile.php?id=61588220311478&rdid=Hg57xwtLpSrcYFzY&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1cAMnuMgTz%2F%3F_rdc%3D1%26_rdr#', 
                    label: 'Facebook' 
                  },
                  { 
                    icon: 'youtube', 
                    url: 'https://youtube.com/@choralearchedenoe?si=x1iRCIrwonpd2Bc4', 
                    label: 'YouTube' 
                  },
                  { 
                    icon: 'tiktok', 
                    url: 'https://www.tiktok.com/@chorale.arche.de3?_r=1&_t=ZN-94U0FVRW2E6', 
                    label: 'TikTok' 
                  },
                  { 
                    icon: 'whatsapp', 
                    url: WHATSAPP_URL, 
                    label: 'WhatsApp' 
                  }
                ].map((social) => (
                  <a 
                    key={social.icon} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                  >
                    <i className={`fab fa-${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-8">Liturgie Vocale</h4>
            <div className="space-y-4">
              <div>
                <div className="text-slate-500">Mardi & Jeudi</div>
                <div className="text-white ml-4">17:50 — 19:00</div>
              </div>
              <div>
                <div className="text-slate-500">Samedi</div>
                <div className="text-white ml-4">18:00 — 19:00</div>
              </div>
              <div>
                <div className="text-slate-500">Dimanche</div>
                <div className="text-white ml-4 italic text-red-500">Service Dominical</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-8">Contact Direct</h4>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Siège social</p>
                <p className="font-bold text-lg">Paroisse La Sentinelle, Lubumbashi</p>
              </div>
              {/* <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">E-mail</p>
                <p className="font-bold text-lg hover:text-red-500 transition-colors cursor-pointer underline decoration-red-600/30">contact@archedenoe.cd</p>
              </div> */}
            </div>
          </div>
        </div>

        <div className="container mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600 px-6">
          <p>© 2026 ARCHE DE NOÉ CHORALE. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex gap-8">
            <a href="conditionsutilisations" className="hover:text-white transition-colors">Conditions d'utilisations</a>
            <a href="reglesdeconfidentialitepubauutilisateurs" className="hover:text-white transition-colors">Politique de Confidentialité</a>
          </div>
        </div>
      </footer>

      {/* --- RÉÉCRITURE MODAL (Expérience Immersive) --- */}
      {aboutIsOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl transition-all" onClick={() => setAboutIsOpen(false)}></div>
          <div className="relative bg-white w-full max-w-5xl h-[85vh] md:h-[70vh] flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-300">
            
            <div className="hidden md:block w-1/3 bg-slate-900 relative">
               <img src="https://res.cloudinary.com/archedenoe/image/upload/v1771585800/moment_posters/gy9ctd4na3lwudxxxdh2.jpg" className="w-full h-full object-cover opacity-60" alt="" />
               <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent"></div>
               <div className="absolute bottom-10 left-10 right-10">
                  <span className="text-white/50 text-[10px] uppercase font-bold tracking-widest block mb-2">Notre devise</span>
                  <p className="text-white text-2xl font-serif italic font-black uppercase leading-tight">L'Excellence est <br/> une forme <br/> de prière.</p>
               </div>
            </div>

            <div className="flex-1 p-8 md:p-16 overflow-y-auto relative">
              <button onClick={() => setAboutIsOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-red-600 transition-colors group">
                <span className="text-[10px] font-black uppercase tracking-widest mr-2 opacity-0 group-hover:opacity-100 transition-opacity">Fermer</span>
                <i className="fas fa-times text-2xl align-middle"></i>
              </button>

              <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Manifeste Chorale</span>
              <h3 className="text-5xl md:text-6xl font-serif font-black text-slate-900 mt-2 mb-10 uppercase italic leading-none">Qui <span className="text-slate-300 underline decoration-red-600 underline-offset-8">sommes-nous</span> ?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="prose prose-slate max-w-none font-medium text-slate-600 leading-relaxed">
                  <p className="text-xl text-slate-900 font-bold mb-4">Une mission avant tout.</p>
                  <p>La Chorale Arche de Noé est bien plus qu'un simple ensemble vocal ; c'est un ministère dédié à l'élévation spirituelle par l'excellence artistique. Fondée à Lubumbashi, notre institution regroupe des passionnés dont le seul but est de magnifier les œuvres liturgiques et contemporaines.</p>
                </div>
                <div className="prose prose-slate max-w-none font-medium text-slate-600 leading-relaxed">
                  <p className="text-xl text-slate-900 font-bold mb-4">Une rigueur académique.</p>
                  <p>Sous la direction de nos chefs de chœur, nous explorons un répertoire vaste allant de la polyphonie classique aux rythmes syncopés africains. Chaque membre suit une formation continue pour garantir une harmonie parfaite qui définit l'identité sonore de l'Arche de Noé.</p>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100 grid grid-cols-3 gap-8">
                 <div className="text-center">
                    <p className="text-3xl font-black text-slate-900 font-serif italic">50+</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Chantres</p>
                 </div>
                 <div className="text-center border-x border-slate-100">
                    <p className="text-3xl font-black text-slate-900 font-serif italic">13</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Ans d'Histoire</p>
                 </div>
                 <div className="text-center">
                    <p className="text-3xl font-black text-slate-900 font-serif italic">100+</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Concerts</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
        .swiper-pagination-bullet { background: #cbd5e1 !important; opacity: 1 !important; }
        .swiper-pagination-bullet-active { background: #dc2626 !important; width: 30px !important; border-radius: 2px !important; transition: all 0.3s; }
      `}</style>
    </div>
  );
};

export default HomePage;