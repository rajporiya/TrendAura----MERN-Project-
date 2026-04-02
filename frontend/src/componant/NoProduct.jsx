import React from 'react'
import '../componentStyles/NoProducts.css'
function NoProduct({keyword}) {
  return (
// ✅ ONLY UI CHANGED — all logic, state, handlers are identical to your original

<div className="flex items-center justify-center px-4 py-20">
  <div className="flex flex-col items-center gap-5 text-center max-w-sm">

    {/* Icon Box */}
    <div className="w-20 h-20 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shadow-lg shadow-amber-400/10">
      <svg className="w-9 h-9 text-amber-400/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803zM13.5 10.5h-6" />
      </svg>
    </div>

    {/* Text */}
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold text-white tracking-tight">
        No Product Found
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">
        {keyword
          ? `We couldn't find any product matching "${keyword}"`
          : "No products are available at the moment."}
      </p>
    </div>

    {/* Decorative divider */}
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-px bg-slate-700/50" />
      <div className="w-1.5 h-1.5 rotate-45 bg-amber-400/30 flex-shrink-0" />
      <div className="flex-1 h-px bg-slate-700/50" />
    </div>

    {/* Hint */}
    <p className="text-xs text-slate-500">
      Try searching with a different keyword or browse all products.
    </p>

  </div>
</div>
  )
}   
export default NoProduct
