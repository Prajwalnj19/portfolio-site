'use client';

import { useEffect, useRef } from 'react';

function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let t = 0;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.0003 + 0.00005,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      const g1 = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, w * 0.55);
      g1.addColorStop(0, 'rgba(40,10,80,0.7)');
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.75, h * 0.6, 0, w * 0.75, h * 0.6, w * 0.4);
      g2.addColorStop(0, 'rgba(5,30,60,0.5)');
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      stars.forEach((s) => {
        s.x += s.speed;
        if (s.x > 1) s.x = 0;
        const tw = Math.sin(t * 2 + s.twinkle) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r * tw, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.5 * tw + 0.2})`;
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

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: '🤖',
    skills: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'MediaPipe', 'CNN', 'Deep Learning', 'Computer Vision'],
  },
  {
    title: 'Web Development',
    icon: '🌐',
    skills: ['Next.js', 'React', 'HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Core CS Concepts',
    icon: '🧠',
    skills: ['DSA', 'OOP', 'Problem Solving', 'Algorithms', 'Basic SQL'],
  },
  {
    title: 'Database',
    icon: '🗄️',
    skills: ['MySQL', 'PostgreSQL'],
  },
  {
    title: 'Programming Languages',
    icon: '💻',
    skills: ['Python', 'Java (Basics)', 'C (Basics)'],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'VS Code', 'PyCharm', 'Jupyter Notebook', 'Vercel'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen text-white px-10 py-28 overflow-hidden">
      <CinematicBackground />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="reveal text-gray-500 uppercase tracking-widest text-sm">Skills</p>
        <h2 className="reveal reveal-delay-1 mt-5 text-6xl font-bold mb-16">Technologies I Use</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="reveal p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 transition duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-2xl font-bold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm transition duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub contribution graph */}
        <div className="reveal mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <h3 className="text-2xl font-bold">GitHub Activity</h3>
          </div>
          <img
            src="https://ghchart.rshah.org/Prajwalnj19"
            alt="GitHub Contribution Graph"
            className="w-full rounded-xl opacity-80"
          />
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href="https://github.com/Prajwalnj19"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 text-sm text-white hover:bg-white/10 transition"
            >
              View GitHub Profile →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}