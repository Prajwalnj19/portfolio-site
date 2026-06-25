"use client";

import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

import { useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setStarted(true);
      setEnded(false);
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen overflow-hidden">

        {/* VIDEO */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onEnded={() => setEnded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/intro.mp4" type="video/mp4" />
        </video>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/10 z-10" />

        {/* CLICK TO START SCREEN */}
        {(!started || ended) && (
          <div
            onClick={handleStart}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer bg-black/50"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white text-lg font-semibold tracking-widest uppercase">
              {ended ? 'Click to Replay' : 'Click to Enter'}
            </p>
          </div>
        )}

        {/* TEXT */}
        <div className="absolute left-1/2 bottom-[10%] -translate-x-1/2 z-20 text-center text-white w-full px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-[0.15em]">
            PRAJWAL N J
          </h1>
          <p className="mt-5 text-base md:text-xl text-white/90">
            AI Developer • Web Developer • Software Engineer
          </p>
          <button
            onClick={scrollToAbout}
            className="mt-8 px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
          >
            Explore Portfolio
          </button>
        </div>

      </section>

      <About />
      <Skills />
      <section id="projects"><Projects /></section>
      <Contact />
    </main>
  );
}