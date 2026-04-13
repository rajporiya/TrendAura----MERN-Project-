import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "12K+", label: "Products Listed" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "4.9★", label: "Average Rating" },
];

const team = [
  {
    name: "Raj Poriya",
    role: "Founder & CEO",
    img: "https://img.freepik.com/premium-vector/boy-character-white-background_995281-5601.jpg?semt=ais_incoming&w=740&q=80",
    bio: "Visionary behind TrendAura. Passionate about democratising fashion for everyone.",
  },
  {
    name: "Jay Kacha",
    role: "Head of Design",
    img: "https://static.vecteezy.com/system/resources/thumbnails/024/183/502/small/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg",
    bio: "Crafts every pixel with intention. Lover of bold palettes and clean whitespace.",
  },
  {
    name: "Dhruv Moliya",
    role: "Lead Engineer",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiXytU5aIWpLg4Bi7jvcJiVhF8D0N3eFtq3w&s",
    bio: "Keeps the platform blazing-fast and the codebase elegant. Coffee-powered.",
  },
];

const values = [
  {
    icon: "✦",
    title: "Trend-First",
    desc: "We curate only what's current, relevant, and ahead of the curve — never stale, never generic.",
  },
  {
    icon: "◈",
    title: "Radical Transparency",
    desc: "Honest pricing, honest reviews. No dark patterns. What you see is what you get.",
  },
  {
    icon: "◉",
    title: "Community-Driven",
    desc: "Our customers shape our catalog. Real feedback fuels every decision we make.",
  },
  {
    icon: "⬡",
    title: "Sustainable Choices",
    desc: "We partner with brands that care about people and the planet as much as aesthetics.",
  },
];

/* ── tiny hook: animate counter on mount ── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(+(num * eased).toFixed(num % 1 !== 0 ? 1 : 0) + suffix);
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return count;
}

function StatCard({ value, label, delay }) {
  const v = useCountUp(value);
  return (
    <div
      className="flex flex-col items-center gap-1 px-4 sm:px-6 py-5 rounded-2xl border"
      style={{
        animationDelay: `${delay}ms`,
        borderColor: "var(--border)",
        backgroundColor: "var(--card-bg)",
      }}
    >
      <span className="text-3xl sm:text-4xl font-black tabular-nums" style={{ color: "var(--primary)" }}>{v}</span>
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-light)" }}>{label}</span>
    </div>
  );
}

export default function AboutUs() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google font injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');

        .playfair { font-family: 'Playfair Display', serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          border-radius: inherit;
        }

        .card-hover {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(251,191,36,0.35);
          box-shadow: 0 20px 50px var(--shadow);
        }

        .glow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f59e0b;
          box-shadow: 0 0 8px 2px rgba(245,158,11,0.6);
          display: inline-block;
        }

        .about-card {
          background-color: var(--card-bg);
          border-color: var(--border);
        }

        .about-divider {
          background-color: var(--border);
        }

        .about-muted {
          color: var(--text-secondary);
        }

        .about-light {
          color: var(--text-light);
        }
      `}</style>

      {/* Navbar */}
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 sm:pb-24 overflow-hidden grain">

        {/* ambient blobs */}
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" style={{ backgroundColor: "rgba(245,158,11,0.08)" }} />
        <div className="absolute bottom-0 right-1/4 w-56 sm:w-80 h-56 sm:h-80 rounded-full blur-3xl translate-y-1/3 pointer-events-none" style={{ backgroundColor: "rgba(245,158,11,0.06)" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">

          {/* eyebrow */}
          <div className="fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest mb-6 sm:mb-8"
            style={{ backgroundColor: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.2)", color: "#f59e0b", animationDelay: "0ms" }}>
            <span className="glow-dot" />
            Our Story
          </div>

          <h1
            className="playfair fade-up text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] mb-4 sm:mb-6"
            style={{ animationDelay: "120ms" }}
          >
            Style is not a&nbsp;
            <span className="shimmer-text">luxury.</span>
            <br />
            It's a language.
          </h1>

          <p
            className="fade-up text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 about-muted"
            style={{ animationDelay: "220ms" }}
          >
            TrendAura was born from a single belief — that everyone deserves access to
            fashion that feels <em style={{ color: "var(--text-primary)" }} className="not-italic font-medium">intentional</em>.
            We bridge the gap between cutting-edge trends and everyday wardrobes.
          </p>

          <div className="fade-up flex flex-wrap justify-center gap-3" style={{ animationDelay: "320ms" }}>
            <Link
              to="/products"
              className="px-5 sm:px-6 py-3 rounded-xl text-sm font-bold transition-colors duration-200 shadow-lg"
              style={{ backgroundColor: "#f59e0b", color: "#0f172a", boxShadow: "0 8px 24px rgba(245,158,11,0.2)" }}
            >
              Shop the Collection
            </Link>
            <Link
              to="/contact-us"
              className="px-5 sm:px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }} />
      </div>

      {/* ── STATS ── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">

          {/* visual block */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl border overflow-hidden flex items-center justify-center relative"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}>
              {/* decorative grid */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              {/* big letter */}
              <span className="playfair text-[120px] sm:text-[180px] font-black leading-none select-none" style={{ color: "rgba(245,158,11,0.1)" }}>T</span>
              {/* floating badge */}
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 backdrop-blur-sm border rounded-2xl px-4 sm:px-5 py-3 sm:py-4"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)", opacity: 0.95 }}>
                <p className="text-xs uppercase tracking-widest mb-1 font-semibold about-light" style={{ color: "var(--text-light)" }}>Our Mission</p>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-primary)" }}>
                  To make trend-forward fashion radically accessible — one curated piece at a time.
                </p>
              </div>
            </div>
            {/* accent dot */}
            <div className="absolute -top-4 -right-4 w-12 sm:w-16 h-12 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl"
              style={{ backgroundColor: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b" }}>
              ✦
            </div>
          </div>

          {/* text */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#f59e0b" }}>
              <span className="glow-dot" /> Who We Are
            </div>
            <h2 className="playfair text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              Built by fashion lovers,<br />
              <span style={{ color: "#f59e0b" }}>for fashion lovers.</span>
            </h2>
            <p className="leading-relaxed about-muted" style={{ color: "var(--text-secondary)" }}>
              Founded in 2021, TrendAura started as a passion project in a small apartment.
              Three years and 50,000 happy customers later, we're one of India's fastest-growing
              fashion destinations — but we've never lost that boutique soul.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Every product on our platform is handpicked by our curation team. We don't chase
              algorithms — we chase <span style={{ color: "var(--text-primary)" }} className="font-medium">genuine style</span>.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black" style={{ color: "#f59e0b" }}>2021</span>
                <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-light)" }}>Founded</span>
              </div>
              <div className="w-px" style={{ backgroundColor: "var(--border)" }} />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black" style={{ color: "#f59e0b" }}>India</span>
                <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-light)" }}>Headquarters</span>
              </div>
              <div className="w-px" style={{ backgroundColor: "var(--border)" }} />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black" style={{ color: "#f59e0b" }}>28+</span>
                <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-light)" }}>Brand Partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#f59e0b" }}>
              <span className="glow-dot" /> What We Stand For
            </div>
            <h2 className="playfair text-3xl sm:text-4xl lg:text-5xl font-black">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-hover relative p-5 sm:p-6 rounded-2xl border backdrop-blur-sm flex flex-col gap-4 overflow-hidden about-card"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{v.desc}</p>
                </div>
                {/* corner accent */}
                <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full"
                  style={{ backgroundColor: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#f59e0b" }}>
              <span className="glow-dot" /> The Faces Behind TrendAura
            </div>
            <h2 className="playfair text-3xl sm:text-4xl lg:text-5xl font-black">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-3xl mx-auto">
            {team.map((m) => (
              <div
                key={m.name}
                className="card-hover group relative p-5 sm:p-6 rounded-2xl border backdrop-blur-sm text-center flex flex-col items-center gap-4"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}
              >
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 bg-[var(--border)]"
                  style={{ borderColor: "rgba(245,158,11,0.3)" }}>
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold" style={{ color: "var(--text-primary)" }}>{m.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest mt-0.5" style={{ color: "#f59e0b" }}>{m.role}</p>
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border p-8 sm:p-12 text-center grain"
            style={{ borderColor: "rgba(245,158,11,0.2)", backgroundColor: "var(--card-bg)" }}>
            {/* blobs */}
            <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ backgroundColor: "rgba(245,158,11,0.07)" }} />
            <div className="absolute bottom-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" style={{ backgroundColor: "rgba(245,158,11,0.07)" }} />

            <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#f59e0b" }}>
                <span className="glow-dot" /> Ready to Elevate Your Style?
              </div>
              <h2 className="playfair text-3xl sm:text-4xl lg:text-5xl font-black leading-tight max-w-xl">
                Your next favourite outfit is one click away.
              </h2>
              <p className="max-w-md" style={{ color: "var(--text-secondary)" }}>
                Browse thousands of curated pieces and discover what TrendAura means for your wardrobe.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/products"
                  className="px-6 sm:px-8 py-3 rounded-xl text-sm font-bold transition-colors duration-200 shadow-lg"
                  style={{ backgroundColor: "#f59e0b", color: "#0f172a", boxShadow: "0 8px 24px rgba(245,158,11,0.2)" }}
                >
                  Explore Products
                </Link>
                <Link
                  to="/contact-us"
                  className="px-6 sm:px-8 py-3 rounded-xl border text-sm font-medium transition-all duration-200"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}