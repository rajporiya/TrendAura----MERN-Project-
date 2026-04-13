import React from 'react'
import '../componentStyles/Loader.css'
function Loader() {
  return (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm">
  <div className="flex flex-col items-center gap-5">

    {/* Spinner Ring */}
    <div className="relative w-16 h-16">
      {/* Outer amber ring */}
      <div className="absolute inset-0 rounded-full border-2 border-slate-700" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 border-r-amber-500/40 animate-spin" />
      {/* Inner pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-lg shadow-amber-500/60" />
      </div>
    </div>

    {/* Brand + dots */}
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-bold tracking-widest uppercase text-white">
        Trend<span className="text-amber-500">Aura</span>
      </p>
      {/* Bouncing dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-amber-500/60"
            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>

  </div>

  <style>{`
    @keyframes bounce {
      0%, 100% { transform: translateY(0);   opacity: 0.4; }
      50%       { transform: translateY(-6px); opacity: 1;   }
    }
  `}</style>
</div>
  )
}
export default Loader
