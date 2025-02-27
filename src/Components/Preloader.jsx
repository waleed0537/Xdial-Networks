import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/Preloader.css';

const Preloader = ({ images, children }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadedImagesCount = useRef(0);
  const totalImagesToLoad = useRef(0);

  useEffect(() => {
    // We don't use a fallback timer anymore - loader will stay until images load

    // Create function to preload a single image
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          loadedImagesCount.current += 1;
          console.log(`Loaded image ${loadedImagesCount.current}/${totalImagesToLoad.current}: ${src}`);
          resolve(src);
        };
        
        img.onerror = () => {
          loadedImagesCount.current += 1;
          console.warn(`Failed to load image ${loadedImagesCount.current}/${totalImagesToLoad.current}: ${src}`);
          // We still resolve to continue loading other images
          resolve(null);
        };
        
        // Set src after adding event handlers
        img.src = src;
      });
    };

    // Also preload background images with special attention to critical ones
    const preloadBackgroundImages = () => {
      return new Promise((resolve) => {
        // First, look for critical background images
        const criticalElements = document.querySelectorAll('[data-critical="true"]');
        const regularElements = document.querySelectorAll('[style*="background-image"]:not([data-critical="true"])');
        
        // Process all elements with backgrounds
        const allElements = [...criticalElements, ...regularElements];
        
        if (allElements.length === 0) {
          resolve();
          return;
        }
        
        // Extract background image URLs
        const bgImageUrls = [];
        allElements.forEach(el => {
          const style = window.getComputedStyle(el);
          const bgImage = style.backgroundImage;
          
          if (bgImage && bgImage !== 'none') {
            // Extract actual URL from the url("...") format
            const match = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
            if (match && match[1]) {
              // Check if this is a critical element
              const isCritical = el.getAttribute('data-critical') === 'true';
              
              // Add to list with priority flag
              bgImageUrls.push({
                url: match[1],
                critical: isCritical
              });
              
              console.log(`Found background image: ${match[1]} ${isCritical ? '(CRITICAL)' : ''}`);
            }
          }
        });
        
        // Update total images count
        totalImagesToLoad.current += bgImageUrls.length;
        
        // Sort critical images first
        bgImageUrls.sort((a, b) => {
          if (a.critical && !b.critical) return -1;
          if (!a.critical && b.critical) return 1;
          return 0;
        });
        
        // Preload all background images
        const bgImagePromises = bgImageUrls.map(item => preloadImage(item.url));
        
        Promise.all(bgImagePromises)
          .then(() => resolve())
          .catch(() => resolve()); // Continue even if there are errors
      });
    };
    
    // Function to check DOM images
    const preloadDOMImages = () => {
      return new Promise((resolve) => {
        // Get all DOM images
        const domImages = document.querySelectorAll('img');
        
        if (domImages.length === 0) {
          resolve();
          return;
        }
        
        // Convert NodeList to Array and extract src attributes
        const domImageUrls = Array.from(domImages).map(img => img.src).filter(src => src);
        
        // Update total images count
        totalImagesToLoad.current += domImageUrls.length;
        
        // Preload all DOM images
        const domImagePromises = domImageUrls.map(preloadImage);
        
        Promise.all(domImagePromises)
          .then(() => resolve())
          .catch(() => resolve()); // Continue even if there are errors
      });
    };

    // Main preload function
    const preloadAllImages = async () => {
      // First handle the images explicitly provided
      if (images && images.length > 0) {
        totalImagesToLoad.current = images.length;
        const imagePromises = images.map(preloadImage);
        
        await Promise.all(imagePromises);
      }
      
      // Add a small delay before checking for DOM/background images
      // This ensures the component has had time to render
      setTimeout(async () => {
        // Then handle background images and DOM images
        await Promise.all([
          preloadBackgroundImages(),
          preloadDOMImages()
        ]);
        
        // Finally set images as loaded
        console.log(`All ${loadedImagesCount.current} images loaded successfully`);
        setImagesLoaded(true);
      }, 500);
    };

    // Start the preloading process
    preloadAllImages();
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
            {/* Removed close button to prevent premature closing */}
            <div className="animation-preloader">
              <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
              </div>
              <div className="loading-progress">
                <span>Loading...</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Preloader;