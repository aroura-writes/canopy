import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigationType } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SECTIONS, BRAND } from '@/config/content.config';

/* ============================================================
   CANOPY — All shared components consolidated into one file:
   Site chrome (Navbar, Footer, FloatingGeo, Spinner, SiteLayout)
   + Auth helpers (ScrollToTop, ProtectedRoute, AuthLayout,
   UserNotRegisteredError, GoogleIcon).
   ============================================================ */

const UI_FONT = "'Archivo Narrow', sans-serif";

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  ...SECTIONS.map(s => ({ to: `/${s.slug}`, label: s.navLabel })),
  { to: '/about', label: 'About' },
];

/* ---------------- ScrollToTop ---------------- */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  const getHashId = (h) => {
    const rawId = h.slice(1);
    try {
      return decodeURIComponent(rawId);
    } catch {
      return rawId;
    }
  };

  useEffect(() => {
    if (navigationType === 'POP') return;

    if (hash) {
      const id = getHashId(hash);
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, navigationType]);

  return null;
}

/* ---------------- Navbar ---------------- */
export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-[#FBFCFB]/95 shadow-sm border-white/30' : 'bg-[#FBFCFB]/85 border-white/20'
      }`}
      style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-[1400px] mx-auto px-[8vw] py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold text-[#1A1C1A] tracking-tight hover:text-[#2E7D32] transition-colors"
          style={{ fontFamily: UI_FONT, letterSpacing: '-0.03em' }}
        >
          {BRAND}
        </Link>

        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul
          className={`${
            open ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row absolute md:relative top-full md:top-auto left-0 right-0 md:left-auto md:right-auto bg-[#FBFCFB]/97 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-4 md:p-0 gap-1 border-b md:border-0 border-white/20`}
        >
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`block px-5 py-2 rounded-full text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] ${
                    isActive ? 'text-[#2E7D32] bg-[#E8F5E9]' : 'text-[#4A4D4A] hover:text-[#2E7D32] hover:bg-[#E8F5E9]'
                  }`}
                  style={{ fontFamily: UI_FONT }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="bg-[#1A1C1A] text-white/70 mt-16">
      <div className="max-w-[1400px] mx-auto px-[8vw] pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-extrabold text-white mb-2" style={{ fontFamily: UI_FONT, letterSpacing: '-0.03em' }}>
              {BRAND}
            </h3>
            <p className="text-sm text-white/40">A digital sanctuary for nature lovers.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4" style={{ fontFamily: UI_FONT }}>
              Explore
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-[#81C784] transition-colors" style={{ fontFamily: UI_FONT }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4" style={{ fontFamily: UI_FONT }}>
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-[#81C784] transition-colors" style={{ fontFamily: UI_FONT }}>
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:hello@canopy.com" className="text-sm text-white/60 hover:text-[#81C784] transition-colors" style={{ fontFamily: UI_FONT }}>
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/25">&copy; 2026 {BRAND}. Crafted with love for nature.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Spinner ---------------- */
export function Spinner() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-10 h-10 border-3 border-[#E8F5E9] border-t-[#2E7D32] rounded-full animate-spin" />
    </div>
  );
}

/* ---------------- FloatingGeo ---------------- */
const GEO_SHAPES = [
  { type: 'circle', size: 120, top: '15%', left: '5%', delay: 0, duration: 20 },
  { type: 'diamond', size: 40, top: '25%', right: '8%', delay: 3, duration: 25 },
  { type: 'cross', size: 30, top: '60%', left: '3%', delay: 7, duration: 18 },
  { type: 'circle', size: 80, bottom: '20%', right: '5%', delay: 11, duration: 22 },
  { type: 'dot', size: 8, top: '40%', left: '15%', delay: 5, duration: 15 },
  { type: 'dot', size: 6, top: '70%', right: '20%', delay: 9, duration: 28 },
  { type: 'diamond', size: 50, bottom: '35%', left: '10%', delay: 14, duration: 19 },
];

function GeoShape({ type, size }) {
  if (type === 'circle') {
    return <div className="rounded-full border-2 border-[#2E7D32]" style={{ width: size, height: size }} />;
  }
  if (type === 'diamond') {
    return <div className="border-2 border-[#4CAF50] rotate-45" style={{ width: size, height: size }} />;
  }
  if (type === 'cross') {
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute left-1/2 top-0 w-[2px] h-full bg-[#2E7D32] -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 h-[2px] w-full bg-[#2E7D32] -translate-y-1/2" />
      </div>
    );
  }
  if (type === 'dot') {
    return <div className="rounded-full bg-[#4CAF50]" style={{ width: size, height: size }} />;
  }
  return null;
}

export function FloatingGeo() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {GEO_SHAPES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.07]"
          style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom }}
          animate={{
            x: [0, 10, -5, 8, 0],
            y: [0, -15, 10, 5, 0],
            rotate: s.type === 'diamond' ? [45, 50, 42, 48, 45] : [0, 5, -3, 4, 0],
          }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        >
          <GeoShape type={s.type} size={s.size} />
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- SiteLayout ---------------- */
export function SiteLayout() {
  return (
    <div className="relative min-h-screen" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
      <FloatingGeo />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default SiteLayout;