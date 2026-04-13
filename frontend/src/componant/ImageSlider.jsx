import React, { useEffect, useState } from "react";
import "../componentStyles/ImageSlider.css";

const images = [
  "/images/1.jpeg",
  "/images/2.jpeg",
  "/images/3.jpeg",
  "/images/4.jpeg",
];
function ImageSlider() {
    const [currentIndex, setCurrentIndx]=useState(0)
    useEffect(()=>{
        const interval = setInterval(()=>{
            // value in currentIndex is now in preIndex
            setCurrentIndx((preIndex)=>(preIndex+1) % images.length) 
        }, 5000)
        return ()=>clearInterval(interval)
    },[])
  return (
   

<div className="mt-25 relative w-full overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl shadow-slate-900/50">

  {/* Slides */}
  <div
    className="flex transition-transform duration-500 ease-in-out"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {images.map((image, index) => (
      <div
        className="min-w-full relative"
        key={index}
      >
        <img
          src={image}
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Subtle amber overlay on bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
      </div>
    ))}
  </div>

  {/* Slide Counter Badge */}
  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 text-xs font-semibold text-slate-300">
    {currentIndex + 1} / {images.length}
  </div>

  {/* Dots */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
    {images.map((_, i) => (
      <span
        key={i}
        onClick={() => setCurrentIndx(i)}
        className={`cursor-pointer transition-all duration-300 rounded-full
          ${i === currentIndex
            ? "w-6 h-2 bg-amber-500 shadow-lg shadow-amber-500/40"
            : "w-2 h-2 bg-slate-500 hover:bg-slate-300"
          }`}
      />
    ))}
  </div>

</div>
  );
}

export default ImageSlider;
