import React, { useEffect, useState } from "react";
import "../componentStyles/ImageSlider.css";

const images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
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
    <div className="image-slider-container">
      <div className="slider-images" style={{
        transform:`translateX(-${currentIndex*100}%)`
        }}>
        {images.map((image, index) => (
          <div className="slider-item" key={index}>
            <img src={image} alt={`Slide ${index+1}`} />
          </div>
        ))}
      </div>

      <div className="slider-dots">
       { images.map((_,i)=>(
       <span className={`dot ${i === currentIndex? 'active' : ''}`} key={i}
       onClick={()=> setCurrentIndx(i)}
       ></span>))}
      </div>
    </div>
  );
}

export default ImageSlider;
