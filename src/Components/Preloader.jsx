import React, { useState, useEffect } from 'react';
import '../assets/css/Preloader.css';
const Preloader = ({ images, children }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload images
    if (images && images.length > 0) {
      let loadedCount = 0;
      const totalImages = images.length;
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
      });
    } else {
      setImagesLoaded(true);
    }

    // Fallback timer - hide loader after 3.5 seconds regardless
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [images]);

  useEffect(() => {
    if (imagesLoaded) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [imagesLoaded]);

  // Prevent body scrolling when loader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
       {loading && (
        <div className="loader-wrap">
          <div className="preloader">
            <div className="preloader-close" onClick={() => setLoading(false)}>
              <span>×</span>
            </div>
            <div className="animation-preloader">
              <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
              </div>
              <div className="txt-loading">
                {['x', 'd', 'i', 'a', 'l'].map((letter, index) => (
                  <span 
                    key={index}
                    className="letters-loading"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        {children}
      </div>
    </>
  );
};

export default Preloader;