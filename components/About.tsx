'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let t = 0;

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#000510';
      ctx.fillRect(0, 0, w, h);

      const waves = [
        { color: 'rgba(0,200,150,', yBase: 0.55, amp: 0.18, phase: 0 },
        { color: 'rgba(80,50,200,', yBase: 0.45, amp: 0.15, phase: 2.1 },
        { color: 'rgba(0,150,255,', yBase: 0.65, amp: 0.12, phase: 4.2 },
      ];

      waves.forEach(({ color, yBase, amp, phase }) => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 4) {
          const y =
            yBase * h +
            Math.sin((x / w) * Math.PI * 3 + t + phase) * amp * h +
            Math.sin((x / w) * Math.PI * 7 + t * 0.7 + phase) * amp * 0.3 * h;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, (yBase - amp) * h, 0, (yBase + amp * 2) * h);
        grad.addColorStop(0, color + '0.15)');
        grad.addColorStop(0.5, color + '0.07)');
        grad.addColorStop(1, color + '0)');
        ctx.fillStyle = grad;
        ctx.fill();
      });

      stars.forEach((s) => {
        const tw = Math.sin(t * 2 + s.twinkle) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h * 0.8, s.r * tw, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.25 * tw + 0.1})`;
        ctx.fill();
      });

      t += 0.006;
      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const education = [
  {
    degree: 'Bachelor of Engineering — Computer Science and Engineering',
    school: 'Cambridge Institute of Technology North Campus',
    year: '2021 – 2025',
    percentage: '70%',
  },
  {
    degree: 'Pre University Education — PCMB',
    school: 'ICBIO Mahesh PU College',
    year: '2019 – 2021',
    percentage: '79%',
  },
  {
    degree: 'Secondary School Leaving Certificate',
    school: 'Ooty Convent English Medium High School',
    year: '',
    percentage: '83%',
  },
];

export default function About() {
  useScrollReveal();

  return (
    <section id="about" className="relative min-h-screen text-white overflow-hidden">
      <AuroraBackground />

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.22s; }
        .reveal-delay-3 { transition-delay: 0.36s; }
        .reveal-delay-4 { transition-delay: 0.5s; }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-32">

        {/* Top: photo + intro */}
        <div className="flex flex-col md:flex-row items-center gap-14">

          {/* Profile Photo */}
          <div className="reveal reveal-delay-1 flex-shrink-0">
            <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <Image
                src="/Projects/photo.jpg"
                alt="Prajwal N J"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="reveal reveal-delay-1 text-gray-500 uppercase tracking-widest text-sm">About Me</p>

            <h2 className="reveal reveal-delay-2 mt-4 text-5xl md:text-6xl font-bold leading-tight">
              Building AI &<br />
              Web Experiences
            </h2>

            {/* Professional Summary */}
            <div className="reveal reveal-delay-2 mt-6 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <p className="text-sm text-white/50 uppercase tracking-widest mb-1">Professional Summary</p>
              <p className="text-white/80 text-sm leading-relaxed">
                Software Developer with a strong foundation in Python, Machine Learning, and Full Stack Development,
                backed by a certified 6-month AI &amp; ML internship at Rooman Technologies. Passionate about building
                real-world AI applications and modern web experiences that solve meaningful problems.
              </p>
            </div>

            <p className="reveal reveal-delay-3 mt-6 text-lg text-gray-400 max-w-2xl leading-relaxed">
              Hi, I&apos;m <span className="text-white font-semibold">Prajwal N J</span> — an AI Developer and Software Engineer
              based in Bengaluru, India. I build intelligent systems and modern web applications,
              with a deep interest in Deep Learning, Computer Vision, and Full Stack Development.
              I love turning complex problems into clean, impactful solutions.
            </p>

            {/* Stats */}
            <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-8">
              {[
                { label: 'Projects Built', value: '4+' },
                { label: 'Technologies', value: '15+' },
                { label: 'GitHub Repos', value: '10+' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-3xl font-extrabold text-white">{value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Resume button */}
            <div className="reveal reveal-delay-4 mt-8">
              <a
                href="/Projects/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </div>


        {/* Internship Section */}
        <div className="mt-24">
          <p className="reveal text-gray-500 uppercase tracking-widest text-sm">Experience</p>
          <h3 className="reveal reveal-delay-1 mt-3 text-4xl font-bold mb-12">Internship</h3>

          <div className="reveal reveal-delay-2 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition duration-300 backdrop-blur-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h4 className="text-xl font-extrabold text-white">Artificial Intelligence &amp; Machine Learning Intern</h4>
                <p className="text-white/60 font-medium mt-1">Rooman Technologies</p>
                <p className="text-xs text-gray-500 mt-1">Jan 2024 – Jun 2024</p>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">6 Months</span>
            </div>

            <ul className="space-y-2 mt-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                Developed Machine Learning and Deep Learning models using Python
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                Performed data preprocessing, model training and evaluation
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                Built AI-based projects using CNN and OpenCV
              </li>
            </ul>

            <a
              href="/Projects/internship.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-full border border-white/20 text-sm text-white hover:bg-white/10 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Certificate
            </a>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-20">
          <p className="reveal text-gray-500 uppercase tracking-widest text-sm">Certifications</p>
          <h3 className="reveal reveal-delay-1 mt-3 text-4xl font-bold mb-12">Courses Completed</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="reveal reveal-delay-1 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <span className="text-3xl">⚙️</span>
                <div>
                  <h4 className="text-lg font-extrabold text-white">Full Stack Java</h4>
                  <p className="text-sm text-white/50 mt-0.5">Wipro</p>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-2 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🌐</span>
                <div>
                  <h4 className="text-lg font-extrabold text-white">Full Stack Web Development</h4>
                  <p className="text-sm text-white/50 mt-0.5">Compsoft Technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <div className="mt-24">
          <p className="reveal text-gray-500 uppercase tracking-widest text-sm">Education</p>
          <h3 className="reveal reveal-delay-1 mt-3 text-4xl font-bold mb-12">Academic Background</h3>

          <div className="relative pl-6 border-l border-white/10 space-y-8">
            {education.map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} relative`}>
                <span className="absolute -left-[1.35rem] top-2 w-3 h-3 rounded-full bg-white/60 border-2 border-black" />
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition duration-300 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="text-lg font-extrabold text-white">{item.degree}</h4>
                    {item.year && <span className="text-xs text-gray-500 uppercase tracking-widest">{item.year}</span>}
                  </div>
                  <p className="text-sm text-white/60 font-medium">{item.school}</p>
                  <p className="mt-2 text-sm text-gray-400">Percentage: <span className="text-white font-semibold">{item.percentage}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}