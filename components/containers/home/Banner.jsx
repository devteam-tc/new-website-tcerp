'use client';

import Image from 'next/image';
import Link from 'next/link';
import Features from './Features';
import HomeBody from './HomeBody';
const Banner = () => (
  <section className="banner-hero">
    <section className="banner-hero2">
    <div className="banner-bg-clouds">
    <Image
 src="/images/banner/new/Banner-bg.webp"
  alt="Hero background"
  fill
  priority
  fetchPriority="high"
  quality={75}
  sizes="100vw"
  style={{
    objectFit: 'cover',
    zIndex: -1,
    

  }}
/></div>
<div className="banner-circle-overlay">
<Image
  src="/images/banner/new/circle.png"
  alt="Circle decoration"
  width={2500}
  height={2500}
  priority
  quality={75}
  sizes="(max-width: 768px) 100vw, 100vw"
  style={{
    position: 'absolute',
    width: '100%',
    maxWidth: '2000px',
    height: 'auto',
    left: '50%',
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    objectFit: 'contain',
    objectPosition: 'center',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  }}
  className="banner-circle-image"
/>
</div>
   <HomeBody/>
     </section>
<Features />

  </section>
);

export default Banner;