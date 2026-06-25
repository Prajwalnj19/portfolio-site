'use client';

import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          onClick={() => scrollTo('#home')}
          className="text-white font-extrabold text-xl tracking-widest uppercase cursor-pointer select-none"
        >
          PNJ<span className="text-white/30">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const id = href.replace('#', '');
            return (
              <li key={label}>
                <button
                  onClick={() => scrollTo(href)}
                  className={`text-sm uppercase tracking-widest transition-all duration-300 ${
                    active === id
                      ? 'text-white font-semibold'
                      : 'text-white/50 hover:text-white/90'
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Resume button */}
        <a
          href="/Projects/resume.pdf"
          download
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white hover:text-black transition duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          Resume
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-8 py-6 flex flex-col gap-5">
          {navLinks.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              className="text-white/70 hover:text-white text-sm uppercase tracking-widest text-left transition"
            >
              {label}
            </button>
          ))}
          <a
            href="/Projects/resume.pdf"
            download
            className="mt-2 px-5 py-2 rounded-full border border-white/30 text-white text-sm font-semibold text-center hover:bg-white hover:text-black transition"
          >
            Download Resume
          </a>
        </div>
      )}
    </nav>
  );
}