import React, { useState, useEffect } from 'react';

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
        <div className="loader-wrap" style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          overflow: 'hidden'
        }}>
          <div className="preloader" style={{ overflow: 'hidden' }}>
            <div className="preloader-close" onClick={() => setLoading(false)}>close</div>
            <div id="handle-preloader" className="handle-preloader">
              <div className="animation-preloader">
                <div className="spinner"></div>
                <div className="txt-loading">
                  <span data-text-preloader="x" className="letters-loading">x</span>
                  <span data-text-preloader="d" className="letters-loading">d</span>
                  <span data-text-preloader="i" className="letters-loading">i</span>
                  <span data-text-preloader="a" className="letters-loading">a</span>
                  <span data-text-preloader="l" className="letters-loading">l</span>
                </div>
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