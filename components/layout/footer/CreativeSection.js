'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import './CreativeSection.scss';

const CreativeSection = () => {
  const planeRef = useRef(null);
  const images = [
    { src: '/footer/Hoardings.webp', alt: 'Tech Cloud ERP software solutions - Cloud-based business management system for Indian enterprises' },
  ];
  const [trackImages, setTrackImages] = useState(images);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    // Build enough images to cover viewport width for seamless scrolling
    const IMAGE_WIDTH = 800; // must match the Image width prop
    const computeTrack = () => {
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const repeats = Math.max(2, Math.ceil(vw / IMAGE_WIDTH) + 1);
      const filled = Array.from({ length: repeats }).flatMap(() => images);
      setTrackImages(filled);
    };

    computeTrack();
    window.addEventListener('resize', computeTrack);

    // Constant speed control: duration = width / SPEED
    const SPEED_PX_PER_S = 120; // adjust smoothness here
    const updateDuration = () => {
      const el = track1Ref.current;
      const scroller = scrollerRef.current;
      if (!el || !scroller) return;
      const width = el.scrollWidth;
      if (width > 0) {
        const duration = width / SPEED_PX_PER_S; // seconds
        scroller.style.setProperty('--marquee-duration', `${duration}s`);
      }
    };

    // Update after DOM paints and images decode
    const raf1 = requestAnimationFrame(updateDuration);
    const raf2 = requestAnimationFrame(updateDuration);
    window.addEventListener('resize', updateDuration);
    const handleAnimationIteration = () => {
      if (planeRef.current) {
        // Reset animation for smooth loop
        planeRef.current.style.animation = 'none';
        planeRef.current.offsetHeight; // Trigger reflow
        planeRef.current.style.animation = 'fly 20s linear infinite';
        planeRef.current.style.transform = 'rotate(-20deg)';
      }
    };

    const plane = planeRef.current;
    if (plane) {
      plane.addEventListener('animationiteration', handleAnimationIteration);
    }

    return () => {
      window.removeEventListener('resize', computeTrack);
      window.removeEventListener('resize', updateDuration);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (plane) {
        plane.removeEventListener('animationiteration', handleAnimationIteration);
      }
    };
  }, []);

  return (
    <div className="scrolling-background-container">
      <div className="scrolling-scroller" aria-hidden="true" ref={scrollerRef}>
        <div className="strip track-1" ref={track1Ref}>
          {trackImages.map((img, idx) => (
            <Image 
              key={`t1-${idx}`} 
              src={typeof img === 'string' ? img : img.src} 
              alt={typeof img === 'string' ? 'Tech Cloud ERP - Enterprise resource planning software' : img.alt} 
              width={800} 
              height={650} 
              priority={idx===0} 
              className="strip-img" 
            />
          ))}
        </div>
        <div className="strip track-2" aria-hidden="true" ref={track2Ref}>
          {trackImages.map((img, idx) => (
            <Image 
              key={`t2-${idx}`} 
              src={typeof img === 'string' ? img : img.src} 
              alt={typeof img === 'string' ? 'Tech Cloud ERP - Enterprise resource planning software' : img.alt} 
              width={800} 
              height={650} 
              className="strip-img" 
            />
          ))}
        </div>
      </div>
      <div className="staticImages">
        <div className="aeroplane-container">
          {/* <Image 
            ref={planeRef}
            src="/footer/flight.webp" 
            alt="Flying aeroplane animation"
            width={600}
            height={600}
            className="aeroplane"
            priority
            loading="eager"
          /> */}
          {/* <Image 
            src="/footer/flightshadow.webp" 
            alt="Aeroplane shadow"
            width={600}
            height={600}
            className="aeroplane-shadow"
            priority
            loading="eager"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CreativeSection;
