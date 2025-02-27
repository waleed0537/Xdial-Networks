import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '../assets/css/font-awesome-all.css';
import '../assets/css/flaticon.css';
import '../assets/css/owl.css';
import '../assets/css/bootstrap.css';
import '../assets/css/jquery.fancybox.min.css';
import '../assets/css/animate.css';
import '../assets/css/aos.css';
import '../assets/css/nice-select.css';
import '../assets/css/elpath.css';
import '../assets/css/color2.css';
import '../assets/css/rtl.css';
import '../assets/css/style.css';
import '../assets/css/module-css/banner.css';
import '../assets/css/module-css/clients.css';
import '../assets/css/module-css/feature.css';
import '../assets/css/module-css/integrations.css';
import '../assets/css/module-css/working.css';
import '../assets/css/module-css/pricing.css';
import '../assets/css/module-css/testimonial.css';
import '../assets/css/module-css/cta.css';
import '../assets/css/responsive.css';
// Import our new preloader CSS
import '../assets/css/Preloader.css';

// Logo imports
import logo from '../assets/images/logo.png'
import { Typewriter } from 'react-simple-typewriter';

// Favicon import
import favicon3 from '../assets/images/favicon-3.ico';

// Shape imports
import shape13 from '../assets/images/shape/shape-13.png';
import shape24 from '../assets/images/shape/shape-24.png';
import shape25 from '../assets/images/shape/shape-25.png';
import shape26 from '../assets/images/shape/shape-26.png';
import shape36 from '../assets/images/shape/shape-36.png';
import shape37 from '../assets/images/shape/shape-37.png';
import shape38 from '../assets/images/shape/shape-38.png';
import shape45 from '../assets/images/shape/shape-45.png';
import shape54 from '../assets/images/shape/shape-54.png';
import shape55 from '../assets/images/shape/shape-55.png';
import shape56 from '../assets/images/shape/shape-56.png';
import shape57 from '../assets/images/shape/shape-57.png';
import shape58 from '../assets/images/shape/shape-58.png';
import shape59 from '../assets/images/shape/shape-59.png';
import shape60 from '../assets/images/shape/shape-60.png';
import shape61 from '../assets/images/shape/shape-61.png';
import shape62 from '../assets/images/shape/shape-62.png';
import shape63 from '../assets/images/shape/shape-63.png';
import shape66 from '../assets/images/shape/shape-66.png';

// Client logo imports
import client29 from '../assets/images/clients/clients-29.png';
import client30 from '../assets/images/clients/clients-30.png';
import client31 from '../assets/images/clients/clients-31.png';
import client32 from '../assets/images/clients/clients-32.png';
import client33 from '../assets/images/clients/clients-33.png';

// Icon imports
import icon10 from '../assets/images/icons/icon-10.png';
import icon11 from '../assets/images/icons/icon-11.png';
import icon12 from '../assets/images/icons/icon-12.png';
import icon13 from '../assets/images/icons/icon-13.png';
import icon14 from '../assets/images/icons/icon-14.png';
import icon15 from '../assets/images/icons/icon-15.png';
import icon16 from '../assets/images/icons/icon-16.png';
import icon17 from '../assets/images/icons/icon-17.png';

// Resource imports
import video2 from '../assets/images/resource/video-2.jpg';
import dashboard8 from '../assets/images/resource/dashboard-8.jpg';
import testimonial5 from '../assets/images/resource/testimonial-5.png';
import testimonial6 from '../assets/images/resource/testimonial-6.png';
import testimonial7 from '../assets/images/resource/testimonial-7.png';
import { Link } from 'react-router-dom';
import ServicesCard from './ServicesCard';
import ServicesComparison from './ServicesComparison'
import { Shield, Wallet, Users } from 'lucide-react'; // Import icons
import AITopFeatures from './AITopFeatures';
import AutoDialerService from './AutoDialerService';
import MainIntro from './MainIntro';
import MobileNavigation from './MobileNavigation';
import Preloader from './Preloader';

const SensaiTemplate = () => {
  // Define all images to preload
  const preloadImages = [
    // Banner and pattern layers
    shape54, shape55, shape56, shape57, shape58, shape59, shape60, 
    shape61, shape62, shape63, shape66, 
    
    // Working section shapes
    shape13, shape36, shape37, shape38, 
    
    // Testimonial and CTA shapes
    shape45, shape24, shape25, shape26, 
    
    // Resource images
    video2, dashboard8,
    
    // Client logos
    client29, client30, client31, client32, client33,
    
    // Icon images
    icon10, icon11, icon12, icon13, icon14, icon15, icon16, icon17,
    
    // Testimonial images
    testimonial5, testimonial6, testimonial7,
    
    // Logo
    logo
  ];

  useEffect(() => {
    const duplicateSliderContent = () => {
      const lists = document.querySelectorAll('.list-item');
      lists.forEach(list => {
        const items = Array.from(list.children);
        const itemsToAdd = items.map(item => item.cloneNode(true));
        itemsToAdd.forEach(item => list.appendChild(item));
      });
    };

    // Run this after component mounts and DOM is ready
    const timer = setTimeout(() => {
      duplicateSliderContent();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Load external scripts after component mounts
    const scripts = [
      '../assets/js/jquery.js',
      '../assets/js/bootstrap.min.js',
      '../assets/js/owl.js',
      '../assets/js/wow.js',
      '../assets/js/jquery.fancybox.js',
      '../assets/js/appear.js',
      '../assets/js/isotope.js',
      '../assets/js/jquery.nice-select.min.js',
      '../assets/js/aos.js',
      '../assets/js/plugins.js',
      '../assets/js/text_animation.js',
      '../assets/js/text_plugins.js',
      '../assets/js/script.js'
    ];

    const loadedScripts = [];

    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      loadedScripts.push(script);
    });

    // Cleanup function to remove scripts when component unmounts
    return () => {
      loadedScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  const ServicesSection = () => {
    return (
      <section className="services-section" style={{
        padding: '80px 0',
      }}>
        <div className="auto-container">
          <div className="sec-title mb_55 centred">
            <span className="sub-title">Our Services</span>
            <h2>What We Offer</h2>
          </div>
          <ServicesCard />
        </div>
      </section>
    );
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <title>XDial Networks</title>

          {/* Fav Icon */}
          <link rel="icon" href="../assets/images/favicon-3.ico" type="image/x-icon" />

          {/* Google Fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </Helmet>
      </HelmetProvider>
      
      {/* Use the improved preloader with all images to preload */}
      <Preloader images={preloadImages}>
        <div className="dark-home dark-color-2 ltr" style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          width: '100%',
          position: 'relative' 
        }}>
          {/* Search Popup */}
          <div id="search-popup" className="search-popup">
            <div className="popup-inner">
              <div className="upper-box clearfix">
                <figure className="logo-box pull-left"><a href="index.html"><img src="" alt="" /></a></figure>
                <div className="close-search pull-right"><span className="icon-44"></span></div>
              </div>
              <div className="overlay-layer"></div>
              <div className="auto-container">
                <div className="search-form">
                  <form method="post" action="index.html">
                    <div className="form-group">
                      <fieldset>
                        <input type="search" className="form-control" name="search-input" value="" placeholder="Type your keyword and hit" required />
                        <button type="submit"><i className="icon-1"></i></button>
                      </fieldset>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <header className="main-header header-style-seven">
            {/* Header Lower */}
            <div className="header-lower">
              <div className="auto-container">
                <div className="outer-box">
                  <div className="logo-box">
                    <figure className="logo"><a href="index.html"><img src={logo} alt="" style={{ paddingTop:"22px" }}/></a></figure>
                  </div>
                  <div className="menu-area">
                    {/* Mobile Navigation Toggler */}
                    <MobileNavigation logo={logo} />
                    <nav className="main-menu navbar-expand-md navbar-light clearfix">
                      <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                        <ul className="navigation clearfix">
                          <li className="current dropdown"><a href="/">Home</a>
                            <ul>
                              <li><a href="/">Image Generate</a></li>
                              <li><a href="/">Image Generator Dark</a></li>
                              <li><a href="/">AI Writer</a></li>
                              <li><a href="/">AI Audio</a></li>
                              <li><a href="/">AI Video</a></li>
                              <li><a href="/">AI Chatbot</a></li>
                              <li><a href="/">AI SAAS</a></li>
                            </ul>
                          </li>
                          <li><a href="about.html">About</a></li>
                          <li className="dropdown"><a href="#">Services</a>
                            <ul>
                              <li className="dropdown"><a href="#">Out Bound</a>
                                <ul>
                                  <li><Link to="/ai-bot-voip">AI Bot & VoIP</Link></li>
                                  <li><Link to="/auto-dialer-service">Auto Dialer</Link></li>
                                </ul>
                              </li>
                              <li className="dropdown"><a href="#">FAQ's</a>
                                <ul>
                                  <li><a href="faq.html">FAQ's One</a></li>
                                  <li><a href="faq-2.html">FAQ's Two</a></li>
                                </ul>
                              </li>
                              <li className="dropdown"><a href="#">Pricing</a>
                                <ul>
                                  <li><a href="pricing.html">Pricing One</a></li>
                                  <li><a href="pricing-2.html">Pricing Two</a></li>
                                </ul>
                              </li>
                              <li className="dropdown"><a href="#">Testimonials</a>
                                <ul>
                                  <li><a href="testimonial.html">Testimonials One</a></li>
                                  <li><a href="testimonial-2.html">Testimonials Two</a></li>
                                  <li><a href="testimonial-3.html">Testimonials Three</a></li>
                                </ul>
                              </li>
                              <li className="dropdown"><a href="#">Shop</a>
                                <ul>
                                  <li><a href="shop.html">Our Shop</a></li>
                                  <li><a href="shop-details.html">Shop Details</a></li>
                                  <li><a href="cart.html">Cart</a></li>
                                  <li><a href="checkout.html">Checkout</a></li>
                                </ul>
                              </li>
                              <li><a href="team.html">Our Team</a></li>
                              <li><a href="error.html">404</a></li>
                            </ul>
                          </li>
                          <li className="dropdown"><a href="#">News</a>
                            <ul>
                              <li><a href="blog.html">Blog Grid</a></li>
                              <li><a href="blog-2.html">Blog Standard</a></li>
                              <li><a href="blog-details.html">Blog Details</a></li>
                            </ul>
                          </li>
                          <li><Link to="/contact-form" className="nav-link">Contact Form</Link></li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                  <div className="menu-right-content">
                    <div className="search-box-outer search-toggler mr_30"><i className="icon-1"></i></div>
                    <div className="btn-box"><a href="index.html" className="theme-btn btn-one">Account</a></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Header */}
            <div className="sticky-header">
              <div className="auto-container">
                <div className="outer-box">
                  <div className="logo-box">
                    <figure className="logo"><a href="index.html"><img src={logo} alt="" /></a></figure>
                  </div>
                  <div className="menu-area">
                    <nav className="main-menu clearfix">
                    </nav>
                  </div>
                  <div className="menu-right-content">
                    <div className="search-box-outer search-toggler mr_30"><i className="icon-1"></i></div>
                    <div className="btn-box"><a href="index.html" className="theme-btn btn-one">Account</a></div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Banner Style Seven */}
          <section className="banner-style-seven centred" style={{ minHeight: 'calc(100vh - 120px)' }}>
            <div className="pattern-layer" style={{ backgroundImage: `url(${shape54})` }}></div>
            <div className="auto-container">
              <div className="inner-box">
                <div className="content-box mb_110">
                  <h2>The new Decade of <br />
                    <Typewriter
                      words={['AI Technology', 'AI Technology', 'AI Technology']}
                      loop={true}
                      cursor
                      cursorStyle='|'
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={3000}
                    />
                  </h2>
                  <p>Innovative AI solutions</p>
                  <a href="index-7.html" className="theme-btn btn-one">Try XDial For Free</a>
                </div>
              </div>
            </div>
          </section>
          
          {/* Rest of your components */}
          <MainIntro />
          <AITopFeatures />
          <ServicesSection />
          <ServicesComparison />


        {/* Integrations Style Five */}
        <section className="integrations-style-five">
          <div className="pattern-layer" style={{ backgroundImage: `url(${shape58})` }}></div>
          <div className="outer-container">
            <ul className="list-item mb_25">
              <li>
                <div className="icon"><img src={icon10} alt="" /></div>
                <h4>New Intuitive Editor</h4>
              </li>
              <li>
                <div className="icon"><img src={icon11} alt="" /></div>
                <h4>Follow up Emails</h4>
              </li>
              <li>
                <div className="icon"><img src={icon12} alt="" /></div>
                <h4>Image Generate</h4>
              </li>
              <li>
                <div className="icon"><img src={icon13} alt="" /></div>
                <h4>Voice Changing</h4>
              </li>
              <li>
                <div className="icon"><img src={icon14} alt="" /></div>
                <h4>Store Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon15} alt="" /></div>
                <h4>Business Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon10} alt="" /></div>
                <h4>New Intuitive Editor</h4>
              </li>
              <li>
                <div className="icon"><img src={icon11} alt="" /></div>
                <h4>Follow up Emails</h4>
              </li>
              <li>
                <div className="icon"><img src={icon12} alt="" /></div>
                <h4>Image Generate</h4>
              </li>
              <li>
                <div className="icon"><img src={icon13} alt="" /></div>
                <h4>Voice Changing</h4>
              </li>
              <li>
                <div className="icon"><img src={icon14} alt="" /></div>
                <h4>Store Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon15} alt="" /></div>
                <h4>Business Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon10} alt="" /></div>
                <h4>New Intuitive Editor</h4>
              </li>
              <li>
                <div className="icon"><img src={icon11} alt="" /></div>
                <h4>Follow up Emails</h4>
              </li>
              <li>
                <div className="icon"><img src={icon12} alt="" /></div>
                <h4>Image Generate</h4>
              </li>
              <li>
                <div className="icon"><img src={icon13} alt="" /></div>
                <h4>Voice Changing</h4>
              </li>
              <li>
                <div className="icon"><img src={icon14} alt="" /></div>
                <h4>Store Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon15} alt="" /></div>
                <h4>Business Management</h4>
              </li>
            </ul>
            <ul className="list-item">
              <li>
                <div className="icon"><img src={icon12} alt="" /></div>
                <h4>Image Generate</h4>
              </li>
              <li>
                <div className="icon"><img src={icon13} alt="" /></div>
                <h4>Voice Changing</h4>
              </li>
              <li>
                <div className="icon"><img src={icon14} alt="" /></div>
                <h4>Store Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon15} alt="" /></div>
                <h4>Business Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon16} alt="" /></div>
                <h4>Content Creating</h4>
              </li>
              <li>
                <div className="icon"><img src={icon17} alt="" /></div>
                <h4>Data Analytics</h4>
              </li>
              <li>
                <div className="icon"><img src={icon12} alt="" /></div>
                <h4>Image Generate</h4>
              </li>
              <li>
                <div className="icon"><img src={icon13} alt="" /></div>
                <h4>Voice Changing</h4>
              </li>
              <li>
                <div className="icon"><img src={icon14} alt="" /></div>
                <h4>Store Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon15} alt="" /></div>
                <h4>Business Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon16} alt="" /></div>
                <h4>Content Creating</h4>
              </li>
              <li>
                <div className="icon"><img src={icon17} alt="" /></div>
                <h4>Data Analytics</h4>
              </li>
              <li>
                <div className="icon"><img src={icon12} alt="" /></div>
                <h4>Image Generate</h4>
              </li>
              <li>
                <div className="icon"><img src={icon13} alt="" /></div>
                <h4>Voice Changing</h4>
              </li>
              <li>
                <div className="icon"><img src={icon14} alt="" /></div>
                <h4>Store Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon15} alt="" /></div>
                <h4>Business Management</h4>
              </li>
              <li>
                <div className="icon"><img src={icon16} alt="" /></div>
                <h4>Content Creating</h4>
              </li>
              <li>
                <div className="icon"><img src={icon17} alt="" /></div>
                <h4>Data Analytics</h4>
              </li>
            </ul>
          </div>
        </section>

        {/* Working Style Three */}
        <section className="working-style-three centred pb_120">
          <div className="pattern-layer-2" style={{ backgroundImage: `url(${shape56})` }}></div>
          <div className="auto-container">
            <div className="sec-title mb_55">
              <span className="sub-title">How it Works</span>
              <h2>Easy Process to Work</h2>
            </div>
            <div className="upper-box mb_50 p_relative">
              <div className="image-shape">
                <div className="shape-1" style={{ backgroundImage: `url(${shape36})` }}></div>
                <div className="shape-2 rotate-me" style={{ backgroundImage: `url(${shape37})` }}></div>
                <div className="shape-3 rotate-me" style={{ backgroundImage: `url(${shape38})` }}></div>
              </div>
              <div className="video-inner" style={{ backgroundImage: `url(${video2})` }}>
                <div className="video-btn">
                  <a href="https://www.youtube.com/watch?v=nfP5N9Yc72A&t=28s" className="lightbox-image video-btn" data-caption=""><i className="icon-15"></i></a>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-lg-4 col-md-6 col-sm-12 working-block">
                <div className="working-block-two">
                  <div className="inner-box">
                    <div className="shape" style={{ backgroundImage: `url(${shape13})` }}></div>
                    <div className="icon-box"><i className="icon-10"></i></div>
                    <h3>Step 1: Create Account</h3>
                    <p>Easily create your Zaplin account with one click and get 100 Million Tokens</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 working-block">
                <div className="working-block-two">
                  <div className="inner-box">
                    <div className="shape" style={{ backgroundImage: `url(${shape13})` }}></div>
                    <div className="icon-box"><i className="icon-11"></i></div>
                    <h3>Step 2: Type Contex</h3>
                    <p>Easily create your Zaplin account with one click and get 100 Million Tokens</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 working-block">
                <div className="working-block-two">
                  <div className="inner-box">
                    <div className="icon-box"><i className="icon-12"></i></div>
                    <h3>Step 3: Get Images</h3>
                    <p>Easily create your Zaplin account with one click and get 100 Million Tokens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Style Five */}
        <section className="feature-style-five">
          <div className="auto-container">
            <div className="inner-container pt_150 pb_150">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                  <div className="content_block_seven">
                    <div className="content-box mr_60">
                      <div className="sec-title mb_35">
                        <span className="sub-title">Top Feature</span>
                        <h2>Empowering companies stand the customer</h2>
                      </div>
                      <div className="inner-box">
                        <div className="row clearfix">
                          <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                            <div className="single-item mb_40">
                              <div className="icon-box"><i className="icon-25"></i></div>
                              <h3>Manage Content</h3>
                              <p>Dicta sunt explicabo. Nemo ipsu enim ipsam voluptatem quia</p>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                            <div className="single-item">
                              <div className="icon-box"><i className="icon-27"></i></div>
                              <h3>Coach Reps</h3>
                              <p>Dicta sunt explicabo. Nemo ipsu enim ipsam voluptatem quia</p>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                            <div className="single-item">
                              <div className="icon-box"><i className="icon-28"></i></div>
                              <h3>Connect Users</h3>
                              <p>Dicta sunt explicabo. Nemo ipsu enim ipsam voluptatem quia</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                  <div className="image-box ml_40">
                    <figure className="image"><img src={dashboard8} alt="" /></figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Style Two */}
        <section className="cta-style-two centred">
    <div className="pattern-layer-2" style={{ backgroundImage: `url(${shape59})` }}></div>
    <div className="auto-container">
        <div className="inner-container">
            <div className="pattern-layer" style={{ backgroundImage: `url(${shape57})` }}></div>
            <div className="sec-title light mb_25">
                <span className="sub-title-three">Get a Demo</span>
                <h2 style={{ position: 'relative', zIndex: 2, color: '#fff' }}>Turn conversations into <span>sales</span> <br />opportunities</h2>
            </div>
            <p style={{ position: 'relative', zIndex: 2, color: '#fff', margin: '15px 0' }}>Convert words into sales in mere seconds</p>
            <div className="btn-box">
                <a href="index-6.html" className="theme-btn btn-one mr_20">Schedule a Demo</a>
                <a href="index-6.html" className="theme-btn btn-two">Try Pro Version</a>
            </div>
        </div>
    </div>
</section>

        <section class="pricing-style-four pt_150 pb_120 centred">
          <div class="pattern-layer">
            <div class="pattern-1" style={{ backgroundImage: `url(${shape60})` }}></div>
            <div class="pattern-2" style={{ backgroundImage: `url(${shape61})` }}></div>
            <div class="pattern-3 float-bob-y" style={{ backgroundImage: `url(${shape62})` }}></div>
          </div>
          <div class="auto-container">
            <div class="sec-title mb_55">
              <span class="sub-title">Pricing Plans</span>
              <h2>Affordable Pricing</h2>
            </div>
            <div class="tabs-box">
              <div class="tab-btn-box p_relative mb_60">
                <ul class="tab-btns tab-buttons p_relative clearfix">
                  <li class="tab-btn active-btn" data-tab="#tab-1">Monthly</li>
                  <li class="tab-btn" data-tab="#tab-2">Yearly</li>
                </ul>
              </div>
              <div class="tabs-content">
                <div class="tab active-tab" id="tab-1">
                  <div class="row clearfix">
                    <div class="col-lg-3 col-md-6 col-sm-12 pricing-block">
                      <div class="pricing-block-two">
                        <div class="pricing-table">
                          <div class="table-header mb_40">
                            <h3>Personal Plan</h3>
                            <p>For bloggers, freelancers and businesses</p>
                            <h2>$35<span> /Month</span></h2>
                            <a href="index-3.html" class="theme-btn btn-three">Buy The Plan</a>
                          </div>
                          <div class="table-content">
                            <ul class="feature-list clearfix">
                              <li>Up to 10 Members</li>
                              <li>Unlimited Usage</li>
                              <li>Unlimited Drive Storage</li>
                              <li>Concierge Help Center</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pricing-block">
                      <div class="pricing-block-two active-block">
                        <div class="pricing-table">
                          <div class="table-header mb_40">
                            <h3>Business Plan</h3>
                            <p>For bloggers, freelancers and businesses</p>
                            <h2>$45<span> /Month</span></h2>
                            <a href="index-3.html" class="theme-btn btn-one">Buy The Plan</a>
                          </div>
                          <div class="table-content">
                            <ul class="feature-list clearfix">
                              <li>Up to 10 Members</li>
                              <li>Unlimited Usage</li>
                              <li>Unlimited Drive Storage</li>
                              <li>Concierge Help Center</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pricing-block">
                      <div class="pricing-block-two">
                        <div class="pricing-table">
                          <div class="table-header mb_40">
                            <h3>Professional Plan</h3>
                            <p>For bloggers, freelancers and businesses</p>
                            <h2>$55<span> /Month</span></h2>
                            <a href="index-3.html" class="theme-btn btn-three">Buy The Plan</a>
                          </div>
                          <div class="table-content">
                            <ul class="feature-list clearfix">
                              <li>Up to 10 Members</li>
                              <li>Unlimited Usage</li>
                              <li>Unlimited Drive Storage</li>
                              <li>Concierge Help Center</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pricing-block">
                      <div class="pricing-block-two">
                        <div class="pricing-table">
                          <div class="table-header mb_40">
                            <h3>Team Plan</h3>
                            <p>For bloggers, freelancers and businesses</p>
                            <h2>$65<span> /Month</span></h2>
                            <a href="index-3.html" class="theme-btn btn-three">Buy The Plan</a>
                          </div>
                          <div class="table-content">
                            <ul class="feature-list clearfix">
                              <li>Up to 10 Members</li>
                              <li>Unlimited Usage</li>
                              <li>Unlimited Drive Storage</li>
                              <li>Concierge Help Center</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab" id="tab-2">
                  <div class="row clearfix">
                    <div class="col-lg-3 col-md-6 col-sm-12 pricing-block">
                      <div class="pricing-block-two">
                        <div class="pricing-table">
                          <div class="table-header mb_40">
                            <h3>Personal Plan</h3>
                            <p>For bloggers, freelancers and businesses</p>
                            <h2>$135<span> /Month</span></h2>
                            <a href="index-3.html" class="theme-btn btn-three">Buy The Plan</a>
                          </div>
                          <div class="table-content">
                            <ul class="feature-list clearfix">
                              <li>Up to 10 Members</li>
                              <li>Unlimited Usage</li>
                              <li>Unlimited Drive Storage</li>
                              <li>Concierge Help Center</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pricing-block">
                      <div class="pricing-block-two active-block">
                        <div class="pricing-table">
                          <div class="table-header mb_40">
                            <h3>Business Plan</h3>
                            <p>For bloggers, freelancers and businesses</p>
                            <h2>$145<span> /Month</span></h2>
                            <a href="index-3.html" class="theme-btn btn-one">Buy The Plan</a>
                          </div>
                          <div class="table-content">
                            <ul class="feature-list clearfix">
                              <li>Up to 10 Members</li>
                              <li>Unlimited Usage</li>
                              <li>Unlimited Drive Storage</li>
                              <li>Concierge Help Center</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pricing-block">
                      <div class="pricing-block-two">
                        <div class="pricing-table">
                          <div class="table-header mb_40">
                            <h3>Professional Plan</h3>
                            <p>For bloggers, freelancers and businesses</p>
                            <h2>$155<span> /Month</span></h2>
                            <a href="index-3.html" class="theme-btn btn-three">Buy The Plan</a>
                          </div>
                          <div class="table-content">
                            <ul class="feature-list clearfix">
                              <li>Up to 10 Members</li>
                              <li>Unlimited Usage</li>
                              <li>Unlimited Drive Storage</li>
                              <li>Concierge Help Center</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pricing-block">
                      <div class="pricing-block-two">
                        <div class="pricing-table">
                          <div class="table-header mb_40">
                            <h3>Team Plan</h3>
                            <p>For bloggers, freelancers and businesses</p>
                            <h2>$165<span> /Month</span></h2>
                            <a href="index-3.html" class="theme-btn btn-three">Buy The Plan</a>
                          </div>
                          <div class="table-content">
                            <ul class="feature-list clearfix">
                              <li>Up to 10 Members</li>
                              <li>Unlimited Usage</li>
                              <li>Unlimited Drive Storage</li>
                              <li>Concierge Help Center</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonial Section */}
        <section className="testimonial-section centred pb_140">
          <div className="shape">
            <div className="shape-3" style={{ backgroundImage: `url(${shape45})` }}></div>
            <div className="shape-2" style={{ backgroundImage: `url(${shape63})` }}></div>
          </div>
          <div className="auto-container">
            <div className="sec-title mb_55">
              <span className="sub-title">Testimonials</span>
              <h2>Love from Users</h2>
            </div>
            <div className="three-item-carousel owl-carousel owl-theme owl-nav-none dots-style-one">
              <div className="testimonial-block-one">
                <div className="inner-box">
                  <figure className="thumb-box"><img src={testimonial5} alt="" /></figure>
                  <h4>Atalia Helena</h4>
                  <span className="designation">UI Designer</span>
                  <ul className="rating">
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                  </ul>
                  <p>"Fames gravid nulam lectus vivera placert utricies. Lorem ipsum dolor sit amet more vel turpis penabus. Fusce eleifend loremo suscipit teach or moeto"</p>
                </div>
              </div>
              <div className="testimonial-block-one">
                <div className="inner-box">
                  <figure className="thumb-box"><img src={testimonial6} alt="" /></figure>
                  <h4>William Brandon</h4>
                  <span className="designation">App Developer</span>
                  <ul className="rating">
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                  </ul>
                  <p>"Fames gravid nulam lectus vivera placert utricies. Lorem ipsum dolor sit amet more vel turpis penabus. Fusce eleifend loremo suscipit teach or moeto"</p>
                </div>
              </div>
              <div className="testimonial-block-one">
                <div className="inner-box">
                  <figure className="thumb-box"><img src={testimonial7} alt="" /></figure>
                  <h4>Daniel Macron</h4>
                  <span className="designation">App Developer</span>
                  <ul className="rating">
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                    <li><i className="icon-19"></i></li>
                  </ul>
                  <p>"Fames gravid nulam lectus vivera placert utricies. Lorem ipsum dolor sit amet more vel turpis penabus. Fusce eleifend loremo suscipit teach or moeto"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="auto-container">
            <div className="inner-container">
              <div className="pattern-layer">
                <div className="pattern-1" style={{ backgroundImage: `url(${shape66})` }}></div>
                <div className="pattern-2 rotate-me" style={{ backgroundImage: `url(${shape24})` }}></div>
                <div className="pattern-3 rotate-me" style={{ backgroundImage: `url(${shape25})` }}></div>
                <div className="pattern-4 rotate-me" style={{ backgroundImage: `url(${shape26})` }}></div>
              </div>
              <div className="inner-box">
                <h2>The #1 rated AI Audio software <br />on the planet</h2>
                <div className="btn-box">
                  <a href="index-4.html" className="theme-btn btn-two mr_20">Generate Now</a>
                  <a href="contact.html" className="theme-btn btn-one">Need Support</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Footer */}
        <footer className="main-footer">
          <div className="auto-container">
            <div className="widget-section">
              <div className="row clearfix">
                <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                  <div className="footer-widget logo-widget">
                    <figure className="footer-logo"><a href="index.html"><img src={logo} alt="" style={{paddingTop:"0px" ,height:"100px"}} /></a></figure>
                    <p>Combined with a handy platform and top-notch support from our in-house production team</p>
                    <ul className="social-links clearfix">
                      <li><a href="index.html"><i className="fa-brands fa-facebook"></i></a></li>
                      <li><a href="index.html"><i className="fa-brands fa-twitter"></i></a></li>
                      <li><a href="index.html"><i className="fa-brands fa-linkedin"></i></a></li>
                      <li><a href="index.html"><i className="fa-brands fa-dribbble"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                  <div className="footer-widget links-widget ml_60">
                    <div className="widget-title">
                      <h3>Resources</h3>
                    </div>
                    <div className="widget-content">
                      <ul className="links-list clearfix">
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="shop.html">Affiliates</a></li>
                        <li><a href="contact.html">Help</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                  <div className="footer-widget links-widget">
                    <div className="widget-title">
                      <h3>Primary Pages</h3>
                    </div>
                    <div className="widget-content">
                      <ul className="links-list clearfix">
                        <li><a href="index.html">Privacy</a></li>
                        <li><a href="index.html">Press</a></li>
                        <li><a href="index.html">Terms & Conditions</a></li>
                        <li><a href="index.html">Refund Policy</a></li>
                        <li><a href="index.html">Sitemap</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                  <div className="footer-widget subscribe-widget">
                    <div className="widget-title">
                      <h3>Subscribe Newsletter</h3>
                    </div>
                    <div className="widget-content">
                      <p>Combined with a handy platform and top-notch support from our in-house production team</p>
                      <div className="form-inner">
                        <form method="post" action="contact.html">
                          <div className="form-group">
                            <input type="email" name="email" placeholder="Email Address" required />
                            <button type="submit" className="theme-btn btn-one">Subscribe</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom centred">
            <div className="auto-container">
              <div className="copyright">
                <p>Copyright &copy; 2023 <a href="index.html">XDial</a>, Inc. All Rights Reserved</p>
              </div>
            </div>
          </div>
        </footer>

        {/* Scroll to top */}
        <div className="scroll-to-top">
          <div>
            <div className="scroll-top-inner">
              <div className="scroll-bar">
                <div className="bar-inner"></div>
              </div>
              <div className="scroll-bar-text">Go To Top</div>
            </div>
          </div>
        </div>

      </div>
      </Preloader>
    </>
  );
};

export default SensaiTemplate;
