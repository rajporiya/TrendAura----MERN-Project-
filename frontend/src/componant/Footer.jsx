import React from 'react'
import '../componentStyles/Footer.css'
import { Email, GitHub, Instagram, LinkedIn, Phone, YouTube } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Footer() {
  return (
     

<footer className="relative bg-slate-900 border-t border-slate-700/50 overflow-hidden">

  {/* Background glow accents */}
  <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute top-0 right-1/4 w-64 h-32 bg-amber-400/3 rounded-full blur-2xl pointer-events-none" />

  {/* Top Brand Bar */}
  <div className="relative border-b border-slate-700/50 px-6 py-8">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Trend<span className="text-amber-400">Aura</span>
        </h2>
        <p className="text-slate-500 text-xs mt-1 tracking-wide">Grow Your Skill</p>
      </div>
      {/* Decorative divider line */}
      <div className="hidden sm:flex items-center gap-2 flex-1 mx-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        <div className="w-1.5 h-1.5 rotate-45 bg-amber-400/40 flex-shrink-0" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
      </div>
      {/* Social Icons */}
      <div className="flex items-center gap-2">
        <button type="button" aria-label="GitHub" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/50 hover:border-amber-400/40 hover:bg-amber-400/10 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all duration-200 hover:-translate-y-0.5">
          <GitHub fontSize="small" />
        </button>
        <button type="button" aria-label="LinkedIn" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/50 hover:border-amber-400/40 hover:bg-amber-400/10 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all duration-200 hover:-translate-y-0.5">
          <LinkedIn fontSize="small" />
        </button>
        <button type="button" aria-label="YouTube" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/50 hover:border-amber-400/40 hover:bg-amber-400/10 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all duration-200 hover:-translate-y-0.5">
          <YouTube fontSize="small" />
        </button>
        <button type="button" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/50 hover:border-amber-400/40 hover:bg-amber-400/10 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all duration-200 hover:-translate-y-0.5">
          <Instagram fontSize="small" />
        </button>
      </div>
    </div>
  </div>

  {/* Main Footer Grid */}
  <div className="relative max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-10">

    {/* Section 1 — Contact */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 rounded-full bg-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-white">Contact Us</h3>
      </div>
      <div className="flex flex-col gap-3">
        <a
          href="tel:8487955559"
          className="group flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/40 hover:border-amber-400/30 hover:bg-slate-800 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
            <Phone fontSize="small" className="text-amber-400" style={{ fontSize: 16 }} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Phone</p>
            <p className="text-sm text-slate-300 group-hover:text-white transition-colors duration-150">8487955559</p>
          </div>
        </a>
        <a
          href="mailto:rajporiya81@gmail.com"
          className="group flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/40 hover:border-amber-400/30 hover:bg-slate-800 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
            <Email fontSize="small" className="text-amber-400" style={{ fontSize: 16 }} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Email</p>
            <p className="text-sm text-slate-300 group-hover:text-white transition-colors duration-150 break-all">rajporiya81@gmail.com</p>
          </div>
        </a>
      </div>
    </div>

    {/* Section 2 — Follow */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 rounded-full bg-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-white">Follow Me</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: <GitHub fontSize="small" />, label: "GitHub" },
          { icon: <LinkedIn fontSize="small" />, label: "LinkedIn" },
          { icon: <YouTube fontSize="small" />, label: "YouTube" },
          { icon: <Instagram fontSize="small" />, label: "Instagram" },
        ].map(({ icon, label }) => (
          <button
            type="button"
            aria-label={label}
            key={label}
            className="group flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40 hover:border-amber-400/30 hover:bg-amber-400/10 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span className="text-slate-400 group-hover:text-amber-400 transition-colors duration-150">{icon}</span>
            <span className="text-xs font-medium text-slate-400 group-hover:text-amber-300 transition-colors duration-150">{label}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Section 3 — About */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 rounded-full bg-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-white">About</h3>
      </div>
      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
        <p className="text-slate-400 text-sm leading-relaxed">
          TrendAura is your go-to platform to discover trending products and grow your skills in style.
        </p>
        <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs text-amber-400/70 font-medium">Grow Your Skill</span>
        </div>
      </div>
    </div>

  </div>

  {/* Footer Bottom */}
  <div className="relative border-t border-slate-700/50 px-6 py-4">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
      <p className="text-xs text-slate-500">
        &copy; {new Date().getFullYear()} <span className="text-amber-400/70">TrendAura</span> — All Rights Reserved
      </p>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/40" />
        <span className="text-xs text-slate-600">Made with passion</span>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/40" />
      </div>
    </div>
  </div>

</footer>

  )
}

export default Footer
