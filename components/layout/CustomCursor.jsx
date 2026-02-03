"use client";
import { useEffect, useRef } from "react";
import "./CustomCursor.scss";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    // Skip on touch/coarse pointer devices (mobile/tablet)
    const isCoarsePointer = typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    if (isCoarsePointer) {
      const cursor = cursorRef.current;
      const cursorFollower = followerRef.current;
      const dots = dotsRef.current;
      if (cursor) cursor.style.display = 'none';
      if (cursorFollower) cursorFollower.style.display = 'none';
      if (Array.isArray(dots)) dots.forEach(d => { if (d) d.style.display = 'none'; });
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
    let angle = 0;
    const radius = 30; // Distance from cursor to dots
    const dotAngles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]; // 120 degrees apart

    const cursor = cursorRef.current;
    const cursorFollower = followerRef.current;
    const dots = dotsRef.current;

    // Mouse move event
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Animation loop
    const animate = () => {
      // Easing for the follower
      const deltaX = mouseX - posX;
      const deltaY = mouseY - posY;
      
      posX += deltaX * 0.1;
      posY += deltaY * 0.1;
      
      // Update main cursor
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      
      // Update follower
      cursorFollower.style.left = `${posX}px`;
      cursorFollower.style.top = `${posY}px`;
      
      // Update dots in a circular motion
      angle += 0.02;
      
      dots.forEach((dot, index) => {
        if (dot) {
          const dotAngle = angle + dotAngles[index];
          const dotX = posX + Math.cos(dotAngle) * radius;
          const dotY = posY + Math.sin(dotAngle) * radius;
          
          dot.style.left = `${dotX}px`;
          dot.style.top = `${dotY}px`;
        }
      });
      
      requestAnimationFrame(animate);
    };

    // Click effects
    const handleMouseDown = () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
      dots.forEach(dot => {
        if (dot) dot.style.transform = 'translate(-50%, -50%) scale(0.8)';
      });
    };

    const handleMouseUp = () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      dots.forEach(dot => {
        if (dot) dot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    };

    // Hover effects for clickable elements
    const handleMouseEnter = () => {
      cursorFollower.style.width = '60px';
      cursorFollower.style.height = '60px';
      cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.8)';
    };

    const handleMouseLeave = () => {
      cursorFollower.style.width = '40px';
      cursorFollower.style.height = '40px';
      cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    const clickables = document.querySelectorAll('a, button, .clickable');
    clickables.forEach(clickable => {
      clickable.addEventListener('mouseenter', handleMouseEnter);
      clickable.addEventListener('mouseleave', handleMouseLeave);
    });

    // Start animation
    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      clickables.forEach(clickable => {
        clickable.removeEventListener('mouseenter', handleMouseEnter);
        clickable.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
      {[1, 2, 3].map((dot, index) => (
        <div
          key={dot}
          ref={el => dotsRef.current[index] = el}
          className={`cursor-dot dot-${dot}`}
        />
      ))}
    </>
  );
};

export default CustomCursor;