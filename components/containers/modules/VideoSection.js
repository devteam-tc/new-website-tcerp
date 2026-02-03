'use client';

import React, { useState, useRef } from 'react';
import { FaMinus, FaTimes } from 'react-icons/fa';
import '../../../public/sass/components/_video-section.scss';
import { FaRegSquare } from "react-icons/fa6";

const VideoSection = ({ moduleData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  if (!moduleData?.videosection) {
    return null;
  }

  const { title, description, videoUrl } = moduleData.videosection;
  
  // Add Cloudinary transformations for optimal playback with background removal
  const cloudinaryUrl = `${videoUrl}?f_auto,q_70,w_1200,c_scale,so_0`;

  return (
    <section className="video-section">
      <div className="video-section__container">
        <div className="video-section__header">
          <h2 className="video-section__title">{title}</h2>
          <p className="video-section__desc">{description}</p>
        </div>
        <div className="video-section__browser-window">
          <div className="video-section__browser-topbar">
            <div className="video-section__browser-dots">
              <span className="video-section__browser-dot"><FaMinus /></span>
              <span className="video-section__browser-dot"><FaRegSquare  /></span>
              <span className="video-section__browser-dot"><FaTimes /></span>

            </div>
          </div>
          <div className="video-section__browser-content">
            <div className="video-section__video-wrapper">
              <video
                ref={videoRef}
                width="100%"
                height="auto"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="video-section__video"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                style={{
                  display: 'block',
                  backgroundColor: 'transparent',
                  objectFit: 'contain'
                }}
              >
                <source src={cloudinaryUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
