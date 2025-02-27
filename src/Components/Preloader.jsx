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
      
      const imagePromises = images.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            resolve(src); // Resolve anyway to prevent blocking
          };
        });
      });
      
      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
        })
        .catch(error => {
          console.error('Error preloading images:', error);
          setImagesLoaded(true); // Continue anyway
        });
    } else {
      setImagesLoaded(true);
    }

    // Fallback timer - hide loader after 6 seconds regardless
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [images]);

  useEffect(() => {
    if (imagesLoaded) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
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
              {/* Removed the text loading section that had "xdial" text */}
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Preloader;