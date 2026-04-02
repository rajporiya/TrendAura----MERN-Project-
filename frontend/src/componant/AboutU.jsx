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
    name: "Aryan Mehta",
    role: "Founder & CEO",
    img: "https://api.dicebear.com/7.x/adventurer/svg?seed=aryan&backgroundColor=b6e3f4",
    bio: "Visionary behind TrendAura. Passionate about democratising fashion for everyone.",
  },
  {
    name: "Sana Kapoor",
    role: "Head of Design",
    img: "https://api.dicebear.com/7.x/adventurer/svg?seed=sana&backgroundColor=ffd5dc",
    bio: "Crafts every pixel with intention. Lover of bold palettes and clean whitespace.",
  },
  {
    name: "Dev Patel",
    role: "Lead Engineer",
    img: "https://api.dicebear.com/7.x/adventurer/svg?seed=dev&backgroundColor=c0aede",
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
      className="flex flex-col items-center gap-1 px-6 py-5 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-4xl font-black text-amber-400 tracking-tight tabular-nums">{v}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</span>
    </div>
  );
}

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-900 text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

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
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        .glow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f59e0b;
          box-shadow: 0 0 8px 2px rgba(245,158,11,0.6);
          display: inline-block;
        }
      `}</style>
      {/* Mavbar */}<Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-24 overflow-hidden grain">

        {/* ambient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-400/8 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

          {/* eyebrow */}
          <div className="fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ animationDelay: "0ms" }}>
            <span className="glow-dot" />
            Our Story
          </div>

          <h1
            className="playfair fade-up text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.08] mb-6"
            style={{ animationDelay: "120ms" }}
          >
            Style is not a&nbsp;
            <span className="shimmer-text">luxury.</span>
            <br />
            It's a language.
          </h1>

          <p
            className="fade-up text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ animationDelay: "220ms" }}
          >
            TrendAura was born from a single belief — that everyone deserves access to
            fashion that feels <em className="text-slate-300 not-italic font-medium">intentional</em>.
            We bridge the gap between cutting-edge trends and everyday wardrobes.
          </p>

          <div className="fade-up flex flex-wrap justify-center gap-3" style={{ animationDelay: "320ms" }}>
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-amber-400 text-slate-900 text-sm font-bold hover:bg-amber-300 transition-colors duration-200 shadow-lg shadow-amber-400/20"
            >
              Shop the Collection
            </Link>
            <Link
              to="/contact-us"
              className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:border-amber-400/50 hover:text-white transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      {/* ── STATS ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* visual block */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden flex items-center justify-center relative">
              {/* decorative grid */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              {/* big letter */}
              <span className="playfair text-[180px] font-black text-amber-400/10 leading-none select-none">T</span>
              {/* floating badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-5 py-4">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1 font-semibold">Our Mission</p>
                <p className="text-white text-sm font-medium leading-relaxed">
                  To make trend-forward fashion radically accessible — one curated piece at a time.
                </p>
              </div>
            </div>
            {/* accent dot */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-amber-400/15 border border-amber-400/20 flex items-center justify-center text-amber-400 text-2xl">
              ✦
            </div>
          </div>

          {/* text */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <span className="glow-dot" /> Who We Are
            </div>
            <h2 className="playfair text-4xl lg:text-5xl font-black leading-tight">
              Built by fashion lovers,<br />
              <span className="text-amber-400">for fashion lovers.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Founded in 2021, TrendAura started as a passion project in a small apartment.
              Three years and 50,000 happy customers later, we're one of India's fastest-growing
              fashion destinations — but we've never lost that boutique soul.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Every product on our platform is handpicked by our curation team. We don't chase
              algorithms — we chase <span className="text-white font-medium">genuine style</span>.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="flex flex-col">
                <span className="text-amber-400 text-2xl font-black">2021</span>
                <span className="text-slate-500 text-xs uppercase tracking-wider">Founded</span>
              </div>
              <div className="w-px bg-slate-700" />
              <div className="flex flex-col">
                <span className="text-amber-400 text-2xl font-black">India</span>
                <span className="text-slate-500 text-xs uppercase tracking-wider">Headquarters</span>
              </div>
              <div className="w-px bg-slate-700" />
              <div className="flex flex-col">
                <span className="text-amber-400 text-2xl font-black">28+</span>
                <span className="text-slate-500 text-xs uppercase tracking-wider">Brand Partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <span className="glow-dot" /> What We Stand For
            </div>
            <h2 className="playfair text-4xl lg:text-5xl font-black">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-hover relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm flex flex-col gap-4 overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 text-lg font-bold">
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
                {/* corner accent */}
                <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-amber-400/5 border border-amber-400/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <span className="glow-dot" /> The Faces Behind TrendAura
            </div>
            <h2 className="playfair text-4xl lg:text-5xl font-black">Meet the Team</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((m) => (
              <div
                key={m.name}
                className="card-hover group relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm text-center flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400/30 bg-slate-700 group-hover:border-amber-400/60 transition-colors duration-300">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold">{m.name}</p>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mt-0.5">{m.role}</p>
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-800 to-slate-900 p-12 text-center grain">
            {/* blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400/8 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
                <span className="glow-dot" /> Ready to Elevate Your Style?
              </div>
              <h2 className="playfair text-4xl lg:text-5xl font-black leading-tight max-w-xl">
                Your next favourite outfit is one click away.
              </h2>
              <p className="text-slate-400 max-w-md">
                Browse thousands of curated pieces and discover what TrendAura means for your wardrobe.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/products"
                  className="px-8 py-3 rounded-xl bg-amber-400 text-slate-900 text-sm font-bold hover:bg-amber-300 transition-colors duration-200 shadow-lg shadow-amber-400/20"
                >
                  Explore Products
                </Link>
                <Link
                  to="/contact-us"
                  className="px-8 py-3 rounded-xl border border-slate-600 text-slate-300 text-sm font-medium hover:border-amber-400/50 hover:text-white transition-all duration-200"
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