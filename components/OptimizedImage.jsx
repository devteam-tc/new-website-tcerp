"use client";
import Image from 'next/image';
import { useState } from 'react';

/**
 * Optimized Image Component with lazy loading and fallback
 * @param {Object} props - Component props
 * @param {string} props.src - Image source path
 * @param {string} props.alt - Alt text for accessibility
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.priority - Load image with priority (for LCP images)
 * @param {string} props.loading - Loading strategy: 'lazy' or 'eager'
 * @param {string} props.sizes - Responsive sizes
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  sizes,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`optimized-image-wrapper ${isLoading ? 'loading' : 'loaded'}`}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        priority={priority}
        loading={priority ? 'eager' : loading}
        sizes={sizes || '100vw'}
        quality={85}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          // Fallback to placeholder on error
          setImgSrc('/images/placeholder.svg');
          setIsLoading(false);
        }}
        {...props}
      />
      {isLoading && (
        <div className="image-skeleton" style={{
          width: width || '100%',
          height: height || 'auto',
          backgroundColor: '#f0f0f0',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
      )}
    </div>
  );
};

export default OptimizedImage;
