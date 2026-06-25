'use client'

import { useEffect, useRef, useState } from 'react'

function ContactBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    let t = 0

    const particles: {
      x: number; y: number; r: number; speedX: number; speedY: number; twinkle: number; color: string
    }[] = []

    for (let i = 0; i < 60; i++) {
      const colors = ['255,255,255', '180,120,255', '100,180,255']
      particles.push({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.00015,
        speedY: (Math.random() - 0.5) * 0.00015,
        twinkle: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * 3)],
      })
    }

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }

    const draw = () => {
      const w = canvas.width, h = canvas.height
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, 0, w, h)

      const g1 = ctx.createRadialGradient(w * 0.1, h * 0.2, 0, w * 0.1, h * 0.2, w * 0.5)
      g1.addColorStop(0, 'rgba(80,0,160,0.14)'); g1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g1; ctx.fillRect(0, 0, w, h)

      const g2 = ctx.createRadialGradient(w * 0.9, h * 0.8, 0, w * 0.9, h * 0.8, w * 0.45)
      g2.addColorStop(0, 'rgba(0,180,200,0.12)'); g2.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX; p.y += p.speedY
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
        const tw = Math.sin(t * 2 + p.twinkle) * 0.4 + 0.6
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.r * tw, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(' + p.color + ',' + (0.45 * tw) + ')'
        ctx.fill()
      }

      t += 0.008
      animId = requestAnimationFrame(draw)
    }

    resize(); draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '8d5b89d0-5764-4847-9205-c7798f56508c',
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('idle')
        alert('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('idle')
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="relative min-h-screen text-white px-10 py-28 overflow-hidden">
      <ContactBackground />

      <div className="relative z-10 max-w-4xl mx-auto">

        <p className="text-gray-500 uppercase tracking-widest text-sm">Contact</p>
        <h2 className="mt-5 text-6xl font-bold">Let&apos;s Connect</h2>
        <p className="mt-6 text-gray-400 text-lg max-w-xl">
          I am open to opportunities, collaborations, and interesting projects.
          Feel free to reach out anytime.
        </p>

        {/* Info card */}
        <div className="mt-12 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Name</p>
              <p className="text-white text-xl font-semibold">Prajwal N J</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Location</p>
              <p className="text-white text-xl font-semibold">Yelahanka, Bengaluru</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Email</p>
              <p className="text-white text-xl font-semibold">njkanchi@gmail.com</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Phone</p>
              <p className="text-white text-xl font-semibold">+91 9972552294</p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="mt-10 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Hi Prajwal, I'd like to discuss..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition text-sm resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === 'sending' || status === 'sent'}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition duration-300 ${
              status === 'sent'
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-white text-black hover:scale-105'
            }`}
          >
            {status === 'sent' ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Message Sent
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Message
              </>
            )}
          </button>
          <p className="mt-3 text-xs text-gray-600">Opens your email client with the message pre-filled.</p>
        </div>

        {/* Social links */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">

          <a href="mailto:njkanchi@gmail.com"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-400/50 transition duration-300 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="#f87171" width="24" height="24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
            <span className="text-white font-semibold text-sm">Gmail</span>
          </a>

          <a href="https://github.com/Prajwalnj19" target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/40 transition duration-300 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="#ffffff" width="24" height="24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-white font-semibold text-sm">GitHub</span>
          </a>

          <a href="https://linkedin.com/in/prajwal-nj-994aa1228" target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-400/50 transition duration-300 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="#60a5fa" width="24" height="24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="text-white font-semibold text-sm">LinkedIn</span>
          </a>

          <a href="tel:+919972552294"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-green-500/20 hover:border-green-400/50 transition duration-300 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="#4ade80" width="24" height="24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="text-white font-semibold text-sm">Call Me</span>
          </a>

        </div>

        <div className="mt-24 border-t border-white/10 pt-8 text-center">
          <p className="text-gray-600 text-sm">© 2025 Prajwal N J — Built with Next.js</p>
        </div>

      </div>
    </section>
  )
}