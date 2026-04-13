import React from 'react'
import '../componentStyles/Footer.css'
import { Email, GitHub, Instagram, LinkedIn, Phone, YouTube } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{
      backgroundColor: "var(--background-light)",
      borderTop: "1px solid var(--border)",
    }}>

      {/* Background glow accents */}
      <div className="absolute bottom-0 left-1/4 w-96 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(245,158,11,0.05)" }} />
      <div className="absolute top-0 right-1/4 w-64 h-32 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: "rgba(245,158,11,0.03)" }} />

      {/* Top Brand Bar */}
      <div className="relative px-4 sm:px-6 py-6 sm:py-8" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Trend<span style={{ color: "#f59e0b" }}>Aura</span>
            </h2>
            <p className="text-xs mt-1 tracking-wide" style={{ color: "var(--text-light)" }}>Grow Your Skill</p>
          </div>

          {/* Decorative divider line */}
          <div className="hidden sm:flex items-center gap-2 flex-1 mx-10">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }} />
            <div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ backgroundColor: "rgba(245,158,11,0.4)" }} />
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }} />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {[
              { label: "GitHub", icon: <GitHub fontSize="small" /> },
              { label: "LinkedIn", icon: <LinkedIn fontSize="small" /> },
              { label: "YouTube", icon: <YouTube fontSize="small" /> },
              { label: "Instagram", icon: <Instagram fontSize="small" /> },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text-light)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)";
                  e.currentTarget.style.backgroundColor = "rgba(245,158,11,0.1)";
                  e.currentTarget.style.color = "#f59e0b";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.backgroundColor = "var(--card-bg)";
                  e.currentTarget.style.color = "var(--text-light)";
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">

        {/* Section 1 — Contact */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>Contact Us</h3>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="tel:8487955559"
              className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
              style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border)" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)";
                e.currentTarget.style.backgroundColor = "var(--background)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.backgroundColor = "var(--card-bg)";
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <Phone style={{ fontSize: 16, color: "#f59e0b" }} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-light)" }}>Phone</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>8487955559</p>
              </div>
            </a>
            <a
              href="mailto:rajporiya81@gmail.com"
              className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
              style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border)" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)";
                e.currentTarget.style.backgroundColor = "var(--background)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.backgroundColor = "var(--card-bg)";
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <Email style={{ fontSize: 16, color: "#f59e0b" }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-light)" }}>Email</p>
                <p className="text-sm break-all" style={{ color: "var(--text-secondary)" }}>rajporiya81@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        {/* Section 2 — Follow */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>Follow Me</h3>
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
                className="group flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)";
                  e.currentTarget.style.backgroundColor = "rgba(245,158,11,0.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.backgroundColor = "var(--card-bg)";
                }}
              >
                <span style={{ color: "var(--text-light)" }}>{icon}</span>
                <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3 — About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>About</h3>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              TrendAura is your go-to platform to discover trending products and grow your skills in style.
            </p>
            <div className="mt-4 pt-4 flex items-center gap-2" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#f59e0b" }} />
              <span className="text-xs font-medium" style={{ color: "rgba(245,158,11,0.7)" }}>Grow Your Skill</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="relative px-4 sm:px-6 py-4" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs" style={{ color: "var(--text-light)" }}>
            &copy; {new Date().getFullYear()} <span style={{ color: "rgba(245,158,11,0.7)" }}>TrendAura</span> — All Rights Reserved
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(245,158,11,0.4)" }} />
            <span className="text-xs" style={{ color: "var(--text-light)" }}>Made with passion</span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(245,158,11,0.4)" }} />
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer