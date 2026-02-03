// // import { useState, useRef, useEffect } from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';

// // const HomeBody = () => {
// //   const [expandedCard, setExpandedCard] = useState(null);
// //   const cardsContainerRef = useRef(null);
// //   const images = [
// //     { src: '../images/banner/new/chart1.webp', alt: 'Card 1' },
// //     { src: '../images/banner/new/chart2.webp', alt: 'Card 2' },
// //     { src: '../images/banner/new/chart3.webp', alt: 'Card 3' },
// //     { src: '../images/banner/new/chart4.webp', alt: 'Card 4' },
// //     { src: '../images/banner/new/chart5.webp', alt: 'Card 5' },
// //     { src: '../images/banner/new/chart6.webp', alt: 'Card 6' },
// //   ];

// //   const handleCardClick = (index, e) => {
// //     e.stopPropagation();
// //     setExpandedCard(expandedCard === index ? null : index);
// //   };

// //   // Close card when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (cardsContainerRef.current && !cardsContainerRef.current.contains(event.target)) {
// //         setExpandedCard(null);
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, []);

// //   return (
// //     <div className="banner-center-content">
// //       <h1 className="banner-title">
// //         Powerful Cloud ERP for Manufacturing,<br />
// //         Trading & Project-Driven Businesses
// //       </h1>

// //       <p className="banner-subtitle">
// //         Streamline operations, gain real-time insights, and scale smarter with Tech Cloud ERP for<br/> industry ready workflows
// //       </p>

// //       <ul className="banner-subtitle-list">
// //         <li>End-to-end business control</li>
// //         <li>Industry specific modules</li>
// //         <li>Secure cloud hosting</li>
// //         <li>Scalable & customizable</li>
// //       </ul>

// //       <Link href="/demo" className="gradient-btn">
// //         Get an Industry Specific Demo
// //       </Link>

// //       <div className="banner-cards-container" ref={cardsContainerRef}>
// //         <div className="banner-cards-track">
// //           {[...images, ...images].map((img, i) => (
// //             <div
// //               key={i}
// //               className={`card-item ${expandedCard === i ? 'expanded' : ''}`}
// //               onClick={(e) => handleCardClick(i, e)}
// //               role="button"
// //               tabIndex={0}
// //               onKeyDown={(e) => {
// //                 if (e.key === 'Enter' || e.key === ' ') {
// //                   handleCardClick(i, e);
// //                 }
// //               }}
// //               aria-expanded={expandedCard === i}
// //               aria-label={`Card ${i % images.length + 1}, click to ${expandedCard === i ? 'collapse' : 'expand'}`}
// //             >
// //               <Image
// //                 src={img.src}
// //                 alt={img.alt}
// //                 width={300}
// //                 height={200}
// //                 className="card-image"
// //                 priority
// //               />
// //               <div className="card-overlay">
// //                 <h3>Card {i % images.length + 1}</h3>
// //                 <p>Click to {expandedCard === i ? 'collapse' : 'expand'}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomeBody;

// import { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const HomeBody = () => {
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [zoomedImage, setZoomedImage] = useState(null);
//   const [imagePosition, setImagePosition] = useState(null);
//   const cardsContainerRef = useRef(null);
//   const trackRef = useRef(null);
//   const images = [
//     { src: '../images/banner/new/chart1.webp', alt: 'Card 1' },
//     { src: '../images/banner/new/chart2.webp', alt: 'Card 2' },
//     { src: '../images/banner/new/chart3.webp', alt: 'Card 3' },
//     { src: '../images/banner/new/chart4.webp', alt: 'Card 4' },
//     { src: '../images/banner/new/chart5.webp', alt: 'Card 5' },
//     { src: '../images/banner/new/chart6.webp', alt: 'Card 6' },
//   ];

//   const handleCardClick = (index, e) => {
//     e.stopPropagation();
    
//     if (zoomedImage === index) {
//       // Close zoom
//       setZoomedImage(null);
//       setImagePosition(null);
//       if (trackRef.current) {
//         trackRef.current.classList.remove('paused');
//       }
//     } else {
//       // Get image position for zoom
//       const imgElement = e.currentTarget.querySelector('img');
//       const rect = imgElement.getBoundingClientRect();
      
//       setImagePosition({
//         top: rect.top,
//         left: rect.left,
//         width: rect.width,
//         height: rect.height
//       });
      
//       setZoomedImage(index);
//       if (trackRef.current) {
//         trackRef.current.classList.add('paused');
//       }
//     }
    
//     setExpandedCard(null);
//   };

//   // Close zoom when clicking overlay
//   const handleZoomOverlayClick = () => {
//     setZoomedImage(null);
//     setImagePosition(null);
//     if (trackRef.current) {
//       trackRef.current.classList.remove('paused');
//     }
//   };

//   // Close card when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (cardsContainerRef.current && !cardsContainerRef.current.contains(event.target)) {
//         setExpandedCard(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Handle zoom animation with requestAnimationFrame
//   useEffect(() => {
//     if (zoomedImage !== null && imagePosition) {
//       const zoomImg = document.querySelector('.zoom-img');
//       if (zoomImg) {
//         requestAnimationFrame(() => {
//           zoomImg.style.transform = 'scale(3)';
//         });
//       }
//     }
//   }, [zoomedImage, imagePosition]);

//   return (
//     <div className="banner-center-content">
//       <h1 className="banner-title">
//         Powerful Cloud ERP for Manufacturing,<br />
//         Trading & Project-Driven Businesses
//       </h1>

//       <p className="banner-subtitle">
//         Streamline operations, gain real-time insights, and scale smarter with Tech Cloud ERP for<br/> industry ready workflows
//       </p>

//       <ul className="banner-subtitle-list">
//         <li>End-to-end business control</li>
//         <li>Industry specific modules</li>
//         <li>Secure cloud hosting</li>
//         <li>Scalable & customizable</li>
//       </ul>

//       <Link href="/demo" className="gradient-btn">
//         Get an Industry Specific Demo
//       </Link>

//       <div className="banner-cards-container" ref={cardsContainerRef}>
//         <div className="banner-cards-track" ref={trackRef}>
//           {[...images, ...images].map((img, i) => (
//             <div
//               key={i}
//               className={`card-item ${expandedCard === i ? 'expanded' : ''}`}
//               onClick={(e) => handleCardClick(i, e)}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   handleCardClick(i, e);
//                 }
//               }}
//               aria-expanded={expandedCard === i}
//               aria-label={`Card ${i % images.length + 1}, click to ${expandedCard === i ? 'collapse' : 'expand'}`}
//             >
//               <Image
//                 src={img.src}
//                 alt={img.alt}
//                 width={300}
//                 height={200}
//                 className="card-image"
//                 priority
//               />
//               <div className="card-overlay">
//                 <h3>Card {i % images.length + 1}</h3>
//                 <p>Click to {expandedCard === i ? 'collapse' : 'expand'}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Zoom Overlay */}
//       {zoomedImage !== null && imagePosition && (
//         <div className="zoom-layer" onClick={handleZoomOverlayClick}>
//           {/* <img
//             src={images[zoomedImage % images.length].src}
//             alt={images[zoomedImage % images.length].alt}
//             className="zoom-img"
//             style={{
//               position: 'fixed',
//               top: `${imagePosition.top}px`,
//               left: `${imagePosition.left}px`,
//               width: `${imagePosition.width}px`,
//               height: `${imagePosition.height}px`,
//               transform: 'scale(1)',
//               transformOrigin: 'center center',
//               transition: 'transform 0.4s ease',
//               borderRadius: '14px',
//               boxShadow: '0 40px 90px rgba(0,0,0,0.6)',
//               zIndex: 10000,
//             }}
//           /> */}
//           <img
//   src={images[zoomedImage % images.length].src}
//   alt={images[zoomedImage % images.length].alt}
//   className={`zoom-img ${zoomedImage !== null ? 'zoomed' : ''}`}
//   style={{
//     position: 'fixed',
//     top: `${imagePosition.top}px`,
//     left: `${imagePosition.left}px`,
//     width: `${imagePosition.width}px`,
//     height: `${imagePosition.height}px`,
//     transform: 'scale(1)',
//     transformOrigin: 'center center',
//     transition: 'transform 0.4s ease',
//     borderRadius: '14px',
//     boxShadow: '0 40px 90px rgba(0,0,0,0.6)',
//     zIndex: 10000,
//   }}
// />
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomeBody;
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HomeBody = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [imagePosition, setImagePosition] = useState(null);
  const cardsContainerRef = useRef(null);
  const trackRef = useRef(null);
  const bannerRef = useRef(null); // Add banner section ref
  const images = [
    { src: '../images/banner/new/chart1.webp', alt: 'Card 1' },
    { src: '../images/banner/new/chart2.webp', alt: 'Card 2' },
    { src: '../images/banner/new/chart3.webp', alt: 'Card 3' },
    { src: '../images/banner/new/chart4.webp', alt: 'Card 4' },
    { src: '../images/banner/new/chart5.webp', alt: 'Card 5' },
    { src: '../images/banner/new/chart6.webp', alt: 'Card 6' },
  ];

  const handleCardClick = (index, e) => {
    e.stopPropagation();
    
    if (zoomedImage === index) {
      // Close zoom
      setZoomedImage(null);
      setImagePosition(null);
      if (trackRef.current) {
        trackRef.current.classList.remove('paused');
      }
    } else {
      // Get image position relative to banner section
      const imgElement = e.currentTarget.querySelector('img');
      const rect = imgElement.getBoundingClientRect();
      const bannerRect = bannerRef.current?.getBoundingClientRect();
      
      if (bannerRect) {
        setImagePosition({
          top: rect.top - bannerRect.top,
          left: rect.left - bannerRect.left,
          width: rect.width,
          height: rect.height
        });
      }
      
      setZoomedImage(index);
      if (trackRef.current) {
        trackRef.current.classList.add('paused');
      }
    }
    
    setExpandedCard(null);
  };

  // Close zoom when clicking overlay
  const handleZoomOverlayClick = () => {
    setZoomedImage(null);
    setImagePosition(null);
    if (trackRef.current) {
      trackRef.current.classList.remove('paused');
    }
  };

  // Scroll detection to close zoom when scrolling away from banner
  useEffect(() => {
    const handleScroll = () => {
      if (zoomedImage !== null && bannerRef.current) {
        const bannerRect = bannerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Close zoom if banner is less than 50% visible or scrolled past
        if (bannerRect.bottom < viewportHeight * 0.5 || bannerRect.top > viewportHeight * 0.5) {
          setZoomedImage(null);
          setImagePosition(null);
          if (trackRef.current) {
            trackRef.current.classList.remove('paused');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [zoomedImage]);

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardsContainerRef.current && !cardsContainerRef.current.contains(event.target)) {
        setExpandedCard(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle zoom animation with requestAnimationFrame
  useEffect(() => {
    if (zoomedImage !== null && imagePosition) {
      const zoomImg = document.querySelector('.zoom-img');
      if (zoomImg) {
        requestAnimationFrame(() => {
          zoomImg.style.transform = 'scale(2)';
        });
      }
    }
  }, [zoomedImage, imagePosition]);

  return (
    <div className="banner-center-content" ref={bannerRef}>
      <h1 className="banner-title">
        Powerful Cloud ERP for Manufacturing,<br />
        Trading & Project-Driven Businesses
      </h1>

      <p className="banner-subtitle">
        Streamline operations, gain real-time insights, and scale smarter with Tech Cloud ERP for<br/> industry ready workflows
      </p>

      <ul className="banner-subtitle-list">
        <li>End-to-end business control</li>
        <li>Industry specific modules</li>
        <li>Secure cloud hosting</li>
        <li>Scalable & customizable</li>
      </ul>

      <Link href="/demo" className="gradient-btn">
        Get an Industry Specific Demo
      </Link>

      <div className="banner-cards-container" ref={cardsContainerRef}>
        <div className="banner-cards-track" ref={trackRef}>
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className={`card-item ${expandedCard === i ? 'expanded' : ''}`}
              onClick={(e) => handleCardClick(i, e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(i, e);
                }
              }}
              aria-expanded={expandedCard === i}
              aria-label={`Card ${i % images.length + 1}, click to ${expandedCard === i ? 'collapse' : 'expand'}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={300}
                height={200}
                className="card-image"
                priority
              />
              <div className="card-overlay">
                <h3>Card {i % images.length + 1}</h3>
                <p>Click to {expandedCard === i ? 'collapse' : 'expand'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Overlay - Constrained within banner section */}
      {zoomedImage !== null && imagePosition && (
        <div className="zoom-layer" onClick={handleZoomOverlayClick}>
          <img
            src={images[zoomedImage % images.length].src}
            alt={images[zoomedImage % images.length].alt}
            className={`zoom-img ${zoomedImage !== null ? 'zoomed' : ''}`}
            style={{
              position: 'absolute', // Changed to absolute for banner containment
              top: `${imagePosition.top}px`,
              left: `${imagePosition.left}px`,
              width: `${imagePosition.width}px`,
              height: `${imagePosition.height}px`,
              transform: 'scale(1)',
              transformOrigin: 'center center',
              transition: 'transform 0.4s ease',
              borderRadius: '14px',
              boxShadow: '0 40px 90px rgba(0,0,0,0.6)',
              zIndex: 10000,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HomeBody;