import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email Us",
    value: "rajporiya81@gmail.com",
    sub: "We reply within 24 hours",
    href: "mailto:rajporiya81@gmail.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Call Us",
    value: "+91 84879 55559",
    sub: "Mon–Sat, 10 AM – 7 PM IST",
    href: "tel:+919876543210",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Visit Us",
    value: "Rajkot, Gujarat",
    sub: "India — 360002",
    href: "https://maps.google.com/?q=Bhavnagar,Gujarat",
  },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–7 business days. Express delivery (1–2 days) is available at checkout for select pin codes.",
  },
  {
    q: "What is your return policy?",
    a: "We offer hassle-free returns within 7 days of delivery. Items must be unworn, unwashed, and with original tags.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship across India. International shipping is on our roadmap — stay tuned!",
  },
  {
    q: "How can I track my order?",
    a: "Once shipped, you'll receive a tracking link via email and SMS. You can also track from My Orders in your account.",
  },
];

const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl border transition-all duration-300 overflow-hidden"
      style={{
        borderColor: open ? "rgba(245,158,11,0.3)" : "var(--border)",
        backgroundColor: open ? "var(--card-bg)" : "var(--background-light)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left gap-4"
      >
        <span className="text-sm font-semibold transition-colors duration-200"
          style={{ color: open ? "#f59e0b" : "var(--text-primary)" }}>
          {q}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-300"
          style={{
            borderColor: open ? "rgba(245,158,11,0.4)" : "var(--border)",
            backgroundColor: open ? "rgba(245,158,11,0.1)" : "transparent",
            color: open ? "#f59e0b" : "var(--text-light)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="px-5 sm:px-6 pb-5 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{a}</p>
      </div>
    </div>
  );
}

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');
          .playfair { font-family: 'Playfair Display', serif; }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .fade-up { animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) both; }

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

          .contact-input {
            width: 100%;
            background: var(--background-light);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 12px 16px;
            color: var(--text-primary);
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
            font-family: 'DM Sans', sans-serif;
          }
          .contact-input::placeholder { color: var(--text-light); }
          .contact-input:focus {
            border-color: rgba(251,191,36,0.5);
            box-shadow: 0 0 0 3px rgba(251,191,36,0.08);
          }
          .contact-input option {
            background: var(--card-bg);
            color: var(--text-primary);
          }

          .card-hover {
            transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          }
          .card-hover:hover {
            transform: translateY(-3px);
            border-color: rgba(251,191,36,0.3);
            box-shadow: 0 16px 40px var(--shadow);
          }

          .glow-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: #f59e0b;
            box-shadow: 0 0 8px 2px rgba(245,158,11,0.6);
            display: inline-block;
          }

          @keyframes spin-slow { to { transform: rotate(360deg); } }
          .spin-slow { animation: spin-slow 12s linear infinite; }

          @keyframes pulse-ring {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50%       { transform: scale(1.12); opacity: 0.15; }
          }
          .pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }

          @keyframes checkPop {
            0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
            70%  { transform: scale(1.15) rotate(3deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .check-pop { animation: checkPop 0.5s cubic-bezier(.22,1,.36,1) both; }

          .grain::after {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
            pointer-events: none;
            border-radius: inherit;
          }
        `}</style>

        {/* ── HERO ── */}
        <section className="relative pt-28 pb-16 sm:pb-20 overflow-hidden grain">
          <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" style={{ backgroundColor: "rgba(245,158,11,0.08)" }} />
          <div className="absolute bottom-0 left-1/4 w-56 sm:w-72 h-56 sm:h-72 rounded-full blur-3xl translate-y-1/2 pointer-events-none" style={{ backgroundColor: "rgba(245,158,11,0.06)" }} />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <div className="fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest mb-6 sm:mb-8"
              style={{ backgroundColor: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.2)", color: "#f59e0b", animationDelay: "0ms" }}>
              <span className="glow-dot" />
              We're Here to Help
            </div>
            <h1 className="playfair fade-up text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] mb-4 sm:mb-5"
              style={{ animationDelay: "100ms" }}>
              Let's <span className="shimmer-text">Talk.</span>
            </h1>
            <p className="fade-up text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
              style={{ animationDelay: "200ms", color: "var(--text-secondary)" }}>
              Questions, feedback, or just want to say hi? We'd love to hear from you.
              Our team is always a message away.
            </p>
          </div>
        </section>

        {/* ── CONTACT CARDS ── */}
        <section className="pb-12 sm:pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contactInfo.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="card-hover group relative p-5 sm:p-6 rounded-2xl border backdrop-blur-sm flex flex-col gap-4 overflow-hidden no-underline"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)", animationDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200"
                  style={{ backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: "var(--text-light)" }}>{c.label}</p>
                  <p className="font-bold text-sm leading-snug" style={{ color: "var(--text-primary)" }}>{c.value}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-light)" }}>{c.sub}</p>
                </div>
                <div className="absolute -bottom-4 -right-4 w-14 h-14 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }} />
              </a>
            ))}
          </div>
        </section>

        {/* ── MAIN CONTENT: FORM + SIDEBAR ── */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">

            {/* ── FORM (3/5) ── */}
            <div className="lg:col-span-3">
              <div className="relative p-6 sm:p-8 rounded-3xl border backdrop-blur-sm overflow-hidden"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="absolute top-0 left-8 right-8 h-px"
                  style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.3), transparent)" }} />

                <div className="mb-6 sm:mb-7">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#f59e0b" }}>
                    <span className="glow-dot" /> Send a Message
                  </div>
                  <h2 className="playfair text-2xl sm:text-3xl font-black" style={{ color: "var(--text-primary)" }}>Drop us a line</h2>
                  <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Fill in the form and we'll get back to you within 24 hours.</p>
                </div>

                {status === "sent" ? (
                  <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-5 text-center">
                    <div className="check-pop w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="playfair text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>Message Sent!</p>
                      <p className="text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
                        Thanks for reaching out, <span className="font-medium" style={{ color: "var(--text-primary)" }}>{form.name}</span>. We'll be in touch shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => { setStatus(null); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-2 px-5 py-2 rounded-xl text-sm transition-all duration-200"
                      style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                          Your Name <span style={{ color: "#f59e0b" }}>*</span>
                        </label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Aryan Mehta" required className="contact-input" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                          Email <span style={{ color: "#f59e0b" }}>*</span>
                        </label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="aryan@email.com" required className="contact-input" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Subject</label>
                      <select
                        name="subject" value={form.subject} onChange={handleChange} className="contact-input"
                        style={{ appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' strokeWidth='2'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", backgroundSize: "16px" }}
                      >
                        <option value="">Select a topic…</option>
                        <option value="order">Order Issue</option>
                        <option value="return">Return / Refund</option>
                        <option value="product">Product Query</option>
                        <option value="partnership">Brand Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                        Message <span style={{ color: "#f59e0b" }}>*</span>
                      </label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us how we can help you…" required className="contact-input resize-none" />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="mt-1 w-full py-3.5 rounded-xl text-sm font-bold active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ backgroundColor: "#f59e0b", color: "#0f172a", boxShadow: "0 8px 24px rgba(245,158,11,0.2)" }}
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ── SIDEBAR (2/5) ── */}
            <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">

              {/* Business hours */}
              <div className="p-5 sm:p-6 rounded-2xl border backdrop-blur-sm"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Business Hours</p>
                    <p className="text-xs" style={{ color: "var(--text-light)" }}>IST (UTC +5:30)</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { day: "Mon – Fri", time: "10:00 AM – 7:00 PM", active: true },
                    { day: "Saturday", time: "11:00 AM – 5:00 PM", active: true },
                    { day: "Sunday", time: "Closed", active: false },
                  ].map((row) => (
                    <div key={row.day} className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{row.day}</span>
                      <span className="text-sm font-semibold" style={{ color: row.active ? "var(--text-primary)" : "var(--text-light)" }}>
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="p-5 sm:p-6 rounded-2xl border backdrop-blur-sm"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}>
                <p className="font-bold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Follow TrendAura</p>
                <div className="flex flex-col gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-150 group"
                      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                    >
                      <span>{s.icon}</span>
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{s.name}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ color: "#f59e0b" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick response badge */}
              <div className="relative p-5 rounded-2xl border overflow-hidden grain"
                style={{ borderColor: "rgba(245,158,11,0.2)", backgroundColor: "rgba(245,158,11,0.05)" }}>
                <div className="absolute top-3 right-3">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="pulse-ring absolute inset-0 rounded-full border" style={{ borderColor: "rgba(245,158,11,0.4)" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
                  </div>
                </div>
                <p className="font-bold text-sm mb-1" style={{ color: "#f59e0b" }}>Quick Response</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Our support team typically responds within <span className="font-semibold" style={{ color: "var(--text-primary)" }}>2–4 hours</span> during business hours.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#f59e0b" }}>
                <span className="glow-dot" /> Common Questions
              </div>
              <h2 className="playfair text-3xl sm:text-4xl font-black" style={{ color: "var(--text-primary)" }}>FAQ</h2>
            </div>
            <div className="flex flex-col gap-3">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
            <p className="text-center text-sm mt-8" style={{ color: "var(--text-light)" }}>
              Still have questions?{" "}
              <a href="mailto:hello@trendaura.in" className="font-semibold transition-colors duration-150" style={{ color: "#f59e0b" }}>
                Email us directly →
              </a>
            </p>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border p-8 sm:p-12 text-center grain"
              style={{ borderColor: "rgba(245,158,11,0.2)", backgroundColor: "var(--card-bg)" }}>
              <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ backgroundColor: "rgba(245,158,11,0.07)" }} />
              <div className="absolute bottom-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" style={{ backgroundColor: "rgba(245,158,11,0.07)" }} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 rounded-full border border-dashed spin-slow pointer-events-none" style={{ borderColor: "rgba(245,158,11,0.08)" }} />

              <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-5">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#f59e0b" }}>
                  <span className="glow-dot" /> Not sure where to start?
                </div>
                <h2 className="playfair text-2xl sm:text-3xl lg:text-4xl font-black max-w-lg leading-tight" style={{ color: "var(--text-primary)" }}>
                  Explore our collection while we get back to you.
                </h2>
                <div className="flex flex-wrap justify-center gap-3 pt-1">
                  <Link
                    to="/products"
                    className="px-6 sm:px-7 py-3 rounded-xl text-sm font-bold transition-colors duration-200"
                    style={{ backgroundColor: "#f59e0b", color: "#0f172a", boxShadow: "0 8px 24px rgba(245,158,11,0.2)" }}
                  >
                    Browse Products
                  </Link>
                  <Link
                    to="/about-us"
                    className="px-6 sm:px-7 py-3 rounded-xl border text-sm font-medium transition-all duration-200"
                    style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                  >
                    About TrendAura
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}