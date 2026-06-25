'use client';

import { useEffect, useRef } from 'react';

function ColorfulBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const orbs = [
      { x: 0.2, y: 0.3, r: 0.35, color: '120,0,255', speed: 0.0004, angle: 0 },
      { x: 0.8, y: 0.6, r: 0.30, color: '255,50,150', speed: 0.0003, angle: 2 },
      { x: 0.5, y: 0.8, r: 0.28, color: '0,200,255', speed: 0.0005, angle: 4 },
      { x: 0.7, y: 0.2, r: 0.25, color: '255,150,0', speed: 0.0004, angle: 1 },
      { x: 0.1, y: 0.7, r: 0.22, color: '0,255,150', speed: 0.0003, angle: 3 },
    ];

    const particles: { x: number; y: number; r: number; speedX: number; speedY: number; twinkle: number; color: string }[] = [];
    const pColors = ['255,255,255', '200,150,255', '100,200,255', '255,200,100'];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.8 + 0.4,
        speedX: (Math.random() - 0.5) * 0.0002,
        speedY: (Math.random() - 0.5) * 0.0002,
        twinkle: Math.random() * Math.PI * 2,
        color: pColors[Math.floor(Math.random() * 4)],
      });
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(0, 0, w, h);

      orbs.forEach((orb) => {
        orb.angle += orb.speed;
        const cx = (orb.x + Math.sin(orb.angle) * 0.15) * w;
        const cy = (orb.y + Math.cos(orb.angle * 0.7) * 0.12) * h;
        const radius = orb.r * w;
        const pulse = Math.sin(t * 1.5 + orb.angle) * 0.15 + 0.85;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * pulse);
        g.addColorStop(0, 'rgba(' + orb.color + ',0.25)');
        g.addColorStop(0.4, 'rgba(' + orb.color + ',0.10)');
        g.addColorStop(0.7, 'rgba(' + orb.color + ',0.04)');
        g.addColorStop(1, 'rgba(' + orb.color + ',0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18 * pulse);
        core.addColorStop(0, 'rgba(' + orb.color + ',0.6)');
        core.addColorStop(1, 'rgba(' + orb.color + ',0)');
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(cx, cy, 18 * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        const tw = Math.sin(t * 2 + p.twinkle) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r * tw, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.color + ',' + (0.5 * tw) + ')';
        ctx.fill();
      });

      t += 0.008;
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

export default function Projects() {
  const projects = [
    {
      title: 'Pneumonia Detection',
      image: '/projects/pneumonia.png',
      tech: 'CNN • Deep Learning',
      desc: 'AI model for detecting pneumonia using medical imaging.',
      year: '2025',
      github: 'https://github.com/Prajwalnj19/Pneumonia-Detection',
    },
    {
      title: 'Face Attendance System',
      image: '/projects/attendance.png',
      tech: 'Python • OpenCV • Face Recognition',
      desc: 'AI-powered attendance management system that automatically identifies individuals and marks attendance in real time using face recognition.',
      year: '2025',
      github: 'https://github.com/Prajwalnj19/Face-Attendance-System-Using-AI',
    },
    {
      title: 'Gesture Controlled Virtual Mouse',
      image: '/projects/mouse.png',
      tech: 'Python • OpenCV • MediaPipe',
      desc: 'Real-time virtual mouse that enables cursor control and click actions through hand gestures captured via a webcam.',
      year: '2025',
      github: 'https://github.com/Prajwalnj19/Gesture-Controlled-Virtual-Mouse',
    },
    {
      title: 'Traffic Sign Detection',
      image: '/projects/traffic.png',
      tech: 'Computer Vision',
      desc: 'Traffic sign recognition using deep learning.',
      year: '2025',
      github: 'https://github.com/Prajwalnj19/Traffic-Sign-Detection-Using-CNN',
    },
  ];

  return (
    <section className="relative min-h-screen text-white px-10 py-28 overflow-hidden">
      <ColorfulBackground />

      <div className="relative z-10 max-w-6xl mx-auto">

        <p className="text-gray-500 uppercase tracking-widest text-sm">Work</p>
        <h2 className="mt-5 text-6xl font-bold mb-16">Featured Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="overflow-hidden rounded-3xl bg-black/40 border border-white/15 hover:-translate-y-3 hover:border-white/40 transition duration-500 backdrop-blur-md"
            >
              <div className="w-full h-64 bg-black/60 flex items-center justify-center overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-7">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 uppercase tracking-widest">{project.year}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">{project.tech.split('•')[0].trim()}</span>
                </div>

                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="mt-2 text-gray-400 text-sm">{project.tech}</p>
                <p className="mt-4 text-white/70 text-sm leading-relaxed">{project.desc}</p>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}